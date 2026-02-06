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
                        CNC Retrofit
                        <span className="block text-lg text-muted-foreground font-normal mt-2">
                          노후 장비의 현대화 솔루션
                        </span>
                      </h1>
                      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        노후화된 CNC 장비를{" "} 
                        <span className="text-accent font-bold">저비용</span>
                        으로 최신 기술로 업그레이드합니다. <br/>
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