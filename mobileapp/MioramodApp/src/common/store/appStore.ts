import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
      setHasSeenOnboarding: (value: boolean) => set({ hasSeenOnboarding: value }),
      reset: () => set({ ...initialState }),
    }),
    {
      name: "mioramod-app-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
