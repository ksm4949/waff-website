import { Reveal } from "@/components/Reveal";
import { Cpu, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TechnologySection () {
    const { text } = useLanguage();
    return (
        <section id="technology" className="py-20 md:py-32 bg-white animate-fade-in-up border-t-4 border-primary/10">
            {/* 배경 눈금종이 효과 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,80,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,200,.04) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* 좌측상단 푸른색 그라데이션 */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
            />
            {/* 우측하단 옅은 주황색 그라데이션 */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
            />
            
            <div className="container">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="section-title">{text("기술력과 인증", "Technology & Certifications")}</h2>
                    </Reveal>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                    <Reveal>
                        <p className="section-subtitle">
                            {text("탁월한 기술력은 WAFF의 핵심입니다. 끊임없는 개발과 연구를 통해 입증된 기술력을 보유하고 있습니다.", "Technology excellence is at the core of WAFF. Our capabilities are proven through continuous research and development.")}
                        </p>
                    </Reveal>
                </div>

                {/* Main Tech & Certification Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
                    {/* Left: Cards */}
                    <div className="flex flex-col gap-8">
                        {/* Card 1 */}
                        <Reveal>
                    <div className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                                <Cpu className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{text("기술 역량", "Technology Capabilities")}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("W-CMS / W-MES 저작권 등록", "W-CMS / W-MES copyright registration")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("능동 피드제어 저작권 등록", "Active feed control copyright registration")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("CNC파일전송 저작권 등록", "CNC file-transfer copyright registration")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("툴파손검출 저작권 등록", "Tool-breakage detection copyright registration")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("특허_공작기계의 CNC 가공 시 절삭속도 자동 제어 방법 및 장치 등록", "Patent: automatic cutting-speed control method and device for CNC machining")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("특허_스핀들 부하율을 활용한 공구마모 및 교체시점 예측시스템 및 방법 등록", "Patent: tool-wear and replacement-time prediction system using spindle load")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("출원_툴파손 감지방법 및 시스템 등록", "Patent application: tool-breakage detection method and system")}
                            </li>
                        </ul>
                    </div>
                        </Reveal>
                        {/* Card 2 */}
                        <Reveal>
                    <div className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                                <Award className="w-6 h-6 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">{text("인증", "Certifications")}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("ISO 9001, ISO 14001 인증", "ISO 9001 and ISO 14001 certification")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("연구개발 전담부서 인정서 인증", "Certified in-house R&D department")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("기술역량 우수기업 인증", "Excellent technology-capability company certification")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("클린 사업장 인증", "Clean workplace certification")}
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            {text("벤처 기업 인증", "Venture business certification")}
                            </li>
                        </ul>
                    </div>
                        </Reveal>
                    </div>
                    {/* Right: Image */}
                    <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                      <img
                        src="/images/intro/award.jpg"
                        alt={text("수상 및 인증", "Awards and certifications")}
                        className="w-full h-[520px] md:h-full object-cover"
                      />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
