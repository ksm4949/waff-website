import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

function getApiBaseUrl() {
  const envBase = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envBase && envBase.trim()) return envBase.replace(/\/+$/, "");
  if (typeof window !== "undefined" && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    return "http://127.0.0.1:5002";
  }
  return "";
}

function toApiUrl(path: string) {
  const base = getApiBaseUrl();
  return base ? `${base}${path}` : path;
}

export default function AdminLogin() {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (window.localStorage.getItem("isAdmin") === "true") {
      navigate("/admin/blog");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const response = await fetch(toApiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        token?: string;
        user?: { username?: string; displayName?: string | null };
        message?: string;
      };

      if (!response.ok || !payload?.ok || !payload.user) {
        throw new Error(payload?.message ?? "로그인에 실패했습니다.");
      }

      const displayName = (payload.user.displayName ?? "").trim() || "관리자";
      const loginUsername = (payload.user.username ?? username).trim() || username;
      window.localStorage.setItem("isAdmin", "true");
      window.localStorage.setItem("adminUser", loginUsername);
      window.localStorage.setItem("adminDisplayName", displayName);
      window.localStorage.setItem("adminUsername", loginUsername);
      if (payload.token) {
        window.localStorage.setItem("adminToken", payload.token);
      }

      navigate("/admin/blog");
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "로그인 정보를 확인해주세요.");
    }
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <Helmet>
        <title>Admin Login | WAFF</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="container max-w-md">
        <div className="rounded-lg border border-border/70 bg-background p-6 md:p-8">
          <h1 className="text-center text-2xl font-bold">Admin Login</h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">관리자 페이지 접속을 위해 로그인해주세요.</p>

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
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
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
