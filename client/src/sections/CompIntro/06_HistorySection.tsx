import { Reveal } from "@/components/Reveal";

type HistoryItem = { month: string; text: string };
type HistoryYear = { year: string; items: HistoryItem[] };

const historyData: HistoryYear[] = [
  {
    year: "2012",
    items: [{ month: "12", text: "와프 설립" }],
  },
  {
    year: "2014",
    items: [{ month: "05", text: "CLEAN 사업장 인정" }],
  },
  {
    year: "2017",
    items: [
      { month: "04", text: "연구전담부서 설립" },
      { month: "08", text: "벤처기업 인증 획득" },
    ],
  },
  {
    year: "2018",
    items: [{ month: "05", text: "기술역량 우수기업 인증 획득" }],
  },
  {
    year: "2019",
    items: [
      { month: "01", text: "소프트웨어 사업자 신고" },
      { month: "02", text: "창원시 MOU 협약 체결" },
      { month: "04", text: "OKUMA 글로벌트레이딩 리더 MOU 체결" },
      { month: "12", text: "와프 사업장 주소 변경" },
    ],
  },
  {
    year: "2020",
    items: [{ month: "06", text: "W-MES 저작권 등록" }],
  },
  {
    year: "2021",
    items: [
      { month: "02", text: "W-CMS 저작권 등록" },
      { month: "07", text: "(주)볼보코리아 업체 등록" },
      { month: "07", text: "기술역량 우수기업 인증 획득" },
      { month: "10", text: "(주)현대중공업 업체 등록" },
      { month: "11", text: "소재·부품·장비 전문기업 확인서 획득" },
    ],
  },
  {
    year: "2022",
    items: [
      { month: "01", text: "지능형 수송기계 MC 가입" },
      { month: "03", text: "경남 ICT 협회 가입" },
      { month: "03", text: "(주)풍산홀딩스 업체 등록" },
      { month: "10", text: "ISO14001, ISO9001 인증 획득" },
      { month: "12", text: "(주)현대두산 인프라코어 업체 등록" },
    ],
  },
  {
    year: "2023",
    items: [
      { month: "06", text: "창원형 강소기업 선정" },
      { month: "09", text: "벤처기업 선정" },
    ],
  },
  {
    year: "2024",
    items: [
      { month: "05", text: "LG전자 업체 등록" },
      { month: "05", text: "툴파손 관리로 툴파손 검출 특허 출원" },
    ],
  },
  {
    year: "2025",
    items: [
      { month: "04", text: "CNC 파일전송 프로그램 개발" },
      { month: "04", text: "능동 피드제어 개발" },
    ],
  },
];

export default function HistorySection() {
  const sortedHistoryData = [...historyData].sort(
    (a, b) => parseInt(b.year, 10) - parseInt(a.year, 10)
  );

  return (
    <section
      id="history"
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
            <h2 className="section-title">연{"\u00A0\u00A0\u00A0"}혁</h2>
          </Reveal>
          <div className="divider-modern mx-auto w-24 mb-6" />
        </div>

        <Reveal className="relative">
          {/* CENTER LINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />

          <div className="space-y-20">
            {sortedHistoryData.map((group, yearIdx) => {
              const isLeft = yearIdx % 2 === 0;
            
              return (
                <div key={group.year} className="relative">
                  {/* YEAR DOT */}
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-10">
                    <div 
                      className={[
                        "flex items-center justify-center h-12 w-12 rounded-full font-bold text-sm shadow transition-colors",
                        yearIdx % 2 === 0
                          ? "bg-primary text-white"
                          : "bg-accent text-white",
                      ].join(" ")}
                    >
                      {group.year}
                    </div>
                  </div>
              
                  {/* 2-COLUMN LAYOUT (항상 유지!) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start ">
                    {/* LEFT COLUMN */}
                    <div className="md:flex md:justify-end ">
                      {isLeft ? (
                        <HistoryCard items={group.items} align="left" />
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>
                    
                    {/* RIGHT COLUMN */}
                    <div className="md:flex md:justify-start">
                      {!isLeft ? (
                        <HistoryCard items={group.items} align="right" />
                      ) : (
                        <div className="hidden md:block" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------- */
/* History Card Component */
/* ----------------------- */

function HistoryCard({
  items,
  align,
}: {
  items: { month: string; text: string }[];
  align: "left" | "right";
}) {
  return (
    <div
      className={[
        "w-full md:max-w-[520px] rounded-xl bg-secondary/20 border border-border p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1",
        align === "left" ? "text-right hover:border-primary" : "text-left hover:border-accent",
      ].join(" ")}
    >
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li
            key={idx}
            className={[
              "flex items-start gap-3 text-sm text-muted-foreground",
              align === "left" ? "justify-end" : "justify-start",
            ].join(" ")}
          >
            {align === "right" && (
              <span className="text-accent font-semibold tabular-nums">
                {item.month}
              </span>
            )}

            <span className="text-foreground font-medium">{item.text}</span>

            {align === "left" && (
              <span className="text-primary font-semibold tabular-nums">
                {item.month}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

