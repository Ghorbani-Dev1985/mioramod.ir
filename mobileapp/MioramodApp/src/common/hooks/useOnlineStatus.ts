import { useCallback, useEffect, useState } from 'react';
import NetInfo, {
  NetInfoStateType,
  type NetInfoState,
  type NetInfoSubscription,
} from '@react-native-community/netinfo';

type OnlineStatus = {
  isOnline: boolean | null;
  isInternetReachable: boolean | null;
  isConnected: boolean | null;
  type: NetInfoState['type'];
  check: () => Promise<void>;
};

export function useOnlineStatus(): OnlineStatus {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [isInternetReachable, setIsInternetReachable] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [type, setType] = useState<NetInfoState['type']>(NetInfoStateType.unknown);

  const check = useCallback(async () => {
    const state = await NetInfo.fetch();
    setIsOnline(!!(state.isConnected && state.isInternetReachable));
    setIsInternetReachable(state.isInternetReachable);
    setIsConnected(state.isConnected);
    setType(state.type);
  }, []);

  useEffect(() => {
    const unsubscribe: NetInfoSubscription = NetInfo.addEventListener((state) => {
      setIsOnline(!!(state.isConnected && state.isInternetReachable));
      setIsInternetReachable(state.isInternetReachable);
      setIsConnected(state.isConnected);
      setType(state.type);
    });

    void check();

    return () => unsubscribe();
  }, [check]);

  return { isOnline, isInternetReachable, isConnected, type, check };
}
