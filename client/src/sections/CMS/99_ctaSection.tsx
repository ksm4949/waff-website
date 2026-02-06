import { Reveal } from "@/components/Reveal";

export default function CMS_CTASection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-r from-primary/20 to-primary/50">
            <div className="container text-center">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        W-CMS로 스마트 제조를 시작하세요.
                    </h2>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-lg   max-w-2xl mx-auto">
                        실시간 데이터 기반의 생산 관리로 효율성을 극대화하고 경쟁력을 강화하세요.
                    </p>
                </Reveal>
            </div>
      </section>
    )
}