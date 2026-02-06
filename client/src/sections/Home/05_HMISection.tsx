import { useEffect, useMemo, useState} from "react";
import { Zap, Monitor, Award } from "lucide-react";
import { Reveal } from "@/components/Reveal";

type Img = { src: string; alt?: string };

const IMAGES: Img[] = [
  { src: "/images/Landing/hmi.png", alt: "HMI Interface" },
  { src: "/images/Landing/hmi1.png", alt: "HMI Interface 1" },
  { src: "/images/Landing/hmi2.png", alt: "HMI Interface 2" },
  { src: "/images/Landing/hmi3.png", alt: "HMI Interface 3" },
];

function useCrossfade(images: Img[], intervalMs = 4500, fadeMs = 900) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(images.length > 1 ? 1 : 0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    let timeout1: ReturnType<typeof setTimeout> | null = null;
    let timeout2: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      // 다음 이미지 준비
      setNextIndex((index + 1) % images.length);

      // 페이드 시작
      setFade(true);

      // 페이드 완료 후 “현재”를 다음으로 고정
      timeout1 = setTimeout(() => {
        setIndex((p) => (p + 1) % images.length);
        setFade(false);
      }, fadeMs);

      // 다음 틱 예약
      timeout2 = setTimeout(tick, intervalMs);
    };

    timeout2 = setTimeout(tick, intervalMs);

    return () => {
      if (timeout1) clearTimeout(timeout1);
      if (timeout2) clearTimeout(timeout2);
    };
  }, [images.length, index, intervalMs, fadeMs]);

  return { current: images[index], next: images[nextIndex], fade, fadeMs };
}

export default function HomeHMISection() {
    const images = useMemo(() => IMAGES, []);
    const { current, next, fade, fadeMs } = useCrossfade(images, 4800, 1000);

    return (
        <section id="home_hmi" className="py-20 md:py-32 bg-white">
        <div className="container">
          <Reveal className="text-center mb-16">
            <h2 className="section-title">HMI (Human Machine Interface)</h2>
            <div className="divider-modern mx-auto w-24 mb-6" />
            <p className="section-subtitle">
              직관적이고{" "}
              <span className="font-bold text-accent">사용자 친화적인</span>
              {" "}인터페이스로 설비 제어를 단순화합니다
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <Reveal className="relative h-96">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-3xl" />

              <div className="relative w-full h-full rounded-2xl shadow-2xl border border-white/40 overflow-hidden">
                {/* current */}
                <img
                  src={current.src}
                  alt={current.alt ?? "HMI Interface"}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    opacity: fade ? 0 : 1,
                    transition: `opacity ${fadeMs}ms ease-in-out, transform ${fadeMs}ms ease-in-out`,
                    transform: fade ? "scale(1.02)" : "scale(1.00)", // 살짝 줌
                  }}
                />

                {/* next */}
                <img
                  src={next.src}
                  alt={next.alt ?? "HMI Interface"}
                  className="absolute inset-0 h-full w-full "
                  style={{
                    opacity: fade ? 1 : 0,
                    transition: `opacity ${fadeMs}ms ease-in-out, transform ${fadeMs}ms ease-in-out`,
                    transform: fade ? "scale(1.00)" : "scale(1.02)", // 반대로 줌
                  }}
                />

                {/* 은은한 글로우 (전환 순간만 살짝) */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    opacity: fade ? 0.35 : 0,
                    transition: `opacity ${Math.floor(fadeMs * 0.6)}ms ease-out`,
                    background:
                      "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%)",
                  }}
                />

                {/* 살짝 어둡게 톤 통일(선택) */}
                <div className="pointer-events-none absolute inset-0 bg-black/0" />
              </div>
            </Reveal>

            <div className="space-y-8">
              <Reveal>
                <h3 className="text-2xl font-bold text-foreground mb-4">사용자 중심의 설계</h3>
                <p className="text-muted-foreground leading-relaxed">
                  복잡한 산업 설비를 직관적인 화면으로 구성하여 누구나 쉽게 조작할 수 있도록 설계했습니다. 
                  <br/>
                  터치스크린, 다중 언어 지원, 맞춤형 레이아웃 등으로 사용자 경험을 극대화합니다.
                </p>
              </Reveal>

              <div className="space-y-4">
                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">실시간 모니터링</h4>
                      <p className="text-sm text-muted-foreground">설비 상태를 실시간으로 확인하고 즉시 대응</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">맞춤형 화면 구성</h4>
                      <p className="text-sm text-muted-foreground">각 사용자 역할에 맞는 정보만 표시</p>
                    </div>
                  </div>
                </Reveal>

                <Reveal>
                  <div className="flex gap-4 transition-all duration-300 ease-out hover:scale-[1.03] hover:bg-muted/40 rounded-lg p-2">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">높은 신뢰성</h4>
                      <p className="text-sm text-muted-foreground">산업용 표준 준수로 안정적인 운영 보장</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}