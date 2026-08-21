import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useState } from "react";
import { FONTS } from "../utils/fonts";

SplashScreen.preventAutoHideAsync();

const FontsLoadedContext = createContext(false);

const useFontsLoaded = () => useContext(FontsLoadedContext);

const FontLoader = ({ children }: { children: React.ReactNode }) => {
  const [fontsLoaded] = useFonts(FONTS);
  const [splashHidden, setSplashHidden] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => setSplashHidden(true));
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FontsLoadedContext.Provider value={splashHidden}>
      {children}
    </FontsLoadedContext.Provider>
  );
};

export { FontLoader, useFontsLoaded };
