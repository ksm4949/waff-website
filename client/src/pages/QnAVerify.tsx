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
      window.alert("\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.");
      return;
    }

    if (password !== post.password) {
      window.alert("\uBE44\uBC00\uBC88\uD638\uAC00 \uC77C\uCE58\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.");
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

  return (
    <section id="qna-verify" className="py-20 md:py-28 bg-white">
      <div className="container max-w-3xl">
        <SupportDevNotice />
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-2xl font-bold">
            {"\uBE44\uBC00\uBC88\uD638 \uD655\uC778"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {"\uD574\uB2F9 \uAC8C\uC2DC\uAE00 \uC5F4\uB78C\uC744 \uC704\uD574 \uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694."}
          </p>
          <p className="mt-2 text-sm font-medium">{post.title}</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                {"\uBE44\uBC00\uBC88\uD638"}
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={"\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694"}
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
                <Link href="/qna">{"\uCDE8\uC18C"}</Link>
              </Button>
              <Button
                type="submit"
                className="bg-[#0b1f4d] text-white hover:bg-[#13357a]"
              >
                {"\uD655\uC778"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
