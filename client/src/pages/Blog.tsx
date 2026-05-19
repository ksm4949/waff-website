import { Button } from "@/components/ui/button";
import {
  blogCategoryLabel,
  deleteBlogPost,
  fetchBlogHome,
  toAssetUrl,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blogApi";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";

const BLOG_FALLBACK_IMAGE = "/images/logos/logoKR.png";
const SITE_URL = "https://www.waff.co.kr";

function toExcerptText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function BlogCard({
  id,
  imageUrl,
  categoryLabel,
  title,
  content,
  date,
  adminMode = false,
  onDelete,
  compact = false,
}: {
  id: number;
  imageUrl: string;
  categoryLabel: string;
  title: string;
  content: string;
  date: string;
  adminMode?: boolean;
  onDelete?: (id: number) => void;
  compact?: boolean;
}) {
  const hasImage = Boolean(imageUrl);
  const displayImage = hasImage ? toAssetUrl(imageUrl) : BLOG_FALLBACK_IMAGE;
  const excerpt = truncateText(toExcerptText(content), compact ? 56 : 92);

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[#7d8ca8] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#0b1f4d] hover:shadow-[0_12px_30px_rgba(11,31,77,0.18)] focus-within:-translate-y-1 focus-within:border-[#0b1f4d] focus-within:shadow-[0_12px_30px_rgba(11,31,77,0.18)]">
      <Link href={`/blog/${id}`} className="block h-[40%] overflow-hidden bg-[#eef1f6]">
        <div className="h-full overflow-hidden bg-[#eef1f6]">
          {hasImage ? (
            <div className="relative h-full w-full">
              <img
                src={displayImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full scale-110 object-cover blur-md opacity-50"
              />
              <img
                src={displayImage}
                alt={title}
                className="relative z-10 h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : (
            <img src={displayImage} alt={title} className="h-full w-full object-contain p-8" />
          )}
        </div>
      </Link>
      <div className={`${compact ? "h-[60%] p-3" : "h-[60%] p-4 md:p-5"} flex flex-col gap-2`}>
        <Link href={`/blog/${id}`} className="contents">
          <p className="text-xs font-semibold text-[#0b1f4d]">{categoryLabel}</p>
          <h3
            className={`${
              compact ? "min-h-[1.5rem] line-clamp-1 text-base leading-[1.3]" : "h-[3rem] line-clamp-2 text-lg leading-[1.3]"
            } shrink-0 overflow-hidden break-words font-bold`}
          >
            {title}
          </h3>
          <p
            className={`${
              compact ? "line-clamp-2 flex-1 text-xs leading-[1.45]" : "flex-1 text-sm leading-[1.5]"
            } break-words text-muted-foreground`}
          >
            {excerpt}
          </p>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">{date}</p>
          {adminMode ? (
            <div className="flex items-center gap-1">
              <Button
                asChild
                type="button"
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full border-[#9fc3f7] bg-white text-[#1f6fd9] hover:bg-[#eef5ff] hover:text-[#0b4fb0]"
              >
                <Link href={`/admin/blog/write?mode=edit&id=${id}`} aria-label="수정">
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full border-red-200 bg-white text-red-600 hover:bg-red-50 hover:text-red-700"
                onClick={() => onDelete?.(id)}
                aria-label="삭제"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>

    </div>
  );
}

function EmptyBlogCard({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-dashed border-[#9aa8c2] bg-white">
      <div className="h-[40%] bg-[#f3f6fb]" />
      <div className={`${compact ? "p-3" : "p-4 md:p-5"} flex h-[60%] flex-col gap-2`}>
        <p className="text-xs font-semibold text-[#5b6b88]">안내</p>
        <h3
          className={`${
            compact ? "min-h-[1.5rem] line-clamp-1 text-base leading-[1.3]" : "h-[3rem] line-clamp-2 text-lg leading-[1.3]"
          } shrink-0 overflow-hidden break-words font-bold text-[#314160]`}
        >
          게시물이 존재하지 않습니다.
        </h3>
        <p className={`${compact ? "flex-1 text-xs leading-[1.45]" : "flex-1 text-sm leading-[1.5]"} text-muted-foreground`}>
          곧 새로운 소식이 등록될 예정입니다.
        </p>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  posts,
  adminMode,
  onDelete,
}: {
  category: BlogCategory;
  posts: BlogPost[];
  adminMode: boolean;
  onDelete: (id: number) => void;
}) {
  const moreHref = adminMode ? `/admin/blog/category/${category}` : `/blog/category/${category}`;
  const displayPosts = posts.slice(0, 3);
  const sectionId = `blog-section-${category}`;
  const firstPost = displayPosts[0];
  const secondPost = displayPosts[1];
  const thirdPost = displayPosts[2];

  return (
    <div id={sectionId} className="scroll-mt-28 xl:px-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="inline-block border-b-2 border-[#f2c300] pb-0.5 text-2xl font-bold text-[#0b1f4d]">
          {blogCategoryLabel[category]}
        </h2>
        <Button asChild type="button" variant="outline" className="bg-white">
          <Link href={moreHref}>더보기</Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-stretch">
        <div className="md:h-[30rem]">
          {firstPost ? (
            <BlogCard
              id={firstPost.id}
              imageUrl={firstPost.imageUrl}
              categoryLabel={blogCategoryLabel[category]}
              title={firstPost.title}
              content={firstPost.content}
              date={firstPost.date}
              adminMode={adminMode}
              onDelete={onDelete}
            />
          ) : (
            <EmptyBlogCard />
          )}
        </div>
        <div className="grid min-h-0 gap-4 md:h-[30rem] md:grid-rows-2">
          <div className="min-h-0 h-full">
            {secondPost ? (
              <BlogCard
                id={secondPost.id}
                imageUrl={secondPost.imageUrl}
                categoryLabel={blogCategoryLabel[category]}
                title={secondPost.title}
                content={secondPost.content}
                date={secondPost.date}
                adminMode={adminMode}
                onDelete={onDelete}
                compact
              />
            ) : (
              <EmptyBlogCard compact />
            )}
          </div>
          <div className="min-h-0 h-full">
            {thirdPost ? (
              <BlogCard
                id={thirdPost.id}
                imageUrl={thirdPost.imageUrl}
                categoryLabel={blogCategoryLabel[category]}
                title={thirdPost.title}
                content={thirdPost.content}
                date={thirdPost.date}
                adminMode={adminMode}
                onDelete={onDelete}
                compact
              />
            ) : (
              <EmptyBlogCard compact />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog({ adminMode = false }: { adminMode?: boolean }) {
  const [, navigate] = useLocation();
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);
  const [refreshToken, setRefreshToken] = useState(() => window.sessionStorage.getItem("blogListRefreshToken") ?? "");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBlogHome();
        if (!cancelled) {
          setItems(Array.isArray(response.items) ? response.items : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "블로그 데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [refreshToken]);

  useEffect(() => {
    const syncRefreshToken = () => {
      setRefreshToken(window.sessionStorage.getItem("blogListRefreshToken") ?? "");
    };

    syncRefreshToken();
    window.addEventListener("focus", syncRefreshToken);
    window.addEventListener("pageshow", syncRefreshToken);
    return () => {
      window.removeEventListener("focus", syncRefreshToken);
      window.removeEventListener("pageshow", syncRefreshToken);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 320);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const noticePosts = useMemo(() => items.filter((x) => x.category === "notice"), [items]);
  const externalPosts = useMemo(() => items.filter((x) => x.category === "external"), [items]);
  const techPosts = useMemo(() => items.filter((x) => x.category === "tech"), [items]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBlogPost(id);
      const response = await fetchBlogHome();
      setItems(Array.isArray(response.items) ? response.items : []);
      window.alert("게시글을 삭제했습니다.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.";
      window.alert(message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("adminUser");
    window.localStorage.removeItem("adminDisplayName");
    window.localStorage.removeItem("adminUsername");
    window.localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section id="blog" className="relative overflow-hidden bg-white py-20 md:py-28">
      <Helmet>
        <title>블로그 | WAFF</title>
        <meta
          name="description"
          content="WAFF 블로그에서 공지사항, 대외활동, 기술 콘텐츠를 확인해보세요."
        />
        <link rel="canonical" href={`${SITE_URL}/blog`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="블로그 | WAFF" />
        <meta
          property="og:description"
          content="WAFF 블로그에서 공지사항, 대외활동, 기술 콘텐츠를 확인해보세요."
        />
        <meta property="og:url" content={`${SITE_URL}/blog`} />
        <meta property="og:image" content={`${SITE_URL}/images/logos/logoKR.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="블로그 | WAFF" />
        <meta
          name="twitter:description"
          content="WAFF 블로그에서 공지사항, 대외활동, 기술 콘텐츠를 확인해보세요."
        />
        <meta name="twitter:image" content={`${SITE_URL}/images/logos/logoKR.png`} />
        {adminMode ? <meta name="robots" content="noindex, nofollow" /> : null}
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
      <div className="container relative z-10 space-y-16">
        <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-[#cfd8ea] bg-[#eff1f5] px-8 py-10 shadow-[0_14px_26px_-18px_rgba(11,31,77,0.45)] md:px-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1f4d] md:text-4xl">블로그</h1>
            <p className="mt-3 text-muted-foreground">공지사항, 대외활동, 기술 블로그 소식을 확인해보세요.</p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="flex min-h-9 flex-wrap justify-end gap-2">
              {adminMode ? (
                <>
                  <Button asChild className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
                    <Link href="/admin/blog/write">새 글 작성</Link>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLogout}
                    className="bg-white hover:bg-gray-100"
                  >
                    로그아웃
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {loading ? <p className="text-sm text-muted-foreground">불러오는 중...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-0 xl:divide-x xl:divide-[#b9c5db]">
            <CategorySection category="notice" posts={noticePosts} adminMode={adminMode} onDelete={handleDelete} />
            <CategorySection category="external" posts={externalPosts} adminMode={adminMode} onDelete={handleDelete} />
            <CategorySection category="tech" posts={techPosts} adminMode={adminMode} onDelete={handleDelete} />
          </div>
        ) : null}
      </div>
      {showTopButton ? (
        <button
          type="button"
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="맨 위로 이동"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      ) : null}
    </section>
  );
}
