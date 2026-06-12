export default function IntroSection () {
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
              <h2 className="section-title">회사소개</h2>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <p className="section-subtitle">
                와프(Waff)는{" "}
                <span className="text-accent">
                  고객에 대한 신뢰와 감동을 기본원칙
                </span>
                으로
                <br/>
                성장과 성공을 함께하고 있습니다.
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
                <span className="text-primary font-bold">와프(Waff)</span>
                는 2012년부터 축적한 소프트웨어 개발 역량과 기계 제어 노하우를 융합해,<br/>
                고객 설비의 잠재력을 극대화하는 첨단 스마트 제조 솔루션을 제공합니다.<br/>
                <br/>
                단순히 노후 부품을 교체하는 수준을 넘어,<br/>
                기존 설비의 성능을 최신 수준으로 업그레이드하고,<br/>
                장비 상태를 실시간으로 모니터링하며,<br/>
                수집된 데이터를 직관적으로 분석할 수 있는 환경을 구축합니다.<br/>
                <br/>
                설계 단계에서부터 실행·운영에 이르기까지 전 과정을 책임지며,<br/>
                공정을 자동화하고 생산 효율을 향상시키는 토털 솔루션을 제공합니다.<br/>
                <br/>
                와프와 함께라면, 데이터를 기반으로 움직이는 스마트한 공장,<br/>
                그리고 안정적이고 지속 가능한 비즈니스 성공이 현실이 됩니다.<br/>
              </p>
            </div>
          </div>
        </section>
    )
}