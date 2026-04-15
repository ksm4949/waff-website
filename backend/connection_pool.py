# -*- coding: utf-8 -*-
"""Database connection pool utilities for MSSQL (pyodbc)."""

from __future__ import annotations

import os
import threading
import time
from contextlib import contextmanager
from datetime import datetime
from queue import Empty, Queue

import pyodbc


class DatabaseConnectionPool:
    """Thread-safe pyodbc connection pool."""

    def __init__(self, pool_name: str = "default", min_connections: int = 2, max_connections: int = 10):
        self.pool_name = pool_name
        self.min_connections = min_connections
        self.max_connections = max_connections

        self.connection_pool: Queue = Queue(maxsize=max_connections)
        self.active_connections: set[pyodbc.Connection] = set()
        self.pool_lock = threading.Lock()

        self.host = os.getenv("MSSQL_HOST", "127.0.0.1")
        self.port = os.getenv("MSSQL_PORT", "1433")
        self.username = os.getenv("MSSQL_USERNAME", "")
        self.password = os.getenv("MSSQL_PASSWORD", "")
        self.database = os.getenv("MSSQL_DATABASE", "")
        self.encrypt = os.getenv("MSSQL_ENCRYPT", "yes")

        self.driver = self._get_best_driver()
        self.connection_string = self._build_connection_string()

        self.stats = {
            "connections_created": 0,
            "connections_active": 0,
            "connections_errors": 0,
            "last_cleanup": datetime.now(),
        }
        self.last_connection_error: str | None = None

        self._initialize_pool()
        self._start_cleanup_thread()

    def _get_best_driver(self) -> str:
        drivers = set(pyodbc.drivers())
        preferred = [
            "ODBC Driver 19 for SQL Server",
            "ODBC Driver 18 for SQL Server",
            "ODBC Driver 17 for SQL Server",
            "ODBC Driver 16 for SQL Server",
            "SQL Server Native Client 11.0",
            "SQL Server",
        ]
        for driver in preferred:
            if driver in drivers:
                return driver
        raise RuntimeError(f"No SQL Server ODBC driver found. Installed: {list(drivers)}")

    def _build_connection_string(self) -> str:
        return (
            f"DRIVER={{{self.driver}}};"
            f"SERVER={self.host},{self.port};"
            f"DATABASE={self.database};"
            f"UID={self.username};"
            f"PWD={self.password};"
            "TrustServerCertificate=yes;"
            f"Encrypt={self.encrypt};"
            "Connection Timeout=10;"
        )

    def _create_connection(self) -> pyodbc.Connection | None:
        try:
            conn = pyodbc.connect(self.connection_string, timeout=10)
            conn.autocommit = False
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            cursor.fetchone()
            cursor.close()
            self.stats["connections_created"] += 1
            return conn
        except Exception as exc:
            self.stats["connections_errors"] += 1
            self.last_connection_error = str(exc)
            return None

    def _initialize_pool(self) -> None:
        for _ in range(self.min_connections):
            conn = self._create_connection()
            if conn is not None:
                self.connection_pool.put(conn)
                self.active_connections.add(conn)

    def _is_connection_alive(self, conn: pyodbc.Connection) -> bool:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            cursor.fetchone()
            cursor.close()
            return True
        except Exception:
            return False

    def get_connection(self, timeout: float = 10.0) -> pyodbc.Connection:
        start = time.time()
        while time.time() - start < timeout:
            try:
                conn = self.connection_pool.get(timeout=0.5)
                if self._is_connection_alive(conn):
                    self.stats["connections_active"] += 1
                    return conn
                self.active_connections.discard(conn)
                try:
                    conn.close()
                except Exception:
                    pass
            except Empty:
                pass

            with self.pool_lock:
                if len(self.active_connections) < self.max_connections:
                    new_conn = self._create_connection()
                    if new_conn is not None:
                        self.active_connections.add(new_conn)
                        self.stats["connections_active"] += 1
                        return new_conn

        if self.last_connection_error:
            raise TimeoutError(
                f"Could not get DB connection within {timeout} seconds: {self.last_connection_error}"
            )
        raise TimeoutError(f"Could not get DB connection within {timeout} seconds")

    def return_connection(self, conn: pyodbc.Connection | None) -> None:
        if conn is None:
            return
        try:
            if conn in self.active_connections and self._is_connection_alive(conn):
                if conn.autocommit:
                    conn.autocommit = False
                self.connection_pool.put(conn, timeout=1)
            else:
                self.active_connections.discard(conn)
                try:
                    conn.close()
                except Exception:
                    pass
        finally:
            self.stats["connections_active"] = max(0, self.stats["connections_active"] - 1)

    @contextmanager
    def get_db_connection(self):
        conn = None
        try:
            conn = self.get_connection()
            yield conn
        except Exception:
            if conn is not None:
                try:
                    conn.rollback()
                except Exception:
                    pass
            raise
        finally:
            self.return_connection(conn)

    def _start_cleanup_thread(self) -> None:
        def cleanup_worker() -> None:
            while True:
                time.sleep(300)
                self._cleanup_dead_connections()

        t = threading.Thread(target=cleanup_worker, daemon=True)
        t.start()

    def _cleanup_dead_connections(self) -> None:
        alive: list[pyodbc.Connection] = []
        with self.pool_lock:
            while not self.connection_pool.empty():
                try:
                    conn = self.connection_pool.get_nowait()
                except Empty:
                    break
                if self._is_connection_alive(conn):
                    alive.append(conn)
                else:
                    self.active_connections.discard(conn)
                    try:
                        conn.close()
                    except Exception:
                        pass

            for conn in alive:
                try:
                    self.connection_pool.put_nowait(conn)
                except Exception:
                    pass

            self.stats["last_cleanup"] = datetime.now()

    def get_pool_status(self) -> dict:
        return {
            "pool_name": self.pool_name,
            "driver": self.driver,
            "total_connections": len(self.active_connections),
            "available_connections": self.connection_pool.qsize(),
            "active_connections": self.stats["connections_active"],
            "created_total": self.stats["connections_created"],
            "errors_total": self.stats["connections_errors"],
            "last_cleanup": self.stats["last_cleanup"].strftime("%Y-%m-%d %H:%M:%S"),
        }

    def close_all_connections(self) -> None:
        while not self.connection_pool.empty():
            try:
                conn = self.connection_pool.get_nowait()
                conn.close()
            except Exception:
                pass


_db_pool: DatabaseConnectionPool | None = None


def initialize_connection_pool(min_connections: int = 2, max_connections: int = 10) -> bool:
    global _db_pool
    try:
        _db_pool = DatabaseConnectionPool(
            pool_name="flask_app_pyodbc",
            min_connections=min_connections,
            max_connections=max_connections,
        )
        return True
    except Exception:
        _db_pool = None
        return False


def get_pool() -> DatabaseConnectionPool:
    global _db_pool
    if _db_pool is None:
        ok = initialize_connection_pool()
        if not ok or _db_pool is None:
            raise RuntimeError("Failed to initialize DB connection pool")
    return _db_pool


@contextmanager
def get_db_connection(charset=None):
    del charset
    pool = get_pool()
    with pool.get_db_connection() as conn:
        yield conn


@contextmanager
def get_pymssql_connection():
    with get_db_connection() as conn:
        yield conn
