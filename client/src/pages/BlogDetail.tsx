import { Button } from "@/components/ui/button";
import {
  blogCategoryLabel,
  deleteBlogPost,
  fetchBlogDetail,
  getAttachmentDownloadUrl,
  toAssetUrl,
  type BlogAttachment,
  type BlogPost,
} from "@/lib/blogApi";
import { ChevronDownIcon, ChevronUpIcon, File, FileArchive, FileImage, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useRoute } from "wouter";

type NeighborPost = { id: number; title: string } | null;
const SITE_URL = "https://www.waff.co.kr";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logos/logoKR.png`;

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(text: string, max = 140) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function toAbsoluteUrl(url: string) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
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

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const [, navigate] = useLocation();
  const isAdmin = typeof window !== "undefined" && window.localStorage.getItem("isAdmin") === "true";
  const listHref = isAdmin ? "/admin/blog" : "/blog";
  const postId = Number(params?.id);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<NeighborPost>(null);
  const [nextPost, setNextPost] = useState<NeighborPost>(null);
  const [attachments, setAttachments] = useState<BlogAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canonicalUrl = Number.isFinite(postId) && postId > 0 ? `${SITE_URL}/blog/${postId}` : `${SITE_URL}/blog`;
  const pageTitle = post ? `${post.title} | WAFF 블로그` : "블로그 상세 | WAFF";
  const pageDesc = post
    ? truncate(stripHtml(post.content) || `${blogCategoryLabel[post.category]} 게시글입니다.`)
    : "WAFF 블로그 상세 게시글 페이지입니다.";
  const ogImage = post?.imageUrl ? toAbsoluteUrl(toAssetUrl(post.imageUrl)) : DEFAULT_OG_IMAGE;

  useEffect(() => {
    if (!Number.isFinite(postId) || postId <= 0) {
      setLoading(false);
      setError("잘못된 게시글입니다.");
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBlogDetail(postId);
        if (!cancelled) {
          setPost(response.post ?? null);
          setPrevPost(response.prevPost ?? null);
          setNextPost(response.nextPost ?? null);
          setAttachments(Array.isArray(response.attachments) ? response.attachments : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "게시글을 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (loading) {
    return (
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <Helmet>
          <title>블로그 상세 | WAFF</title>
          <meta name="description" content="WAFF 블로그 상세 게시글을 불러오는 중입니다." />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,80,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,200,.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
          />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (!post || error) {
    return (
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <Helmet>
          <title>게시글을 찾을 수 없습니다 | WAFF 블로그</title>
          <meta name="description" content={error ?? "요청하신 게시글을 찾을 수 없습니다."} />
          <link rel="canonical" href={canonicalUrl} />
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,80,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,200,.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div
            className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
          />
        </div>
        <div className="container relative z-10 max-w-4xl">
          <div className="rounded-lg border border-border/70 bg-background p-8 text-center">
            <p className="text-lg font-semibold">{error ?? "게시글을 찾을 수 없습니다."}</p>
            <div className="mt-6">
              <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                <Link href={listHref}>목록으로</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBlogPost(post.id);
      window.alert("게시글을 삭제했습니다.");
      navigate("/admin/blog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.";
      window.alert(message);
    }
  };

  return (
    <section id="blog-detail" className="relative overflow-hidden bg-white py-20 md:py-28">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogImage} />
        {isAdmin ? <meta name="robots" content="noindex, nofollow" /> : null}
      </Helmet>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,80,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,200,.04) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
        />
      </div>
      <div className="container relative z-10 max-w-4xl">
        <div className="rounded-lg border-2 border-[#7d8ca8] bg-background p-6 md:p-8">
          <p className="text-sm font-semibold text-[#0b1f4d]">{blogCategoryLabel[post.category]}</p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>작성자: {post.author}</span>
            <span>작성일: {post.date}</span>
            <span>조회: {post.views}</span>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="mt-6 rounded-lg border border-[#d6dce8] bg-[#fbfcff] p-5 shadow-sm md:p-6">
            <div
              className="prose prose-base max-w-none text-[15px] leading-8 text-[#111827] prose-headings:text-[#0b1f4d] prose-p:my-4 prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {attachments.length > 0 ? (
            <div className="mt-6 rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">첨부파일</p>
              <ul className="space-y-2">
                {attachments.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-md border border-border/70 bg-background px-3 py-2"
                  >
                    <a
                      href={getAttachmentDownloadUrl(item.id)}
                      className="flex min-w-0 items-center gap-2 text-sm text-[#0b1f4d] underline underline-offset-2 hover:text-[#13357a]"
                    >
                      <AttachmentTypeIcon fileName={item.originalName} />
                      <span className="truncate">{item.originalName}</span>
                    </a>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {Math.max(1, Math.round(item.sizeBytes / 1024))} KB
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 rounded-md border border-border bg-white">
            <div className="flex items-center border-b border-border px-4 py-3 transition-colors hover:bg-muted/40">
              <span className="inline-flex w-20 shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground">
                <ChevronUpIcon className="size-4" />
                이전글
              </span>
              {prevPost ? (
                <Link href={`/blog/${prevPost.id}`} className="text-sm hover:text-primary hover:underline">
                  {prevPost.title}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">이전 글이 없습니다.</span>
              )}
            </div>
            <div className="flex items-center px-4 py-3 transition-colors hover:bg-muted/40">
              <span className="inline-flex w-20 shrink-0 items-center gap-1 text-sm font-medium text-muted-foreground">
                <ChevronDownIcon className="size-4" />
                다음글
              </span>
              {nextPost ? (
                <Link href={`/blog/${nextPost.id}`} className="text-sm hover:text-primary hover:underline">
                  {nextPost.title}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">다음 글이 없습니다.</span>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-2">
            {isAdmin ? (
              <>
                <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                  <Link href={`/admin/blog/write?mode=edit&id=${post.id}`}>수정</Link>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </>
            ) : null}
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href={listHref}>목록으로</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
