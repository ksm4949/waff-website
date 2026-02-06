import { Reveal } from "@/components/Reveal";

// CheckCircle2 icon component
function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function AboutSection() {
    return (
        <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50/30 animate-fade-in-up border-t border-border/40">
          {/* <div className="pointer-events-none absolute -left-40 -top-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-3xl" /> */}
          {/* <div className="pointer-events-none absolute -left-40 top-40 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" /> */}
          
        <div className="container">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">회사개요</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              제조 혁신을 이끄는 디지털 전환 파트너,{" "}
              <span className="font-bold tracking-tight text-accent">
                와프
              </span>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Reveal delay={200}>
                <h3 className="text-2xl font-bold text-foreground mb-4">와프(WAFF)란?</h3>
                <p className="text-muted-foreground leading-relaxed">
                    와프는{" "} 
                    <span className="font-bold text-lg text-accent">IT</span>
                    (데이터 수집&분석)와{" "} 
                    <span className="font-bold text-lg text-accent">OT</span>
                  (장비제어기술)의 역량을 모두 보유한 통합솔루션을 통해 제조업의 디지털 전환을 선도하는 기업입니다. 
                  기계 제어 기술과 소프트웨어 개발 역량을 바탕으로{" "}
                  <span className="font-bold">
                    스마트팩토리 구축, CNC 장비 현대화, HMI(사용자 친화적 인터페이스 개발)
                  </span>
                   {" "}등 토털 솔루션을 제공합니다.
                </p>
              </Reveal>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-foreground">핵심 가치</h3>
                <div className="space-y-3">
                  <Reveal delay={200}>
                    <div className="
                      flex gap-3
                      transition-all duration-300 ease-out
                      hover:scale-[1.03]
                      hover:bg-muted/40
                      rounded-lg
                      p-2
                    ">
                      <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">기술 혁신</p>
                        <p className="text-sm text-muted-foreground">최신 기술을 활용한 지속적인 혁신</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={400}>
                    <div className="
                      flex gap-3
                      transition-all duration-300 ease-out
                      hover:scale-[1.03]
                      hover:bg-muted/40
                      rounded-lg
                      p-2
                    ">
                      <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">고객 중심</p>
                        <p className="text-sm text-muted-foreground">고객의 요구사항을 최우선으로 고려</p>
                      </div>
                    </div>
                  </Reveal>
                  <Reveal delay={600}>
                    <div className="
                      flex gap-3
                      transition-all duration-300 ease-out
                      hover:scale-[1.03]
                      hover:bg-muted/40
                      rounded-lg
                      p-2
                    ">
                      <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">지속 가능성</p>
                        <p className="text-sm text-muted-foreground">장기적인 파트너십과 안정적인 운영</p>
                      </div>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>

            <Reveal delay={1000} className="relative h-96">
              <img
                src="/images/Landing/about.png"
                alt="Company Introduction"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}