import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  blogCategoryLabel,
  deleteBlogPost,
  fetchBlogCategory,
  toAssetUrl,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blogApi";
import { useEffect, useState } from "react";
import { RefreshCwIcon, SearchIcon } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useRoute } from "wouter";

const validCategories: BlogCategory[] = ["notice", "external", "tech"];
const BLOG_FALLBACK_IMAGE = "/images/logos/logoKR.png";
const SITE_URL = "https://www.waff.co.kr";

function toExcerptText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function isValidCategory(value: string): value is BlogCategory {
  return validCategories.includes(value as BlogCategory);
}

function BlogCard({
  id,
  imageUrl,
  category,
  title,
  content,
  date,
  adminMode,
  onDelete,
}: {
  id: number;
  imageUrl: string;
  category: BlogCategory;
  title: string;
  content: string;
  date: string;
  adminMode: boolean;
  onDelete: (id: number) => void;
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
          <p className="text-xs font-semibold text-[#0b1f4d]">{blogCategoryLabel[category]}</p>
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
            onClick={() => onDelete(id)}
          >
            삭제
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default function BlogCategory({ adminMode = false }: { adminMode?: boolean }) {
  const [, navigate] = useLocation();
  const [, publicParams] = useRoute("/blog/category/:category");
  const [, adminParams] = useRoute("/admin/blog/category/:category");
  const rawCategory = publicParams?.category ?? adminParams?.category ?? "";
  const category = isValidCategory(rawCategory) ? rawCategory : null;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
  const pageSize = 6;

  const listHref = adminMode ? "/admin/blog" : "/blog";

  useEffect(() => {
    setCurrentPage(1);
  }, [category, appliedSearchTerm]);

  useEffect(() => {
    if (!category) return;
    let cancelled = false;

    async function load() {
      if (!category) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetchBlogCategory(category, currentPage, pageSize, appliedSearchTerm);
        if (!cancelled) {
          setItems(Array.isArray(response.items) ? response.items : []);
          setTotalCount(Number.isFinite(response.totalCount) ? Number(response.totalCount) : 0);
          setTotalPages(Number.isFinite(response.totalPages) ? Number(response.totalPages) : 1);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "카테고리 데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [category, currentPage, appliedSearchTerm]);

  const goToPage = (page: number) => {
    const next = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
    setCurrentPage(next);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBlogPost(id);
      const response = await fetchBlogCategory(category!, currentPage, pageSize, appliedSearchTerm);
      setItems(Array.isArray(response.items) ? response.items : []);
      setTotalCount(Number.isFinite(response.totalCount) ? Number(response.totalCount) : 0);
      setTotalPages(Number.isFinite(response.totalPages) ? Number(response.totalPages) : 1);
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

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAppliedSearchTerm(searchInput.trim());
  };

  const handleSearchReset = () => {
    setSearchInput("");
    setAppliedSearchTerm("");
  };

  if (!category) {
    return (
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <Helmet>
          <title>블로그 카테고리 | WAFF</title>
          <meta name="description" content="WAFF 블로그 카테고리를 확인해보세요." />
          <link rel="canonical" href={`${SITE_URL}/blog`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="블로그 카테고리 | WAFF" />
          <meta property="og:description" content="WAFF 블로그 카테고리를 확인해보세요." />
          <meta property="og:url" content={`${SITE_URL}/blog`} />
          <meta property="og:image" content={`${SITE_URL}/images/logos/logoKR.png`} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="블로그 카테고리 | WAFF" />
          <meta name="twitter:description" content="WAFF 블로그 카테고리를 확인해보세요." />
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
        <div className="container relative z-10 max-w-4xl">
          <div className="rounded-lg border border-border/70 bg-background p-8 text-center">
            <p className="text-lg font-semibold">잘못된 카테고리입니다.</p>
            <div className="mt-6">
              <Button asChild type="button" variant="outline">
                <Link href={listHref}>목록으로</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categoryLabel = blogCategoryLabel[category];
  const titleText = appliedSearchTerm
    ? `[${appliedSearchTerm}] 검색결과 | ${categoryLabel} | WAFF`
    : `${categoryLabel} | 블로그 | WAFF`;
  const descText = appliedSearchTerm
    ? `WAFF ${categoryLabel} 카테고리에서 "${appliedSearchTerm}" 검색 결과를 확인해보세요.`
    : `WAFF 블로그 ${categoryLabel} 카테고리 게시글을 확인해보세요.`;
  const canonicalUrl = `${SITE_URL}/blog/category/${category}`;

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <Helmet>
        <title>{titleText}</title>
        <meta name="description" content={descText} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={titleText} />
        <meta property="og:description" content={descText} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/images/logos/logoKR.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={titleText} />
        <meta name="twitter:description" content={descText} />
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
      <div className="container relative z-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-[#eff1f5] px-8 py-10 md:px-10">
          <div>
            <p className="text-sm font-semibold text-[#0b1f4d]">카테고리</p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">{blogCategoryLabel[category]}</h1>
            <p className="mt-3 text-muted-foreground">
              {appliedSearchTerm
                ? `[${appliedSearchTerm}] 검색결과 ${totalCount}건 중 ${currentPage}/${Math.max(totalPages, 1)}페이지`
                : `"${blogCategoryLabel[category]}" 카테고리 게시글 ${totalCount}건 중 ${currentPage}/${Math.max(totalPages, 1)}페이지`}
            </p>
            <form onSubmit={handleSearchSubmit} className="mt-4 flex max-w-md items-center gap-2">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="제목, 작성자, 내용 검색"
                className="bg-white"
              />
              <Button
                type="submit"
                className="bg-[#0b1f4d] text-white hover:bg-[#13357a]"
                aria-label="검색"
              >
                <SearchIcon className="size-4" />
                <span className="sr-only">검색</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                className="bg-white hover:bg-gray-100 hover:text-foreground"
                onClick={handleSearchReset}
                aria-label="초기화"
              >
                <RefreshCwIcon className="size-4" />
                <span className="sr-only">초기화</span>
              </Button>
            </form>
          </div>
          <div className="flex gap-2">
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
            <Button asChild type="button" variant="outline" className="bg-white hover:bg-gray-100 hover:text-foreground">
              <Link href={listHref}>목록으로</Link>
            </Button>
          </div>
        </div>

        {loading ? <p className="text-sm text-muted-foreground">불러오는 중...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <>
            <div className="grid gap-5 md:grid-cols-3">
              {items.map((post) => (
                <BlogCard
                  key={`${category}-${post.id}`}
                  {...post}
                  adminMode={adminMode}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            {totalCount > pageSize ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  이전
                </Button>
                {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={`page-${page}`}
                    type="button"
                    variant={page === currentPage ? "default" : "outline"}
                    className={page === currentPage ? "bg-[#0b1f4d] hover:bg-[#13357a]" : ""}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  다음
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
