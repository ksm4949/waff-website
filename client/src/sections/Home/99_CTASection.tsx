import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HomeCTASection() {
    const { text } = useLanguage();
    return (
        <section className="py-20 md:py-32 bg-gradient-to-r from-primary/20 to-primary/50 ">
            <div className="container text-center">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                  {text("스마트 제조의 미래를 함께 만들어보세요.", "Let’s build the future of smart manufacturing together.")}
                </h2>
              </Reveal>
              <Reveal delay={500}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {text("와프의 솔루션으로 당신의 공장을 디지털 시대로 이끌어보세요.", "Bring your factory into the digital era with WAFF solutions.")}
                </p>
              </Reveal>
              <Reveal delay={1000}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">  
                  {text("지금 바로 상담을 신청하고 제조 혁신의 첫 걸음을 내딛으세요.", "Contact us today and take the first step toward manufacturing innovation.")}
                </p>
              </Reveal>
            </div>
        </section>
    )
}
