import { Reveal } from "@/components/Reveal";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
};

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
    const data: CardItem[] = [
      {
        title: "중간 벤더 없이 'One-Stop 구축' 가능",
        content: [
          "하드웨어부터 소프트웨어까지 한번에 설계, 개발, 적용 가능",
          "커뮤니케이션 창구 하나로 일정과 품질 안정성 확보 가능"
        ],
        img: "/images/intro/intro_part1.png"
      },
      {
        title: "OT 현장 이해 바탕 실용적 IT 설계",
        content: [
          "단순한 시스템 개발이 아닌, '장비 운전 특성'을 이해한 상태에서 UX/UI나 MES/CMS를 구현하는 현장 밀착형 솔루션",
        ],
        img: "/images/intro/intro_part2.png"
      },
      {
        title: "빠른 문제 해결과 유지보수 용이성",
        content: [
          "비통합된 타사 대비 설비 이상, 데이터 오류 발생 시에도 원인 파악과 개선이 빠름",
        ],
        img: "/images/intro/intro_part3.png"
      },
    ]

    return (
        <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-white to-blue-50/30 animate-fade-in-up border-t border-border/40">
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
          <Reveal className="text-center mb-16">
            <h2 className="section-title">회사개요</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              {/* 제조 혁신을 이끄는 디지털 전환 파트너,{" "} */}
              스마트팩토리·CNC 개조·제조 DX 전문 {" "}
              <span className="font-bold tracking-tight text-accent">
                와프
              </span>
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Reveal delay={200}>
                <h3 className="text-2xl font-bold text-foreground mb-4">와프(WAFF)는</h3>
                <p className="text-muted-foreground leading-relaxed">
                    <span className="font-bold text-lg text-accent">IT</span>
                    (데이터 수집&분석)와{" "} 
                    <span className="font-bold text-lg text-accent">OT</span>
                  (장비제어기술)의 역량을 모두 보유한 통합솔루션을 통해 제조업의 디지털 전환을 선도하는 기업입니다. 
                  기계 제어 기술과 소프트웨어 개발 역량을 바탕으로{" "}
                  <span className="font-bold">
                    스마트팩토리 구축, CNC 개조, HMI(사용자 친화적 인터페이스 개발)
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

          <div className="mt-24">
            <div className="container mx-auto px-4">
                {/* Top badge / message */}
                <Reveal className="mb-8 text-left">
                    <div className="inline-block px-4 py-2 bg-primary rounded-full">
                    <span className="text-sm font-semibold text-white/90">
                        통합 기업의 강점
                    </span>
                    </div>
                </Reveal>
                {/* Cards grid */}
                <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((item, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border overflow-hidden h-full flex flex-col hover:border-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                    >
                        {/* Image */}
                        <div className="aspect-[16/10] w-full bg-gray-100">
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[400px] w-full object-center"
                            />
                        </div>
                        {/* Text */}
                        <div className="p-5 flex-1 flex flex-col bg-white">
                            <h3 className="text-lg font-semibold ">{item.title}</h3>
                            <div className="mt-2 text-sm text-gray-600 leading-relaxed space-y-2">
                                {item.content?.map((text, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                                    <p>{text}</p>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    ))}
                </Reveal>
            </div>

            <Reveal className="mt-16 flex justify-center">
              <img
                src="/images/intro/intro_part.png"
                alt="사업부 소개. 스마트팩토리/CNC 개조/HMI/제조 AI/MES/CMS"
                className="w-full max-w-6xl rounded-2xl shadow-lg object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}