import { fa } from '@/messages';
import { useOnlineStatus } from '@/hooks';

import { WifiOff } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { ActivityIndicator, AppState as RNAppState, Pressable, View, ImageBackground } from 'react-native';
import { Button, Text } from '@/ui';

type SplashProps = {
  onReady: () => void;
};

const splashImage = require('../../../assets/images/splash/splash.jpg');


export function Splash({ onReady }: SplashProps) {
  const { isOnline, check } = useOnlineStatus();
  const appState = useRef(RNAppState.currentState);
  const isReadyRef = useRef(false);

  const markReady = () => {
    if (!isReadyRef.current) {
      isReadyRef.current = true;
      onReady();
    }
  };

  useEffect(() => {
    if (isOnline === true) {
      markReady();
    }
  }, [isOnline]);

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

  return (
      <ImageBackground
      source={splashImage}
      resizeMode="cover"
      className="flex-1"
    >
    <View className="flex-1 items-center justify-center px-8">
      {isLoading ? (
        <>
          <ActivityIndicator size="large" className="text-primary" />
          <Text className="mt-6 text-center text-xl font-bold">{fa.splash.title}</Text>
          <Text variant="muted" className="mt-2">
            {fa.splash.subtitle}
          </Text>
        </>
      ) : (
        <Pressable
        onPress={() => void check()}
        className="w-full flex-1 items-center justify-center"
        >
          <View className="bg-muted mb-8 h-24 w-24 items-center justify-center rounded-full">
            <WifiOff size={44} className="text-destructive" />
          </View>
          <Text className="text-center text-2xl font-bold text-destructive">
            {fa.splash.noConnection}
          </Text>
          <Text variant="muted" className="mt-3 max-w-xs text-center">
            {fa.splash.description}
          </Text>
          <Button className="mt-8 w-full" onPress={() => void check()}>
            <Text>{fa.common.retry}</Text>
          </Button>
        </Pressable>
      )}
    </View>
     </ImageBackground>
  );
}
