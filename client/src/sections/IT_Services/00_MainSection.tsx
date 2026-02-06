import { ChartColumn, Wrench, Monitor, Brain } from "lucide-react";

export default function Service_IT_MainSection () {
    return (
        <section id="it_main" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="section-title">IT Services</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              <span className="text-accent font-bold">디지털 제조 전환</span>
              {" "}(CNC 설비제어, 실시간 모니터링, IoT 데이터 수집, AI 공정 최적화) <br/>
              <span className="text-accent font-bold">예측, 분석 솔루션</span>
              {" "}(AI공구 주기 예측, 장비 예지 보전)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => {
                document.getElementById('it_monitoring')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-primary rounded-lg p-8 flex flex-col h-full border-2 border-primary/20 hover:border-secondary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/80 transition-colors">
                <Monitor className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-3">모니터링 / 제어 솔루션</h3>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-white/90">W-CMS(Waff-Control Management System)</h4>
                    <p className="text-sm text-gray-300">IT와 OT 통합 역량을 기반으로 데이터 자동 변환/가공 및 기업 맞춤 인터페이스 제공 가능</p>
                  </div>
              </div>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-white/70">
                      <span className="text-white">실시간 데이터 기반 통합 관제 시스템 구축</span>
                    </h4>
                    <p className="text-sm text-gray-300">
                      생산현장을 실시간으로 보여주는 통합 대시보드 구축 <br/>
                      사용자 맞춤 화면 구성과 데이터 시각화를 통해 전체 현황 실시간 파악
                    </p>
                  </div>
              </div>
              <div className="mt-auto text-white font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>

            <div 
              onClick={() => {
                document.getElementById('it_manage')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-lg p-8 flex flex-col h-full border-2 border-accent/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Wrench className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">관리 솔루션</h3>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">공구 수명 관리</h4>
                    <p className="text-sm text-muted-foreground">공구별 기준 가공 횟수/시간 데이터를 바탕으로 적절한 교환주기에 알람이 발생</p>
                  </div>
              </div>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">가공 속도 제어</h4>
                    <p className="text-sm text-muted-foreground">소재 상태에 따라 부하를 자동 탐지해 스핀들 회전 속도 및 가공 Feed를 자동으로 가/감속</p>
                  </div>
              </div>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">데이터 변환 및 파일 전송</h4>
                    <p className="text-sm text-muted-foreground">PC와 기기간의 실시간 데이터 변환 및 전송을 통해 신속한 데이터 관리 및 공유 가능</p>
                  </div>
              </div>
              <div className="mt-auto text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>

            <div 
              onClick={() => {
                document.getElementById('it_ai')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-lg p-8 flex flex-col h-full border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Brain className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">AI 기반 솔루션</h3>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">AI공구교환주기 예측</h4>
                    <p className="text-sm text-muted-foreground">공구 사용 시간, 가공 속도 등 부하에 대한 AI 학습에 기반한 유동적인 교환주기 판단 및 제어</p>
                  </div>
              </div>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">AI알람 분석</h4>
                    <p className="text-sm text-muted-foreground">해당 알람 이전의 로그를 분석해서 해당 알람에 많은 영향을 준 컬럼(항목)을 선별하여 사용자에게 전달</p>
                  </div>
              </div>
              
              <div className="mt-auto text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>

            <div 
              onClick={() => {
                document.getElementById('it_pm')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-lg p-8 flex flex-col h-full border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <ChartColumn className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">생산관리 솔루션</h3>
              <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-foreground">W-MES(Waff Manufacturing Execution System)</h4>
                    <p className="text-sm text-muted-foreground">생산 현장의 데이터를 실시간으로 수집·분석하여 생산 활동을 관리하고 최적화
                    </p>
                  </div>
              </div>
              <div className="mt-auto text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>

          </div>
        </div>
      </section>
    )
}