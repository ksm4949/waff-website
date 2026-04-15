import { Button } from "@/components/ui/button";
import SupportDevNotice from "@/components/support/SupportDevNotice";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function NoticeWrite() {
  const [, navigate] = useLocation();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }

    if (!file) return;
    if (file.type.startsWith("image/")) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = String(formData.get("title") ?? "").trim();
    const content = String(formData.get("content") ?? "").trim();

    if (!title || !content) {
      window.alert(
        "필수 항목(제목, 내용)을 입력해주세요."
      );
      return;
    }

    window.alert("공지사항 작성이 완료되었습니다. (UI 전용)");
    navigate("/notice");
  };

  return (
    <section id="notice-write" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">
            {"공지사항 글쓰기"}
          </h1>
          <div className="divider-modern mx-auto w-24 mb-6" />
        </div>

        <SupportDevNotice />

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-lg border border-border/70 bg-background p-6 md:p-8"
        >
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
              placeholder={"공지 내용을 입력해주세요"}
              className="min-h-52 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachment" className="text-sm font-medium">
              {"첨부파일"}
            </label>
            <Input id="attachment" name="attachment" type="file" onChange={handleFileChange} />
            <p className="text-xs text-muted-foreground">
              {
                "이미지 파일을 첨부하면 아래 내용 미리보기에 표시됩니다."
              }
            </p>
          </div>

          {imagePreviewUrl && (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {"내용 영역 이미지 미리보기"}
              </p>
              <img
                src={imagePreviewUrl}
                alt={"첨부 이미지 미리보기"}
                className="max-h-[420px] w-full rounded-md border border-border object-contain"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/notice">{"취소"}</Link>
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
