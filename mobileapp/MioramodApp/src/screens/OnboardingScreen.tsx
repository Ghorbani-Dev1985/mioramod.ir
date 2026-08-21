import { Onboarding } from '@/components/Onboarding';

type OnboardingScreenProps = {
  onDone: () => void;
};

export default function OnboardingScreen({ onDone }: OnboardingScreenProps) {
  return <Onboarding onDone={onDone} />;
}
