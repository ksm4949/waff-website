import { Reveal } from "@/components/Reveal";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
};

export default function PointSection() {
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
        <section id="comp_point" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">와프(WAFF)</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <Reveal delay={200}>
              <p className="section-subtitle text-foreground">
                <span className="text-accent font-bold text-2xl">IT</span>(데이터수집&분석)와{" "}
                <span className="text-accent font-bold text-2xl">OT</span>(장비제어기술) 역량을 모두 보유한{" "} 
                <span className="text-accent font-bold text-2xl">통합 솔루션</span>
                {" "}전문 기업
              </p>
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
                alt="사업부"
                className="w-full max-w-6xl rounded-2xl shadow-lg object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>
    )
}