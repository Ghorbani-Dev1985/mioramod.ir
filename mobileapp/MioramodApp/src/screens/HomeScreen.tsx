import { useAppStore } from '@/store/appStore';
import { useFontsLoaded } from '@/components';
import SplashScreen from './SplashScreen';
import OnboardingScreen from './OnboardingScreen';
import AuthScreen from './AuthScreen';

const HomeScreen = () => {
  const fontsReady = useFontsLoaded();
  const hasSeenOnboarding = useAppStore((state) => state.hasSeenOnboarding);
  const setHasSeenOnboarding = useAppStore((state) => state.setHasSeenOnboarding);

  if (!fontsReady) {
    return <SplashScreen />;
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingScreen
        onDone={() => setHasSeenOnboarding(true)}
      />
    );
  }

  return <AuthScreen />;
}

export default HomeScreen;
