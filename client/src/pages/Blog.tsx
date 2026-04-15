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
import { Link, useLocation } from "wouter";

const BLOG_FALLBACK_IMAGE = "/images/logos/logoKR.png";

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
    <div className="group overflow-hidden rounded-xl border border-[#7d8ca8] bg-white">
      <Link href={`/blog/${id}`} className="block">
        <div className="aspect-[16/10] overflow-hidden bg-[#eef1f6]">
          <img
            src={displayImage}
            alt={title}
            className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
              hasImage ? "object-cover" : "object-contain p-8"
            }`}
          />
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

  return (
    <div className="space-y-5">
      <div>
        <h2 className="inline-block border-b-2 border-[#f2c300] pb-0.5 text-2xl font-bold text-[#0b1f4d]">
          {blogCategoryLabel[category]}
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
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

  const noticePosts = useMemo(() => items.filter((x) => x.category === "notice"), [items]);
  const externalPosts = useMemo(() => items.filter((x) => x.category === "external"), [items]);
  const techPosts = useMemo(() => items.filter((x) => x.category === "tech"), [items]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteBlogPost(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      window.alert("게시글을 삭제했습니다.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.";
      window.alert(message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isAdmin");
    window.localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <section id="blog" className="bg-white py-20 md:py-28">
      <div className="container space-y-16">
        <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-[#eff1f5] px-8 py-10 md:px-10">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1f4d] md:text-4xl">블로그</h1>
            <p className="mt-3 text-muted-foreground">공지사항, 기술 블로그, 대외활동 소식을 한곳에서 확인하세요.</p>
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

        {loading ? <p className="text-sm text-muted-foreground">불러오는 중...</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        {!loading && !error ? (
          <>
            <CategorySection category="notice" posts={noticePosts} adminMode={adminMode} onDelete={handleDelete} />
            <CategorySection
              category="external"
              posts={externalPosts}
              adminMode={adminMode}
              onDelete={handleDelete}
            />
            <CategorySection category="tech" posts={techPosts} adminMode={adminMode} onDelete={handleDelete} />
          </>
        ) : null}
      </div>
    </section>
  );
}
