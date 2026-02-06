import { useEffect, useState } from "react"


import RightSideNav from "@/components/RightSideNav";

import CMS_MainSection from "@/sections/CMS/00_mainSection";
import CMS_KeySection from "@/sections/CMS/01_keySection";
import CMS_ProcessSection from "@/sections/CMS/02_processSection";
import CMS_CaseSection from "@/sections/CMS/03_cassSection";
import CMS_CTASection from "@/sections/CMS/99_ctaSection";
/**
 * W-CMS Service Detail Page
 * Design: Minimalism + Tech Focus
 * Showcases W-CMS (Control Management System) features and benefits
 */

export default function CMS() {
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
          { id: "cms_main", label: "W-CMS" },
          { id: "cms_key", label: "주요기능" },
          { id: "cms_process", label: "도입 프로세스" },
          { id: "cms_case", label: "적용 사례" },
        ]}
      />

      {/* Hero Section */}
      <CMS_MainSection />
      {/* Key Features Section */}
      <CMS_KeySection />
      {/* Implementation Process */}
      <CMS_ProcessSection />
      {/* Example Section */}
      <CMS_CaseSection />
      {/* CTA Section */}
      <CMS_CTASection />

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
