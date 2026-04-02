import { useEffect, useState } from "react"
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import RightSideNav from "@/components/RightSideNav";

import Service_IT_MainSection from "@/sections/IT_Services/00_MainSection";
import MonitoringSection from "@/sections/IT_Services/01_MonitoringSection";
import CMS_MainSection from "@/sections/IT_Services/02_wcmsSection";
import CMS_KeySection from "@/sections/IT_Services/02.1_cmsKeySection";
import CMS_ProcessSection from "@/sections/IT_Services/02.2_cmsProcSection";
import CMS_CaseSection from "@/sections/IT_Services/02.3_cmsCaseSection";
import AiSection from "@/sections/IT_Services/03_AiSection";
import ManageSection from "@/sections/IT_Services/04_ManageSection";
import PMSection from "@/sections/IT_Services/05_PMSection";

export default function IT_Services() {
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
      <>
        <Helmet>
          <title>IT 서비스 | WAFF</title>
          <meta
            name="description"
            content="WAFF IT 서비스: MES, CMS, 데이터 연동 및 제조 현장 맞춤형 디지털 전환 솔루션을 제공합니다."
          />
          <link rel="canonical" href="https://www.waff.co.kr/itservice" />

          <meta property="og:type" content="website" />
          <meta property="og:title" content="IT 서비스 | WAFF" />
          <meta
            property="og:description"
            content="제조 데이터 통합과 운영 최적화를 위한 WAFF IT 서비스를 확인하세요."
          />
          <meta property="og:url" content="https://www.waff.co.kr/itservice" />
          <meta property="og:image" content="https://www.waff.co.kr/images/logos/logoKR.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="IT 서비스 | WAFF" />
          <meta
            name="twitter:description"
            content="제조 데이터 통합과 운영 최적화를 위한 WAFF IT 서비스를 확인하세요."
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

            <RightSideNav
              items={[
                { id: "it_main", label: "IT Service" },
                { id: "it_monitoring", label: "모니터링 / 제어 솔루션" },
                { id: "cms_main", label: "W-CMS" },
                { id: "cms_case", label: "W-CMS 적용사례" },
                { id: "it_ai", label: "AI 기반 솔루션" },
                { id: "it_manage", label: "관리 솔루션" },
                { id: "it_pm", label: "생산관리 솔루션" },
              ]}
            />

            {/* Main */}
            <Service_IT_MainSection />
            {/* Monitoring */}
            <MonitoringSection />
            {/* WCMS */}
            <CMS_MainSection />
            <CMS_KeySection />
            <CMS_ProcessSection />
            <CMS_CaseSection />
            {/* AI */}
            <AiSection />
            {/* Manage */}
            <ManageSection />
            {/* MES */}
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
      </>
    )
}