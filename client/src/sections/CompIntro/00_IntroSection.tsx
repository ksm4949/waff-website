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
              <h2 className="section-title">인사말</h2>
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
                안녕하십니까?
                <br/><br/>
                <span className="text-primary font-bold">와프(Waff)</span>
                는 설비 개조공사(Retrofit) 전문기업으로 성장하여, 설비와 접목시킨 스마트공장 솔루션을 제공하고있습니다.
                <br/> 
                산업환경 변화에 발 맞추어 사업영역을 자동차·철강부품에서 첨단신소재분야로 확대하고자 합니다.
                <br/><br/>
                한발 앞서 시대의 흐름과 변화를 예측하고 고객의 눈높이에 맞춘 품질경영을 바탕으로 고객만족을 넘어서 고객감동을 실천하겠습니다.
                <br/>
                오랫동안 와프에 아낌없는 성원을 보내주신 모든 고객 여러분께 다시 한번 깊은 감사의 말씀 드리며, 고객가치를 최우선으로 생각하는 회사, <br/>
                사람이 중심이 되는 회사, 미래를 예측하고 선도하는 와프가 되도록 임직원이 하나가 되어 열심히 나아가겠습니다.
                <br/><br/>
                감사합니다.
                <br/><br/>
                <span className="text-lg font-bold">대표 김민구</span>
              </p>
            </div>
          </div>
        </section>
    )
}