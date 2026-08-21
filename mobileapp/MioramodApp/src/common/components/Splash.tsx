import { fa } from '@/messages';
import { WifiOff } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { AppState as RNAppState, Pressable, View, ImageBackground, Image } from 'react-native';
import { Button, Text } from '@/ui';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { SpiralLoading } from './SpiralLoading';

const splashImage = require('../../../assets/images/splash/splash.jpg');
const mainImage = require('../../../assets/images/logo/enFa/mainLogo.png');

const Splash = () => {
  const { isOnline, check } = useOnlineStatus();
  const appState = useRef(RNAppState.currentState);

  useEffect(() => {
    const subscription = RNAppState.addEventListener('change', (nextState) => {
      if (appState.current.match(/inactive|background/) && nextState === 'active') {
        void check();
      }
      appState.current = nextState;
    });

    return () => subscription.remove();
  }, [check]);

  const isLoading = isOnline === null;
  const isOffline = isOnline === false;

  return (
    <ImageBackground source={splashImage} resizeMode="cover" className={`${isLoading ? "pb-16" : "pb-48"} flex-1`}>
      <View className={`${isOffline ? "gap-y-32" : "gap-y-8"} flex-1 items-center justify-end`}>
        <Image source={mainImage} width={168} height={114} />
        {isLoading ? (
          <View className="items-center">
            <SpiralLoading />
          </View>
        ) : isOffline ? (
          <Pressable onPress={() => void check()} className="items-center">
            <Text variant="display-md">
              {fa.splash.noConnection}
            </Text>
            <Text variant="body-md" className="max-w-72 text-center">
              {fa.splash.description}
            </Text>
            <Button className="mt-8" onPress={() => void check()}>
              <Text>{fa.common.retry}</Text>
            </Button>
          </Pressable>
        ) : null}
      </View>
    </ImageBackground>
  );
}

export {Splash};
