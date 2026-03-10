import { Reveal } from "@/components/Reveal";

export default function CMS_ProcessSection() {
    return (
        <section 
            id="cms_process" 
            // className="py-20 md:py-32 bg-white"
            className="relative py-24 md:py-36 bg-white overflow-hidden"
        >
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