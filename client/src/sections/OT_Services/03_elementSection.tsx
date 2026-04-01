import {  Wrench, Zap, BarChart3, Cpu } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function RetroElSection() {
    return (
        <section id="retro_element" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="section-title">구성 요소</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <Reveal>
              <p className="section-subtitle">
                노후 장비를 현대화하기 위한 핵심 업그레이드 항목
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Component 1 */}
              <Reveal className="group bg-primary rounded-lg p-8 border-2 border-primary/20 hover:border-secondary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/80 transition-colors">
                  <Cpu className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-semibold text-white/90 mb-3">컨트롤러 교체</h3>
                <p className="text-gray-300 mb-4">
                  최신 CNC 컨트롤러(FANUC, SIEMENS 등)로 교체합니다. 
                  향상된 성능과 안정성을 제공합니다.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><span className="text-green-400 font-bold">✓</span> FANUC 0i-MF, 31i-MB5 등</li>
                  <li><span className="text-green-400 font-bold">✓</span> SIEMENS 최신 모델</li>
                  <li><span className="text-green-400 font-bold">✓</span> 높은 신뢰성 및 성능</li>
                </ul>
              </Reveal>
              {/* Component 2 */}
              <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">서보 모터 교체</h3>
                <p className="text-muted-foreground mb-4">
                  고성능 서보 모터와 스핀들 모터로 교체합니다. 
                  정밀한 제어와 높은 효율성을 제공합니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="text-green-400 font-bold">✓</span> FANUC AC 서보 모터</li>
                  <li><span className="text-green-400 font-bold">✓</span> 고정밀 스핀들</li>
                  <li><span className="text-green-400 font-bold">✓</span> 에너지 효율성</li>
                </ul>
              </Reveal>
              {/* Component 3 */}
              <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Wrench className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">판넬 및 케이블 교체</h3>
                <p className="text-muted-foreground mb-4">
                  OP(조작반)와 메인 판넬을 현대화합니다. 
                  케이블도 전량 교체하여 안정성을 극대화합니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="text-green-400 font-bold">✓</span> 최신 OP 패널</li>
                  <li><span className="text-green-400 font-bold">✓</span> 메인 판넬 업그레이드</li>
                  <li><span className="text-green-400 font-bold">✓</span> 전체 케이블 교체</li>
                </ul>
              </Reveal>
              {/* Component 4 */}
              <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">데이터 수집 고도화</h3>
                <p className="text-muted-foreground mb-4">
                  최신 컨트롤러와 센서로 고도화된 데이터 수집이 가능합니다. 
                  W-CMS, W-MES와 연동 가능합니다.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><span className="text-green-400 font-bold">✓</span> 고급 센서 장착</li>
                  <li><span className="text-green-400 font-bold">✓</span> 실시간 데이터 수집</li>
                  <li><span className="text-green-400 font-bold">✓</span> 시스템 연동</li>
                </ul>
              </Reveal>
            </div>

            <Reveal className="relative w-full overflow-hidden rounded-2xl shadow-xl h-full min-h-[320px] lg:min-h-0">
              <img
                src="/images/example/retro-tools.png"
                alt="CNC Retrofit 구성 요소, CNC 개조, 화낙/지멘스/하이데나인"
                className="w-full h-full object-fill"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}
