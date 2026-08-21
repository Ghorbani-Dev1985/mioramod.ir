"use client";

import * as React from "react";

import { Swiper as SwiperClass } from "swiper";

import type { SwiperOptions } from "swiper/types";

import { Autoplay } from "swiper/modules";

import "swiper/css";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

import { Button } from "@/shared/ui/button";

type CarouselContextType = {
  swiper: SwiperClass | undefined;

  scrollPrev: () => void;

  scrollNext: () => void;

  scrollTo: (index: number) => void;

  canScrollPrev: boolean;

  canScrollNext: boolean;

  selectedIndex: number;

  slideCount: number;
};

const CarouselContext = React.createContext<CarouselContextType | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within Carousel");
  }

  return context;
}

type CarouselProps = {
  className?: string;

  children: React.ReactNode;

  showArrows?: boolean;

  showDots?: boolean;

  autoplay?: boolean;

  autoplayDelay?: number;

  dotsShadow?: boolean;

  loop?: boolean;

  slidesPerView?: number | "auto";

  spaceBetween?: number;

  opts?: SwiperOptions;
};

function Carousel({
  className,
  children,
  showArrows = true,
  showDots = true,
  autoplay = true,
  autoplayDelay = 4000,
  dotsShadow = true,
  loop = false,
  slidesPerView = 1,
  spaceBetween = 0,
  opts,
}: CarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const swiperRef = React.useRef<SwiperClass | null>(null);

  const [instance, setInstance] = React.useState<SwiperClass>();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const slideCount = React.useMemo(() => {
    let count = 0;

    for (const child of React.Children.toArray(children)) {
      if (!React.isValidElement(child)) continue;

      const type = (child as { type: unknown }).type;

      if (type === CarouselContent) {
        count += React.Children.count(
          (child.props as { children?: React.ReactNode }).children,
        );
      } else if (type === CarouselItem) {
        count += 1;
      }
    }

    return count;
  }, [children]);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const swiper = new SwiperClass(containerRef.current, {
      modules: [Autoplay],

      direction: "horizontal",

      loop,

      slidesPerView,

      spaceBetween,

      speed: 500,

      autoplay: autoplay
        ? {
            delay: autoplayDelay,

            disableOnInteraction: false,

            pauseOnMouseEnter: true,
          }
        : false,

      on: {
        init: (s) => {
          setSelectedIndex(s.realIndex ?? s.activeIndex);

          setCanScrollPrev(loop || !s.isBeginning);

          setCanScrollNext(loop || !s.isEnd);
        },

        slideChange: (s) => {
          setSelectedIndex(s.realIndex ?? s.activeIndex);

          setCanScrollPrev(loop || !s.isBeginning);

          setCanScrollNext(loop || !s.isEnd);
        },
      },

      ...opts,
    });

    swiperRef.current = swiper;

    setInstance(swiper);

    return () => {
      swiper.destroy(true, true);

      swiperRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, slidesPerView, spaceBetween, autoplay, autoplayDelay]);

  const scrollPrev = React.useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const scrollNext = React.useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  const scrollTo = React.useCallback(
    (index: number) => {
      const swiper = swiperRef.current;

      if (!swiper) return;

      if (loop) swiper.slideToLoop(index);
      else swiper.slideTo(index);
    },
    [loop],
  );

  return (
    <CarouselContext.Provider
      value={{
        swiper: instance,

        scrollPrev,

        scrollNext,

        scrollTo,

        canScrollPrev,

        canScrollNext,

        selectedIndex,

        slideCount,
      }}>
      <div
        ref={containerRef}
        dir="rtl"
        className={cn("swiper relative w-full overflow-hidden", className)}>
        {children}

        {(showDots || showArrows) && (
          <div
            className={cn([
              "absolute bottom-10 inset-x-0 z-20",

              "flex-center",

              "max-md:bottom-2",
            ])}>
            {/* Dots Center */}
            <div
              className={cn(
                "rounded-full bg-white px-3",

                dotsShadow && "shadow-main",
              )}>
              <CarouselDots />
            </div>

            {/* Arrows Right */}
            {showArrows && (
              <div
                className={cn([
                  "absolute right-10",

                  "hidden md:flex items-center gap-2",

                  "rounded-full px-2 py-2",

                  "max-md:right-2",
                ])}>
                <CarouselPrevious />

                <CarouselNext />
              </div>
            )}
          </div>
        )}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("swiper-wrapper flex", className)} {...props} />
  );
}

function CarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(["swiper-slide basis-full shrink-0 grow-0"], className)}
      {...props}
    />
  );
}

function CarouselPrevious({ className }: { className?: string }) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      size="sm"
      iconOnly
      variant="outline"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className={cn(
        [
          "size-14 rounded-full",

          "border-neutral-100",

          "bg-white",

          "text-primary-500",

          "hover:bg-primary-50",

          "disabled:opacity-40",
        ],
        className,
      )}>
      <ChevronRight className="size-7" />
    </Button>
  );
}

function CarouselNext({ className }: { className?: string }) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      size="sm"
      iconOnly
      variant="outline"
      onClick={scrollNext}
      disabled={!canScrollNext}
      className={cn(
        [
          "size-14 rounded-full",

          "border-neutral-100",

          "bg-white",

          "text-primary-500",

          "hover:bg-primary-50",

          "disabled:opacity-40",
        ],
        className,
      )}>
      <ChevronLeft className="size-7" />
    </Button>
  );
}

function CarouselDots({ className }: { className?: string }) {
  const { swiper, scrollTo, selectedIndex, slideCount } = useCarousel();

  if (slideCount <= 1) {
    return null;
  }

  return (
    <div className={cn("flex-center gap-1.5", className)}>
      {Array.from({ length: slideCount }).map((_, index) => {
        const isActive = selectedIndex === index;

        return (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn([
              "h-2 rounded-full transition-all duration-300",

              isActive
                ? "w-7 bg-primary-500"
                : "w-2 bg-neutral-300 hover:bg-neutral-400",
            ])}
          />
        );
      })}
    </div>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
