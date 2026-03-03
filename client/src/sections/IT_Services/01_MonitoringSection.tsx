import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Server, Settings, Monitor } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function MonitoringSection() {
    return (
        <section id="it_monitoring" className="py-20 md:py-32 bg-white">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">모니터링 / 제어 솔루션</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  데이터 모니터링 및 통합 제어 프로그램{" "}
                  <span className="text-accent font-bold">W-CMS</span>
                  <br/>
                  <span className="text-accent font-bold">실시간 데이터</span>
                  {" "}기반 통합 관제 시스템 구축
                </p>
              </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
              {/* Left */}
              <div className="flex flex-col gap-8 ">
                  <Reveal className="h-full relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                    <img
                      src="/images/it_services/monitoring.png"
                      alt="monitoring"
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
                          <h3 className="text-xl font-bold text-foreground mb-3">데이터 수집 에이전트 개발</h3>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />장비에서 데이터 수집 후 DB저장
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" />전문적인 데이터 분석 UI 구성 및 개발
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
                        <h3 className="text-xl font-bold text-foreground mb-3">모니터링 및 제어</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />피드 자동제어, 툴 파손감지, 툴라이프 관리
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />프로그램 전송 및 백업
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
