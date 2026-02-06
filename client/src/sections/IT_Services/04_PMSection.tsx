import { Reveal } from "@/components/Reveal";
import { Database } from "lucide-react";

export default function PMSection() {
    return (
        <section id="it_pm" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-8">
                  <Reveal className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                            <Database className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">W-MES 차별점</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
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
              {/* Right */}
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white">
                  <img
                    src="/images/it_services/pm.png"
                    alt="W-MES"
                    className="w-full h-full md:h-full"
                  />
              </Reveal>
          </div>
        </div>
      </section>
    )
}