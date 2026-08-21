import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Server, Settings, Monitor } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MonitoringSection() {
  const { text } = useLanguage();
  return (
      <section 
        id="it_monitoring" 
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
              <h2 className="section-title">{text("모니터링 / 제어 솔루션", "Monitoring / Control Solutions")}</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  {text("데이터 모니터링 및 통합 제어 프로그램 W-CMS를 기반으로 실시간 데이터 기반 통합 관제 시스템을 구축합니다.", "Build an integrated real-time monitoring and control system with W-CMS, our data monitoring and control platform.")}
                </p>
              </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
              {/* Left */}
              <div className="flex flex-col gap-8 ">
                  <Reveal className="h-full relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                    <img
                      src="/images/it_services/monitoring.png"
                      alt={text("스마트팩토리 구축, 모니터링", "Smart factory monitoring")}
                      className="w-full h-full md:h-full object-center"
                    />
                  </Reveal>
              </div>
              {/* Right */}
              <div className="flex flex-col gap-8">
                  <Reveal className="h-full ">
                    <div className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                              <Server className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3">{text("데이터 수집 에이전트 개발", "Data Collection Agent Development")}</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{text("장비에서 데이터 수집 후 DB저장", "Collect equipment data and store it in a database")}
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />{text("전문적인 데이터 분석 UI 구성 및 개발", "Design and develop professional data-analysis UIs")}
                          </li>
                        </ul>
                    </div>
                  </Reveal>

                  <Reveal>
                    <div className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <Settings className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-3">{text("모니터링 및 제어", "Monitoring and Control")}</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />{text("피드 자동제어, 툴 파손감지, 툴라이프 관리", "Automatic feed control, tool-breakage detection, and tool-life management")}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />{text("프로그램 전송 및 백업", "Program transfer and backup")}
                        </li>
                      </ul>
                    </div>
                  </Reveal>
              </div>
          </div>
        </div>
      </section>
    )
}
