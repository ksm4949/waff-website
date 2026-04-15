import { Button } from "@/components/ui/button";
import {
  blogCategoryLabel,
  fetchBlogDetail,
  getAttachmentDownloadUrl,
  toAssetUrl,
  type BlogAttachment,
  type BlogPost,
} from "@/lib/blogApi";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";

type NeighborPost = { id: number; title: string } | null;

export default function BlogDetail() {
  const [, params] = useRoute("/blog/:id");
  const isAdmin = typeof window !== "undefined" && window.localStorage.getItem("isAdmin") === "true";
  const listHref = isAdmin ? "/admin/blog" : "/blog";
  const postId = Number(params?.id);

  const [post, setPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<NeighborPost>(null);
  const [nextPost, setNextPost] = useState<NeighborPost>(null);
  const [attachments, setAttachments] = useState<BlogAttachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    load();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  if (loading) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container max-w-4xl">
          <p className="text-sm text-muted-foreground">불러오는 중...</p>
        </div>
      </section>
    );
  }

  if (!post || error) {
    return (
      <section className="bg-white py-20 md:py-28">
        <div className="container max-w-4xl">
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

  return (
    <section id="blog-detail" className="bg-white py-20 md:py-28">
      <div className="container max-w-4xl">
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <p className="text-sm font-semibold text-[#0b1f4d]">{blogCategoryLabel[post.category]}</p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>작성자: {post.author}</span>
            <span>작성일: {post.date}</span>
            <span>조회: {post.views}</span>
          </div>

          <div className="my-6 h-px bg-border" />

          {post.imageUrl ? (
            <div className="rounded-md border border-border bg-white p-3">
              <img
                src={toAssetUrl(post.imageUrl)}
                alt={post.title}
                className="w-full rounded-md border border-border object-contain"
              />
            </div>
          ) : null}

          <div
            className="prose prose-sm mt-6 max-w-none rounded-md border border-border bg-white p-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {attachments.length > 0 ? (
            <div className="mt-6 rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-semibold text-[#0b1f4d]">첨부파일</p>
              <ul className="space-y-2">
                {attachments.map((item) => (
                  <li key={item.id}>
                    <a
                      href={getAttachmentDownloadUrl(item.id)}
                      className="text-sm text-[#0b1f4d] underline underline-offset-2 hover:text-[#13357a]"
                    >
                      {item.originalName}
                    </a>
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

          <div className="mt-8 flex justify-end">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href={listHref}>목록으로</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
