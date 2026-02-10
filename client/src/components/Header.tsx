import { Link, useLocation  } from "wouter";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 80;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleMenuClick = (e: React.MouseEvent, href: string, sectionId: string) => {
    e.preventDefault();
    
    if (location === href) {
      // 같은 페이지에 있으면 스크롤만 이동
      scrollToSection(sectionId);
    } else {
      // 다른 페이지로 이동
      window.location.href = `${href}#${sectionId}`;
    }
  };

  const isActive = (href: string) => {
    // 정확히 일치 or 하위 경로 포함 (예: /company/xxx)
    return location === href || location.startsWith(href + "/");
  };

  const linkClass = (href: string, isHovered: boolean) => {
    const active = isActive(href);
    return [
      "group relative h-16 md:h-20 px-6 flex items-center", // ✅ 높이를 헤더와 동일하게
      "text-sm font-medium transition-all duration-300",
      active || isHovered
        ? "text-primary bg-gray-50"
        : "text-muted-foreground hover:text-primary hover:bg-gray-50",
    ].join(" ");
  };

  // const underlineClass = (href: string) => {
  const underlineClass = (href: string, isHovered: boolean) => {
    const active = isActive(href);
    return [
      "absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full",
      // active ? "w-full" : "w-0 group-hover:w-full",
      (active || isHovered) ? "w-full" : "w-0 group-hover:w-full",
    ].join(" ");
  };

  const menuData = [
    {
      id: "company",
      title: "회사소개",
      href: "/company",
      section: "intro",
      submenus: [
        { title: "인사말", section: "intro" },
        { title: "와프(WAFF)", section: "comp_point" },
        { title: "Vision", section: "vision" },
        { title: "조직구성", section: "org" },
        { title: "기술력과 인증", section: "technology" },
        { title: "협력사", section: "partner" },
        { title: "연혁", section: "history" },
      ],
    },
    {
      id: "itservice",
      title: "IT Services",
      href: "/itservice",
      section: "intro",
      submenus: [
        { section: "it_main", title: "IT Service" },
        { section: "it_monitoring", title: "모니터링 / 제어 솔루션" },
        { section: "it_manage", title: "관리 솔루션" },
        { section: "it_ai", title: "AI 기반 솔루션" },
        { section: "it_pm", title: "생산관리 솔루션" },
      ],
    },
    {
      id: "otservice",
      title: "OT Services",
      href: "/otservice",
      section: "intro",
      submenus: [
        { section: "ot_main", title: "OT Service" },
        { section: "ot_retro", title: "CNC Retrofit" },
        { section: "ot_hmi", title: "HMI" },
      ],
    },
  ]

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
        {/* <div className="hidden md:flex items-center gap-8">
          <Link href="/company" className={linkClass("/company")}>
            회사소개
            <span className={underlineClass("/company")} />
          </Link>
          <Link href="/itservice" className={linkClass("/itservice")}>
            IT Services
            <span className={underlineClass("/itservice")} />
          </Link>
          <Link href="/otservice" className={linkClass("/otservice")}>
            OT Services
            <span className={underlineClass("/otservice")} />
          </Link>
        </div> */}
        <nav
          className="hidden md:inline-block relative"
          onMouseEnter={() => setShowMegaMenu(true)}
          onMouseLeave={() => {
            setShowMegaMenu(false);
            setHoveredMenu(null);
          }}
        >
          {/* Main Menu */}
          <div className="inline-flex items-center ">
            {menuData.map((menu) => (
              <div
                key={menu.id}
                onMouseEnter={() => setHoveredMenu(menu.id)}
                className="w-[200px]"
                // className={`w-[200px] ${linkClass(menu.href, hoveredMenu === menu.id)}` }
              >
                <a
                  href={`${menu.href}#${menu.section}`}
                  onClick={(e) => handleMenuClick(e, menu.href, menu.section)}
                  className={linkClass(menu.href, hoveredMenu === menu.id)}
                >
                  {menu.title}
                  {/* <span className={underlineClass(`${menu.href}`)} /> */}
                  <span className={underlineClass(menu.href, hoveredMenu === menu.id)} />
                </a>
              </div>
            ))}
          </div>

          {/* Mega Menu */}
          <div
            className={`absolute left-0 right-0 top-full w-full
                        bg-background/98 backdrop-blur-xl
                        border-t-2  shadow-lg
                        transition-all duration-300
              ${
              showMegaMenu
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
             <div className="px-8 py-10">
              <div className="grid grid-cols-3 gap-8">
                {menuData.map((menu) => (
                  <div key={menu.id}>
                    <ul className="space-y-2">
                      {menu.submenus.map((submenu, index) => (
                        <li key={index}>
                          <a
                            href={`${menu.href}#${submenu.section}`}
                            onClick={(e) =>
                              handleMenuClick(e, menu.href, submenu.section)
                            }
                            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 py-1.5 hover:translate-x-1 flex gap-2 hover:font-bold"
                          >
                            <div className="flex-shrink-0 w-1 h-1 bg-accent rounded-full mt-2" />
                            {submenu.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>


      </div>
    </header>
  );
}
