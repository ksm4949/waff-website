import { Reveal } from "@/components/Reveal";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
};

export default function SmartFactorySection() {
  const data: CardItem[] = [
      {
        title: "기획 / 설계",
        content: [
          "가상공간에서 제품 제작 전 시뮬레이션",
          "기간 단축, 맞춤형 제품 개발"
        ],
        img: "/images/Landing/smartfactory/smartfactory-card1.png"
      },
      {
        title: "생산",
        content: [
          "설비-자재-시스템 간 실시간 정보교환",
          "다품종 대량생산, 에너지 설비효율재고"
        ],
        img: "/images/Landing/smartfactory/smartfactory-card2.png"
      },
      {
        title: "유통 / 판매",
        content: [
          "생산현황에 맞춘 실시간 자동 수발주",
          "재고비용 감소, 품질 물류 등 전 분야 협력"
        ],
        img: "/images/Landing/smartfactory/smartfactory-card3.png"
      },
  ]
  return (
    <section id="home_smartfactory" className="py-20 md:py-32 bg-white animate-fade-in-up">
      <div className="container">
        <Reveal className="text-center mb-16">
                    <h2 className="section-title">스마트팩토리</h2>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                    <p className="section-subtitle">
                      설계, 개발 부터 생산과 출하에 이르기 까지의 과정에 정보통신기술(ICT)를 적용하여 생산성, 품질, 고객만족도를 향상시키는{" "}
                      <span className="text-accent font-bold">지능형 공장</span>
                      을 의미합니다.
                    </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
                <Reveal>
                <div className="bg-secondary/20 p-6 rounded-lg border border-border hover:shadow-lg hover:border-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                        <span className="text-accent">W-CMS</span>
                        {" "}(Waff-Control Management System)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        생산 현장의 모든 정보를 실시간으로 시각화하고 제어하는 통합 대시보드
                    </p>
                    <a href="/itservice/cms" className="text-sm text-accent font-semibold hover:underline inline-flex items-center gap-1 group">
                        자세히 보기 <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                </div>
                </Reveal>

                <Reveal delay={300}>
                <div className="bg-secondary/20 p-6 rounded-lg border border-border hover:shadow-lg hover:border-accent transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">
                        <span className="text-accent">W-MES</span>
                        {" "}(Waff-Manufacturing Execution System)
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        생산 계획부터 실적 관리까지 전 과정을 통합 관리하는 시스템
                    </p>
                    {/* <a href="/example/mes" className="text-sm text-accent font-semibold hover:underline inline-flex items-center gap-1 group">
                      자세히 보기 <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a> */}
                </div>
                </Reveal>
            </div>
            <Reveal delay={900} className="relative h-96">
                <img
                    src="/images/Landing/smartfactory/smartfactory.png"
                    alt="Smart Factory"
                    className="w-full h-full rounded-lg overflow-hidden"
                />
            </Reveal>
        </div>
        <div className="bg-white rounded-lg p-8 md:p-12 border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300">
          <Reveal>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">스마트팩토리의 기대효과</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center hover:scale-110 transition-transform duration-300 cursor-default">
              <Reveal delay={200} className="text-4xl font-bold text-primary mb-2 animate-pulse">생산 효율 증가</Reveal>
              {/* <p className="text-sm text-muted-foreground">생산 효율 증가</p> */}
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300 cursor-default">
              <Reveal delay={400} className="text-4xl font-bold text-accent mb-2 animate-pulse">불량률 감소</Reveal>
              {/* <p className="text-sm text-muted-foreground">불량률 감소</p> */}
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300 cursor-default">
              <Reveal delay={600} className="text-4xl font-bold text-primary mb-2 animate-pulse">의사결정 시간 단축</Reveal>
              {/* <p className="text-sm text-muted-foreground">의사결정 시간 단축</p> */}
            </div>
            <div className="text-center hover:scale-110 transition-transform duration-300 cursor-default">
              <Reveal delay={800} className="text-4xl font-bold text-accent mb-2 animate-pulse">운영 비용 절감</Reveal>
              {/* <p className="text-sm text-muted-foreground">운영 비용 절감</p> */}
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="container mx-auto px-4">
            {/* Top badge / message */}
            <div className="mb-8 text-center">
                <div className="inline-block px-4 py-2 bg-primary rounded-full">
                <span className="text-sm font-semibold text-white">
                    모든 제조과정이 똑똑해집니다
                </span>
                </div>
            </div>
            {/* Cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item, index) => (
                <Reveal delay={index*300}>
                <div
                    key={index}
                    className="bg-secondary/20 rounded-2xl border overflow-hidden h-full flex flex-col hover:border-accent hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                    {/* Image */}
                    <div className="aspect-[16/10] w-full bg-gray-100">
                        <img
                            src={item.img}
                            alt={item.title}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    {/* Text */}
                    <div className="p-5 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
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
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}