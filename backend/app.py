from datetime import datetime, timedelta, timezone
import os
import re
import time
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


@app.after_request
def apply_robots_headers(response):
    path = str(request.path or "")
    if path.startswith("/admin"):
        response.headers["X-Robots-Tag"] = "noindex, nofollow, noarchive"
    return response

VALID_BLOG_CATEGORIES = {"notice", "external", "tech"}
UPLOAD_ROOT = os.path.join(os.path.dirname(__file__), "uploads")
BLOG_UPLOAD_DIR = os.path.join(UPLOAD_ROOT, "blog")
BLOG_THUMBNAIL_DIR = os.path.join(BLOG_UPLOAD_DIR, "thumbnails")
BLOG_ATTACHMENT_DIR = os.path.join(BLOG_UPLOAD_DIR, "attachments")
BLOG_TMP_DIR = os.path.join(BLOG_UPLOAD_DIR, "tmp")
THUMBNAIL_ALLOWED_EXTS = {".png", ".jpg", ".jpeg", ".webp"}
THUMBNAIL_MAX_BYTES = 5 * 1024 * 1024  # 5MB
ATTACHMENT_ALLOWED_EXTS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".pdf",
    ".txt",
    ".zip",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".hwp",
    ".hwpx",
}
ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024  # 20MB
os.makedirs(BLOG_UPLOAD_DIR, exist_ok=True)
os.makedirs(BLOG_THUMBNAIL_DIR, exist_ok=True)
os.makedirs(BLOG_ATTACHMENT_DIR, exist_ok=True)
os.makedirs(BLOG_TMP_DIR, exist_ok=True)

VIEW_DEDUP_SECONDS = 60 * 60  # 1 hour
VIEW_DEDUP_CACHE: dict[tuple[int, str], float] = {}
TMP_UPLOAD_TTL_SECONDS = 24 * 60 * 60  # 24 hours
TMP_IMAGE_PATH_PATTERN = re.compile(r"/uploads/blog/tmp/(?P<filename>[A-Za-z0-9._-]+)")


def _get_upload_file_size(file_obj) -> int:
    stream = file_obj.stream
    current_pos = stream.tell()
    stream.seek(0, os.SEEK_END)
    size = stream.tell()
    stream.seek(current_pos, os.SEEK_SET)
    return int(size)


def _save_upload_files(
    file_objects,
    bucket: str = "attachments",
    allowed_exts=None,
    max_bytes: int | None = None,
    label: str = "file",
    is_thumbnail: bool = False,
):
    if bucket == "thumbnails":
        target_dir = BLOG_THUMBNAIL_DIR
        file_url_prefix = "/uploads/blog/thumbnails"
        stored_prefix = "thumbnails"
    else:
        target_dir = BLOG_ATTACHMENT_DIR
        file_url_prefix = "/uploads/blog/attachments"
        stored_prefix = "attachments"

    attachments = []
    for file_obj in file_objects:
        if not file_obj or not file_obj.filename:
            continue

        original_name = str(file_obj.filename)
        ext = os.path.splitext(original_name)[1].lower()

        if allowed_exts is not None and ext not in allowed_exts:
            raise ValueError(f"{label} 파일 형식이 허용되지 않습니다: {ext or '(no extension)'}")

        if max_bytes is not None:
            size_bytes = _get_upload_file_size(file_obj)
            if size_bytes > max_bytes:
                raise ValueError(f"{label} 파일 용량은 최대 {max_bytes // (1024 * 1024)}MB 입니다.")
        else:
            size_bytes = 0

        safe_stored_name = secure_filename(f"{uuid.uuid4().hex}{ext}")
        relative_stored_name = f"{stored_prefix}/{safe_stored_name}"
        save_path = os.path.join(target_dir, safe_stored_name)
        file_obj.save(save_path)

        if size_bytes == 0:
            size_bytes = os.path.getsize(save_path) if os.path.exists(save_path) else 0
        file_url = f"{file_url_prefix}/{safe_stored_name}"
        mime_type = file_obj.mimetype or ""

        attachments.append(
            {
                "original_name": original_name,
                "stored_name": relative_stored_name,
                "mime_type": mime_type,
                "ext": ext,
                "size_bytes": size_bytes,
                "file_url": file_url,
                "is_thumbnail": is_thumbnail,
            }
        )
    return attachments


