import { create } from 'zustand';

type HomeState = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const useHomeStore = create<HomeState>((set) => ({
  selectedTab: 'overview',
  setSelectedTab: (selectedTab) => set({ selectedTab }),
}));
