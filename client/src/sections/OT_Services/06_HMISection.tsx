import { Reveal } from "@/components/Reveal";

export default function HMISection() {
    return (
        <section id="ot_hmi" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">HMI 솔루션</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <Reveal>
              <p className="section-subtitle">
                공장 환경에 맞는 수집 데이터 설계를 바탕으로 다양한 데이터를 수집해 화면 인터페이스로 구현합니다.
                <br/>
                {/* <span className="text-primary font-bold">사례 보기</span> */}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal className="relative h-96">
              <img
                src="/images/ot_service/hmi4.png"
                alt="HMI"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <h3 className="text-2xl font-bold text-foreground mb-4">HMI란?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  HMI는 공장 자동화 환경에서 설비와 작업자를 연결하는 핵심 인터페이스입니다. <br/>
                  각종 센서와 PLC 데이터를 실시간으로 수집·분석하여
                  운영 현황을 한눈에 파악할 수 있도록 제공합니다. <br/>

                  직관적인 그래픽 UI와 사용자 맞춤 설정 기능을 통해
                  복잡한 공정도 쉽고 빠르게 제어할 수 있으며, <br/>
                  설비 이상 감지 및 예방 유지보수를 지원합니다. <br/>

                  스마트팩토리 구현을 위한 필수 요소로,
                  생산 효율과 품질 경쟁력을 동시에 강화합니다.
                </p>
              </Reveal>

              {/* <div className="space-y-4">
                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">실시간 모니터링</h4>
                      <p className="text-sm text-muted-foreground">설비 상태를 실시간으로 확인하고 즉시 대응</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">맞춤형 화면 구성</h4>
                      <p className="text-sm text-muted-foreground">각 사용자 역할에 맞는 정보만 표시</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">높은 신뢰성</h4>
                      <p className="text-sm text-muted-foreground">산업용 표준 준수로 안정적인 운영 보장</p>
                    </div>
                  </div>
                </Reveal>
              </div> */}
            </div>
          </div>

        </div>
      </section>
    )
}