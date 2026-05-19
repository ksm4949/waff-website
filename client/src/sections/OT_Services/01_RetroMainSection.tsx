export default function RetroMainSection() {
    return (
        <section id="retro_main" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="inline-block px-4 py-2 bg-primary rounded-full mb-6">
                        <span className="text-sm font-semibold text-white/90">OT 솔루션</span>
                      </div>
                      <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                        화낙 CNC 개조
                        <span className="block text-lg text-muted-foreground font-normal mt-2">
                          FANUC CNC Retrofit · 노후 공작기계 현대화
                        </span>
                      </h1>
                      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        노후화된 CNC 장비를{" "}
                        <span className="text-accent font-bold">화낙(FANUC), 지멘스, 하이데나인</span>
                        기반의 최신 제어 환경으로 개조합니다. 컨트롤러, 서보, 스핀들, 전장, 조작반, 케이블과{" "}
                        <span className="text-accent font-bold">PLC Ladder</span>
                        까지 장비 조건에 맞춰 검토합니다. <br/>
                        생산 데이터는 FOCAS, MES, 설비 모니터링으로 연동해{" "}
                        <span className="text-accent font-bold">저비용</span>
                        으로 스마트팩토리 전환까지 이어갑니다. <br/>
                        20년 이상 안정적으로 운영할 수 있는{" "}
                        <span className="text-accent font-bold">현대화 솔루션</span>
                        입니다.
                      </p>
                    </div>

                    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg aspect-video bg-black">
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src="/videos/retrofit_video.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                      {/* <div className="absolute inset-0 bg-black/20 pointer-events-none" /> */}
                    </div>

                    {/* <div className="relative h-96 md:h-full animate-float">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
                        <img
                          src="/images/retrofit-before-after.png"
                          alt="Smart Manufacturing"
                          className="relative w-full h-full object-cover rounded-2xl shadow-2xl border border-white/40"
                        />
                    </div> */}
                </div>
            </div>
        </section>
    )
}
