export type BlogCategory = "notice" | "external" | "tech";

export type BlogPost = {
  id: number;
  category: BlogCategory;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  imageUrl: string;
  isFeatured: boolean;
};

export type BlogAttachment = {
  id: number;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  fileUrl: string;
  isThumbnail: boolean;
};

export const blogCategoryLabel: Record<BlogCategory, string> = {
  notice: "공지사항",
  external: "대외활동",
  tech: "기술",
};

const inferredLocalBase =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://127.0.0.1:5002"
    : "";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? inferredLocalBase).replace(/\/+$/, "");

function toApiUrl(path: string) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

export function toAssetUrl(url: string) {
  if (!url) return "";
  const normalized = String(url).trim().toLowerCase();
  if (normalized === "null" || normalized === "none") return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return toApiUrl(url);
  return url;
}

export function getAttachmentDownloadUrl(attachmentId: number) {
  return toApiUrl(`/api/blog/attachments/${attachmentId}/download`);
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(toApiUrl(path), {
    credentials: "include",
    ...init,
  });

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    // keep null
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: unknown }).message ?? "request failed")
        : `request failed (${response.status})`;
    throw new Error(message);
  }

  if (!payload || typeof payload !== "object") {
    throw new Error("invalid api response");
  }

  return payload as T;
}

export async function fetchBlogHome() {
  return requestJson<{ ok: boolean; items?: BlogPost[] }>("/api/blog/home");
}

export async function fetchBlogCategory(category: BlogCategory, page = 1, pageSize = 6) {
  const q = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  return requestJson<{
    ok: boolean;
    category: BlogCategory;
    items?: BlogPost[];
    page: number;
    pageSize: number;
    totalCount?: number;
    totalPages?: number;
  }>(`/api/blog/category/${category}?${q.toString()}`);
}

export async function fetchBlogDetail(postId: number) {
  return requestJson<{
    ok: boolean;
    post?: BlogPost;
    prevPost?: { id: number; title: string } | null;
    nextPost?: { id: number; title: string } | null;
    attachments?: BlogAttachment[];
  }>(`/api/blog/${postId}`);
}

export async function createBlogPost(formData: FormData) {
  return requestJson<{ ok: boolean; id: number }>("/api/blog", {
    method: "POST",
    body: formData,
  });
}

export async function updateBlogPost(postId: number, formData: FormData, replaceAttachments = false) {
  formData.set("replace_attachments", replaceAttachments ? "true" : "false");
  return requestJson<{ ok: boolean; id: number }>(`/api/blog/${postId}`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteBlogPost(postId: number) {
  return requestJson<{ ok: boolean }>(`/api/blog/${postId}`, {
    method: "DELETE",
  });
}
