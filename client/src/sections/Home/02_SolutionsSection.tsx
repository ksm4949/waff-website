import { Cpu, Wrench, Monitor } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function SolutionsSection () {
    return (
        <section id="core-solutions" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">핵심 솔루션</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              <span className="text-accent font-bold">와프</span>
              의 세 가지 핵심 솔루션으로 제조 혁신을 실현하세요.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smart Factory Card */}
            <Reveal>
            <div 
              onClick={() => {
                document.getElementById('home_smartfactory')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex flex-col h-full group bg-primary rounded-lg p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="w-12 h-12 bg-accent/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/80 transition-colors">
                <Cpu className="w-6 h-6 text-white/70" />
              </div>
              <h3 className="text-xl font-bold text-white/90 mb-3">스마트팩토리</h3>
              <p className="text-gray-300 mb-4">
                설계, 개발 부터 생산과 출하에 이르기 까지의 과정에 정보통신기술(ICT)를 적용하여 생산성, 품질, 고객만족도를 향상시키는 지능형 공장
              </p>
              <div className="mt-auto text-white/90 font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>
            </Reveal>
            {/* CNC Retrofit Card */}
            <Reveal delay={500}>
            <div 
              onClick={() => {
                document.getElementById('home_retrofit')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-lg p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Wrench className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">CNC Retrofit</h3>
              <p className="text-muted-foreground mb-4">
                노후 장비를 최신 기술로 업그레이드하는 경제적 솔루션
              </p>
              <div className="mt-auto text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>
            </Reveal>
            {/* HMI Card */}
            <Reveal delay={1000}>
            <div 
              onClick={() => {
                document.getElementById('home_hmi')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-lg p-8 border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-2 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Monitor className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">HMI</h3>
              <p className="text-muted-foreground mb-4">
                직관적이고 사용자 친화적인 인터페이스로 설비 제어 단순화
              </p>
              <div className="mt-auto text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-1">
                상세 보기 →
              </div>
            </div>
            </Reveal>
          </div>
        </div>
      </section>
    )
}