def _extract_blog_upload_payload(req):
    # New contract:
    # - thumbnail: single file (representative image)
    # - attachments: multiple files (download attachments)
    # Backward compatibility:
    # - files + thumbnail_index
    thumbnail_file = req.files.get("thumbnail")
    attachment_files = req.files.getlist("attachments")

    if thumbnail_file or attachment_files:
        attachments = []

        if thumbnail_file and thumbnail_file.filename:
            thumbnail_saved = _save_upload_files(
                [thumbnail_file],
                bucket="thumbnails",
                allowed_exts=THUMBNAIL_ALLOWED_EXTS,
                max_bytes=THUMBNAIL_MAX_BYTES,
                label="대표이미지",
                is_thumbnail=True,
            )
            if thumbnail_saved:
                attachments.extend(thumbnail_saved)

        if attachment_files:
            attachments.extend(
                _save_upload_files(
                    attachment_files,
                    bucket="attachments",
                    allowed_exts=ATTACHMENT_ALLOWED_EXTS,
                    max_bytes=ATTACHMENT_MAX_BYTES,
                    label="첨부파일",
                    is_thumbnail=False,
                )
            )

        return attachments

    legacy_files = req.files.getlist("files")
    raw_thumbnail_index = str(req.form.get("thumbnail_index", "-1")).strip()
    try:
        legacy_thumbnail_index = int(raw_thumbnail_index)
    except ValueError:
        legacy_thumbnail_index = -1

    attachments = []
    for idx, file_obj in enumerate(legacy_files):
        if not file_obj or not file_obj.filename:
            continue

        if idx == legacy_thumbnail_index:
            saved = _save_upload_files(
                [file_obj],
                bucket="thumbnails",
                allowed_exts=THUMBNAIL_ALLOWED_EXTS,
                max_bytes=THUMBNAIL_MAX_BYTES,
                label="대표이미지",
                is_thumbnail=True,
            )
            if saved:
                saved[0]["is_thumbnail"] = True
                attachments.extend(saved)
        else:
            saved = _save_upload_files(
                [file_obj],
                bucket="attachments",
                allowed_exts=ATTACHMENT_ALLOWED_EXTS,
                max_bytes=ATTACHMENT_MAX_BYTES,
                label="첨부파일",
                is_thumbnail=False,
            )
            if saved:
                saved[0]["is_thumbnail"] = False
                attachments.extend(saved)

    return attachments


def _cleanup_old_tmp_uploads(max_age_seconds: int = TMP_UPLOAD_TTL_SECONDS):
    now = time.time()
    try:
        for name in os.listdir(BLOG_TMP_DIR):
            path = os.path.join(BLOG_TMP_DIR, name)
            if not os.path.isfile(path):
                continue
            age = now - os.path.getmtime(path)
            if age > max_age_seconds:
                try:
                    os.remove(path)
                except OSError:
                    pass
    except OSError:
        pass


def _promote_tmp_images_in_content(content: str):
    # Replace /uploads/blog/tmp/... URLs with /uploads/blog/attachments/...
    # while moving referenced files to the attachment directory.
    promoted: dict[str, str] = {}

    def _replace(match):
        original_filename = str(match.group("filename"))
        safe_filename = secure_filename(original_filename)
        if not safe_filename:
            return match.group(0)

        if safe_filename in promoted:
            return f"/uploads/blog/attachments/{promoted[safe_filename]}"

        source_path = os.path.join(BLOG_TMP_DIR, safe_filename)
        if not os.path.exists(source_path):
            return match.group(0)

        ext = os.path.splitext(safe_filename)[1].lower()
        target_name = f"{uuid.uuid4().hex}{ext}"
        target_path = os.path.join(BLOG_ATTACHMENT_DIR, target_name)
        try:
            os.replace(source_path, target_path)
        except OSError:
            return match.group(0)

        promoted[safe_filename] = target_name
        return f"/uploads/blog/attachments/{target_name}"

    return TMP_IMAGE_PATH_PATTERN.sub(_replace, content or "")


def _normalize_client_ip(req):
    forwarded_for = str(req.headers.get("X-Forwarded-For", "")).strip()
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    return str(req.remote_addr or "").strip()


def _is_bot_request(req):
    ua = str(req.headers.get("User-Agent", "")).lower()
    bot_keywords = ("bot", "spider", "crawler", "slurp", "preview")
    return any(keyword in ua for keyword in bot_keywords)


