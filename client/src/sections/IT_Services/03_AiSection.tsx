import { Reveal } from "@/components/Reveal";
import { RefreshCw, BellRing } from "lucide-react";

export default function AiSection() {
    return (
        <section id="it_ai" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">AI 기반 솔루션</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-start">
            <div className="flex flex-col gap-8">
              <Reveal className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <RefreshCw className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">AI 공구교환 주기 예측</h3>
                  </div>
                  <p className="text-md text-muted-foreground leading-relaxed">
                    공구 사용 시간, 가공 속도 등 부하에 대한 AI 학습에 기반한 유동적인 교환주기 판단 및 제어
                  </p>
              </Reveal>
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                <img
                  src="/images/it_services/ai1.png"
                  alt="AI 공구교환 주기 예측"
                  className="w-full h-[240px] md:h-[300px] object-contain"
                />
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <Reveal className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <BellRing className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">AI 알람 분석</h3>
                  </div>
                  <p className="text-md text-muted-foreground leading-relaxed">
                    해당 알람 이전의 로그를 분석해서 해당 알람에 많은 영향을 준 항목을 선별하여 사용자에게 전달
                  </p>
              </Reveal>
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                <img
                  src="/images/it_services/ai2.png"
                  alt="AI 공구교환 주기 예측"
                  className="w-full h-[240px] md:h-[300px] object-contain"
                />
              </Reveal>
            </div>

          </div>
        </div>
      </section>
    )
}