import { Reveal } from "@/components/Reveal";
import { TrendingUp, Zap, CheckCircle2, BarChart3 } from "lucide-react";

export default function RetroEffectSection() {
    return (
        <section id="retro_effect" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="section-title">기대효과</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <Reveal>
              <p className="section-subtitle">
                CNC Retrofit 도입으로 얻을 수 있는 기대효과
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">생산성 증가</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                가동 시간 증대와 생산 속도 향상으로 전체 생산량이 증가합니다.
              </p>
            </Reveal>

            <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-1">불량률 감소</h3>
                </div>
              </div>
              <p className="text-muted-foreground">
                향상된 정밀도로 불량률이 감소하고 품질이 개선됩니다.
              </p>
            </Reveal>

            <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary ">유지보수 비용 절감</h3>
                  <p className="font-semibold text-foreground"></p>
                </div>
              </div>
              <p className="text-muted-foreground">
                안정적인 운영으로 수리 빈도가 감소하고 유지보수 비용이 절감됩니다.
              </p>
            </Reveal>

            <Reveal className="bg-white p-8 rounded-lg border border-border hover:border-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-accent mb-1">장기 운영 가능</h3>
                  <p className="font-semibold text-foreground"></p>
                </div>
              </div>
              <p className="text-muted-foreground">
                최신 기술로 업그레이드되어 20년 이상 안정적으로 운영할 수 있습니다.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    )
}