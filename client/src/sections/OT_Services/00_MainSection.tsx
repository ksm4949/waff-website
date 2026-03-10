import { Wrench, User } from "lucide-react";

export default function Service_OT_MainSection () {
    return (
        <section 
          id="ot_main" 
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
            <div className="text-center mb-16">
              <h2 className="section-title">OT Services</h2>
              <div className="divider-modern mx-auto w-24 mb-6" />
              {/* <p className="section-subtitle">
                <span className="font-bold">CNC Retrofit / HMI 솔루션</span>
              </p> */}
            </div>
              
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                onClick={() => {
                  document.getElementById('retro_main')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col h-full group bg-secondary/20 rounded-lg p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <Wrench className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">CNC Retrofit</h3>
                <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">Retrofit을 통해 컨트롤러와 서보 모터, 케이블, 판넬 등을 교체하여 저비용으로 20년 이상 사용 가능하도록 최신장비로 업그레이드</h4>
                      <p className="text-sm text-muted-foreground">노후화된 CNC 장비는 잦은 트러블로 생산 가동 시간이 현저히 줄어들고 장비의 직각도나 평행도가 틀어져 품질 이슈가 발생할 확률이 높습니다.</p>
                    </div>
                </div>
                
                <div className="mt-auto text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                  상세 보기 →
                </div>
              </div>
              
              <div 
                onClick={() => {
                  document.getElementById('ot_hmi')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col h-full group bg-secondary/20 rounded-lg p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 transition-colors">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">HMI(Human-Machine Interface) 솔루션</h3>
                <div className="flex gap-3 mb-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                    <div>
                      <h4 className="font-semibold text-foreground">공장 환경에 맞는 수집 데이터 설계를 바탕으로 다양한 데이터를 수집해 화면 인터페이스로 구현합니다.</h4>
                      <p className="text-sm text-muted-foreground">PLC 바탕으로 데이터 수집 / Interface 설계 및 구현</p>
                    </div>
                </div>
              
                <div className="mt-auto text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                  상세 보기 →
                </div>
              </div>
              
            </div>
          </div>
        </section>
    )
}