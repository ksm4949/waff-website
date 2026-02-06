import { Reveal } from "@/components/Reveal";

export default function VisionSection() {
    const features = [
    {
      id: 1,
      title: "AI 기반의 공정 최적화",
      image: "/images/intro/intro_vision1.png",
      // color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "지능형 제조 통합 플랫폼",
      image: "/images/intro/intro_vision2.png",
      // color: "from-cyan-500 to-green-500"
    },
    {
      id: 3,
      title: "디지털 트윈 기술",
      image: "/images/intro/intro_vision3.png",
      // color: "from-purple-500 to-blue-500"
    }
  ];

    return (
        <section id="vision" className="py-20 md:py-32 bg-white">
          <div className="container">
            <div className="text-center mb-16 items-center">
              <Reveal>
                <h2 className="section-title">Vision</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
                <Reveal>
                  <p className="section-subtitle">
                    <span className="font-bold">와프</span>
                    는 기존의 리트로핏 및 장비제어 솔루션을 넘어
                    <br/>
                    <span className="text-accent font-bold">제조 현장의 DX(Digital Transformation)</span>
                    를 실현하는
                    <span className="text-accent font-bold">Total Solution Provider</span>
                    로 도약하고자 합니다.
                    {/* <span className="text-primary font-bold">사례 보기</span> */}
                  </p>
                </Reveal>
            </div>

            <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="group bg-secondary/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                {/* Image Container */}
                <div className="relative h-70 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Accent Line */}
                  {/* <div className={`h-1 w-full bg-gradient-to-r ${feature.color} rounded-full`} /> */}
                </div>
              </div>
              ))}
            </Reveal>
          </div>
      </section>
    )
}