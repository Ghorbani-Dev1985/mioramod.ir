import type { PropsWithChildren } from 'react';
import { Toaster } from 'react-native-sonner';

export function SonnerProvider({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Toaster
        position="top-center"
        swipeDirection="up"
        richColors
        theme="light"
      />
    </>
  );
}
