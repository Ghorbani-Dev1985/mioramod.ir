import { Splash } from '@/components/splash';

type SplashScreenProps = {
  onReady: () => void;
};

export default function SplashScreen({ onReady }: SplashScreenProps) {
  return <Splash onReady={onReady} />;
}
