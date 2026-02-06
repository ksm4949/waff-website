// "use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Slide = {
  img: string;
  title?: string;
};

type ImageSliderProps = {
  slides: Slide[];
  maxPerView?: number; // 최대 표시 개수 (선택)
};

export default function ImageSlider({ slides, maxPerView }: ImageSliderProps) {
  const baseBreakpoints = {
    0: { slidesPerView: 1.2 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  };

  const breakpoints =
       maxPerView? {
        0: { slidesPerView: Math.min(1.2, maxPerView) },
        640: { slidesPerView: Math.min(2, maxPerView) },
        1024: { slidesPerView: Math.min(3, maxPerView) },
      }
    : baseBreakpoints;

  return (
    <Swiper
      modules={[Autoplay]}
      loop
      spaceBetween={24}
      speed={800}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      breakpoints={breakpoints}
      className="pb-2"
    >
      {slides.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="rounded-2xl overflow-hidden border bg-white hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[16/10] w-full bg-gray-100">
              <img
                src={item.img}
                alt={item.title ?? `case-${index}`}
                className="h-full w-full "
              />
            </div>

            {item.title && (
              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold">{item.title}</h3>
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
