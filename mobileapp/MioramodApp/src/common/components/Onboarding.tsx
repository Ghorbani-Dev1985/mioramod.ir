import { ONBOARDING_STEPS } from '@/constants';
import { useRef, useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Carousel, CarouselItem, Text, type CarouselRef } from '@/ui';

type OnboardingProps = {
  onDone: () => void;
};

const Onboarding = ({ onDone }: OnboardingProps) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<CarouselRef>(null);

  const totalSteps = ONBOARDING_STEPS.length;
  const isLastStep = index === totalSteps - 1;

  const goNext = () => {
    if (isLastStep) {
      onDone();
      return;
    }
    carouselRef.current?.scrollNext();
  };

  return (
    <View className="flex-1 bg-white">
      <Carousel
        ref={carouselRef}
        showDots={true}
        showArrows={false}
        loop={false}
        autoplay={false}
        className="flex-1"
        onIndexChange={setIndex}
      >
        {ONBOARDING_STEPS.map((step) => (
          <CarouselItem key={step.id}>
            <ImageBackground
              source={step.image}
              resizeMode="cover"
              className="flex-1"
            >
              <View className="flex-1 bg-black/20" />
              
              <View className="flex-1 flex-col items-center justify-end gap-y-8 pb-12 px-6">
                <View className="items-center gap-y-2">
                  <Text variant="display-md" className="text-white text-center">
                    {step.title}
                  </Text>
                  <Text variant="body-md" className="text-neutral-50 text-center px-4">
                    {step.subtitle}
                  </Text>
                </View>

                <View className="w-full px-4">
                  <Button fullWidth onPress={goNext}>
                    <Text className="text-white">
                      {step.buttonText}
                    </Text>
                  </Button>
                </View>
              </View>
            </ImageBackground>
          </CarouselItem>
        ))}
      </Carousel>
    </View>
  );
};

export { Onboarding };