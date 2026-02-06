import { Reveal } from "@/components/Reveal";
import ImageSlider from "@/components/ImageSlider";

export default function CMS_CaseSection() {
    const imageSlides = [
        { img: "/images/example/cms_lg.png", title: "LG 통합 관제 시스템" },
        { img: "/images/example/cms_lg2.png", title: "LG 통합 관제 시스템" },
        { img: "/images/example/cms_hyundai.png", title: "현대중공업 공정 관제 시스템" },
        { img: "/images/example/cms_hyundai2.png", title: "현대중공업 공정 관제 시스템" },
        { img: "/images/example/cms_hyundai_stoneMT_mobile.png", title: "현대사이트솔루션 석산 관제 솔루션" },
        { img: "/images/example/cms_hyundai_stoneMT_mobile2.png", title: "현대사이트솔루션 석산 관제 솔루션" },
        { img: "/images/example/cms_hyundai_stoneMT_mobile3.png", title: "현대사이트솔루션 석산 관제 솔루션" },
    ];

    return (
        <section id="cms_case" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
            <div className="container">
                <div className="text-center mb-16">
                    <Reveal>
                        <h2 className="section-title">적용 사례</h2>
                    </Reveal>
                    <div className="divider-modern mx-auto w-24 mb-6" />
                </div>

                <Reveal>
                    <ImageSlider slides={imageSlides} />
                </Reveal>
            </div>
      </section>
    )
}