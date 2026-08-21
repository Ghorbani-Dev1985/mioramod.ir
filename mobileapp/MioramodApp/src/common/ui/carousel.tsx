import * as React from "react";
import {
  View,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { cn } from "@/utils/cn";
import { Button } from "./button";
import { 
  Carousel as CarouselRN,
  type CarouselRef as RRCarouselRef,
  type CarouselProps as RRCarouselProps,
} from "react-native-reanimated-carousel";

export type CarouselRef = {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  slideCount: number;
};

type CarouselContextType = {
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
  if (!context) throw new Error("useCarousel must be used within Carousel");
  return context;
}

type CarouselProps = {
  className?: string;
  children: React.ReactNode;
  showArrows?: boolean;
  showDots?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  ref?: React.Ref<CarouselRef>;
  onIndexChange?: (index: number) => void;
};

const Carousel = React.forwardRef<CarouselRef, CarouselProps>(
  function Carousel(
    {
      className,
      children,
      showArrows = false,
      showDots = true,
      autoplay = false,
      autoplayDelay = 4000,
      loop = false,
      onIndexChange,
    },
    ref
  ) {
    const { width } = useWindowDimensions();
    const carouselRef = React.useRef<RRCarouselRef>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const childrenArray = React.Children.toArray(children).filter(
      React.isValidElement
    );
    const slideCount = childrenArray.length;

    const scrollPrev = React.useCallback(() => {
      carouselRef.current?.prev();
    }, []);

    const scrollNext = React.useCallback(() => {
      carouselRef.current?.next();
    }, []);

    const scrollTo = React.useCallback((index: number) => {
      carouselRef.current?.scrollTo({ index, animated: true });
    }, []);

    React.useImperativeHandle(ref, () => ({
      scrollPrev,
      scrollNext,
      scrollTo,
      selectedIndex,
      slideCount,
    }), [scrollPrev, scrollNext, scrollTo, selectedIndex, slideCount]);

  return (
    <CarouselContext.Provider
      value={{
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev: !loop ? selectedIndex > 0 : true,
        canScrollNext: !loop ? selectedIndex < slideCount - 1 : true,
        selectedIndex,
        slideCount,
      }}
    >
      <View className={cn("relative w-full flex-1", className)}>
        <CarouselRN
          ref={carouselRef}
          data={childrenArray}
          renderItem={({ item }) => item as React.ReactElement}
          loop={loop}
          autoPlay={autoplay}
          autoplayInterval={autoplayDelay}
          onSnapToItem={(index) => {
            setSelectedIndex(index);
            onIndexChange?.(index);
          }}
          style={{ width, height: width }}
        />

        {/* Pagination و Arrows */}
        {(showDots || showArrows) && (
          <View className="absolute bottom-6 left-0 right-0 z-20 items-center justify-center">
            {showDots && slideCount > 1 && (
              <View className="flex-row items-center justify-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm">
                {Array.from({ length: slideCount }).map((_, index) => {
                  const isActive = selectedIndex === index;
                  return (
                    <Pressable
                      key={index}
                      onPress={() => scrollTo(index)}
                      className="items-center justify-center p-1"
                    >
                      <View
                        className={cn(
                          "items-center justify-center rounded-full transition-all duration-300",
                          isActive
                            ? "w-5 h-5 border border-neutral-800 bg-transparent"
                            : "w-2.5 h-2.5 bg-neutral-300"
                        )}
                      >
                        {isActive && (
                          <View className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                        )}
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {showArrows && (
              <View className="absolute right-4 flex-row items-center gap-2">
                <Button
                  size="iconSm"
                  variant="outline"
                  onPress={scrollPrev}
                  className="border-neutral-100 bg-white"
                >
                  <ChevronRight size={18} color="#1a1a1a" />
                </Button>
                <Button
                  size="iconSm"
                  variant="outline"
                  onPress={scrollNext}
                  className="border-neutral-100 bg-white"
                >
                  <ChevronLeft size={18} color="#1a1a1a" />
                </Button>
              </View>
            )}
          </View>
        )}
      </View>
    </CarouselContext.Provider>
  );
  }
);

export function CarouselContent({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View className={cn("flex-1", className)} {...props} />;
}

export function CarouselItem({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View className={cn("flex-1", className)} {...props} />;
}