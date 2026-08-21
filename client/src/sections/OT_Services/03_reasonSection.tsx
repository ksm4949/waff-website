import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RetroReasonSection() {
    const { text } = useLanguage();
    return (
        <section 
          id="retro_reason" 
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
                <h2 className="section-title">{text("필요성", "Why Retrofit?")}</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  {text("노후 CNC 장비의 문제점과 Retrofit의 효과", "Problems with aging CNC equipment and retrofit benefits")}
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  {text("노후 CNC 장비의 문제점", "Problems with Aging CNC Equipment")}
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("빈번한 트러블", "Frequent Failures")}</p>
                      <p className="text-sm text-muted-foreground">{text("부품 노후화로 인한 잦은 고장", "Frequent breakdowns due to aging parts")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("생산 중단", "Production Interruptions")}</p>
                      <p className="text-sm text-muted-foreground">{text("가동 시간 감소로 생산성 저하", "Reduced operating time lowers productivity")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("품질 저하", "Quality Deterioration")}</p>
                      <p className="text-sm text-muted-foreground">{text("직각도, 평행도 오차로 불량 증가", "Alignment errors increase defects")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("높은 유지보수 비용", "High Maintenance Costs")}</p>
                      <p className="text-sm text-muted-foreground">{text("부품 구입 및 수리 비용 증가", "Increasing parts and repair costs")}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <h2 className="text-3xl font-bold text-accent mb-6">{text("CNC Retrofit 적용 후", "After CNC Retrofit")}</h2>
                <div className="space-y-4">
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("안정적인 운영", "Reliable Operation")}</p>
                      <p className="text-sm text-muted-foreground">{text("최신 컨트롤러로 신뢰성 극대화", "Maximum reliability with modern controllers")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("생산성 증가", "Higher Productivity")}</p>
                      <p className="text-sm text-muted-foreground">{text("가동 시간 증대로 생산량 증가", "More operating time increases output")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("품질 개선", "Improved Quality")}</p>
                      <p className="text-sm text-muted-foreground">{text("정밀도 향상으로 불량 감소", "Higher precision reduces defects")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{text("비용 절감", "Cost Savings")}</p>
                      <p className="text-sm text-muted-foreground">{text("신규 구매 대비 비용 대폭 절감", "Substantially lower cost than buying new equipment")}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
    )
}
