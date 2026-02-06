import { useEffect, useMemo, useState } from "react";

export type NavItem = {
  id: string;   // 섹션 id
  label: string;
};

export default function RightSideNav({items, headerOffset = 80,}: {
  items: NavItem[];
  headerOffset?: number;
}) {
    const memoItems = useMemo(() => items, [items]);
    const [activeId, setActiveId] = useState<string>(memoItems[0]?.id ?? "");

    useEffect(() => {
      let ticking = false;

      const updateActive = () => {
        ticking = false;

        const sections = memoItems
          .map((it) => document.getElementById(it.id))
          .filter(Boolean) as HTMLElement[];

        if (!sections.length) return;

        const scrollPos = window.scrollY + headerOffset + 1;

        let current = sections[0].id;
        for (const sec of sections) {
          if (sec.offsetTop <= scrollPos) current = sec.id;
        }

        setActiveId(current);
      };

      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateActive);
        }
      };

      updateActive(); // 첫 렌더 시 한번 세팅
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", updateActive);

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", updateActive);
      };
    }, [memoItems, headerOffset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!memoItems.length) return null;

  return (
    <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-gradient-to-b from-primary to-secondary/70 rounded-2xl backdrop-blur px-3 py-4 shadow-sm">
        <div className="flex flex-col gap-2">
          {memoItems.map((it) => {
            const isActive = activeId === it.id;
            return (
              <button
                key={it.id}
                onClick={() => scrollTo(it.id)}
                className={[
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition",
                  isActive ? "bg-accent" : "hover:bg-white/80",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 rounded-full transition",
                    isActive ? "bg-white" : "bg-white/50 group-hover:bg-muted-foreground",
                  ].join(" ")}
                />
                <span
                  className={[
                    "transition-colors",
                    isActive ? "text-white font-semibold" : "text-white/50 group-hover:text-muted-foreground",
                  ].join(" ")}
                >
                  {it.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  )
}