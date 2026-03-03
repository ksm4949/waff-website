import { Reveal } from "@/components/Reveal";
import { Cpu, Award } from "lucide-react";

export default function TechnologySection () {
    return (
        <section id="technology" className="py-20 md:py-32 bg-white animate-fade-in-up border-t-4 border-primary/10">
            <div className="container">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="section-title">기술력과 인증</h2>
                    </Reveal>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                    <Reveal>
                        <p className="section-subtitle">
                            탁월한 기술력은 와프의 생명입니다. 
                            <br/>
                            끊임없는 개발과 연구를 통해 입증된 기술력을 보유하고 있습니다.
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
                            <h3 className="text-xl font-bold text-foreground mb-3">기술 역량</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            W-CMS / W-MES 저작권 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            능동 피드제어 저작권 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            CNC파일전송 저작권 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            툴파손검출 저작권 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            특허_공작기계의 CNC 가공 시 절삭속도 자동 제어 방법 및 장치 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            특허_스핀들 부하율을 활용한 공구마모 및 교체시점 예측시스템 및 방법 등록
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            출원_툴파손 감지방법 및 시스템 등록
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
                            <h3 className="text-xl font-bold text-foreground mb-3">인증</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            ISO 9001, ISO 14001 인증
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            연구개발 전담부서 인정서 인증
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            기술역량 우수기업 인증
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            클린 사업장 인증
                            </li>
                            <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                            벤처 기업 인증
                            </li>
                        </ul>
                    </div>
                        </Reveal>
                    </div>
                    {/* Right: Image */}
                    <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                      <img
                        src="/images/intro/award.jpg"
                        alt="award"
                        className="w-full h-[520px] md:h-full object-cover"
                      />
                    </Reveal>
                </div>
            </div>
        </section>
    )
}
