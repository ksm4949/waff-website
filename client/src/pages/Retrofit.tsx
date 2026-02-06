import { useEffect, useState } from "react"


import RightSideNav from "@/components/RightSideNav";

import RetroMainSection from "@/sections/Retrofit/00_mainSection";
import RetroReasonSection from "@/sections/Retrofit/01_reasonSection";
import RetroElSection from "@/sections/Retrofit/02_elementSection";
import RetroCaseSection from "@/sections/Retrofit/03_caseSection";
import RetroEffectSection from "@/sections/Retrofit/04_effectSection";
import RetroCTASection from "@/sections/Retrofit/99_ctaSection";
/**
 * CNC Retrofit Service Detail Page
 * Design: Minimalism + Tech Focus
 * Showcases CNC Retrofit features and benefits
 */

export default function Retrofit() {
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
    <div className="min-h-screen bg-white">
      <RightSideNav
        items={[
          { id: "retro_main", label: "CNC Retrofit" },
          { id: "retro_reason", label: "필요성" },
          { id: "retro_element", label: "구성 요소" },
          { id: "retro_case", label: "적용 사례" },
          { id: "retro_effect", label: "기대효과" },
        ]}
      />
      {/* Hero Section */}
      <RetroMainSection />
      {/* Problem & Solution Section */}
      <RetroReasonSection />
      {/* 구성요소 Section */}
      <RetroElSection />
      {/* 사례 Section */}
      <RetroCaseSection />
      {/* 기대효과 Section */}
      <RetroEffectSection />

      {/* CTA Section */}
      <RetroCTASection />

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
  );
}
