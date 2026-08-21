import { useEffect, useState } from "react"
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import RightSideNav from "@/components/RightSideNav";
import { useLanguage } from "@/contexts/LanguageContext";

import Service_OT_MainSection from "@/sections/OT_Services/00_MainSection";
import RetroMainSection from "@/sections/OT_Services/01_RetroMainSection";
import RetrofitSection from "@/sections/OT_Services/02_RetrofitSection";
import RetroElSection from "@/sections/OT_Services/03_elementSection";
import RetroReasonSection from "@/sections/OT_Services/03_reasonSection";
import RetroEffectSection from "@/sections/OT_Services/04_effectSection";
import RetroCaseSection from "@/sections/OT_Services/05_caseSection";
import HMISection from "@/sections/OT_Services/06_HMISection";

export default function OT_Services() {
    const { text } = useLanguage();
    const [location] = useLocation();
    const [showFloatingButton, setShowFloatingButton] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const isCncLanding = location === "/cnc-retrofit" || location === "/fanuc-cnc-retrofit";
    const pageTitle = isCncLanding
      ? text("화낙 CNC 개조·CNC Retrofit 전문 | WAFF", "FANUC CNC Retrofit Specialist | WAFF")
      : text("CNC Retrofit / OT 서비스 | WAFF", "CNC Retrofit / OT Services | WAFF");
    const pageDescription =
      text("WAFF는 화낙(FANUC) CNC 개조, CNC Retrofit, 컨트롤러·서보·스핀들·전장·조작반·케이블 교체, PLC Ladder 개선과 FOCAS/MES 데이터 연동을 지원합니다.", "WAFF supports FANUC CNC retrofit, controller, servo, spindle, electrical cabinet, panel, and cable upgrades, PLC ladder improvement, and FOCAS/MES data integration.");
    const canonicalUrl = isCncLanding
      ? `https://www.waff.co.kr${location}`
      : "https://www.waff.co.kr/otservice";

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
          <title>{pageTitle}</title>
          <meta
            name="description"
            content={pageDescription}
          />
          <meta
            name="keywords"
            content="화낙 CNC 개조, 화낙개조, FANUC retrofit, CNC Retrofit, CNC 개조 업체, 공작기계 리트로핏, PLC Ladder, FOCAS, MES 연동, 창원 CNC 개조"
          />
          <link rel="canonical" href={canonicalUrl} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={pageTitle} />
          <meta
            property="og:description"
            content={pageDescription}
          />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content="https://www.waff.co.kr/images/logos/logoKR.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:image" content="https://www.waff.co.kr/images/logos/logoKR.png" />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "@id": `${canonicalUrl}#service`,
              name: "화낙 CNC 개조 및 CNC Retrofit",
              alternateName: ["FANUC CNC Retrofit", "CNC 개조", "공작기계 리트로핏"],
              serviceType: "CNC Retrofit",
              provider: {
                "@type": "ProfessionalService",
                name: "WAFF",
                alternateName: "와프",
                url: "https://www.waff.co.kr/",
                telephone: "+82-55-288-0856",
              },
              areaServed: {
                "@type": "Country",
                name: "대한민국",
              },
              description: pageDescription,
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "CNC Retrofit 수행 범위",
                itemListElement: [
                  "FANUC/Siemens/Heidenhain 컨트롤러 교체",
                  "서보 앰프·서보 모터·스핀들 앰프 교체",
                  "전장 박스·조작반·케이블 개선",
                  "PLC Ladder 작성 및 인터록 제어",
                  "FOCAS·MES·설비 모니터링 데이터 연동",
                ].map((name) => ({
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name,
                  },
                })),
              },
            })}
          </script>
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
                { id: "ot_main", label: "OT Service" },
                { id: "retro_main", label: "CNC Retrofit" },
                { id: "retro_case", label: text("Retorfit 적용사례", "Retrofit Use Cases") },
                { id: "ot_hmi", label: "HMI" },
              ]}
            />

            <Service_OT_MainSection />
            {/* Retrofit */}
            <RetroMainSection />
            <RetrofitSection />
            <RetroElSection />
            <RetroReasonSection />
            <RetroEffectSection />
            <RetroCaseSection />
            {/* HMI */}
            <HMISection />

            {showFloatingButton && (
              <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-white hover:scale-110 animate-in fade-in slide-in-from-bottom-4"
                aria-label={text("맨 위로", "Back to top")}
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
