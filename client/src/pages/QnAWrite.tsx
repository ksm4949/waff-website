import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link, useLocation } from "wouter";

export default function QnAWrite() {
  const [, navigate] = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    if (!name || !password || !title || !content) {
      window.alert(
        "필수 항목(이름, 비밀번호, 제목, 내용)을 입력해주세요."
      );
      return;
    }

    window.alert("작성이 완료되었습니다.");
    navigate("/qna");
  };

  return (
    <section id="qna-write" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">{"QnA 글쓰기"}</h1>
          <div className="divider-modern mx-auto w-24 mb-6" />
        </div>

        <SupportDevNotice />

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-border/70 bg-background p-6 md:p-8"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {"이름"}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={"이름을 입력해주세요"}
                className="placeholder:text-gray-400"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {"비밀번호"}
                <span className="ml-1 text-red-500">*</span>
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
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {"이메일"}
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                className="placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {"연락처"}
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="010-0000-0000"
                className="placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              {"제목"}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder={"제목을 입력해주세요"}
              className="placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              {"내용"}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder={"문의 내용을 입력해주세요"}
              className="min-h-44 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachment" className="text-sm font-medium">
              {"파일 업로드"}
            </label>
            <Input id="attachment" name="attachment" type="file" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/qna">{"취소"}</Link>
            </Button>
            <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
              {"작성완료"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
