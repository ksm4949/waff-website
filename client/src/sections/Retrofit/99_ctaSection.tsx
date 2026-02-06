import { Reveal } from "@/components/Reveal";

export default function RetroCTASection() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-r from-primary/20 to-primary/50">
            <div className="container text-center">
                <Reveal>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        노후 장비를 현대화하세요.
                    </h2>
                </Reveal>
                <Reveal delay={300}>
                    <p className="text-lg  max-w-2xl mx-auto">
                        저비용으로 최신 기술을 적용하여 생산성을 극대화하고 장기간 안정적으로 운영하세요.
                    </p>
        
                </Reveal>
            </div>
      </section>
    )
}