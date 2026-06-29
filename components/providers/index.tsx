"use client";

import { ThemeProvider }      from "./ThemeProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
