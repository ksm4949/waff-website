import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

const images = [
  "/images/it_services/cms.png",
  "/images/it_services/cms2.png",
  "/images/it_services/cms3.png",
];

export default function CMS_MainSection() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000); // 3초마다 변경

      return () => clearInterval(interval);
    }, []);

    return (
        <>
            <section id="cms_main" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6">
                                <span className="text-sm font-semibold text-white/90">IT·OT 통합 솔루션</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                                W-CMS
                                <span className="block text-lg text-muted-foreground font-normal mt-2">
                                Control Management System
                                </span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                                생산 현장을 실시간으로 보여주는 통합 대시보드. 사용자 맞춤 화면 구성과 데이터 시각화를 통해 전체 현황을 한눈에 파악하세요.
                            </p>
                        </div>

                        {/* <div className="relative h-96 md:h-full animate-float">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
                            <img
                            src="/images/it_services/cms.png"
                            alt="Smart Manufacturing"
                            className="relative w-full h-full object-cover rounded-2xl shadow-2xl border border-white/40"
                            />
                        </div> */}

                        <div className="relative h-[380px] ">
                          {/* Glow 배경 */}
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />                       

                          {/* 이미지 슬라이드 */}
                          {images.map((img, index) => (
                            <img
                              key={index}
                              src={img}
                              alt="Smart Manufacturing"
                              className={`
                                absolute inset-0 w-full h-full object-center rounded-2xl
                                shadow-2xl border border-white/40
                                transition-opacity duration-1000
                                ${index === current ? "opacity-100" : "opacity-0"}
                              `}
                            />
                          ))}                       
                        </div>

                    </div>
                </div>
            </section>
            <section className="py-20 md:py-32 bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="section-title">W-CMS란?</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    IT와 OT(Operational Technology)의 통합 역량을 기반으로 설계된{" "}
                                    <span className="text-accent font-bold">제어 관리 시스템</span>
                                    입니다. 
                                    생산 설비에서 수집된 데이터를 자동으로 변환·가공하여 기업의 요구사항에 맞는 맞춤형 인터페이스로 제공합니다.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg text-foreground">핵심 가치</h3>
                                <div className="space-y-3">
                                <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                    <p className="font-medium text-foreground">실시간 데이터 수집</p>
                                    <p className="text-sm text-muted-foreground">설비의 모든 정보를 실시간으로 수집하고 모니터링</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                    <p className="font-medium text-foreground">지능형 데이터 변환</p>
                                    <p className="text-sm text-muted-foreground">복잡한 데이터를 직관적인 형태로 자동 변환</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                    <div>
                                    <p className="font-medium text-foreground">맞춤형 인터페이스</p>
                                    <p className="text-sm text-muted-foreground">각 기업의 특성에 맞는 화면 구성 및 레이아웃</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-96 border rounded-lg">
                        <img
                            src="/images/example/cms_intro.png"
                            alt="W-CMS Dashboard"
                            className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}