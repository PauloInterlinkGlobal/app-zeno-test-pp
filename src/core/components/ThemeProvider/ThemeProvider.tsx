'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';
import { ThemeSync } from './ThemeSync';

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
