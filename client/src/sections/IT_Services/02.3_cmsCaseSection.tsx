import { Reveal } from "@/components/Reveal";
import ImageSlider from "@/components/ImageSlider";

export default function CMS_CaseSection() {
    const imageSlides = [
        { img: "/images/example/cms_sample1.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/ex_cms1.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/ex_cms2.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/ex_cms3.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/cms_mobile_sample1.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/cms_mobile_sample2.png", title: "", alt: "스마트팩토리, CMS, MES" },
        { img: "/images/example/cms_mobile_sample3.png", title: "", alt: "스마트팩토리, CMS, MES" },
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