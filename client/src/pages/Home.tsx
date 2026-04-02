import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import RightSideNav from "@/components/RightSideNav";

import HomeSection from "@/sections/Home/00_MainSection";
import AboutSection from "@/sections/Home/01_AboutSection";
import SolutionsSection from "@/sections/Home/02_SolutionsSection";
import SmartFactorySection from "@/sections/Home/03_SmartFactorySection";
import HomeRetrofitSection from "@/sections/Home/04_RetrofitSection";
import HomeHMISection from "@/sections/Home/05_HMISection";
import HomeCTASection from "@/sections/Home/99_CTASection";

/**
 * WAFF Company Introduction Website
 * Design: Minimalism + Tech Focus
 * Color: Deep Navy (#0F172A) + White + Tech Blue (#0EA5E9) + Lime Green (#84CC16)
 * Typography: Poppins (Bold) for headers, Inter (Regular) for body
 */

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
      setShowFloatingButton(scrollTop > 300);
      setShowScrollHint(scrollTop < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>WAFF | 제조 혁신 DX·OT·IT 파트너</title>
        <meta
          name="description"
          content="WAFF는 CNC 개조(Retrofit), OT/IT 서비스, 제조 AI를 통해 스마트팩토리 전환을 지원합니다."
        />
        <link rel="canonical" href="https://www.waff.co.kr/" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="WAFF | 제조 혁신 DX·OT·IT 파트너" />
        <meta
          property="og:description"
          content="CNC 개조(Retrofit)부터 제조 AI까지, WAFF의 제조 혁신 서비스를 확인하세요."
        />
        <meta property="og:url" content="https://www.waff.co.kr/" />
        <meta property="og:image" content="https://www.waff.co.kr/images/logos/logoKR.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="WAFF | 제조 혁신 DX·OT·IT 파트너" />
        <meta
          name="twitter:description"
          content="CNC 개조(Retrofit)부터 제조 AI까지, WAFF의 제조 혁신 서비스를 확인하세요."
        />
        <meta name="twitter:image" content="https://www.waff.co.kr/images/logos/logoKR.png" />
      </Helmet>

      <div className="min-h-screen bg-white flex flex-col">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-secondary/20">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Scroll Hint */}
        {showScrollHint && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <svg
                className="w-6 h-6 text-primary animate-pulse"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-xs text-muted-foreground font-medium">스크롤</span>
            </div>
          </div>
        )}

        {/* 배너 네비게이션 */}
        <RightSideNav
          items={[
          { id: "home", label: "Intro" },
          { id: "about", label: "회사개요" },
          { id: "core-solutions", label: "핵심 솔루션" },
          ]}
        />  
        {/* Hero Section - Home */}
        <HomeSection />
        {/* Company Introduction Section */}
        <AboutSection />
        {/* Core Solutions Section */}
        <SolutionsSection />
        {/* Smart Factory Section */}
        <SmartFactorySection />
        {/* CNC Retrofit Section */}
        <HomeRetrofitSection />
        {/* HMI Solution Section */}
        <HomeHMISection />
        {/* CTA Section */}
        <HomeCTASection />
        
        {/* Floating Button to Top */}
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
    </>
  );
}
