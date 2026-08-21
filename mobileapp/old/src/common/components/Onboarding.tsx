import { fa } from '@/messages';
import { ONBOARDING_STEPS } from '@/constants';

import { CalendarDays, ChevronLeft, ChevronRight, HeartPulse, FileText } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Button, Text } from '@/ui';

const STEP_ICONS = [HeartPulse, CalendarDays, FileText];

type OnboardingProps = {
  onDone: () => void;
};

export function Onboarding({ onDone }: OnboardingProps) {
  const [index, setIndex] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  const totalSteps = ONBOARDING_STEPS.length;
  const isLastStep = index === totalSteps - 1;

  const goNext = () => {
    if (isLastStep) {
      onDone();
      return;
    }
    swiperRef.current?.scrollBy(1);
  };

  const goBack = () => {
    swiperRef.current?.scrollBy(-1);
  };

  return (
    <View className="bg-background flex-1">
      <View className="flex-row justify-end px-6 pt-4">
        {!isLastStep && (
          <Button variant="ghost" onPress={onDone}>
            <Text className="text-muted-foreground">{fa.onboarding.skip}</Text>
          </Button>
        )}
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        showsPagination={true}
        paginationStyle={{ bottom: 120 }}
        activeDotColor="#1a1a1a"
        dotColor="#d4d4d4"
        dotStyle={{ width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 }}
        activeDotStyle={{ width: 24, height: 8, borderRadius: 4, marginHorizontal: 4 }}
        onIndexChanged={setIndex}
      >
        {ONBOARDING_STEPS.map((step, i) => {
          const Icon = STEP_ICONS[i] ?? HeartPulse;
          return (
            <View key={step.id} className="flex-1 items-center justify-center px-8">
              <View className="bg-primary/10 h-28 w-28 items-center justify-center rounded-3xl">
                <Icon size={48} className="text-primary" strokeWidth={1.5} />
              </View>
              <Text className="mt-8 text-center text-2xl font-bold" variant="h3">
                {step.title}
              </Text>
              <Text variant="muted" className="mt-4 text-center leading-7">
                {step.subtitle}
              </Text>
              <Button size={"lg"} >{step.buttonText}</Button>
            </View>
          );
        })}
      </Swiper>

      <View className="flex-row items-center justify-between gap-4 px-6 pb-10">
        <Button
          variant="outline"
          size="icon"
          disabled={index === 0}
          onPress={goBack}
          className={index === 0 ? 'opacity-40' : ''}
        >
          <ChevronRight size={20} />
        </Button>

        <Button className="flex-1" onPress={goNext}>
          <Text>{isLastStep ? fa.onboarding.done : fa.common.next}</Text>
          <ChevronLeft size={18} />
        </Button>
      </View>
    </View>
  );
}
