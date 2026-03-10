import { Reveal } from "@/components/Reveal";
import { LayoutDashboard, Cog } from "lucide-react";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
};

const effectItems = [
  {
    label: "생산 효율",
    value: "29.92%",
    trend: "↑",
    description: "공정 흐름 최적화로 생산성 향상",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    label: "불량률",
    value: "88.06%",
    trend: "↓",
    description: "품질 수준 획기적 개선",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
  {
    label: "리드타임",
    value: "10.45%",
    trend: "↓",
    description: "수주출하 리드타임 단축",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/30",
  },
  {
    label: "운영 비용",
    value: "13.16%",
    trend: "↓",
    description: "'작업공수' 감소를 통한 비용 절감 효과",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/30",
  },
];

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
    <section 
      id="home_smartfactory" 
      // className="py-20 md:py-32 bg-white animate-fade-in-up"
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


      <div className="container relative z-10">
        <Reveal className="text-center mb-20">
          {/* <h2 className="section-title"> */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-5">
            스마트팩토리
          </h2>
          {/* <div className="divider-modern mx-auto w-24 mb-6" /> */}
          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-primary/40" />
            <div className="h-1.5 w-8 rounded-full bg-primary" />
            <div className="h-px w-12 bg-primary/40" />
          </div>
          {/* <p className="section-subtitle"> */}
          <p className="section-subtitle max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
            설계, 개발 부터 생산과 출하에 이르기 까지의 과정에 정보통신기술(ICT)를 적용하여 <br/>
            생산성, 품질, 고객만족도를 향상시키는{" "}
            <span className="text-accent font-bold">지능형 공장</span>
            을 의미합니다.
          </p>
        </Reveal>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 md:min-h-[28rem] md:items-stretch">
          <div className="flex h-full flex-col gap-5">
            <Reveal className="flex-1">
              <div className="h-full bg-secondary/20 p-6 rounded-lg border border-border hover:shadow-lg hover:border-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center text-xl">
                  <LayoutDashboard />
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                      <span className="text-accent">W-CMS</span>
                      <span className="mt-1 block text-sm md:text-base font-semibold text-muted-foreground">
                        (Waff-Control Management System)
                      </span>
                    </h3>
                    <a href="/itservice#cms_main" className="shrink-0 whitespace-nowrap text-base text-accent font-semibold hover:underline inline-flex items-center gap-1 group">
                      자세히 보기 <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    생산 현장의 모든 정보를 실시간으로 시각화하고 제어하는 통합 대시보드
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={300} className="flex-1">
              <div className="h-full bg-secondary/20 p-6 rounded-lg border border-border hover:shadow-lg hover:border-primary transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/30 flex items-center justify-center text-xl">
                  <Cog />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight">
                      <span className="text-accent">W-MES</span>
                      <span className="mt-1 block text-sm md:text-base font-semibold text-muted-foreground">
                        (Waff-Manufacturing Execution System)
                      </span>
                  </h3>
                  <p className="text-base text-muted-foreground mb-3 leading-relaxed">
                      생산 계획부터 실적 관리까지 전 과정을 통합 관리하는 시스템
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          {/* <Reveal delay={900} className="relative h-96"> */}
          <Reveal delay={600} className="relative h-80 md:h-full">
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-sm" />
            <img
              src="/images/Landing/smartfactory/smartfactory.png"
              alt="Smart Factory"
              // className="w-full h-full rounded-lg overflow-hidden"
              className="relative w-full h-full rounded-2xl shadow-lg"
            />
          </Reveal>
        </div>

        {/* <div className="bg-white rounded-lg p-8 md:p-12 border-2 border-primary/20 hover:shadow-lg transition-shadow duration-300"> */}
        <Reveal>
          <div className="relative rounded-3xl border border-primary/15 bg-gradient-to-br from-slate-50 to-blue-50/40 p-8 md:p-12 mb-20 shadow-inner overflow-hidden">
            <div className="text-center mb-10">
              {/* <h3 className="text-2xl font-bold text-foreground mb-8 text-center">스마트팩토리의 기대효과</h3> */}
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground">
                스마트팩토리의{" "}
                <span className="text-primary">기대효과</span>
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                  ICT 융합을 통한 제조 혁신 지표
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {effectItems.map((item, i) => (
                <Reveal key={item.label} delay={i * 150}>
                  <div className={`group h-full rounded-2xl border ${item.border} ${item.bg} p-6 hover:scale-105 transition-transform duration-300 cursor-default`}>
                    <div className="flex h-full flex-col gap-2 text-center">
                      <span className="text-xs font-semibold text-muted-foreground tracking-wide">
                        {item.label}
                      </span>
                    <span className={`text-2xl md:text-3xl font-black ${item.color}`}>
                      {item.value}{" "}
                      <span className={item.trend === "↑" ? "text-blue-600 md:text-emerald-600" : "text-emerald-600"}>
                        {item.trend}
                      </span>
                    </span>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal className="text-center mb-8">
            <div className="inline-block px-4 py-2 bg-primary rounded-full">
              <span className="text-sm font-bold text-white tracking-wide">
                모든 제조과정이 똑똑해집니다
              </span>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <Reveal key={item.title} delay={index * 200}>
                <div className="group bg-white rounded-2xl border border-border overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-400 hover:-translate-y-2">
                  {/* Image with overlay */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Step number */}
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base font-extrabold text-foreground mb-3 flex items-center gap-2">
                      <span className="block w-1 h-4 rounded-full bg-primary" />
                      {item.title}
                    </h3>
                    <div className="space-y-2 flex-1">
                      {item.content.map((text, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent mt-1.5" />
                          <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
