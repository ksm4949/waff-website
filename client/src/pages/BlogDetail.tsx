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
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useRoute } from "wouter";

type NeighborPost = { id: number; title: string } | null;
type HeadingNavItem = { id: string; text: string };
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

function slugifyHeadingText(value: string) {
  const lowered = value.toLowerCase().trim();
  const compact = lowered.replace(/\s+/g, "-").replace(/[^a-z0-9\-_가-힣]/g, "");
  return compact || "section";
}

function buildDetailContentWithHeadingNav(html: string): { html: string; headings: HeadingNavItem[] } {
  if (!html.trim()) return { html, headings: [] };
  if (typeof DOMParser === "undefined") return { html, headings: [] };

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="blog-detail-content-root">${html}</div>`, "text/html");
  const root = doc.getElementById("blog-detail-content-root");
  if (!root) return { html, headings: [] };

  const headings: HeadingNavItem[] = [];
  const idCounts = new Map<string, number>();
  const h2List = Array.from(root.querySelectorAll("h2"));

  h2List.forEach((node, index) => {
    const text = (node.textContent ?? "").trim() || `섹션 ${index + 1}`;
    const base = slugifyHeadingText(text);
    const seen = idCounts.get(base) ?? 0;
    idCounts.set(base, seen + 1);
    const nextId = seen > 0 ? `${base}-${seen + 1}` : base;
    node.id = node.id || `h2-${nextId}`;
    node.setAttribute("data-blog-h2-anchor", "true");
    headings.push({ id: node.id, text });
  });

  return { html: root.innerHTML, headings };
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
  const blogHomeHref = isAdmin ? "/admin/blog" : "/blog";
  const postId = Number(params?.id);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<NeighborPost>(null);
  const [nextPost, setNextPost] = useState<NeighborPost>(null);
  const [attachments, setAttachments] = useState<BlogAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeHeadingId, setActiveHeadingId] = useState("");
  const canonicalUrl = Number.isFinite(postId) && postId > 0 ? `${SITE_URL}/blog/${postId}` : `${SITE_URL}/blog`;
  const pageTitle = post ? `${post.title} | WAFF 블로그` : "블로그 상세 | WAFF";
  const pageDesc = post
    ? truncate(stripHtml(post.content) || `${blogCategoryLabel[post.category]} 게시글입니다.`)
    : "WAFF 블로그 상세 게시글 페이지입니다.";
  const ogImage = post?.imageUrl ? toAbsoluteUrl(toAssetUrl(post.imageUrl)) : DEFAULT_OG_IMAGE;
  const categoryListHref = post
    ? isAdmin
      ? `/admin/blog/category/${post.category}`
      : `/blog/category/${post.category}`
    : blogHomeHref;
  const detailContent = useMemo(() => buildDetailContentWithHeadingNav(post?.content ?? ""), [post?.content]);

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

  useEffect(() => {
    const headings = detailContent.headings;
    if (headings.length === 0) {
      setActiveHeadingId("");
      return;
    }

    const resolveActiveHeading = () => {
      let currentId = headings[0]?.id ?? "";
      for (const item of headings) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 170) {
          currentId = item.id;
        } else {
          break;
        }
      }
      setActiveHeadingId((prev) => (prev === currentId ? prev : currentId));
    };

    resolveActiveHeading();
    window.addEventListener("scroll", resolveActiveHeading, { passive: true });
    window.addEventListener("resize", resolveActiveHeading);
    return () => {
      window.removeEventListener("scroll", resolveActiveHeading);
      window.removeEventListener("resize", resolveActiveHeading);
    };
  }, [detailContent.headings]);

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
                <Link href={blogHomeHref}>목록으로</Link>
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

  const handleNavigateHeading = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    setActiveHeadingId(id);
    const y = target.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="blog-detail" className="relative bg-white py-20 md:py-28">
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
      <div className="container relative z-10 max-w-7xl">
        <div className="mx-auto flex max-w-[1240px] gap-8 lg:items-start">
          <div className="min-w-0 flex-1 lg:max-w-4xl">
            <div className="rounded-lg border-2 border-[#7d8ca8] bg-background p-6 md:p-8">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <Link href={blogHomeHref} className="hover:underline">
                  블로그
                </Link>
                <span className="text-[#7d8ca8]">&gt;</span>
                <Link href={categoryListHref} className="hover:underline">
                  {blogCategoryLabel[post.category]}
                </Link>
              </div>
              <h1 className="mt-2 text-2xl font-bold md:text-3xl">{post.title}</h1>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <span>작성자: {post.author}</span>
                  <span>작성일: {post.date}</span>
                  <span>조회: {post.views}</span>
                </div>
                <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                  <Link href={categoryListHref}>목록으로</Link>
                </Button>
              </div>

              <div className="my-6 h-px bg-border" />

              {detailContent.headings.length > 0 ? (
                <div className="mt-6 rounded-lg border border-[#d6dce8] bg-white p-4 md:p-5 lg:hidden">
                  <ul className="border-l-2 border-[#cfd8ea]">
                    {detailContent.headings.map((item) => (
                      <li key={item.id} className="relative">
                        {activeHeadingId === item.id ? (
                          <span className="pointer-events-none absolute -left-[3px] top-0 h-full w-[4px] rounded-full bg-primary" />
                        ) : null}
                        <button
                          type="button"
                          className={`block w-full py-2 pl-4 text-left text-sm transition ${
                            activeHeadingId === item.id
                              ? "font-semibold text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          onClick={() => handleNavigateHeading(item.id)}
                        >
                          {item.text}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-foreground transition hover:text-primary"
                      onClick={handleScrollToTop}
                    >
                      <ChevronUpIcon className="h-4 w-4" />
                      <span>TOP</span>
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="mt-6 rounded-lg border border-[#d6dce8] bg-[#fbfcff] p-5 shadow-sm md:p-6">
                <div
                  className="prose prose-base max-w-none text-[15px] leading-8 text-[#111827] prose-headings:text-[#0b1f4d] prose-p:my-4 prose-li:my-1 [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:leading-tight [&_h2]:mt-5 [&_h2]:mb-2 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-2xl [&_h3]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: detailContent.html }}
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
                  <Link href={categoryListHref}>목록으로</Link>
                </Button>
              </div>
            </div>
          </div>

          {detailContent.headings.length > 0 ? (
            <aside className="hidden w-72 shrink-0 self-start lg:sticky lg:top-[32vh] lg:block">
              <div className="rounded-lg border border-[#d6dce8] bg-white p-4 shadow-sm">
                <ul className="border-l-2 border-[#cfd8ea]">
                  {detailContent.headings.map((item) => (
                    <li key={`aside-${item.id}`} className="relative">
                      {activeHeadingId === item.id ? (
                        <span className="pointer-events-none absolute -left-[3px] top-0 h-full w-[4px] rounded-full bg-primary" />
                      ) : null}
                      <button
                        type="button"
                        className={`block w-full py-2 pl-4 text-left text-sm transition ${
                          activeHeadingId === item.id
                            ? "font-semibold text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        onClick={() => handleNavigateHeading(item.id)}
                      >
                        {item.text}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1 text-sm font-semibold text-foreground transition hover:text-primary"
                    onClick={handleScrollToTop}
                  >
                    <ChevronUpIcon className="h-4 w-4" />
                    <span>TOP</span>
                  </button>
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}
