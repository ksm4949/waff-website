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
        "\uD544\uC218 \uD56D\uBAA9(\uC81C\uBAA9, \uB0B4\uC6A9)\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      );
      return;
    }

    window.alert("\uACF5\uC9C0\uC0AC\uD56D \uC791\uC131\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. (UI \uC804\uC6A9)");
    navigate("/notice");
  };

  return (
    <section id="notice-write" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">
            {"\uACF5\uC9C0\uC0AC\uD56D \uAE00\uC4F0\uAE30"}
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
              {"\uC81C\uBAA9"}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder={"\uC81C\uBAA9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"}
              className="placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              {"\uB0B4\uC6A9"}
              <span className="ml-1 text-red-500">*</span>
            </label>
            <Textarea
              id="content"
              name="content"
              placeholder={"\uACF5\uC9C0 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"}
              className="min-h-52 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachment" className="text-sm font-medium">
              {"\uCCA8\uBD80\uD30C\uC77C"}
            </label>
            <Input id="attachment" name="attachment" type="file" onChange={handleFileChange} />
            <p className="text-xs text-muted-foreground">
              {
                "\uC774\uBBF8\uC9C0 \uD30C\uC77C\uC744 \uCCA8\uBD80\uD558\uBA74 \uC544\uB798 \uB0B4\uC6A9 \uBBF8\uB9AC\uBCF4\uAE30\uC5D0 \uD45C\uC2DC\uB429\uB2C8\uB2E4."
              }
            </p>
          </div>

          {imagePreviewUrl && (
            <div className="rounded-md border border-border bg-white p-4">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {"\uB0B4\uC6A9 \uC601\uC5ED \uC774\uBBF8\uC9C0 \uBBF8\uB9AC\uBCF4\uAE30"}
              </p>
              <img
                src={imagePreviewUrl}
                alt={"\uCCA8\uBD80 \uC774\uBBF8\uC9C0 \uBBF8\uB9AC\uBCF4\uAE30"}
                className="max-h-[420px] w-full rounded-md border border-border object-contain"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/notice">{"\uCDE8\uC18C"}</Link>
            </Button>
            <Button type="submit" className="bg-[#0b1f4d] text-white hover:bg-[#13357a]">
              {"\uC791\uC131\uC644\uB8CC"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
