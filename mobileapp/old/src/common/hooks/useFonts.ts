import { useFonts } from 'expo-font';
import { FONTS } from '@/constants';

export function useAppFonts() {
  const [fontsLoaded, fontError] = useFonts(FONTS);

  return { fontsLoaded, fontError };
}
