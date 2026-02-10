import { useEffect, useMemo, useState, useRef } from "react";

export type NavItem = {
  id: string;   // 섹션 id
  label: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const STORAGE_KEY = "rightSideNavPos.v1";

export default function RightSideNav({items, headerOffset = 80,}: {
  items: NavItem[];
  headerOffset?: number;
}) {
    const memoItems = useMemo(() => items, [items]);
    const [activeId, setActiveId] = useState<string>(memoItems[0]?.id ?? "");

    // === 드래그 관련 ===
    const navRef = useRef<HTMLDivElement | null>(null);
    const [pos, setPos] = useState<{ left: number; top: number }>(() => ({
      left: 0,
      top: 0,
    }));

    const dragRef = useRef<{
    dragging: boolean;
    pointerId: number | null;
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
    }>({
      dragging: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,
    });

    // ✅ 현재 pos를 엘리먼트 크기 기준으로 "화면 안"으로 강제 보정
    const clampToViewport = (next: { left: number; top: number }) => {
      const el = navRef.current;
      const margin = 8;
      if (!el) return next;
        
      // ✅ 스크롤바 제외한 뷰포트 크기
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
        
      // ✅ 요소 실제 레이아웃 크기(잘림/클리핑 영향 X)
      const w = el.offsetWidth;
      const h = el.offsetHeight;
        
      const maxLeft = Math.max(margin, vw - w - margin);
      const maxTop = Math.max(margin, vh - h - margin);
        
      return {
        left: clamp(next.left, margin, maxLeft),
        top: clamp(next.top, margin, maxTop),
      };
    };

    // ✅ mount 시: localStorage 복원 -> 없으면 우측 중앙 배치
    useEffect(() => {
      const el = navRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const rightMargin = 24;
      const defaultPos = {
        left: window.innerWidth - rect.width - rightMargin,
        top: window.innerHeight / 2 - rect.height / 2,
      };

      let saved: { left: number; top: number } | null = null;
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) saved = JSON.parse(raw);
      } catch {
        // ignore
      }

      const initial = clampToViewport(saved ?? defaultPos);
      setPos(initial);
    }, []);

    // ✅ 리사이즈/줌 변화로 화면이 작아져도 "깨지기" 전에 다시 화면 안으로 넣기
    useEffect(() => {
      const onResize = () => {
        setPos((p) => clampToViewport(p));
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✅ pos 변경 시 localStorage 저장
    useEffect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
      } catch {
        // ignore
      }
    }, [pos]);

    const onHandlePointerDown = (e: React.PointerEvent) => {
        const el = navRef.current;
        if (!el) return;

        if (e.pointerType === "mouse" && e.button !== 0) return;

        dragRef.current.dragging = true;
        dragRef.current.pointerId = e.pointerId;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.startLeft = pos.left;
        dragRef.current.startTop = pos.top;

        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        e.preventDefault(); // 텍스트 선택/드래그 방지
    };

    const onHandlePointerMove = (e: React.PointerEvent) => {
      const d = dragRef.current;
      if (!d.dragging || d.pointerId !== e.pointerId) return;

      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;

      const next = clampToViewport({
        left: d.startLeft + dx,
        top: d.startTop + dy,
      });

      setPos(next);
    };

    const onHandlePointerUp = (e: React.PointerEvent) => {
      const d = dragRef.current;
      if (d.pointerId !== e.pointerId) return;
      d.dragging = false;
      d.pointerId = null;
    };

    // 스크롤 active 처리
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
        <div
            ref={navRef} 
            // className="hidden lg:block fixed z-50 select-none touch-none"
            className="hidden lg:block fixed z-50"
            style={{ left: pos.left, top: pos.top }}
        >
            <div className="bg-gradient-to-b from-primary to-secondary/70 rounded-2xl backdrop-blur px-3 py-4 shadow-sm">
                {/* ✅ 드래그 핸들 영역 */}
                <div
                    className="mb-2 flex items-center justify-center rounded-lg  px-3 py-2 cursor-grab active:cursor-grabbing select-none"
                    onPointerDown={onHandlePointerDown}
                    onPointerMove={onHandlePointerMove}
                    onPointerUp={onHandlePointerUp}
                    onPointerCancel={onHandlePointerUp}
                    role="button"
                    aria-label="Move navigation"
                    title="Drag to move"
                >
                    <span className="text-white/90 font-semibold tracking-widest">≡</span>
                </div>
                {/* 버튼 영역은 드래그 이벤트를 안 달아서 클릭이 정상 동작 */}
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