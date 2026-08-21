import { useAppStore } from '@/store';
import { useState } from 'react';
import SplashScreen from './splash-screen';
import OnboardingScreen from './onboarding-screen';
import HomeScreen from './home-screen';

enum AppStage {
  Splash = 'splash',
  Onboarding = 'onboarding',
  Home = 'home',
}

export default function AppIndex() {
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);
  const setHasSeenOnboarding = useAppStore((state) => state.setHasSeenOnboarding);
  const [isInternetReady, setIsInternetReady] = useState(false);

  if (!isInternetReady) {
    return <SplashScreen onReady={() => setIsInternetReady(true)} />;
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen
        onDone={() => {
          setHasSeenOnboarding(true);
        }}
      />
    );
  }

  return <HomeScreen />;
}
