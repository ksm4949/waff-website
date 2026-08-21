import { Reveal } from "@/components/Reveal";
import ImageSlider from "@/components/ImageSlider";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RetroCaseSection() {
    const { text } = useLanguage();
    const imageSlides = [
        { img: "/images/example/retro_liner00.png", title: text("결과", "Result"), alt: text("CNC개조, 화낙개조, 화낙,지멘스", "CNC retrofit for FANUC and Siemens") },
        { img: "/images/example/retro_liner01.png", title: text("모터 교체", "Motor Replacement"), alt: text("CNC개조, 화낙개조, 화낙,지멘스", "CNC retrofit for FANUC and Siemens") },
        { img: "/images/example/retro_liner02.png", title: text("컨트롤러 교체", "Controller Replacement"), alt: text("CNC개조, 화낙개조, 화낙,지멘스", "CNC retrofit for FANUC and Siemens") },
        { img: "/images/example/retro_liner03.png", title: text("케이블 교체", "Cable Replacement"), alt: text("CNC개조, 화낙개조, 화낙,지멘스", "CNC retrofit for FANUC and Siemens") },
    ]
    const imageSlides2 = [
        { img: "/images/example/retro_hb_00.png", title: text("초기", "Initial Condition"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_hb_01.png", title: text("배전반 교체", "Electrical Cabinet Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_hb_02.png", title: text("모터 교체", "Motor Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_hb_03.png", title: text("컨트롤패널 교체", "Control Panel Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_hb_04.png", title: text("결과", "Result"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
    ]
    const imageSlides3 = [
        { img: "/images/example/retro_mct_00.png", title: text("초기", "Initial Condition"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_mct_01.png", title: text("컨트롤패널 교체", "Control Panel Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_mct_02.png", title: text("배전반 교체", "Electrical Cabinet Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_mct_03.png", title: text("모터 교체", "Motor Replacement"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
        { img: "/images/example/retro_mct_04.png", title: text("결과", "Result"), alt: text("CNC개조, 화낙개조, 화낙, FANUC", "CNC retrofit for FANUC") },
    ]
        
    return (
        <section 
          id="retro_case" 
          // className="py-20 md:py-32 bg-white"
          className="relative py-24 md:py-36 bg-white overflow-hidden"
        >
          {/* 배경 눈금종이 효과 */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,80,200,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,80,200,.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* 좌측상단 푸른색 그라데이션 */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
          />
          {/* 우측하단 옅은 주황색 그라데이션 */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)" }}
          />

          <div className="container">
            <div className="text-center mb-16">
              <Reveal>
                <h2 className="section-title">{text("적용 사례", "Use Cases")}</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  {text("실제 적용된 노후 장비 현대화 프로젝트", "Modernization projects for aging equipment implemented in the field")}
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 1행 - 실린더 내외경 가공기 */}
              <Reveal className="bg-secondary/20 p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-2xl text-foreground mb-3">
                  {text("실린더 내외경 가공기 Retrofit", "Cylinder ID/OD Machining Machine Retrofit")}
                </h3>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• {text("조작반/메인컨트롤러 교체", "Control panel/main controller replacement")}</li>
                  <li>• {text("화낙AC 서보 모터 교체", "FANUC AC servo motor replacement")}</li>
                  <li>• {text("지멘스 스핀들 드라이버 교체", "Siemens spindle driver replacement")}</li>
                  <li>• {text("케이블 전량 교체", "Complete cable replacement")}</li>
                </ul>
              </Reveal>
              <Reveal className="relative h-72 md:h-full rounded-lg overflow-hidden shadow-lg bg-secondary/20">
                <ImageSlider slides={imageSlides} maxPerView={2}/>
              </Reveal>
              {/* 2행 - 호빙머신 */}
              <Reveal className="bg-secondary/20 p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-2xl text-foreground mb-3">
                  {text("호빙머신 Retrofit", "Hobbing Machine Retrofit")}
                </h3>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• {text("컨트롤러: FANUC 0i-MF로 교체", "Controller: FANUC 0i-MF replacement")}</li>
                  <li>• {text("조작반 / 메인컨트롤러 교체", "Control panel/main controller replacement")}</li>
                  <li>• {text("FANUC 서보 및 스핀들 모터 교체", "FANUC servo and spindle motor replacement")}</li>
                  <li>• {text("FANUC 스핀들/서보 드라이버 교체", "FANUC spindle/servo driver replacement")}</li>
                  <li>• {text("OP 및 MAIN PANNEL 교체", "OP and main panel replacement")}</li>
                </ul>
              </Reveal>
              <Reveal className="relative h-72 md:h-full rounded-lg overflow-hidden shadow-lg bg-secondary/20">
                <ImageSlider slides={imageSlides2} maxPerView={2}/>
              </Reveal>

              {/* 3행 - 머시닝센터 */}
              <Reveal className="bg-secondary/20 p-6 rounded-lg border border-border">
                <h3 className="font-semibold text-2xl text-foreground mb-3">
                  {text("머시닝센터(MCT) Retrofit", "Machining Center (MCT) Retrofit")}
                </h3>
                <ul className="space-y-2 text-lg text-muted-foreground">
                  <li>• {text("컨트롤러: FANUC 31i-MB5로 교체", "Controller: FANUC 31i-MB5 replacement")}</li>
                  <li>• {text("조작반 / 메인컨트롤러 교체", "Control panel/main controller replacement")}</li>
                  <li>• {text("FANUC 서보 및 스핀들 모터 교체", "FANUC servo and spindle motor replacement")}</li>
                  <li>• {text("FANUC 스핀들/서보 드라이버 교체", "FANUC spindle/servo driver replacement")}</li>
                  <li>• {text("OP 및 MAIN PANNEL, 케이블 전량 교체", "OP and main panel plus complete cable replacement")}</li>
                </ul>
              </Reveal>
              <Reveal className="relative h-72 md:h-full rounded-lg overflow-hidden shadow-lg bg-secondary/20">
                <ImageSlider slides={imageSlides3} maxPerView={2}/>
              </Reveal>
            </div>
          </div>
        </section>
    )
}
