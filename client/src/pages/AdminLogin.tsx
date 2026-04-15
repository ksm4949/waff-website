import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("isAdmin") === "true") {
      navigate("/admin/blog");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    // TODO: replace with backend auth API.
    if (username === "admin" && password === "admin1234") {
      window.localStorage.setItem("isAdmin", "true");
      window.localStorage.setItem("adminUser", username);
      navigate("/admin/blog");
      return;
    }

    window.alert("로그인 정보를 확인해주세요.");
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container max-w-md">
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-center text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            관리자 페이지 접속을 위해 로그인해주세요.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                아이디
              </label>
              <Input id="username" name="username" type="text" autoComplete="username" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#0b1f4d] text-white hover:bg-[#13357a]">
              로그인
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
