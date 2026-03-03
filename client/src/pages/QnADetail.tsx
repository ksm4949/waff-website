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
      window.alert("\uB2F5\uBCC0 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.");
      return;
    }

    setAdminReply(trimmed);
    setReplyDraft("");
    setThreadComments([]);
    setNextCommentId(1);
    setComposer(null);
    window.alert("\uAD00\uB9AC\uC790 \uB2F5\uBCC0\uC774 \uB4F1\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4. (UI \uC804\uC6A9)");
  };

  const openComposer = (parentId: number, role: ThreadRole) => {
    setComposer({ parentId, role, content: "" });
  };

  const handleComposerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composer) return;

    const trimmed = composer.content.trim();
    if (!trimmed) {
      window.alert("\uB313\uAE00 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694.");
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
    window.alert("\uB313\uAE00\uC774 \uB4F1\uB85D\uB418\uC5C8\uC2B5\uB2C8\uB2E4. (UI \uC804\uC6A9)");
  };

  const renderThread = (parentId: number, depth = 0): React.ReactNode => {
    const children = threadComments.filter((item) => item.parentId === parentId);
    if (!children.length) return null;

    return children.map((item) => {
      const isAdmin = item.role === "admin";
      const roleLabel = isAdmin ? "\uAD00\uB9AC\uC790" : "\uC791\uC131\uC790";
      const nextRole: ThreadRole = isAdmin ? "author" : "admin";
      const actionLabel = isAdmin
        ? "\uC791\uC131\uC790 \uB313\uAE00 \uB2EC\uAE30"
        : "\uAD00\uB9AC\uC790 \uB300\uB313\uAE00 \uB2EC\uAE30";
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
              {"\uAC8C\uC2DC\uAE00\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4."}
            </p>
            <div className="mt-6">
              <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
                <Link href="/qna">{"\uBAA9\uB85D\uC73C\uB85C"}</Link>
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
              {"\uBE44\uBC00\uBC88\uD638 \uD655\uC778 \uD6C4 \uC5F4\uB78C \uAC00\uB2A5\uD569\uB2C8\uB2E4."}
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild type="button" variant="outline">
                <Link href="/qna">{"\uBAA9\uB85D\uC73C\uB85C"}</Link>
              </Button>
              <Button asChild type="button">
                <Link href={`/qna/${post.id}/verify`}>
                  {"\uBE44\uBC00\uBC88\uD638 \uC785\uB825\uD558\uB7EC\uAC00\uAE30"}
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
            <span>{"\uC791\uC131\uC790"}: {post.author}</span>
            <span>{"\uC791\uC131\uC77C"}: {post.date}</span>
            <span>{"\uC870\uD68C"}: {post.views}</span>
          </div>

          <div className="my-6 h-px bg-border" />

          <div className="min-h-48 whitespace-pre-wrap leading-7 text-foreground/90">
            {post.content}
          </div>

          <div className="mt-10 rounded-lg border border-border/70 bg-muted/20 p-5">
            <h2 className="text-lg font-semibold">
              {"\uAD00\uB9AC\uC790 \uB2F5\uBCC0 \uC791\uC131 (UI \uC804\uC6A9)"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {
                "\uD604\uC7AC\uB294 DB \uC5F0\uB3D9 \uC804 \uB2E8\uACC4\uB85C, \uD654\uBA74\uC5D0\uC11C\uB9CC \uB0B4\uC6A9\uC774 \uC720\uC9C0\uB429\uB2C8\uB2E4."
              }
            </p>

            <form onSubmit={handleReplySubmit} className="mt-4 space-y-3">
              <Textarea
                value={replyDraft}
                onChange={(e) => setReplyDraft(e.target.value)}
                placeholder={"\uAD00\uB9AC\uC790 \uB2F5\uBCC0 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."}
                className="min-h-28 bg-white"
              />
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="hover:bg-gray-100 hover:text-foreground"
                  onClick={() => setReplyDraft("")}
                >
                  {"\uCDE8\uC18C"}
                </Button>
                <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
                  {"\uB2F5\uBCC0 \uB4F1\uB85D"}
                </Button>
              </div>
            </form>

            {adminReply && (
              <div className="mt-5 rounded-md border border-border bg-white p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-primary">
                    {"\uAD00\uB9AC\uC790 \uB2F5\uBCC0"}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-7 px-2 text-xs hover:bg-[#0b1f4d] hover:text-white"
                    onClick={() => openComposer(ROOT_ADMIN_REPLY_ID, "author")}
                  >
                    {"\uC791\uC131\uC790 \uB313\uAE00 \uB2EC\uAE30"}
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
                    ? "\uAD00\uB9AC\uC790 \uB300\uB313\uAE00 \uC791\uC131"
                    : "\uC791\uC131\uC790 \uB313\uAE00 \uC791\uC131"}
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
                  placeholder={"\uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."}
                  className="mt-3 min-h-24"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-gray-100 hover:text-foreground"
                    onClick={() => setComposer(null)}
                  >
                    {"\uCDE8\uC18C"}
                  </Button>
                  <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
                    {"\uB4F1\uB85D"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/qna">{"\uBAA9\uB85D\uC73C\uB85C"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
