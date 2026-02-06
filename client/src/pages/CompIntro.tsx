import { useEffect, useState } from "react"

import RightSideNav from "@/components/RightSideNav";

import IntroSection from "@/sections/CompIntro/00_IntroSection"
import PointSection from "@/sections/CompIntro/01_PointSection";
import VisionSection from "@/sections/CompIntro/02_VisionSection";
import OrganizationSection from "@/sections/CompIntro/03_OrganizationSection"
import TechnologySection from "@/sections/CompIntro/04_TechnologySection"
import PartnerSection from "@/sections/CompIntro/05_PartnerSection"
import HistorySection from "@/sections/CompIntro/06_HistorySection"

export default function CompIntro() {
    const [showFloatingButton, setShowFloatingButton] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                { id: "intro", label: "인사말" },
                { id: "comp_point", label: "와프(WAFF)" },
                { id: "vision", label: "Vision" },
                { id: "org", label: "조직구성" },
                { id: "technology", label: "기술력과 인증" },
                { id: "partner", label: "협력사" },
                { id: "history", label: "연혁" },
              ]}
            />

            <IntroSection />
            <PointSection />
            <VisionSection />
            <OrganizationSection />
            <TechnologySection />
            <PartnerSection />
            <HistorySection />

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