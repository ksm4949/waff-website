from datetime import datetime, timedelta, timezone
import os
import uuid

import dotenv
import jwt
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

import database
from config import Config
from thread_pool_manager import (
    get_api_thread_pool,
    get_db_thread_pool,
    initialize_thread_pools,
)


dotenv.load_dotenv(".flaskenv")

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})

VALID_BLOG_CATEGORIES = {"notice", "external", "tech"}
UPLOAD_ROOT = os.path.join(os.path.dirname(__file__), "uploads")
BLOG_UPLOAD_DIR = os.path.join(UPLOAD_ROOT, "blog")
os.makedirs(BLOG_UPLOAD_DIR, exist_ok=True)


def _save_upload_files(file_objects):
    attachments = []
    for file_obj in file_objects:
        if not file_obj or not file_obj.filename:
            continue

        original_name = str(file_obj.filename)
        ext = os.path.splitext(original_name)[1].lower()
        stored_name = f"{uuid.uuid4().hex}{ext}"
        safe_stored_name = secure_filename(stored_name)
        save_path = os.path.join(BLOG_UPLOAD_DIR, safe_stored_name)
        file_obj.save(save_path)

        size_bytes = os.path.getsize(save_path) if os.path.exists(save_path) else 0
        file_url = f"/uploads/blog/{safe_stored_name}"
        mime_type = file_obj.mimetype or ""

        attachments.append(
            {
                "original_name": original_name,
                "stored_name": safe_stored_name,
                "mime_type": mime_type,
                "ext": ext,
                "size_bytes": size_bytes,
                "file_url": file_url,
            }
        )
    return attachments


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "message": "backend is running"})


@app.get("/api/health/db")
def health_db():
    try:
        ok = database.check_db_connection()
        if ok:
            return jsonify({"ok": True, "message": "database connected"})
        return jsonify({"ok": False, "message": "database check failed"}), 500
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500


@app.post("/api/auth/login")
def login():
    body = request.get_json(silent=True) or {}
    username = str(body.get("username", "")).strip()
    password = str(body.get("password", ""))

    if not username or not password:
        return jsonify({"ok": False, "message": "username and password are required"}), 400

    try:
        admin = database.get_admin_by_credentials(username, password)
    except Exception:
        return jsonify({"ok": False, "message": "auth database error"}), 500

    if not admin:
        return jsonify({"ok": False, "message": "invalid credentials"}), 401

    now = datetime.now(timezone.utc)
    payload = {
        "sub": admin["username"],
        "role": admin["role"],
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(hours=12)).timestamp()),
    }
    token = jwt.encode(payload, app.config["JWT_SECRET_KEY"], algorithm="HS256")

    return jsonify(
        {
            "ok": True,
            "token": token,
            "user": {
                "id": admin["id"],
                "username": admin["username"],
                "displayName": admin["display_name"],
                "role": admin["role"],
            },
        }
    )


@app.get("/api/blog/home")
def blog_home():
    try:
        rows = database.get_blog_latest3_by_category()
        return jsonify({"ok": True, "items": rows})
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500


@app.get("/api/blog/category/<category>")
def blog_category(category: str):
    if category not in VALID_BLOG_CATEGORIES:
        return jsonify({"ok": False, "message": "invalid category"}), 400

    raw_page = request.args.get("page", "1")
    raw_page_size = request.args.get("page_size", "6")

    try:
        page = int(raw_page)
        page_size = int(raw_page_size)
    except ValueError:
        return jsonify({"ok": False, "message": "page and page_size must be integers"}), 400

    if page < 1:
        page = 1
    if page_size < 1:
        page_size = 6
    if page_size > 50:
        page_size = 50

    try:
        result = database.get_blog_category_paged(category, page, page_size)
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    total_count = result["totalCount"]
    total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

    return jsonify(
        {
            "ok": True,
            "category": category,
            "items": result["items"],
            "page": page,
            "pageSize": page_size,
            "totalCount": total_count,
            "totalPages": total_pages,
        }
    )


@app.get("/api/blog/<int:post_id>")
def blog_detail(post_id: int):
    try:
        result = database.get_blog_detail(post_id)
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    if not result:
        return jsonify({"ok": False, "message": "post not found"}), 404

    return jsonify({"ok": True, **result})


@app.get("/uploads/<path:filename>")
def uploaded_file(filename: str):
    return send_from_directory(UPLOAD_ROOT, filename, as_attachment=False)


