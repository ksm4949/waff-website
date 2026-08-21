import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function OrganizationSection () {
    const { text } = useLanguage();
    return (
        <section id="org" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
          <div className="container">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="section-title">{text("조직구성", "Organization")}</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  {text("전문성과 경험을 갖춘 인력으로 체계적으로 역할을 분담하고, 기획에서 현장 운영까지 빈틈없는 조직을 구축합니다.", "Specialized, experienced teams take clear roles from planning through on-site operations.")}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* LEFT IMAGE */}
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white">
                <img
                  src="/images/intro/org1.png"
                  alt={text("조직구성도", "Organization chart")}
                  className="w-full h-[320px] md:h-[420px] object-contain"
                />
              </Reveal>

              {/* RIGHT IMAGE */}
              <Reveal delay={300} className="relative overflow-hidden rounded-xl border border-border bg-white">
                <img
                  src="/images/intro/org2.png"
                  alt={text("조직구성도-운영, 스마트팩토리 구현 지원, CNC 개조, 화낙개조, 화낙/지멘스/하이데나인", "Organization chart: operations, smart-factory implementation, CNC retrofit, FANUC, Siemens, and Heidenhain support")}
                  className="w-full h-[320px] md:h-[420px] object-contain"
                />
              </Reveal>
            </div>
          </div>
        </section>
    )
}
