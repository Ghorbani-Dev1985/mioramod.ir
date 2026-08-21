import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type User = {
  id: string;
  phone: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (token, user) =>
        set({ token, user, isAuthenticated: true }),
      logout: () => set({ ...initialState }),
    }),
    {
      name: 'farda-hospital-auth',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
