import { Reveal } from "@/components/Reveal";
import { Database } from "lucide-react";

export default function PMSection() {
    return (
        <section 
          id="it_pm" 
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
            <div className="text-center mb-16 items-center">
              <Reveal>
                <h2 className="section-title">생산관리 솔루션</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  <span className="font-bold text-accent text-lg">W-MES</span>
                  (Waff Manufacturing Execution System)는 <br/>
                  생산 현장의 데이터를 실시간으로 수집·분석하여 생산 활동을 관리하고 최적화하는 솔루션입니다.
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <Reveal className="h-full relative overflow-hidden rounded-lg border border-border bg-white shadow-lg">
                    <img
                      src="/images/it_services/pm.png"
                      alt="W-MES"
                      className="w-full h-full rounded-lg shadow-lg"
                    />
                </Reveal>
                {/* Right */}
                <div className="flex flex-col gap-8">
                    <Reveal className="h-full bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                              <Database className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground mb-3">W-MES 차별점</h3>
                        </div>
                        <ul className="space-y-2 text-lg text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />실시간 장비 데이터 연계
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />생산 실적 데이터 자동으로 수집
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />장비 가동 현황 분석
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />실시간 생산 계획 수립 및 실적 관리에 반영(APS)
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />불량률 및 품질 비용을 포함한 품질 데이터 통합 관리
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full" />외주/자재 관리를 연계한 공급망 기반 생산관리 지원
                          </li>
                        </ul>
                    </Reveal>
                </div>
            </div>
          </div>
        </section>
    )
}
