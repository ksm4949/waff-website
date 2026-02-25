import { Reveal } from "@/components/Reveal";

export default function PartnerSection () {
  const partners = [
    // ===== Line 1 =====
    { src: "/images/intro/partners/HHI.png", 
      alt: "현대중공업",
      url: "https://www.hhi.co.kr/kr/main" 
    },
    { src: "/images/intro/partners/HD_XiteSolution.png", 
      alt: "현대사이트솔루션",
      url: "https://www.hd-xitesolution.com/?locale=ko"
    },
    { src: "/images/intro/partners/EMK.png", 
      alt: "이엠코리아주식회사",
      url: "http://www.yesemk.com/kor/main/main.html"
    },
    { src: "/images/intro/partners/HDSteel.png", 
      alt: "현대제철",
      url: "https://www.hyundai-steel.com/kr"
    },
    { src: "/images/intro/partners/POSCO.png", 
      alt: "포스코",
      url: "https://www.posco.co.kr/homepage/docs/kor7/jsp/s91a0000001i.jsp"
    },
    { src: "/images/intro/partners/koreamovenex.png", 
      alt: "한국무브넥스",
      url: "https://koreamovenex.com/"
    },
    // ===== Line 2 =====
    { src: "/images/intro/partners/hanwhaAerospace.png", 
      alt: "한화에어로스페이스",
      url: "https://www.hanwhaaerospace.com/kor/index.do"
    },
    { src: "/images/intro/partners/POONGSAN.png", 
      alt: "풍산홀딩스",
      url: "http://www.poongsanhc.co.kr/"
    },
    { src: "/images/intro/partners/yunam.jpg", 
      alt: "연암테크",
      url: "http://www.yunamtech.co.kr/kor/main/main.html"
    },
    { src: "/images/intro/partners/lg.png", 
      alt: "LG전자",
      url: "https://www.lge.co.kr/home"
    },
    { src: "/images/intro/partners/kai.png", 
      alt: "KAI",
      url: "https://www.koreaaero.com/KO/"
    },
    { src: "/images/intro/partners/prosave.png", 
      alt: "PROSAVE",
      url: "http://www.prosave.co.kr/kor/main/main.html"
    },
    // ===== Line 3 =====
    { src: "/images/intro/partners/army.png", 
      alt: "육군종합정비창",
      url: null
    },
    { src: "/images/intro/partners/nsk.png", 
      alt: "NSK",
      url: "https://www.nsk.com/kr-ko/"
    },
    { src: "/images/intro/partners/yulkok.png", 
      alt: "율곡",
      url: "https://www.yulkok.co.kr/index.do?langSite=ko&BOARD_ID=20161206000000000001"
    },
    { src: "/images/intro/partners/volvo.png", 
      alt: "VOLVO",
      url: "https://www.volvocars.com/kr/"
    },
    { src: "/images/intro/partners/hizeaero.png", 
      alt: "HIZEAERO",
      url: "https://hizeaero.com/main/main.php"
    },
    { src: "/images/intro/partners/songdang.png", 
      alt: "송당",
      url: "https://songdang.kr/"
    },
    // ===== Line 4 =====
    { src: "", 
      alt: "",
      url: null
    },
    { src: "", 
      alt: "",
      url: null
    },
    { src: "", 
      alt: "",
      url: null
    },
    { src: "", 
      alt: "",
      url: null
    },
    { src: "", 
      alt: "",
      url: null
    },
    { src: "", 
      alt: "",
      url: null
    },
  ];

    return (
      <section id="partner" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="section-title">주요 고객</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
          </div>

          {/* 3 columns on md+ */}
          <Reveal className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-6">
            {partners.map((p, idx) => {
              const Card = (
                <div
                  className="
                    h-24 md:h-28
                    flex items-center justify-center
                    rounded-xl border border-border bg-white
                    p-4 md:p-6
                    transition
                    hover:shadow-md
                    hover:scale-105
                  "
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="h-12 md:h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              );
              return p.url? (
                  <a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer"
                  >
                    {Card}
                  </a>
                ) : (
                  <div key={idx} className="cursor-default">
                    {Card}
                  </div>
                );
              })}
          </Reveal>
        </div>
      </section>
    )
}