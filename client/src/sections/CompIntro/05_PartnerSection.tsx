import { Reveal } from "@/components/Reveal";

export default function PartnerSection () {
  const partners = [
    { src: "/images/intro/partners/partner-01.png", 
      alt: "현대중공업",
      url: "https://www.hhi.co.kr/kr/main" 
    },
    { src: "/images/intro/partners/partner-02.png", 
      alt: "현대사이트솔루션",
      url: "https://www.hd-xitesolution.com/?locale=ko"
    },
    { src: "/images/intro/partners/partner-03.png", 
      alt: "이엠코리아주식회사",
      url: "http://www.yesemk.com/kor/main/main.html"
    },
    { src: "/images/intro/partners/partner-04.png", 
      alt: "현대제철",
      url: "https://www.hyundai-steel.com/kr"
    },
    { src: "/images/intro/partners/partner-05.png", 
      alt: "포스코",
      url: "https://www.posco.co.kr/homepage/docs/kor7/jsp/s91a0000001i.jsp"
    },
    { src: "/images/intro/partners/partner-06.png", 
      alt: "한국무브넥스",
      url: "https://koreamovenex.com/"
    },
    { src: "/images/intro/partners/partner-07.png", 
      alt: "한화에어로스페이스",
      url: "https://www.hanwhaaerospace.com/kor/index.do"
    },
    { src: "/images/intro/partners/partner-08.png", 
      alt: "풍산홀딩스",
      url: "http://www.poongsanhc.co.kr/"
    },
    { src: "/images/intro/partners/partner-09.png", 
      alt: "연암테크",
      url: "http://www.yunamtech.co.kr/kor/main/main.html"
    },
    { src: "/images/intro/partners/partner-10.png", 
      alt: "LG전자",
      url: "https://www.lge.co.kr/home"
    },
    { src: "/images/intro/partners/partner-11.png", 
      alt: "KAI",
      url: "https://www.koreaaero.com/KO/"
    },
    { src: "/images/intro/partners/partner-12.png", 
      alt: "PROSAVE",
      url: "http://www.prosave.co.kr/kor/main/main.html"
    },
    { src: "/images/intro/partners/partner-13.png", 
      alt: "육군종합정비창",
      url: null
    },
    { src: "/images/intro/partners/partner-14.png", 
      alt: "NSK",
      url: "https://www.nsk.com/kr-ko/"
    },
    { src: "/images/intro/partners/partner-15.png", 
      alt: "율곡",
      url: "https://www.yulkok.co.kr/index.do?langSite=ko&BOARD_ID=20161206000000000001"
    },
    { src: "/images/intro/partners/partner-16.png", 
      alt: "VOLVO",
      url: "https://www.volvocars.com/kr/"
    },
    { src: "/images/intro/partners/partner-17.png", 
      alt: "HIZEAERO",
      url: "https://hizeaero.com/main/main.php"
    },
    { src: "/images/intro/partners/partner-18.png", 
      alt: "송당",
      url: "https://songdang.kr/"
    },
  ];

    return (
      <section id="partner" className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-gray-500">
        <div className="container">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="section-title">협력사</h2>
            </Reveal>
            <div className="divider-modern mx-auto w-24 mb-6" />
          </div>

          {/* 3 columns on md+ */}
          <Reveal className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {partners.map((p, idx) => {
              if(p.url) {
                return (
                  <a
                  key={idx}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    h-24 md:h-28
                    flex items-center justify-center
                    rounded-xl border border-border bg-white
                    p-4 md:p-6
                    transition
                    hover:shadow-md
                    hover:scale-105
                    cursor-pointer
                  "
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      className="h-12 md:h-16 w-auto object-contain"
                      loading="lazy"
                    />
                  </a>
                )
              } else {
                <div
                  key={idx}
                  className="
                    h-24 md:h-28
                    flex items-center justify-center
                    rounded-xl border border-border bg-white
                    p-4 md:p-6
                    transition
                    hover:shadow-md
                    hover:scale-105
                    cursor-pointer
                  "
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="h-12 md:h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              }})}
          </Reveal>
        </div>
      </section>
    )
}