import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { Textarea } from "@/components/ui/textarea";
import { qnaPosts } from "@/data/qnaPosts";
import { useState } from "react";
import { Link, useRoute } from "wouter";

type ThreadRole = "admin" | "author";

type ThreadComment = {
  id: number;
  parentId: number;
  role: ThreadRole;
  content: string;
};

type ComposerState = {
  parentId: number;
  role: ThreadRole;
  content: string;
};

const ROOT_ADMIN_REPLY_ID = 0;

export default function QnADetail() {
  const [, params] = useRoute("/qna/:id");
  const postId = Number(params?.id);
  const post = qnaPosts.find((item) => item.id === postId);
  const isUnlocked =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(`qna:unlocked:${postId}`) === "true";

  const [replyDraft, setReplyDraft] = useState("");
  const [adminReply, setAdminReply] = useState("");

  const [threadComments, setThreadComments] = useState<ThreadComment[]>([]);
  const [nextCommentId, setNextCommentId] = useState(1);
  const [composer, setComposer] = useState<ComposerState | null>(null);

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = replyDraft.trim();
    if (!trimmed) {
      window.alert("답변 내용을 입력해주세요.");
      return;
    }

    setAdminReply(trimmed);
    setReplyDraft("");
    setThreadComments([]);
    setNextCommentId(1);
    setComposer(null);
    window.alert("관리자 답변이 등록되었습니다. (UI 전용)");
  };

  const openComposer = (parentId: number, role: ThreadRole) => {
    setComposer({ parentId, role, content: "" });
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composer) return;

    const trimmed = composer.content.trim();
    if (!trimmed) {
      window.alert("댓글 내용을 입력해주세요.");
      return;
    }

    setThreadComments((prev) => [
      ...prev,
      {
        id: nextCommentId,
        parentId: composer.parentId,
        role: composer.role,
        content: trimmed,
      },
    ]);
    setNextCommentId((prev) => prev + 1);
    setComposer(null);
    window.alert("댓글이 등록되었습니다. (UI 전용)");
  };

  const renderThread = (parentId: number, depth = 0): React.ReactNode => {
    const children = threadComments.filter((item) => item.parentId === parentId);
    if (!children.length) return null;

    return children.map((item) => {
      const isAdmin = item.role === "admin";
      const roleLabel = isAdmin ? "관리자" : "작성자";
      const nextRole: ThreadRole = isAdmin ? "author" : "admin";
      const actionLabel = isAdmin
        ? "작성자 댓글 달기"
        : "관리자 대댓글 달기";
      const nextDepth = Math.min(depth + 1, 1);

      return (
        <div key={item.id}>
          <div
            className={`mt-3 rounded-md border border-border bg-white p-4 ${
              depth > 0 ? "ml-5 border-l-4 border-l-muted" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-primary">{roleLabel}</p>
              <Button
                type="button"
                variant="ghost"
                className="h-7 px-2 text-xs hover:bg-[#0b1f4d] hover:text-white"
                onClick={() => openComposer(item.id, nextRole)}
              >
                {actionLabel}
              </Button>
            </div>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6">{item.content}</p>
          </div>
          {renderThread(item.id, nextDepth)}
        </div>
      );
    });
  };

  if (!post) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-4xl">
          <div className="rounded-lg border border-border/70 bg-background p-8 text-center">
            <p className="text-lg font-semibold">
              {"게시글을 찾을 수 없습니다."}
            </p>
            <div className="mt-6">
              <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                <Link href="/qna">{"목록으로"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!isUnlocked) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-4xl">
          <SupportDevNotice />
          <div className="rounded-lg border border-border/70 bg-background p-8 text-center">
            <p className="text-lg font-semibold">
              {"비밀번호 확인 후 열람 가능합니다."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild type="button" variant="outline">
                <Link href="/qna">{"목록으로"}</Link>
              </Button>
              <Button asChild type="button">
                <Link href={`/qna/${post.id}/verify`}>
                  {"비밀번호 입력하러가기"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="qna-detail" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <SupportDevNotice />
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span>{"작성자"}: {post.author}</span>
            <span>{"작성일"}: {post.date}</span>
            <span>{"조회"}: {post.views}</span>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="min-h-48 whitespace-pre-wrap leading-7 text-foreground/90">
            {post.content}
          </div>

          <div className="mt-10 rounded-lg border border-border/70 bg-muted/20 p-5">
            <h2 className="text-lg font-semibold">
              {"관리자 답변 작성 (UI 전용)"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {
                "현재는 DB 연동 전 단계로, 화면에서만 내용이 유지됩니다."
              }
            </p>

            <form onSubmit={handleReplySubmit} className="mt-4 space-y-3">
              <Textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder={"관리자 답변 내용을 입력해주세요."}
                className="min-h-28 bg-white"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-gray-100 hover:text-foreground"
                  onClick={() => setReplyDraft("")}
                >
                  {"취소"}
                </Button>
                <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
                  {"답변 등록"}
                </Button>
              </div>
            </form>

            {adminReply && (
              <div className="mt-5 rounded-md border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-primary">
                    {"관리자 답변"}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-7 px-2 text-xs hover:bg-[#0b1f4d] hover:text-white"
                    onClick={() => openComposer(ROOT_ADMIN_REPLY_ID, "author")}
                  >
                    {"작성자 댓글 달기"}
                  </Button>
                </div>
                <p className="mt-2 whitespace-pre-wrap leading-7 text-foreground/90">
                  {adminReply}
                </p>

                {renderThread(ROOT_ADMIN_REPLY_ID, 1)}
              </div>
            )}

            {composer && (
              <form
                onSubmit={handleComposerSubmit}
                className="mt-5 rounded-md border border-border bg-white p-4"
              >
                <p className="text-sm font-medium">
                  {composer.role === "admin"
                    ? "관리자 대댓글 작성"
                    : "작성자 댓글 작성"}
                </p>
                <Textarea
                  value={composer.content}
                  onChange={(e) =>
                    setComposer((prev) =>
                      prev
                        ? {
                            ...prev,
                            content: e.target.value,
                          }
                        : prev
                    )
                  }
                  placeholder={"내용을 입력해주세요."}
                  className="mt-3 min-h-24"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-gray-100 hover:text-foreground"
                    onClick={() => setComposer(null)}
                  >
                    {"취소"}
                  </Button>
                  <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
                    {"등록"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/qna">{"목록으로"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
