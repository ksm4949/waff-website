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
        "\uD544\uC218 \uD56D\uBAA9(\uC774\uB984, \uBE44\uBC00\uBC88\uD638, \uC81C\uBAA9, \uB0B4\uC6A9)\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694."
      );
      return;
    }

    window.alert("\uC791\uC131\uC774 \uC644\uB8CC\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
    navigate("/qna");
  };

  return (
    <section id="qna-write" className="py-20 md:py-28 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold">{"QnA \uAE00\uC4F0\uAE30"}</h1>
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
                {"\uC774\uB984"}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder={"\uC774\uB984\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {"\uBE44\uBC00\uBC88\uD638"}
                <span className="ml-1 text-red-500">*</span>
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={"\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694"}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {"\uC774\uBA54\uC77C"}
              </label>
              <Input id="email" name="email" type="email" placeholder="example@email.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                {"\uC5F0\uB77D\uCC98"}
              </label>
              <Input id="phone" name="phone" type="tel" placeholder="010-0000-0000" />
            </div>
          </div>

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
              placeholder={"\uBB38\uC758 \uB0B4\uC6A9\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694"}
              className="min-h-44"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="attachment" className="text-sm font-medium">
              {"\uD30C\uC77C \uC5C5\uB85C\uB4DC"}
            </label>
            <Input id="attachment" name="attachment" type="file" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button asChild type="button" variant="outline" className="hover:bg-gray-100 hover:text-foreground">
              <Link href="/qna">{"\uCDE8\uC18C"}</Link>
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
