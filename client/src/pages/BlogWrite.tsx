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
import { useEffect, useMemo, useRef, useState } from "react";
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
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnailIndex, setThumbnailIndex] = useState<number>(-1);
  const [replaceAttachments, setReplaceAttachments] = useState(false);
  const [existingAttachments, setExistingAttachments] = useState<BlogAttachment[]>([]);
  const [initialContent, setInitialContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [editorReady, setEditorReady] = useState(false);
  const [initializing, setInitializing] = useState(isEditMode);

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
            } catch (error) {
              window.alert(error instanceof Error ? error.message : "이미지 업로드 오류");
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

  const imageCandidates = useMemo(
    () => files.map((f, idx) => ({ idx, file: f })).filter(({ file }) => file.type.startsWith("image/")),
    [files]
  );
  const hasExistingThumbnail = existingAttachments.some((item) => item.isThumbnail);
  const noThumbnailOptionLabel =
    isEditMode && !replaceAttachments
      ? hasExistingThumbnail
        ? "기존 대표이미지 유지"
        : "대표이미지 변경 안함"
      : "대표이미지 사용 안함";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    setThumbnailIndex(-1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const content = editorRef.current?.getHTML().trim() ?? "";
    const author = String(window.localStorage.getItem("adminUser") ?? "관리자");

    if (!title.trim() || !content) {
      window.alert("필수 항목(카테고리, 제목, 내용)을 입력해주세요.");
      return;
    }

    const fd = new FormData();
    fd.append("category", category);
    fd.append("title", title.trim());
    fd.append("content", content);
    fd.append("author", author);
    fd.append("thumbnail_index", String(thumbnailIndex));
    files.forEach((file) => fd.append("files", file));

    try {
      setSubmitting(true);
      if (isEditMode && editPostId) {
        await updateBlogPost(editPostId, fd, replaceAttachments);
        window.alert("블로그 글 수정을 완료했습니다.");
      } else {
        await createBlogPost(fd);
        window.alert("블로그 글 작성을 완료했습니다.");
      }
      navigate("/admin/blog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "저장 중 오류가 발생했습니다.";
      window.alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="blog-write" className="bg-white py-20 md:py-28">
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

          {isEditMode && existingAttachments.length > 0 ? (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">기존 첨부파일</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {existingAttachments.map((item) => (
                  <li key={item.id}>{item.originalName}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {isEditMode ? (
            <div className="rounded-md border border-border bg-white p-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={replaceAttachments}
                  onChange={(e) => setReplaceAttachments(e.target.checked)}
                />
                기존 첨부파일을 모두 지우고 새 파일로 교체
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                체크하지 않으면 새 파일은 기존 첨부에 추가됩니다.
              </p>
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="files" className="text-sm font-medium">
              첨부파일 (여러 개 가능)
            </label>
            <Input id="files" name="files" type="file" multiple onChange={handleFileChange} />
            <p className="text-xs text-muted-foreground">이미지/문서 등 여러 파일을 등록할 수 있습니다.</p>
          </div>

          {files.length > 0 ? (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">선택한 새 파일</p>
              <ul className="space-y-2">
                {files.map((file, idx) => (
                  <li key={`${file.name}-${idx}`} className="flex items-center justify-between gap-4 text-sm">
                    <span className="truncate">{file.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{Math.round(file.size / 1024)} KB</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {imageCandidates.length > 0 ? (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">카드 대표 이미지 선택 (1개)</p>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="thumbnail-choice"
                    checked={thumbnailIndex === -1}
                    onChange={() => setThumbnailIndex(-1)}
                  />
                  {noThumbnailOptionLabel}
                </label>
                {imageCandidates.map(({ idx, file }) => (
                  <label key={`thumb-${idx}`} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="thumbnail-choice"
                      checked={thumbnailIndex === idx}
                      onChange={() => setThumbnailIndex(idx)}
                    />
                    {file.name}
                  </label>
                ))}
              </div>
              {isEditMode && !replaceAttachments ? (
                <p className="mt-2 text-xs text-muted-foreground">
                  선택하지 않으면 기존 대표이미지를 그대로 유지합니다.
                </p>
              ) : null}
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
