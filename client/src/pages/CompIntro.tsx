import { useEffect, useState } from "react"
import { useLocation } from "wouter";

import RightSideNav from "@/components/RightSideNav";

import IntroSection from "@/sections/CompIntro/00_IntroSection"
import VisionSection from "@/sections/CompIntro/02_VisionSection";
import OrganizationSection from "@/sections/CompIntro/03_OrganizationSection"
import TechnologySection from "@/sections/CompIntro/04_TechnologySection"
import PartnerSection from "@/sections/CompIntro/05_PartnerSection"
import HistorySection from "@/sections/CompIntro/06_HistorySection"
import ContactSection from "@/sections/CompIntro/07_ContactSection"

export default function CompIntro() {
  const [location] = useLocation();
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        setScrollProgress(scrolled);
        setShowFloatingButton(scrollTop > 300);
      };  

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
            {/* Scroll Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-secondary/20">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>

            <RightSideNav
              items={[
                { id: "intro", label: "인사말" },
                { id: "vision", label: "Vision" },
                { id: "org", label: "조직구성" },
                { id: "technology", label: "기술력과 인증" },
                { id: "partner", label: "주요 고객" },
                { id: "history", label: "연혁" },
                { id: "contact", label: "찾아오시는 길" },
              ]}
            />

            <IntroSection />
            <VisionSection />
            <OrganizationSection />
            <TechnologySection />
            <PartnerSection />
            <HistorySection />
            <ContactSection />

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