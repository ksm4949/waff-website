import { Reveal } from "@/components/Reveal";

type CardItem = {
  title: string;
  content: string[]; // 최대 2개
  img: string;
  alt: string;
};

export default function RetrofitSection() {
    const data: CardItem[] = [
      {
        title: "컨트롤러 교체",
        content: [
          "구형 컨트롤러에서 최신 컨트롤러 교체 (화낙/지멘스/하이데나인)",
          "LAN 통신 기능 활성화, 데이터 처리속도 증가, 메모리 용량 증가, 유지보수 및 부품 수급 용이"
        ],
        img: "/images/ot_service/retrofit1.png",
        alt: "CNC 컨트롤러 교체, 화낙(FANUC)/지멘스/하이데나인"
      },
      {
        title: "배전반 교체",
        content: [
          "구형 엠프에서 신형 엠프로 교체",
          "입출력 제어 용이, 내부부품 오작동 감소, 유지보수 및 관리용이"
        ],
        img: "/images/ot_service/retrofit2.png",
        alt: "CNC 배전반 교체, CNC개조"
      },
      {
        title: "스핀들/서브 모터 교체",
        content: [
          "구형 DC모터에서 신형 AC모터로 교체",
          "시스템과의 연계성 증가, 위치 제어 가능, 정밀가공성 증가, 유지보수 및 관리 용이"
        ],
        img: "/images/ot_service/retrofit3.png",
        alt: "스핀들/서보 모터 교체, CNC개조"
      },
      {
        title: "케이블 교체",
        content: [
          "센서 및 설비 구동계 오작동 방지, 장비 수명연장"
        ],
        img: "/images/ot_service/retrofit4.png",
        alt: "케이블 교체, CNC개조"
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
                  컨트롤러 교체부터 메인판넬 업그레이드까지 CNC 주요 기능을 고도화 할 수 있는 기술입니다.
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