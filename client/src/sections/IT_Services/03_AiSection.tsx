import { Reveal } from "@/components/Reveal";
import { RefreshCw, BellRing, Bot } from "lucide-react";

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
            <div className="flex flex-col gap-8 h-full">
              <Reveal className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <RefreshCw className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">AI 기반 CNC 공구 수명 예측 및 교환주기 최적화</h3>
                  </div>
                  <p className="text-md text-muted-foreground leading-relaxed">
                    공구 사용 시간, 가공 속도 등 부하에 대한 AI 학습에 기반한 유동적인 교환주기 판단 및 제어
                  </p>
              </Reveal>
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20 flex-1">
                <img
                  src="/images/it_services/ai1.png"
                  alt="AI 기반 CNC 공구 수명 예측 및 교환주기 최적화"
                  className="w-full h-full object-center"
                />
              </Reveal>
            </div>

            <div className="flex flex-col gap-8 h-full">
              <Reveal className="bg-secondary/20 p-8 rounded-lg border border-border hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <BellRing className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">CNC 알람 로그 기반 고장 원인 추론 및 예지보전 AI</h3>
                  </div>
                  <p className="text-md text-muted-foreground leading-relaxed">
                    해당 알람 이전의 로그를 분석해서 해당 알람에 많은 영향을 준 항목을 선별하여 사용자에게 전달
                  </p>
              </Reveal>
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-secondary/20 flex-1">
                <img
                  src="/images/it_services/ai2.png"
                  alt="CNC 알람 로그 기반 고장 원인 추론 및 예지보전 AI"
                  className="w-full h-full object-cover"
                />
              </Reveal>
            </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <Reveal>
                  <div className="bg-secondary/20 p-6 rounded-xl border border-primary/20 backdrop-blur-sm transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-xl text-foreground mb-3">Ontology-Driven RAG System</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                        <h4 className="font-semibold text-foreground">복잡하고 어려운 문제를 AI를 통해 쉽게 질문하고 답변 가능한 시스템</h4>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        산업 현장의 매뉴얼·노하우·데이터를 RAG 기반으로 통합하여 CNC 가공 장비의 알람·이상 대응을 <br/>
                        즉시 해결하여 설비의 다운타임을 감소시키는 지능형 AI-assistant 시스템
                      </p>
                    </div>
                  </div>
                </Reveal>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                    <Reveal>
                      <h4 className="font-semibold text-foreground">수기문서 데이터화</h4>
                      <p className="text-sm text-muted-foreground">가공장비 매뉴얼, AS노하우, 전기도면, 기계도면 등의{" "}
                        <span className="text-accent font-bold">수기문서를 전산화</span>
                        {" "}시켜 AI모델 학습데이터 인프라 구축</p>
                    </Reveal>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                    <Reveal>
                      <h4 className="font-semibold text-foreground">장비 알람 대응을 위한 AI모델 구축</h4>
                      <p className="text-sm text-muted-foreground">
                        장비 알람 발생시{" "}
                        <span className="text-accent font-bold">초보자</span>
                        도 AI-assistant모델을 통해 대화기반으로 원인/조치방법/점검절차를 안내 받아 <br/>
                        <span className="text-accent font-bold">즉시 현장 조치</span>
                        {" "}가능
                        </p>
                    </Reveal>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                    <Reveal>
                      <h4 className="font-semibold text-foreground">설비 다운타임 감소</h4>
                      <p className="text-sm text-muted-foreground">
                        간단한 오류도 AS업체 처리를 위해 대기 하거나, 자체진단 및 처리에 시간이 소요되었으나, <br/>
                        AI를 통해 직접 대응이 가능해져{" "}
                        <span className="text-accent font-bold">설비 다운타임 감소</span>
                      </p>
                    </Reveal>
                  </div>
                </div>
              </div>

              <Reveal className="relative border rounded-lg">
                <img
                  src="/images/it_services/ai_ontology1.png"
                  alt="Ontology Example"
                  className="w-full h-full object-center rounded-lg shadow-lg"
                />
              </Reveal>
            </div>
          </div>
        </section>
    )
}
