import { Reveal } from "@/components/Reveal";

export default function RetroReasonSection() {
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
                <h2 className="section-title">필요성</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  노후 CNC 장비의{" "}
                  <span className="text-destructive font-bold">문제점</span>
                  과 Retrofit의{" "}
                  <span className="text-accent font-bold">효과</span>
                  
                </p>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Reveal>
                <h2 className="text-3xl font-bold text-foreground mb-6">
                  노후 CNC 장비의{" "}
                  <span className="text-destructive font-bold">문제점</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">빈번한 트러블</p>
                      <p className="text-sm text-muted-foreground">부품 노후화로 인한 잦은 고장</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">생산 중단</p>
                      <p className="text-sm text-muted-foreground">가동 시간 감소로 생산성 저하</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">품질 저하</p>
                      <p className="text-sm text-muted-foreground">직각도, 평행도 오차로 불량 증가</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">×</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">높은 유지보수 비용</p>
                      <p className="text-sm text-muted-foreground">부품 구입 및 수리 비용 증가</p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <h2 className="text-3xl font-bold text-accent mb-6">CNC Retrofit 적용 후</h2>
                <div className="space-y-4">
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">안정적인 운영</p>
                      <p className="text-sm text-muted-foreground">최신 컨트롤러로 신뢰성 극대화</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">생산성 증가</p>
                      <p className="text-sm text-muted-foreground">가동 시간 증대로 생산량 증가</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">품질 개선</p>
                      <p className="text-sm text-muted-foreground">정밀도 향상으로 불량 감소</p>
                    </div>
                  </div>
                  <div className="flex gap-3 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">비용 절감</p>
                      <p className="text-sm text-muted-foreground">신규 구매 대비 비용 대폭 절감</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
    )
}