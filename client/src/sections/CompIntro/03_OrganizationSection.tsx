import { Reveal } from "@/components/Reveal";

export default function OrganizationSection () {
    return (
        <section id="org" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
          <div className="container">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="section-title">조직구성</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  전문성과 경험을 갖춘 인력으로 체계적으로 역할을 분담
                  <br/>
                  기획에서 현장 운영까지 빈틈없는 조직구성
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* LEFT IMAGE */}
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white">
                <img
                  src="/images/intro/org1.png"
                  alt="조직구성도"
                  className="w-full h-[320px] md:h-[420px] object-contain"
                />
              </Reveal>

              {/* RIGHT IMAGE */}
              <Reveal delay={300} className="relative overflow-hidden rounded-xl border border-border bg-white">
                <img
                  src="/images/intro/org2.png"
                  alt="조직구성도-운영, 스마트팩토리 구현 지원, CNC 개조, 화낙개조, 화낙/지멘스/하이데나인"
                  className="w-full h-[320px] md:h-[420px] object-contain"
                />
              </Reveal>
            </div>
          </div>
        </section>
    )
}
