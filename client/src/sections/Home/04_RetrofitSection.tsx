import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeRetrofitSection() {
    const { text } = useLanguage();
    return (
        <section id="home_retrofit" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">CNC Retrofit</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              {/* 노후 장비를 최신 기술로 업그레이드하는{" "} 
              <span className="text-accent font-bold">경제적 솔루션</span> */}
              {text("노후 장비를 화낙개조 중심의 CNC 개조로 업그레이드하고, 필요 시 오바훌까지 연계해 가동 안정성과 수명을 높입니다.", "Upgrade aging equipment with FANUC-focused CNC retrofit and optional overhaul services to improve operational stability and extend service life.")}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Reveal>
              <div className="bg-white/80 p-6 rounded-xl border border-primary/20 backdrop-blur-sm transition-all duration-300">
                <h3 className="font-bold text-lg text-foreground mb-3">
                  {/* 신규 구매 대비 비용 대폭 절감 */}
                  {text("신규 설비 대비 비용 효율적인 CNC 개조", "Cost-effective CNC retrofit compared with new equipment")}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {/* 기존 설비 구조를 활용하면서 최신 컨트롤러, 서보 모터, 센서를 적용하여 신규 구매 대비 훨씬 경제적입니다. */}
                  {text("기존 기계 구조를 최대한 활용하면서 화낙(FANUC), 지멘스, 하이데나인 제어 환경에 맞춰 핵심 부품을 교체·개선합니다.", "We retain as much of the existing machine structure as possible while replacing and improving key components for FANUC, Siemens, and Heidenhain control environments.")}
                </p>
              </div>
              </Reveal>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">
                      {/* FANUC 최신 컨트롤러 적용 */}
                      {text("화낙(FANUC) 중심 컨트롤러 개조", "FANUC-focused controller retrofit")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {/* 최신 모델로 성능 극대화 */}
                      {text("현장 조건에 맞는 CNC 개조로 제어 안정성과 유지보수 편의성을 높입니다.", "Site-specific CNC retrofit improves control stability and maintenance convenience.")}
                    </p>
                  </Reveal>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">
                      {/* 고성능 서보 모터 교체 */}
                      {text("지멘스·하이데나인 대응 확장", "Siemens and Heidenhain compatibility")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {/* 정밀도 향상 및 에너지 효율성 개선 */}
                      {text("설비 사양에 따라 지멘스/하이데나인 기반 개조 및 인터페이스 연동을 지원합니다.", "We support Siemens- and Heidenhain-based retrofits and interface integration according to equipment specifications.")}
                    </p>
                  </Reveal>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <Reveal>
                    <h4 className="font-semibold text-foreground">{text("20년 이상 안정적 운영", "Reliable operation for over 20 years")}</h4>
                    <p className="text-sm text-muted-foreground">{text("최신 장비로 교체되어 보다 장기간 사용 가능합니다.", "Modernized equipment enables substantially longer service life.")}</p>
                  </Reveal>
                </div>
              </div>

              <Reveal>
              <a href="/otservice#retro_main">
                <Button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2">
                  {text("CNC Retrofit 상세 보기", "Explore CNC Retrofit")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              </Reveal>
            </div>

            <Reveal className="relative h-96">
              <img
                src="/images/Landing/retrofit.png"
                alt={text("CNC Retrofit, 화낙개조, CNC 개조, 오바훌, 화낙/지멘스/하이데나인, FANUC", "CNC retrofit for FANUC, Siemens, and Heidenhain, with overhaul support")}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}