def _should_count_view(post_id: int, req):
    if _is_bot_request(req):
        return False

    client_ip = _normalize_client_ip(req)
    user_agent = str(req.headers.get("User-Agent", "")).strip().lower()
    fingerprint = f"{client_ip}|{user_agent}"
    now = time.time()
    key = (post_id, fingerprint)

    # Periodic cleanup for expired entries.
    if len(VIEW_DEDUP_CACHE) > 2000:
        threshold = now - VIEW_DEDUP_SECONDS
        expired_keys = [cache_key for cache_key, ts in VIEW_DEDUP_CACHE.items() if ts < threshold]
        for cache_key in expired_keys:
            VIEW_DEDUP_CACHE.pop(cache_key, None)

    last_seen = VIEW_DEDUP_CACHE.get(key)
    if last_seen is not None and (now - last_seen) < VIEW_DEDUP_SECONDS:
        return False

    VIEW_DEDUP_CACHE[key] = now
    return True


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
    keyword = str(request.args.get("q", "")).strip()

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
        result = database.get_blog_category_paged(category, page, page_size, keyword)
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    total_count = result["totalCount"]
    total_pages = (total_count + page_size - 1) // page_size if total_count > 0 else 1

    return jsonify(
        {
            "ok": True,
            "category": category,
            "q": keyword,
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
        if _should_count_view(post_id, request):
            database.increment_blog_view(post_id)
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

    if category not in VALID_BLOG_CATEGORIES:
        return jsonify({"ok": False, "message": "invalid category"}), 400
    if not title:
        return jsonify({"ok": False, "message": "title is required"}), 400
    if not content:
        return jsonify({"ok": False, "message": "content is required"}), 400

    content = _promote_tmp_images_in_content(content)
    _cleanup_old_tmp_uploads()

    try:
        attachments = _extract_blog_upload_payload(request)
    except ValueError as exc:
        return jsonify({"ok": False, "message": str(exc)}), 400

    try:
        created = database.create_blog_post_with_attachments(
            category=category,
            title=title,
            content=content,
            author=author,
            attachments=attachments,
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
    replace_attachments = str(request.form.get("replace_attachments", "false")).lower() == "true"
    replace_thumbnail = str(request.form.get("replace_thumbnail", "false")).lower() == "true"
    raw_keep_attachment_ids = request.form.get("keep_attachment_ids")

    if category not in VALID_BLOG_CATEGORIES:
        return jsonify({"ok": False, "message": "invalid category"}), 400
    if not title:
        return jsonify({"ok": False, "message": "title is required"}), 400
    if not content:
        return jsonify({"ok": False, "message": "content is required"}), 400

    content = _promote_tmp_images_in_content(content)
    _cleanup_old_tmp_uploads()

    try:
        attachments = _extract_blog_upload_payload(request)
    except ValueError as exc:
        return jsonify({"ok": False, "message": str(exc)}), 400

    has_new_thumbnail = any(item.get("is_thumbnail") for item in attachments)
    if has_new_thumbnail:
        replace_thumbnail = True

    old_files = []

    keep_attachment_ids = None
    if raw_keep_attachment_ids is not None:
        parsed_ids = []
        for token in str(raw_keep_attachment_ids).split(","):
            token = token.strip()
            if not token:
                continue
            if not token.isdigit():
                return jsonify({"ok": False, "message": "invalid keep_attachment_ids"}), 400
            parsed_ids.append(int(token))
        keep_attachment_ids = set(parsed_ids)

    if replace_attachments:
        old_files.extend(
            database.get_post_attachment_files(
                post_id,
                include_thumbnail=False,
                include_non_thumbnail=True,
            )
        )
    elif keep_attachment_ids is not None:
        existing_non_thumbnail = database.get_post_attachment_files(
            post_id,
            include_thumbnail=False,
            include_non_thumbnail=True,
        )
        to_remove = [x for x in existing_non_thumbnail if x["id"] not in keep_attachment_ids]
        if to_remove:
            database.delete_blog_attachments_by_ids(post_id, [x["id"] for x in to_remove])
            old_files.extend(to_remove)

    if replace_thumbnail:
        old_files.extend(
            database.get_post_attachment_files(
                post_id,
                include_thumbnail=True,
                include_non_thumbnail=False,
            )
        )

    try:
        result = database.update_blog_post_with_attachments(
            post_id=post_id,
            category=category,
            title=title,
            content=content,
            author=author,
            attachments=attachments,
            replace_attachments=replace_attachments,
            replace_thumbnail=replace_thumbnail,
        )
    except Exception as exc:
        return jsonify({"ok": False, "message": str(exc)}), 500

    if not result.get("ok"):
        return jsonify({"ok": False, "message": result.get("message", "update failed")}), 404

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
    _cleanup_old_tmp_uploads()

    file_obj = request.files.get("file")
    if not file_obj or not file_obj.filename:
        return jsonify({"ok": False, "message": "file is required"}), 400

    original_name = str(file_obj.filename)
    ext = os.path.splitext(original_name)[1].lower()
    if ext not in THUMBNAIL_ALLOWED_EXTS:
        return jsonify({"ok": False, "message": "허용되지 않는 이미지 형식입니다."}), 400
    file_size = _get_upload_file_size(file_obj)
    if file_size > THUMBNAIL_MAX_BYTES:
        return jsonify({"ok": False, "message": "이미지는 최대 5MB까지 업로드 가능합니다."}), 400

    stored_name = f"{uuid.uuid4().hex}{ext}"
    safe_stored_name = secure_filename(stored_name)
    save_path = os.path.join(BLOG_TMP_DIR, safe_stored_name)
    file_obj.save(save_path)

    file_url = f"/uploads/blog/tmp/{safe_stored_name}"
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
        os.path.dirname(file_path),
        os.path.basename(meta["storedName"]),
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
