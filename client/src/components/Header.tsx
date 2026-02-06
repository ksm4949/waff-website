import { Link, useLocation  } from "wouter";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [location] = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isActive = (href: string) => {
    // 정확히 일치 or 하위 경로 포함 (예: /company/xxx)
    return location === href || location.startsWith(href + "/");
  };

  const linkClass = (href: string) => {
    const active = isActive(href);
    return [
      "text-sm font-medium transition-all duration-300 relative group py-2",
      active ? "text-primary" : "text-muted-foreground hover:text-primary",
    ].join(" ");
  };

  const underlineClass = (href: string) => {
    const active = isActive(href);
    return [
      "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full",
      active ? "w-full" : "w-0 group-hover:w-full",
    ].join(" ");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link href="/" className="font-bold text-lg">
            <button
                onClick={scrollToTop}
                className="flex items-center hover:opacity-80 transition-opacity duration-300 group"
            >
                <div className="w-12 h-18 flex items-center justify-center group-hover:scale-105 transition-all duration-300 ">
                  <img
                    src="/images/logos/logo3.png"
                    alt="logo"
                    className="w-full h-full object-contain"
                    />
                </div>
                <img
                    src="/images/logos/logo2(black).png"
                    alt="logo"
                    className="w-full h-8  object-contain"
                />
            </button>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* <Link
            href="/company"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group py-2"
          > */}
          <Link href="/company" className={linkClass("/company")}>
            회사소개
            {/* <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full" /> */}
            <span className={underlineClass("/company")} />
          </Link>

          {/* <Link
            href="/itservice"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group py-2"
          > */}
          <Link href="/itservice" className={linkClass("/itservice")}>
            IT Services
            {/* <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full" /> */}
            <span className={underlineClass("/itservice")} />
          </Link>

          {/* <Link
            href="/otservice"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 relative group py-2"
          > */}
          <Link href="/otservice" className={linkClass("/otservice")}>
            OT Services
            {/* <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300 rounded-full" /> */}
            <span className={underlineClass("/otservice")} />
          </Link>
        </div>

      </div>
    </header>
  );
}
