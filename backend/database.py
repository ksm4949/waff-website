from connection_pool import get_db_connection
from thread_pool_manager import with_thread_pool


@with_thread_pool("db")
def check_db_connection():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        row = cursor.fetchone()
        cursor.close()
        return bool(row and row[0] == 1)


@with_thread_pool("db")
def get_admin_by_credentials(username: str, password: str):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT TOP 1 id, username, display_name, role
            FROM dbo.admins
            WHERE username = ?
              AND password = ?
              AND is_active = 1
            """,
            (username, password),
        )
        row = cursor.fetchone()
        if not row:
            cursor.close()
            return None

        admin = {
            "id": int(row[0]),
            "username": str(row[1]),
            "display_name": str(row[2]) if row[2] is not None else None,
            "role": str(row[3]) if row[3] is not None else "admin",
        }

        cursor.execute(
            "UPDATE dbo.admins SET last_login_at = SYSUTCDATETIME() WHERE id = ?",
            (admin["id"],),
        )
        conn.commit()
        cursor.close()
        return admin


def _row_to_blog_dict(row):
    values = list(row)
    # Transition-safe:
    # - old shape: 10 cols (includes summary)
    # - new shape: 9 cols (summary removed)
    if len(values) == 10:
        post_id, category, title, _, content, author, published_date, views, image_url, is_featured = values
    elif len(values) == 9:
        post_id, category, title, content, author, published_date, views, image_url, is_featured = values
    else:
        raise ValueError(f"unexpected blog row length: {len(values)}")

    return {
        "id": int(post_id),
        "category": str(category),
        "title": str(title),
        "content": str(content),
        "author": str(author),
        "date": published_date.isoformat() if published_date is not None else None,
        "views": int(views) if views is not None else 0,
        "imageUrl": str(image_url) if image_url is not None else "",
        "isFeatured": bool(is_featured) if is_featured is not None else False,
    }


@with_thread_pool("db")
def get_blog_latest3_by_category():
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("EXEC dbo.usp_blog_latest3_by_category")
        rows = cursor.fetchall()
        cursor.close()
        return [_row_to_blog_dict(row) for row in rows]


@with_thread_pool("db")
def get_blog_category_paged(category: str, page: int = 1, page_size: int = 6):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "EXEC dbo.usp_blog_category_paged ?, ?, ?",
            (category, page, page_size),
        )
        rows = cursor.fetchall()
        cursor.close()

        items = []
        total_count = 0
        for row in rows:
            row_values = list(row)
            total_count = int(row_values[-1]) if row_values[-1] is not None else 0
            items.append(_row_to_blog_dict(row_values[:-1]))
        return {"items": items, "totalCount": total_count}


@with_thread_pool("db")
def get_blog_detail(post_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            WITH ordered AS (
                SELECT
                    id,
                    category,
                    title,
                    content,
                    author,
                    published_date,
                    views,
                    image_url,
                    is_featured,
                    ROW_NUMBER() OVER (ORDER BY published_date DESC, id DESC) AS rn
                FROM dbo.blog_posts
            )
            SELECT
                c.id,
                c.category,
                c.title,
                c.content,
                c.author,
                c.published_date,
                c.views,
                c.image_url,
                c.is_featured,
                p.id AS prev_id,
                p.title AS prev_title,
                n.id AS next_id,
                n.title AS next_title
            FROM ordered c
            LEFT JOIN ordered p ON p.rn = c.rn - 1
            LEFT JOIN ordered n ON n.rn = c.rn + 1
            WHERE c.id = ?
            """,
            (post_id,),
        )
        row = cursor.fetchone()
        cursor.close()

        if not row:
            return None

        post = {
            "id": int(row[0]),
            "category": str(row[1]),
            "title": str(row[2]),
            "content": str(row[3]),
            "author": str(row[4]),
            "date": row[5].isoformat() if row[5] is not None else None,
            "views": int(row[6]) if row[6] is not None else 0,
            "imageUrl": str(row[7]) if row[7] is not None else "",
            "isFeatured": bool(row[8]) if row[8] is not None else False,
        }
        prev_post = (
            {"id": int(row[9]), "title": str(row[10])}
            if row[9] is not None and row[10] is not None
            else None
        )
        next_post = (
            {"id": int(row[11]), "title": str(row[12])}
            if row[11] is not None and row[12] is not None
            else None
        )
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, original_name, mime_type, size_bytes, file_url, is_thumbnail
            FROM dbo.blog_attachments
            WHERE post_id = ?
            ORDER BY id ASC
            """,
            (post_id,),
        )
        attachment_rows = cursor.fetchall()
        cursor.close()

        attachments = []
        for a in attachment_rows:
            attachments.append(
                {
                    "id": int(a[0]),
                    "originalName": str(a[1]),
                    "mimeType": str(a[2]) if a[2] is not None else "",
                    "sizeBytes": int(a[3]) if a[3] is not None else 0,
                    "fileUrl": str(a[4]),
                    "isThumbnail": bool(a[5]) if a[5] is not None else False,
                }
            )

        return {"post": post, "prevPost": prev_post, "nextPost": next_post, "attachments": attachments}


@with_thread_pool("db")
def create_blog_post_with_attachments(
    category: str,
    title: str,
    content: str,
    author: str,
    attachments: list,
    thumbnail_index: int = -1,
):
    with get_db_connection() as conn:
        cursor = conn.cursor()

        image_url = ""

        cursor.execute(
            """
            INSERT INTO dbo.blog_posts
            (
                category, title, content, author, published_date,
                views, image_url, is_featured, created_at, updated_at
            )
            OUTPUT INSERTED.id
            VALUES
            (
                ?, ?, ?, ?, CAST(SYSDATETIME() AS DATE),
                0, ?, 0, SYSDATETIME(), SYSDATETIME()
            )
            """,
            (category, title, content, author, image_url),
        )
        post_row = cursor.fetchone()
        if not post_row:
            cursor.close()
            raise RuntimeError("failed to create blog post")

        post_id = int(post_row[0])
        thumbnail_attachment_id = None

        for idx, item in enumerate(attachments):
            is_thumbnail = 1 if idx == thumbnail_index else 0
            cursor.execute(
                """
                INSERT INTO dbo.blog_attachments
                (
                    post_id, original_name, stored_name, mime_type, ext,
                    size_bytes, file_url, is_thumbnail, created_at
                )
                OUTPUT INSERTED.id
                VALUES
                (
                    ?, ?, ?, ?, ?,
                    ?, ?, ?, SYSDATETIME()
                )
                """,
                (
                    post_id,
                    item["original_name"],
                    item["stored_name"],
                    item["mime_type"],
                    item["ext"],
                    item["size_bytes"],
                    item["file_url"],
                    is_thumbnail,
                ),
            )
            attachment_row = cursor.fetchone()
            if is_thumbnail and attachment_row:
                thumbnail_attachment_id = int(attachment_row[0])
                image_url = item["file_url"]

        if thumbnail_attachment_id is not None:
            cursor.execute(
                """
                UPDATE dbo.blog_posts
                SET thumbnail_attachment_id = ?, image_url = ?, updated_at = SYSDATETIME()
                WHERE id = ?
                """,
                (thumbnail_attachment_id, image_url, post_id),
            )

        cursor.close()
        conn.commit()
        return {"id": post_id}


@with_thread_pool("db")
def get_blog_attachment_for_download(attachment_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT TOP 1 id, stored_name, original_name
            FROM dbo.blog_attachments
            WHERE id = ?
            """,
            (attachment_id,),
        )
        row = cursor.fetchone()
        cursor.close()

        if not row:
            return None

        return {
            "id": int(row[0]),
            "storedName": str(row[1]),
            "originalName": str(row[2]),
        }


