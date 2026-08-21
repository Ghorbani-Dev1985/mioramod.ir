import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AppState = {
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (value: boolean) => void;
  reset: () => void;
};

const initialState = {
  hasSeenOnboarding: false,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: 'farda-hospital-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
