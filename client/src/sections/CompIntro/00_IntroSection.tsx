import { useLanguage } from "@/contexts/LanguageContext";

export default function IntroSection () {
    const { text } = useLanguage();
    return (
        <section id="intro" className="py-20 md:py-32 bg-white">
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
            <div className="text-center mb-8">
              <h2 className="section-title">{text("회사소개", "Company")}</h2>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <p className="section-subtitle">
                {text("WAFF는 고객에 대한 신뢰와 감동을 기본원칙으로 성장과 성공을 함께하고 있습니다.", "WAFF grows and succeeds with its customers through trust and lasting value.")}
              </p>
            </div>

            <div className="overflow-hidden mb-8">
            <img
              src="/images/intro/introImage.jpg"
              alt="companyImage"
              className="h-full w-full "
            />
          </div>

            <div className="rounded-xl bg-accent/10 border border-border p-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {text(
                  "WAFF는 2012년부터 축적한 소프트웨어 개발 역량과 기계 제어 노하우를 융합해 고객 설비의 잠재력을 극대화하는 첨단 스마트 제조 솔루션을 제공합니다. 단순히 노후 부품을 교체하는 수준을 넘어 기존 설비의 성능을 최신 수준으로 업그레이드하고, 장비 상태를 실시간으로 모니터링하며, 수집된 데이터를 직관적으로 분석할 수 있는 환경을 구축합니다. 설계부터 실행·운영까지 전 과정을 책임지며 공정을 자동화하고 생산 효율을 높이는 토털 솔루션을 제공합니다. WAFF와 함께라면 데이터를 기반으로 움직이는 스마트한 공장과 안정적이고 지속 가능한 비즈니스 성공이 현실이 됩니다.",
                  "Since 2012, WAFF has combined software-development expertise with machine-control know-how to deliver advanced smart-manufacturing solutions that unlock the potential of customer equipment. Beyond replacing aging components, we modernize existing equipment, monitor its condition in real time, and create an environment for intuitive data analysis. We take responsibility for the whole journey from design to execution and operation, providing total solutions that automate processes and improve production efficiency. With WAFF, a data-driven smart factory and stable, sustainable business success become a reality."
                )}
              </p>
            </div>
          </div>
        </section>
    )
}
