import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/contexts/LanguageContext";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
  alt: string;
};

export default function RetrofitSection() {
    const { text } = useLanguage();
    const data: CardItem[] = [
      {
        title: text("컨트롤러 교체", "Controller Replacement"),
        content: [
          text("구형 CNC에서 최신 컨트롤러로 교체 (화낙 FANUC/지멘스/하이데나인)", "Replace legacy CNC controls with modern FANUC, Siemens, or Heidenhain controllers"),
          text("LAN 통신 기능 활성화, 데이터 처리속도 증가, 메모리 용량 증가, 유지보수 및 부품 수급 용이", "Enable LAN communication, faster processing, more memory, and easier maintenance and parts sourcing")
        ],
        img: "/images/ot_service/retrofit1.png",
        alt: text("CNC 컨트롤러 교체, 화낙(FANUC)/지멘스/하이데나인", "CNC controller replacement for FANUC, Siemens, and Heidenhain")
      },
      {
        title: text("전장·조작반 개선", "Electrical Cabinet and Panel Upgrade"),
        content: [
          text("메인 전장박스, 조작반, I/O, 릴레이, 안전회로를 장비 조건에 맞춰 개선", "Improve main electrical cabinets, panels, I/O, relays, and safety circuits for the equipment"),
          text("입출력 제어 용이, 내부부품 오작동 감소, 유지보수 및 관리 용이", "Simplify I/O control, reduce component faults, and improve maintenance")
        ],
        img: "/images/ot_service/retrofit2.png",
        alt: text("CNC 전장 박스 및 조작반 개선, CNC개조", "CNC electrical cabinet and panel upgrade")
      },
      {
        title: text("스핀들/서보 모터 교체", "Spindle and Servo Motor Replacement"),
        content: [
          text("구형 DC 모터와 앰프를 신형 AC 서보·스핀들 시스템으로 교체", "Replace legacy DC motors and amplifiers with modern AC servo and spindle systems"),
          text("시스템과의 연계성 증가, 위치 제어 가능, 정밀가공성 증가, 유지보수 및 관리 용이", "Improve system integration, positioning control, machining precision, and maintenance")
        ],
        img: "/images/ot_service/retrofit3.png",
        alt: text("스핀들/서보 모터 교체, CNC개조", "Spindle and servo motor replacement")
      },
      {
        title: text("PLC·케이블·데이터 연동", "PLC, Cable, and Data Integration"),
        content: [
          text("PLC Ladder, ATC/APC, 유압, 윤활, 도어 인터록 등 설비 시퀀스 개선", "Improve machine sequences including PLC ladder, ATC/APC, hydraulics, lubrication, and door interlocks"),
          text("케이블 교체와 FOCAS/MES/설비 모니터링 연동으로 데이터 수집 기반 확보", "Establish a data-collection foundation with cable replacement and FOCAS, MES, and equipment-monitoring integration")
        ],
        img: "/images/ot_service/retrofit4.png",
        alt: text("PLC Ladder 개선, 케이블 교체, FOCAS MES 데이터 연동", "PLC ladder improvement, cable replacement, and FOCAS/MES data integration")
      },
    ]

    return (
        <section 
          id="ot_retro" 
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
            <div className="text-center mb-16 items-center">
              <Reveal>
                <h2 className="section-title">CNC Retrofit</h2>
              </Reveal>
              <div className="divider-modern mx-auto w-24 mb-6" />
              <Reveal>
                <p className="section-subtitle">
                  {text("화낙(FANUC) CNC 개조, 컨트롤러 교체, 전장·조작반 개선, 서보·스핀들 교체부터 PLC Ladder와 제조 데이터 연동까지 CNC 주요 기능을 고도화하는 기술입니다.", "CNC retrofit technology that modernizes core functions, from FANUC controller replacement and electrical-panel upgrades to servo/spindle replacement, PLC ladder work, and manufacturing-data integration.")}
                  <br/>
                </p>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.map((item, index) => (
                <Reveal
                  key={index}
                  className="rounded-2xl border overflow-hidden h-full flex flex-col bg-secondary/20
                  hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-primary
                  "
                >
                  {/* Text */}
                  <div className="p-5 flex-1 flex flex-col">
                    {/* Title */}
                    <h3 className="text-lg font-semibold">{item.title}</h3>
              
                    {/* Content */}
                    <div className="mt-2 text-sm text-gray-600 leading-relaxed space-y-1">
                      {item.content?.map((text, idx) => (
                        <div
                          key={`${item.title}-${idx}`}
                          className="flex gap-3 mb-4"
                        >
                          <div className="flex-shrink-0 w-2 h-2 bg-accent rounded-full mt-2" />
                          <p>{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                    
                  {/* Image */}
                  <div className="aspect-[16/10] w-full bg-gray-100">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="h-full w-full "
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
    )
}
