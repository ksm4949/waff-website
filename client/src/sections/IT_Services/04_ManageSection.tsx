import { Reveal } from "@/components/Reveal";
import { Hammer, Gauge, ArrowRightLeft } from "lucide-react";

export default function ManageSection() {
    return (
        <section id="it_manage" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16 items-center">
            <Reveal>
              <h2 className="section-title">관리 솔루션</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
          </div>

          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <Reveal className="bg-white flex flex-col justify-center rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Hammer className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">공구 수명 관리</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  공구별 기준 가공 횟수/시간 데이터를 바탕으로 적절한 교환주기에 알람이 발생하도록 합니다.
                </p>
              </Reveal>

              {/* RIGHT: IMAGE */}
              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white h-full">
                <img
                  src="/images/it_services/manage1.png"
                  alt="공구수명관리"
                  className="w-full h-[280px] object-contain p-4"
                />
              </Reveal>
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <Reveal className="bg-white flex flex-col justify-center rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Gauge className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">가공 속도 제어</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  소재 상태에 따라 부하를 자동 탐지해 스핀들 회전 속도 및 가공 Feed를 자동으로 가/감속합니다.
                </p>
              </Reveal>

              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white h-full">
                <img
                  src="/images/it_services/manage2.png"
                  alt="가공속도제어"
                  className="w-full h-[280px] object-contain p-4"
                />
              </Reveal>
            </div>

            {/* ROW 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <Reveal className="flex flex-col justify-center rounded-xl border border-border bg-white p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <ArrowRightLeft className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">데이터 변환 및 파일 전송</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PC와 기기간의 실시간 데이터 변환 및 전송을 통해 신속한 데이터 관리 및 공유가 가능합니다.
                </p>
              </Reveal>

              <Reveal className="relative overflow-hidden rounded-xl border border-border bg-white h-full">
                <img
                  src="/images/it_services/manage3.png"
                  alt="데이터 변환 및 파일전송"
                  className="w-full h-[280px] object-contain p-4"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    )
}