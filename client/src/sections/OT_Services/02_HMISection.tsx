import { Reveal } from "@/components/Reveal";

export default function HMISection() {
    return (
        <section id="ot_hmi" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">HMI 솔루션</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <Reveal>
              <p className="section-subtitle">
                공장 환경에 맞는 수집 데이터 설계를 바탕으로 다양한 데이터를 수집해 화면 인터페이스로 구현합니다.
                <br/>
                {/* <span className="text-primary font-bold">사례 보기</span> */}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal className="rounded-2xl border overflow-hidden">
              <img
                src="/images/ot_service/hmi.png"
                alt="HMI"
                className="h-full w-full "
              />
            </Reveal>
            <Reveal className="rounded-2xl border overflow-hidden">
              <img
                src="/images/ot_service/hmi1.png"
                alt="HMI"
                className="h-full w-full "
              />
            </Reveal>
            <Reveal className="rounded-2xl border overflow-hidden">
              <img
                src="/images/ot_service/hmi2.png"
                alt="HMI"
                className="h-full w-full "
              />
            </Reveal>
            <Reveal className="rounded-2xl border overflow-hidden">
              <img
                src="/images/ot_service/hmi3.png"
                alt="HMI"
                className="h-full w-full "
              />
            </Reveal>

          </div>
        </div>
      </section>
    )
}