@app.post("/api/blog")
def create_blog():
    category = str(request.form.get("category", "")).strip()
    title = str(request.form.get("title", "")).strip()
    content = str(request.form.get("content", "")).strip()
    author = str(request.form.get("author", "관리자")).strip() or "관리자"
    raw_thumbnail_index = str(request.form.get("thumbnail_index", "-1")).strip()

    if category not in VALID_BLOG_CATEGORIES:
        return jsonify({"ok": False, "message": "invalid category"}), 400
    if not title:
        return jsonify({"ok": False, "message": "title is required"}), 400
    if not content:
        return jsonify({"ok": False, "message": "content is required"}), 400

    try:
        thumbnail_index = int(raw_thumbnail_index)
    except ValueError:
        thumbnail_index = -1

    attachments = _save_upload_files(request.files.getlist("files"))

    if thumbnail_index < 0 or thumbnail_index >= len(attachments):
        thumbnail_index = -1

    try:
        created = database.create_blog_post_with_attachments(
            category=category,
            title=title,
            content=content,
            author=author,
            attachments=attachments,
            thumbnail_index=thumbnail_index,
        )
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    return jsonify({"ok": True, "id": created["id"]}), 201


@app.put("/api/blog/<int:post_id>")
def update_blog(post_id: int):
    category = str(request.form.get("category", "")).strip()
    title = str(request.form.get("title", "")).strip()
    content = str(request.form.get("content", "")).strip()
    author = str(request.form.get("author", "관리자")).strip() or "관리자"
    raw_thumbnail_index = str(request.form.get("thumbnail_index", "-1")).strip()
    replace_attachments = str(request.form.get("replace_attachments", "false")).lower() == "true"

    if category not in VALID_BLOG_CATEGORIES:
        return jsonify({"ok": False, "message": "invalid category"}), 400
    if not title:
        return jsonify({"ok": False, "message": "title is required"}), 400
    if not content:
        return jsonify({"ok": False, "message": "content is required"}), 400

    try:
        thumbnail_index = int(raw_thumbnail_index)
    except ValueError:
        thumbnail_index = -1

    old_files = database.get_post_attachment_files(post_id) if replace_attachments else []
    attachments = _save_upload_files(request.files.getlist("files"))

    if thumbnail_index < 0 or thumbnail_index >= len(attachments):
        thumbnail_index = -1

    try:
        result = database.update_blog_post_with_attachments(
            post_id=post_id,
            category=category,
            title=title,
            content=content,
            author=author,
            attachments=attachments,
            thumbnail_index=thumbnail_index,
            replace_attachments=replace_attachments,
        )
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    if not result.get("ok"):
        return jsonify({"ok": False, "message": result.get("message", "update failed")}), 404

    if replace_attachments:
        for file_meta in old_files:
            path = os.path.join(BLOG_UPLOAD_DIR, file_meta["storedName"])
            if os.path.exists(path):
                try:
                    os.remove(path)
                except OSError:
                    pass

    return jsonify({"ok": True, "id": post_id})


@app.delete("/api/blog/<int:post_id>")
def delete_blog(post_id: int):
    files = database.get_post_attachment_files(post_id)
    try:
        deleted = database.delete_blog_post(post_id)
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    if not deleted:
        return jsonify({"ok": False, "message": "post not found"}), 404

    for file_meta in files:
        path = os.path.join(BLOG_UPLOAD_DIR, file_meta["storedName"])
        if os.path.exists(path):
            try:
                os.remove(path)
            except OSError:
                pass

    return jsonify({"ok": True})


@app.post("/api/blog/editor-image")
def upload_editor_image():
    file_obj = request.files.get("file")
    if not file_obj or not file_obj.filename:
        return jsonify({"ok": False, "message": "file is required"}), 400

    original_name = str(file_obj.filename)
    ext = os.path.splitext(original_name)[1].lower()
    stored_name = f"{uuid.uuid4().hex}{ext}"
    safe_stored_name = secure_filename(stored_name)
    save_path = os.path.join(BLOG_UPLOAD_DIR, safe_stored_name)
    file_obj.save(save_path)

    file_url = f"/uploads/blog/{safe_stored_name}"
    return jsonify({"ok": True, "location": file_url})


@app.get("/api/blog/attachments/<int:attachment_id>/download")
def download_blog_attachment(attachment_id: int):
    try:
        meta = database.get_blog_attachment_for_download(attachment_id)
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    if not meta:
        return jsonify({"ok": False, "message": "attachment not found"}), 404

    file_path = os.path.join(BLOG_UPLOAD_DIR, meta["storedName"])
    if not os.path.exists(file_path):
        return jsonify({"ok": False, "message": "file not found"}), 404

    return send_from_directory(
        BLOG_UPLOAD_DIR,
        meta["storedName"],
        as_attachment=True,
        download_name=meta["originalName"],
    )


if __name__ == "__main__":
    initialize_thread_pools()

    try:
        database.check_db_connection()
        app.run(host="0.0.0.0", port=5002, debug=False, threaded=False)
    finally:
        get_db_thread_pool().shutdown()
        get_api_thread_pool().shutdown()
