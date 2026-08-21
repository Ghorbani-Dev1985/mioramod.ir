"use client";

import * as React from "react";

import { Swiper as SwiperClass } from "swiper";

import type { SwiperOptions } from "swiper/types";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import { cn } from "@/core/utils/shadcn.utils";

type CarouselProps = {
  children: React.ReactNode;

  className?: string;

  opts?: SwiperOptions;

  autoplay?: boolean;

  autoplayDelay?: number;
};

function CarouselLoop({
  children,
  className,
  opts,
  autoplay = true,
  autoplayDelay = 3000,
}: CarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const swiper = new SwiperClass(containerRef.current, {
      modules: [Autoplay],

      direction: "horizontal",

      loop: true,

      centeredSlides: true,

      slidesPerView: 1.15,

      spaceBetween: 16,

      speed: 500,

      autoplay: autoplay
        ? {
            delay: autoplayDelay,

            disableOnInteraction: false,

            pauseOnMouseEnter: true,
          }
        : false,

      breakpoints: {
        768: {
          slidesPerView: 2.2,
        },
      },

      ...opts,
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, [autoplay, autoplayDelay]);

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className={cn("swiper overflow-hidden w-full", className)}>
      <div className="swiper-wrapper flex touch-pan-y">
        {React.Children.map(children, (child, index) => (
          <div key={index} className={cn(["swiper-slide min-w-0"])}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}

export { CarouselLoop };
