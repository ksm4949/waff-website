import { useEffect, useState } from "react"
import { useLocation } from "wouter";

import RightSideNav from "@/components/RightSideNav";

import Service_IT_MainSection from "@/sections/IT_Services/00_MainSection";
import MonitoringSection from "@/sections/IT_Services/01_MonitoringSection";
import ManageSection from "@/sections/IT_Services/02_ManageSection";
import AiSection from "@/sections/IT_Services/03_AiSection";
import PMSection from "@/sections/IT_Services/04_PMSection";

export default function IT_Services() {
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [location] = useLocation();

    // 페이지 로드 시 최상단으로 이동
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // URL 해시에 따른 섹션 스크롤
    useEffect(() => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) {
            const headerOffset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }, [location]);

    // 스크롤 이벤트 리스너
    useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
        
          setShowFloatingButton(scrollTop > 300);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <RightSideNav
              items={[
                { id: "it_main", label: "IT Service" },
                { id: "it_monitoring", label: "모니터링 / 제어 솔루션" },
                { id: "it_manage", label: "관리 솔루션" },
                { id: "it_ai", label: "AI 기반 솔루션" },
                { id: "it_pm", label: "생산관리 솔루션" },
              ]}
            />

            <Service_IT_MainSection />
            <MonitoringSection />
            <ManageSection />
            <AiSection />
            <PMSection />

            {showFloatingButton && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 animate-in fade-in slide-in-from-bottom-4"
                aria-label="맨 위로"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              </button>
            )}
        </div>
    )
}