@with_thread_pool("db")
def get_post_attachment_files(post_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, stored_name
            FROM dbo.blog_attachments
            WHERE post_id = ?
            ORDER BY id ASC
            """,
            (post_id,),
        )
        rows = cursor.fetchall()
        cursor.close()
        return [{"id": int(r[0]), "storedName": str(r[1])} for r in rows]


@with_thread_pool("db")
def delete_blog_post(post_id: int):
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(1) FROM dbo.blog_posts WHERE id = ?", (post_id,))
        row = cursor.fetchone()
        exists = bool(row and int(row[0]) > 0)
        if not exists:
            cursor.close()
            return False

        cursor.execute("DELETE FROM dbo.blog_posts WHERE id = ?", (post_id,))
        conn.commit()
        cursor.close()
        return True


@with_thread_pool("db")
def update_blog_post_with_attachments(
    post_id: int,
    category: str,
    title: str,
    content: str,
    author: str,
    attachments: list,
    thumbnail_index: int = -1,
    replace_attachments: bool = False,
):
    with get_db_connection() as conn:
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(1) FROM dbo.blog_posts WHERE id = ?", (post_id,))
        row = cursor.fetchone()
        if not row or int(row[0]) == 0:
            cursor.close()
            return {"ok": False, "message": "post not found"}

        if replace_attachments:
            cursor.execute(
                """
                UPDATE dbo.blog_posts
                SET thumbnail_attachment_id = NULL, image_url = '', updated_at = SYSDATETIME()
                WHERE id = ?
                """,
                (post_id,),
            )
            cursor.execute("DELETE FROM dbo.blog_attachments WHERE post_id = ?", (post_id,))

        cursor.execute(
            """
            UPDATE dbo.blog_posts
            SET category = ?,
                title = ?,
                content = ?,
                author = ?,
                updated_at = SYSDATETIME()
            WHERE id = ?
            """,
            (category, title, content, author, post_id),
        )

        thumbnail_attachment_id = None
        image_url = None

        for idx, item in enumerate(attachments):
            is_thumbnail = 1 if idx == thumbnail_index else 0
            cursor.execute(
                """
                INSERT INTO dbo.blog_attachments
                (
                    post_id, original_name, stored_name, mime_type, ext,
                    size_bytes, file_url, is_thumbnail, created_at
                )
                OUTPUT INSERTED.id
                VALUES
                (
                    ?, ?, ?, ?, ?,
                    ?, ?, ?, SYSDATETIME()
                )
                """,
                (
                    post_id,
                    item["original_name"],
                    item["stored_name"],
                    item["mime_type"],
                    item["ext"],
                    item["size_bytes"],
                    item["file_url"],
                    is_thumbnail,
                ),
            )
            inserted_row = cursor.fetchone()
            if is_thumbnail and inserted_row:
                thumbnail_attachment_id = int(inserted_row[0])
                image_url = item["file_url"]

        if thumbnail_attachment_id is not None and image_url is not None:
            cursor.execute(
                """
                UPDATE dbo.blog_attachments
                SET is_thumbnail = 0
                WHERE post_id = ?
                """,
                (post_id,),
            )
            cursor.execute(
                """
                UPDATE dbo.blog_posts
                SET thumbnail_attachment_id = ?, image_url = ?, updated_at = SYSDATETIME()
                WHERE id = ?
                """,
                (thumbnail_attachment_id, image_url, post_id),
            )
            cursor.execute(
                """
                UPDATE dbo.blog_attachments
                SET is_thumbnail = 1
                WHERE id = ?
                """,
                (thumbnail_attachment_id,),
            )

        conn.commit()
        cursor.close()
        return {"ok": True, "id": post_id}
