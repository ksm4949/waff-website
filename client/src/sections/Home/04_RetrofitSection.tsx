import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function HomeRetrofitSection() {
    return (
        <section id="home_retrofit" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">CNC Retrofit</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              노후 장비를 최신 기술로 업그레이드하는{" "} 
              <span className="text-accent font-bold">경제적 솔루션</span>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Reveal>
              <div className="bg-white/80 p-6 rounded-xl border border-primary/20 backdrop-blur-sm transition-all duration-300">
                <h3 className="font-bold text-lg text-foreground mb-3">신규 구매 대비 비용 대폭 절감</h3>
                <p className="text-muted-foreground text-sm">
                  기존 설비 구조를 활용하면서 최신 컨트롤러, 서보 모터, 센서를 적용하여 신규 구매 대비 훨씬 경제적입니다.
                </p>
              </div>
              </Reveal>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">FANUC 최신 컨트롤러 적용</h4>
                    <p className="text-sm text-muted-foreground">최신 모델로 성능 극대화</p>
                  </Reveal>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">고성능 서보 모터 교체</h4>
                    <p className="text-sm text-muted-foreground">정밀도 향상 및 에너지 효율성 개선</p>
                  </Reveal>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">20년 이상 안정적 운영</h4>
                    <p className="text-sm text-muted-foreground">최신 기술로 업그레이드되어 장기간 사용 가능</p>
                  </Reveal>
                </div>
              </div>

              <Reveal>
              <a href="/otservice/retrofit">
                <Button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                  CNC Retrofit 상세 보기
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              </Reveal>
            </div>

            <Reveal className="relative h-96">
              <img
                src="/images/Landing/retrofit.png"
                alt="CNC Retrofit"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}