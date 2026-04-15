import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  createBlogPost,
  fetchBlogDetail,
  toAssetUrl,
  updateBlogPost,
  type BlogAttachment,
  type BlogCategory,
} from "@/lib/blogApi";
import { useEffect, useRef, useState } from "react";
import { FileArchive, FileImage, FileText, File, ImagePlus, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";

declare global {
  interface Window {
    toastui?: {
      Editor: new (options: Record<string, unknown>) => {
        getHTML: () => string;
        setHTML: (html: string) => void;
        destroy: () => void;
      };
    };
  }
}

const EDITOR_ROOT_ID = "toast-editor-root";
const TOAST_EDITOR_CSS = "https://uicdn.toast.com/editor/latest/toastui-editor.min.css";
const TOAST_EDITOR_SCRIPT = "https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js";
const THUMBNAIL_MAX_BYTES = 5 * 1024 * 1024;
const ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024;
const THUMBNAIL_ALLOWED_EXTS = [".png", ".jpg", ".jpeg", ".webp"];
const ATTACHMENT_ALLOWED_EXTS = [
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
];

function hasAllowedExtension(fileName: string, allowed: string[]) {
  const lower = fileName.toLowerCase();
  return allowed.some((ext) => lower.endsWith(ext));
}

function formatMb(bytes: number) {
  return `${Math.round(bytes / 1024 / 1024)}MB`;
}

function isSameAttachment(file: File, target: { originalName: string; sizeBytes: number }) {
  return file.name === target.originalName && Number(file.size) === Number(target.sizeBytes);
}

function extensionOf(fileName: string) {
  const idx = fileName.lastIndexOf(".");
  return idx >= 0 ? fileName.slice(idx).toLowerCase() : "";
}

function AttachmentTypeIcon({ fileName }: { fileName: string }) {
  const ext = extensionOf(fileName);
  if ([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"].includes(ext)) {
    return <FileImage className="h-4 w-4 text-sky-600" aria-hidden="true" />;
  }
  if ([".zip", ".rar", ".7z", ".tar", ".gz"].includes(ext)) {
    return <FileArchive className="h-4 w-4 text-amber-600" aria-hidden="true" />;
  }
  if ([".pdf", ".txt", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".hwp", ".hwpx"].includes(ext)) {
    return <FileText className="h-4 w-4 text-emerald-700" aria-hidden="true" />;
  }
  return <File className="h-4 w-4 text-slate-600" aria-hidden="true" />;
}

function isImageFileName(fileName: string) {
  return [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"].includes(extensionOf(fileName));
}

function getApiBaseUrl() {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envBase && envBase.trim()) return envBase.replace(/\/+$/, "");
  if (typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "http://127.0.0.1:5002";
  }
  return "";
}

function toApiUrl(path: string) {
  const base = getApiBaseUrl();
  return base ? `${base}${path}` : path;
}

export default function BlogWrite() {
  const [, navigate] = useLocation();

  const searchParams = new URLSearchParams(window.location.search);
  const isEditMode = searchParams.get("mode") === "edit";
  const editIdRaw = Number(searchParams.get("id"));
  const editPostId = Number.isFinite(editIdRaw) && editIdRaw > 0 ? editIdRaw : null;

  const [category, setCategory] = useState<BlogCategory>("notice");
  const [title, setTitle] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [existingThumbnail, setExistingThumbnail] = useState<BlogAttachment | null>(null);
  const [existingAttachments, setExistingAttachments] = useState<BlogAttachment[]>([]);
  const [initialContent, setInitialContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [initializing, setInitializing] = useState(isEditMode);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);

  const editorRef = useRef<{ getHTML: () => string; setHTML: (html: string) => void; destroy: () => void } | null>(
    null
  );

  useEffect(() => {
    if (window.localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  useEffect(() => {
    let mounted = true;

    const ensureCss = () => {
      const existing = document.querySelector(`link[href="${TOAST_EDITOR_CSS}"]`);
      if (existing) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = TOAST_EDITOR_CSS;
      document.head.appendChild(link);
    };

    const initEditor = () => {
      if (!window.toastui?.Editor) return;
      const root = document.getElementById(EDITOR_ROOT_ID);
      if (!root) return;

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      const editor = new window.toastui.Editor({
        el: root,
        height: "460px",
        initialEditType: "wysiwyg",
        previewStyle: "vertical",
        toolbarItems: [
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ],
        hooks: {
          addImageBlobHook: async (blob: Blob, callback: (url: string, text?: string) => void) => {
            try {
              const fd = new FormData();
              fd.append("file", blob, `pasted-${Date.now()}.png`);
              const response = await fetch(toApiUrl("/api/blog/editor-image"), {
                method: "POST",
                body: fd,
                credentials: "include",
              });
              const payload = (await response.json()) as { location?: string; message?: string };
              if (!response.ok || !payload.location) {
                throw new Error(payload.message ?? "이미지 업로드 실패");
              }
              callback(toAssetUrl(payload.location), "image");
              toast.success("본문 이미지 업로드가 완료되었습니다.", { duration: 2200 });
            } catch (error) {
              toast.error(error instanceof Error ? error.message : "이미지 업로드 오류", { duration: 3500 });
            }
            return false;
          },
        },
      });

      editorRef.current = editor;
      if (mounted) setEditorReady(true);
    };

    ensureCss();
    if (window.toastui?.Editor) {
      initEditor();
    } else {
      const script = document.createElement("script");
      script.src = TOAST_EDITOR_SCRIPT;
      script.onload = initEditor;
      document.body.appendChild(script);
    }

    return () => {
      mounted = false;
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isEditMode || !editPostId) {
      setInitializing(false);
      return;
    }

    const postId = editPostId;
    let cancelled = false;

    async function loadForEdit() {
      try {
        const response = await fetchBlogDetail(postId);
        if (cancelled) return;

        if (!response.post) {
          window.alert("수정할 게시글을 찾을 수 없습니다.");
          navigate("/admin/blog");
          return;
        }

        setCategory(response.post.category);
        setTitle(response.post.title);
        setInitialContent(response.post.content ?? "");
        setExistingThumbnail(response.thumbnailAttachment ?? null);
        setExistingAttachments(Array.isArray(response.attachments) ? response.attachments : []);

        if (editorRef.current) {
          editorRef.current.setHTML(response.post.content ?? "");
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : "수정 데이터 불러오기에 실패했습니다.";
          window.alert(message);
          navigate("/admin/blog");
        }
      } finally {
        if (!cancelled) setInitializing(false);
      }
    }

    loadForEdit();
    return () => {
      cancelled = true;
    };
  }, [isEditMode, editPostId, navigate]);

  useEffect(() => {
    if (!editorRef.current || !isEditMode || initializing) return;
    editorRef.current.setHTML(initialContent || "");
  }, [isEditMode, initializing, initialContent]);

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreviewUrl(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [thumbnailFile]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected) {
      if (!hasAllowedExtension(selected.name, THUMBNAIL_ALLOWED_EXTS)) {
        toast.error(`대표이미지는 ${THUMBNAIL_ALLOWED_EXTS.join(", ")} 형식만 가능합니다.`, { duration: 4000 });
        e.currentTarget.value = "";
        return;
      }
      if (selected.size > THUMBNAIL_MAX_BYTES) {
        toast.error(`대표이미지는 최대 ${formatMb(THUMBNAIL_MAX_BYTES)}까지 업로드 가능합니다.`, { duration: 4000 });
        e.currentTarget.value = "";
        return;
      }
      toast.success(`대표이미지로 ${selected.name} 파일을 선택했습니다.`, { duration: 2200 });
    }
    setThumbnailFile(selected);
  };

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    const validSelected: File[] = [];
    const invalidMessages: string[] = [];
    const duplicateMessages: string[] = [];
    for (const file of selected) {
      if (!hasAllowedExtension(file.name, ATTACHMENT_ALLOWED_EXTS)) {
        invalidMessages.push(`형식 불가: ${file.name}`);
        continue;
      }
      if (file.size > ATTACHMENT_MAX_BYTES) {
        invalidMessages.push(`용량 초과: ${file.name} (최대 ${formatMb(ATTACHMENT_MAX_BYTES)})`);
        continue;
      }
      const duplicatedInExisting = existingAttachments.some((item) => isSameAttachment(file, item));
      if (duplicatedInExisting) {
        duplicateMessages.push(`기존 첨부와 중복: ${file.name}`);
        continue;
      }
      validSelected.push(file);
    }

    if (validSelected.length > 0) {
      setAttachmentFiles((prev) => {
        const merged = [...prev];
        for (const file of validSelected) {
          const exists = merged.some(
            (x) => x.name === file.name && x.size === file.size && x.lastModified === file.lastModified
          );
          if (!exists) merged.push(file);
        }
        return merged;
      });
      toast.success(`첨부파일 ${validSelected.length}개가 추가되었습니다.`, { duration: 2200 });
    }
    if (invalidMessages.length > 0) {
      toast.error(invalidMessages.join(" / "), { duration: 5000 });
    }
    if (duplicateMessages.length > 0) {
      toast.error(duplicateMessages.join(" / "), { duration: 4500 });
    }
    e.currentTarget.value = "";
  };

  const removeAttachmentAt = (targetIndex: number) => {
    setAttachmentFiles((prev) => prev.filter((_, idx) => idx !== targetIndex));
    toast("선택한 첨부파일을 제거했습니다.", { duration: 1800 });
  };

  const removeExistingAttachmentAt = (targetIndex: number) => {
    setExistingAttachments((prev) => prev.filter((_, idx) => idx !== targetIndex));
    toast("기존 첨부파일을 제거 대상으로 표시했습니다.", { duration: 2000 });
  };

  const appendImageToEditor = (imageUrl: string, altText: string) => {
    const editor = editorRef.current;
    if (!editor) {
      toast.error("에디터 준비가 완료된 뒤 다시 시도해주세요.", { duration: 3000 });
      return;
    }
    const current = editor.getHTML() ?? "";
    const safeAlt = altText.replace(/"/g, "&quot;");
    const next = `${current}\n<p><img src="${imageUrl}" alt="${safeAlt}" /></p>`;
    editor.setHTML(next);
    toast.success("본문에 이미지를 삽입했습니다.", { duration: 1800 });
  };

  const insertExistingAttachmentImage = (item: BlogAttachment) => {
    appendImageToEditor(toAssetUrl(item.fileUrl), item.originalName);
  };

  const insertNewAttachmentImage = async (file: File) => {
    try {
      const fd = new FormData();
      fd.append("file", file, file.name);
      const response = await fetch(toApiUrl("/api/blog/editor-image"), {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const payload = (await response.json()) as { location?: string; message?: string };
      if (!response.ok || !payload.location) {
        throw new Error(payload.message ?? "이미지 업로드 실패");
      }
      appendImageToEditor(toAssetUrl(payload.location), file.name);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "본문 삽입용 이미지 업로드 실패", { duration: 3500 });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = editorRef.current?.getHTML().trim() ?? "";
    const author = String(window.localStorage.getItem("adminDisplayName") ?? "관리자");

    if (!title.trim() || !content) {
      toast.error("필수 항목(카테고리, 제목, 내용)을 입력해주세요.", { duration: 3500 });
      return;
    }

    const fd = new FormData();
    fd.append("category", category);
    fd.append("title", title.trim());
    fd.append("content", content);
    fd.append("author", author);
    if (thumbnailFile) {
      fd.append("thumbnail", thumbnailFile);
    }
    attachmentFiles.forEach((file) => fd.append("attachments", file));
    if (isEditMode) {
      const keepAttachmentIds = existingAttachments.map((item) => item.id).join(",");
      fd.append("keep_attachment_ids", keepAttachmentIds);
    }

    try {
      setSubmitting(true);
      if (isEditMode && editPostId) {
        const shouldReplaceThumbnail = Boolean(thumbnailFile);
        const shouldReplaceAttachments = false;
        await updateBlogPost(editPostId, fd, shouldReplaceAttachments, shouldReplaceThumbnail);
        toast.success("블로그 글 수정을 완료했습니다. 목록으로 이동합니다.", { duration: 2200 });
      } else {
        await createBlogPost(fd);
        toast.success("블로그 글 작성을 완료했습니다. 목록으로 이동합니다.", { duration: 2200 });
      }
      window.setTimeout(() => navigate("/admin/blog"), 500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.";
      toast.error(message, { duration: 4500 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="blog-write" className="bg-white py-20 md:py-28">
      <Helmet>
        <title>{isEditMode ? "블로그 글 수정 | WAFF Admin" : "블로그 글 작성 | WAFF Admin"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container max-w-4xl">
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">{isEditMode ? "블로그 글 수정" : "블로그 글쓰기"}</h1>
          <div className="divider-modern mx-auto mb-6 w-24" />
        </div>

        {initializing ? <p className="mb-4 text-sm text-muted-foreground">수정 데이터를 불러오는 중...</p> : null}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-border/70 bg-background p-6 md:p-8"
        >
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              카테고리
              <span className="ml-1 text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value as BlogCategory)}
            >
              <option value="notice">공지사항</option>
              <option value="tech">기술</option>
              <option value="external">대외활동</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              제목
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="제목을 입력해주세요"
              className="placeholder:text-gray-400"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={EDITOR_ROOT_ID} className="text-sm font-medium">
              내용
              <span className="ml-1 text-red-500">*</span>
            </label>
            <div id={EDITOR_ROOT_ID} />
            {!editorReady ? <p className="text-xs text-muted-foreground">에디터를 불러오는 중...</p> : null}
            <p className="text-xs text-muted-foreground">
              이미지 버튼 또는 붙여넣기(Ctrl+V)로 본문 안에 이미지를 바로 넣을 수 있습니다.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="thumbnail" className="text-sm font-medium">
              대표이미지 (썸네일)
            </label>
            <Input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept={THUMBNAIL_ALLOWED_EXTS.join(",")}
              onChange={handleThumbnailChange}
            />
            <p className="text-xs text-muted-foreground">
              허용 형식: {THUMBNAIL_ALLOWED_EXTS.join(", ")} / 최대 {formatMb(THUMBNAIL_MAX_BYTES)}
            </p>
            {!thumbnailFile && existingThumbnail ? (
              <div className="rounded-md border border-border/70 bg-background p-3">
                <p className="mb-2 text-xs text-muted-foreground">현재 대표이미지</p>
                <img
                  src={toAssetUrl(existingThumbnail.fileUrl)}
                  alt={existingThumbnail.originalName}
                  className="h-40 w-full rounded-md object-contain bg-white"
                />
                <p className="mt-2 truncate text-xs text-muted-foreground">{existingThumbnail.originalName}</p>
              </div>
            ) : null}
            {thumbnailFile ? (
              <div className="rounded-md border border-border/70 bg-background p-3">
                <p className="mb-2 text-xs text-muted-foreground">새 대표이미지 미리보기</p>
                {thumbnailPreviewUrl ? (
                  <img src={thumbnailPreviewUrl} alt={thumbnailFile.name} className="h-40 w-full rounded-md object-contain bg-white" />
                ) : null}
                <div className="mt-2 flex items-center justify-between gap-3 text-xs text-muted-foreground">
                  <span className="truncate">{thumbnailFile.name}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 px-2"
                    onClick={() => setThumbnailFile(null)}
                  >
                    제거
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="attachments" className="text-sm font-medium">
              첨부파일 (여러 개 가능)
            </label>
            <Input id="attachments" name="attachments" type="file" multiple onChange={handleAttachmentChange} />
            <p className="text-xs text-muted-foreground">
              허용 형식: {ATTACHMENT_ALLOWED_EXTS.join(", ")} / 파일당 최대 {formatMb(ATTACHMENT_MAX_BYTES)}
            </p>
            <p className="text-xs text-muted-foreground">파일 선택을 여러 번 해도 누적됩니다.</p>
          </div>

          {existingAttachments.length > 0 || attachmentFiles.length > 0 ? (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">현재 첨부 목록</p>
              <ul className="space-y-2">
                {existingAttachments.map((item, idx) => (
                  <li
                    key={`existing-${item.id}`}
                    className="flex items-center justify-between gap-4 rounded-md border border-border/70 bg-background px-3 py-2 text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <AttachmentTypeIcon fileName={item.originalName} />
                      <span className="truncate">{item.originalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 rounded bg-slate-200 px-2 py-0.5 text-[11px] text-slate-700">기존</span>
                      {isImageFileName(item.originalName) ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => insertExistingAttachmentImage(item)}
                          title="본문에 이미지 삽입"
                        >
                          <ImagePlus className="mr-1 h-3.5 w-3.5" />
                          삽입
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => removeExistingAttachmentAt(idx)}
                        aria-label={`${item.originalName} 기존 첨부 취소`}
                        title="기존 첨부 취소"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
                {attachmentFiles.map((file, idx) => (
                  <li
                    key={`new-${file.name}-${idx}`}
                    className="flex items-center justify-between gap-4 rounded-md border border-border/70 bg-background px-3 py-2 text-sm"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <AttachmentTypeIcon fileName={file.name} />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 rounded bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">새 파일</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</span>
                      {isImageFileName(file.name) ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => void insertNewAttachmentImage(file)}
                          title="본문에 이미지 삽입"
                        >
                          <ImagePlus className="mr-1 h-3.5 w-3.5" />
                          삽입
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => removeAttachmentAt(idx)}
                        aria-label={`${file.name} 첨부 취소`}
                        title="첨부 취소"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-muted-foreground">목록에서 X를 누르면 해당 파일이 제출 대상에서 제외됩니다.</p>
            </div>
          ) : null}

          <div className="flex justify-end gap-3 pt-2">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/admin/blog">취소</Link>
            </Button>
            <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]" disabled={submitting}>
              {submitting ? "저장 중..." : isEditMode ? "수정완료" : "작성완료"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
