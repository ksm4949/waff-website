import { Reveal } from "@/components/Reveal";

export default function CMS_ProcessSection() {
    return (
        <section id="cms_process" className="py-20 md:py-32 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="section-title">도입 프로세스</h2>
                    </Reveal>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                    <Reveal>
                        <p className="section-subtitle">
                            체계적인 단계별 도입으로 안정적인 운영을 보장합니다
                        </p>
                    </Reveal>
                </div>

                <Reveal className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { step: 1, title: "요구사항 분석", desc: "고객의 생산 프로세스와 요구사항을 상세히 분석합니다" },
                        { step: 2, title: "시스템 설계", desc: "맞춤형 대시보드와 기능을 설계합니다" },
                        { step: 3, title: "구현 및 테스트", desc: "시스템을 구현하고 철저히 테스트합니다" },
                        { step: 4, title: "운영 및 지원", desc: "안정적인 운영을 위해 지속적으로 지원합니다" },
                    ].map((item) => (
                        <div key={item.step} className="relative">
                            <div className="bg-secondary/20 p-6 rounded-lg border border-border h-full hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-white font-bold text-lg">{item.step}</span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                            {item.step < 4 && (
                              <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/20" />
                            )}
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}