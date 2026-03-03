import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { noticePosts } from "@/data/noticePosts";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Link, useRoute } from "wouter";

export default function NoticeDetail() {
  const [, params] = useRoute("/notice/:id");
  const postId = Number(params?.id);
  const post = noticePosts.find((item) => item.id === postId);
  const currentIndex = noticePosts.findIndex((item) => item.id === postId);
  const prevPost = currentIndex > 0 ? noticePosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex >= 0 && currentIndex < noticePosts.length - 1
      ? noticePosts[currentIndex + 1]
      : null;

  if (!post) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-lg border border-border/70 bg-background p-8 text-center">
            <p className="text-lg font-semibold">
              {"\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}
            </p>
            <div className="mt-6">
              <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                <Link href="/notice">{"\uBAA9\uB85D\uC73C\uB85C"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="notice-detail" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <SupportDevNotice />
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{"\uC791\uC131\uC790"}: {post.author}</span>
            <span>{"\uC791\uC131\uC77C"}: {post.date}</span>
            <span>{"\uC870\uD68C"}: {post.views}</span>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="whitespace-pre-wrap leading-7 text-foreground/90">{post.content}</div>

          {post.imageUrl && (
            <div className="mt-8 rounded-md border border-border bg-white p-3">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {"\uCCA8\uBD80 \uC774\uBBF8\uC9C0"}
              </p>
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full rounded-md border border-border object-contain"
              />
            </div>
          )}

          <div className="mt-8 rounded-md border border-border bg-white">
            <div className="flex items-center border-b border-border px-4 py-3 transition-colors hover:bg-muted/40">
              <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground inline-flex items-center gap-1">
                <ChevronUpIcon className="size-4" />
                {"\uC774\uC804\uAE00"}
              </span>
              {prevPost ? (
                <Link
                  href={`/notice/${prevPost.id}`}
                  className="text-sm hover:text-primary hover:underline"
                >
                  {prevPost.title}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {"\uC774\uC804 \uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."}
                </span>
              )}
            </div>
            <div className="flex items-center px-4 py-3 transition-colors hover:bg-muted/40">
              <span className="w-20 shrink-0 text-sm font-medium text-muted-foreground inline-flex items-center gap-1">
                <ChevronDownIcon className="size-4" />
                {"\uB2E4\uC74C\uAE00"}
              </span>
              {nextPost ? (
                <Link
                  href={`/notice/${nextPost.id}`}
                  className="text-sm hover:text-primary hover:underline"
                >
                  {nextPost.title}
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {"\uB2E4\uC74C \uAE00\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."}
                </span>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/notice">{"\uBAA9\uB85D\uC73C\uB85C"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
