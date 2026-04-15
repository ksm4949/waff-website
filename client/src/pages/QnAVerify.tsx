import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { qnaPosts } from "@/data/qnaPosts";
import { Link, useLocation, useRoute } from "wouter";

export default function QnAVerify() {
  const [, params] = useRoute("/qna/:id/verify");
  const [, navigate] = useLocation();

  const postId = Number(params?.id);
  const post = qnaPosts.find((item) => item.id === postId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;

    const formData = new FormData(e.currentTarget);
    const password = String(formData.get("password") ?? "").trim();

    if (!password) {
      window.alert("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== post.password) {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    window.sessionStorage.setItem(`qna:unlocked:${post.id}`, "true");
    navigate(`/qna/${post.id}`);
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

  return (
    <section id="qna-verify" className="py-20 md:py-28 bg-white">
      <div className="container max-w-3xl">
        <SupportDevNotice />
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-2xl font-bold">
            {"비밀번호 확인"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {"해당 게시글 열람을 위해 비밀번호를 입력해주세요."}
          </p>
          <p className="mt-2 text-sm font-medium">{post.title}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {"비밀번호"}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={"비밀번호를 입력해주세요"}
                className="placeholder:text-gray-400"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                asChild
                type="button"
                variant="outline"
                className="hover:bg-gray-100 hover:text-foreground"
              >
                <Link href="/qna">{"취소"}</Link>
              </Button>
              <Button
                type="submit"
                className="bg-[#0b1f4d] text-white hover:bg-[#13357a]"
              >
                {"확인"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
