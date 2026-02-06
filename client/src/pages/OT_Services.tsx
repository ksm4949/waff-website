import { useEffect, useState } from "react"

import RightSideNav from "@/components/RightSideNav";

import Service_OT_MainSection from "@/sections/OT_Services/00_MainSection";
import RetrofitSection from "@/sections/OT_Services/01_RetrofitSection";
import HMISection from "@/sections/OT_Services/02_HMISection";

export default function OT_Services() {
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
                { id: "ot_main", label: "OT Service" },
                { id: "ot_retro", label: "CNC Retrofit" },
                { id: "ot_hmi", label: "HMI" },
              ]}
            />

            <Service_OT_MainSection />
            <RetrofitSection />
            <HMISection />

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