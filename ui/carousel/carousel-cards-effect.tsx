"use client";

import * as React from "react";

import { Swiper as SwiperClass } from "swiper";

import { Autoplay, EffectCards } from "swiper/modules";

import "swiper/css";

import "swiper/css/effect-cards";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/core/utils/shadcn.utils";

import { Button } from "../button";

type CardsCarouselContextType = {
  swiper: SwiperClass | undefined;

  scrollPrev: () => void;

  scrollNext: () => void;

  scrollTo: (index: number) => void;

  canScrollPrev: boolean;

  canScrollNext: boolean;

  selectedIndex: number;

  slideCount: number;
};

const CardsCarouselContext =
  React.createContext<CardsCarouselContextType | null>(null);

function useCardsCarousel() {
  const context = React.useContext(CardsCarouselContext);

  if (!context) {
    throw new Error("useCardsCarousel must be used within CardsCarousel");
  }

  return context;
}

type CardsCarouselProps = {
  className?: string;

  children: React.ReactNode;

  showArrows?: boolean;

  showDots?: boolean;

  loop?: boolean;

  grabCursor?: boolean;

  dotsShadow?: boolean;

  perSlideOffset?: number;

  perSlideRotate?: number;

  autoPlay?: boolean;

  autoPlayInterval?: number;

  pauseOnHover?: boolean;
};

function CardsCarousel({
  className,
  children,
  showArrows = true,
  showDots = true,
  loop = false,
  grabCursor = true,
  dotsShadow = true,
  perSlideOffset = 8,
  perSlideRotate = 5,
  autoPlay = false,
  autoPlayInterval = 4000,
  pauseOnHover = true,
}: CardsCarouselProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const swiperRef = React.useRef<SwiperClass | null>(null);

  const [instance, setInstance] = React.useState<SwiperClass>();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [canScrollPrev, setCanScrollPrev] = React.useState(false);

  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const slideCount = React.Children.count(children);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const swiper = new SwiperClass(containerRef.current, {
      modules: [Autoplay, EffectCards],
      direction: "horizontal",
      effect: "cards",
      loop,
      grabCursor,
      speed: 500,
      cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 0,
        rotate: true,
        slideShadows: false,
      },

      autoplay: autoPlay
        ? {
            delay: autoPlayInterval,

            disableOnInteraction: false,

            pauseOnMouseEnter: pauseOnHover,
          }
        : false,

      on: {
        init: (s) => {
          setSelectedIndex(s.realIndex ?? s.activeIndex);

          setCanScrollPrev(s.isBeginning);

          setCanScrollNext(s.isEnd);
        },

        slideChange: (s) => {
          setSelectedIndex(s.realIndex ?? s.activeIndex);

          setCanScrollPrev(s.isBeginning);

          setCanScrollNext(s.isEnd);
        },
      },
    });

    swiperRef.current = swiper;

    setInstance(swiper);

    return () => {
      swiper.destroy(true, true);

      swiperRef.current = null;
    };
  }, [
    loop,
    grabCursor,
    autoPlay,
    autoPlayInterval,
    perSlideOffset,
    perSlideRotate,
    pauseOnHover,
  ]);

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
    <CardsCarouselContext.Provider
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
        className={cn("swiper relative w-full h-44", className)}>
        <div className="swiper-wrapper">{children}</div>

        {(showDots || showArrows) && (
          <div
            className={cn([
              "absolute -bottom-12 inset-x-0 z-20",

              "flex-center",

              "max-md:bottom-2",
            ])}>
            {/* Dots Center */}
            {showDots && (
              <div
                className={cn(
                  "rounded-full bg-white px-3",

                  dotsShadow && "shadow-md",
                )}>
                <CardsCarouselDots />
              </div>
            )}

            {/* Arrows Right */}
            {showArrows && (
              <div
                className={cn([
                  "absolute right-10",

                  "hidden md:flex items-center gap-2",

                  "rounded-full px-2 py-2",

                  "max-md:right-2",
                ])}>
                <CardsCarouselPrevious />

                <CardsCarouselNext />
              </div>
            )}
          </div>
        )}
      </div>
    </CardsCarouselContext.Provider>
  );
}

function CardsCarouselItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        "swiper-slide flex-center h-full w-full overflow-hidden",

        className,
      )}
      {...props}
    />
  );
}

function CardsCarouselPrevious({ className }: { className?: string }) {
  const { scrollPrev, canScrollPrev } = useCardsCarousel();

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
      className={cn(
        [
          "size-14 rounded-full",

          "bg-white",

          "text-primary",

          "disabled:opacity-40",
        ],

        className,
      )}>
      <ChevronLeft className="size-7" />
    </Button>
  );
}

function CardsCarouselNext({ className }: { className?: string }) {
  const { scrollNext, canScrollNext } = useCardsCarousel();

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={scrollNext}
      disabled={!canScrollNext}
      aria-label="Next slide"
      className={cn(
        [
          "size-14 rounded-full",

          "border-border",

          "bg-white",

          "text-primary",

          "hover:bg-accent",

          "disabled:opacity-40",
        ],

        className,
      )}>
      <ChevronRight className="size-7" />
    </Button>
  );
}

function CardsCarouselDots({ className }: { className?: string }) {
  const { scrollTo, selectedIndex, slideCount } = useCardsCarousel();

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
            aria-label={`Go to slide ${index + 1}`}
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
  CardsCarousel,
  CardsCarouselItem,
  CardsCarouselPrevious,
  CardsCarouselNext,
  CardsCarouselDots,
};
