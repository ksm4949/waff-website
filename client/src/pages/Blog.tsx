import { Button } from "@/components/ui/button";
import {
  blogCategoryLabel,
  deleteBlogPost,
  fetchBlogHome,
  toAssetUrl,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blogApi";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "wouter";

const BLOG_FALLBACK_IMAGE = "/images/logos/logoKR.png";
const SITE_URL = "https://www.waff.co.kr";

function toExcerptText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
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
}: {
  id: number;
  imageUrl: string;
  categoryLabel: string;
  title: string;
  content: string;
  date: string;
  adminMode?: boolean;
  onDelete?: (id: number) => void;
}) {
  const hasImage = Boolean(imageUrl);
  const displayImage = hasImage ? toAssetUrl(imageUrl) : BLOG_FALLBACK_IMAGE;

  return (
    <div className="group overflow-hidden rounded-xl border border-[#7d8ca8] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#0b1f4d] hover:shadow-[0_12px_30px_rgba(11,31,77,0.18)] focus-within:-translate-y-1 focus-within:border-[#0b1f4d] focus-within:shadow-[0_12px_30px_rgba(11,31,77,0.18)]">
      <Link href={`/blog/${id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-[#eef1f6]">
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
        <div className="space-y-3 p-4 md:p-5">
          <p className="text-xs font-semibold text-[#0b1f4d]">{categoryLabel}</p>
          <h3 className="line-clamp-2 text-lg font-bold leading-snug">{title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{toExcerptText(content)}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </Link>

      {adminMode ? (
        <div className="flex items-center justify-end gap-2 border-t border-border/60 px-4 py-3 md:px-5">
          <Button asChild type="button" variant="outline" size="sm">
            <Link href={`/admin/blog/write?mode=edit&id=${id}`}>수정</Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => onDelete?.(id)}
          >
            삭제
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function EmptyBlogCard() {
  return (
    <div className="overflow-hidden rounded-xl border border-dashed border-[#9aa8c2] bg-white">
      <div className="aspect-[16/10] bg-[#f3f6fb]" />
      <div className="space-y-3 p-4 md:p-5">
        <p className="text-xs font-semibold text-[#5b6b88]">안내</p>
        <h3 className="text-lg font-bold leading-snug text-[#314160]">게시물이 존재하지 않습니다.</h3>
        <p className="text-sm text-muted-foreground">곧 새로운 소식이 등록될 예정입니다.</p>
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
  const emptyCount = Math.max(0, 3 - displayPosts.length);
  const sectionId = `blog-section-${category}`;

  return (
    <div id={sectionId} className="scroll-mt-28 space-y-5">
      <div>
        <h2 className="inline-block border-b-2 border-[#f2c300] pb-0.5 text-2xl font-bold text-[#0b1f4d]">
          {blogCategoryLabel[category]}
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {displayPosts.map((post) => (
          <BlogCard
            key={`${category}-${post.id}`}
            id={post.id}
            imageUrl={post.imageUrl}
            categoryLabel={blogCategoryLabel[category]}
            title={post.title}
            content={post.content}
            date={post.date}
            adminMode={adminMode}
            onDelete={onDelete}
          />
        ))}
        {Array.from({ length: emptyCount }).map((_, idx) => (
          <EmptyBlogCard key={`${category}-empty-${idx}`} />
        ))}
      </div>
      <div className="flex justify-center">
        <Button asChild type="button" variant="outline">
          <Link href={moreHref}>더보기</Link>
        </Button>
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

  const handleScrollToCategory = (category: BlogCategory) => {
    const target = document.getElementById(`blog-section-${category}`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
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
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-8 rounded-full border-[#b9c5db] bg-white px-3 text-xs text-[#0b1f4d] hover:bg-[#f2f5fb]"
                onClick={() => handleScrollToCategory("notice")}
              >
                공지사항
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-8 rounded-full border-[#b9c5db] bg-white px-3 text-xs text-[#0b1f4d] hover:bg-[#f2f5fb]"
                onClick={() => handleScrollToCategory("external")}
              >
                대외활동
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-8 rounded-full border-[#b9c5db] bg-white px-3 text-xs text-[#0b1f4d] hover:bg-[#f2f5fb]"
                onClick={() => handleScrollToCategory("tech")}
              >
                기술
              </Button>
            </div>
            {adminMode ? (
              <div className="flex gap-2">
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
              </div>
            ) : null}
          </div>
        </div>

        {loading ? <p className="text-sm text-muted-foreground">불러오는 중...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading ? (
          <>
            <CategorySection category="notice" posts={noticePosts} adminMode={adminMode} onDelete={handleDelete} />
            <div className="h-[2px] w-full bg-[#0b1f4d]/35" />
            <CategorySection
              category="external"
              posts={externalPosts}
              adminMode={adminMode}
              onDelete={handleDelete}
            />
            <div className="h-[2px] w-full bg-[#0b1f4d]/35" />
            <CategorySection category="tech" posts={techPosts} adminMode={adminMode} onDelete={handleDelete} />
          </>
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
