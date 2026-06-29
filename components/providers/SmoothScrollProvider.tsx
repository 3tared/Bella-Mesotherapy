"use client";

import { useEffect, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let currentLenis: Lenis | null = null;
const listeners = new Set<() => void>();

function setCurrentLenis(value: Lenis | null) {
  currentLenis = value;
  listeners.forEach((listener) => listener());
}

export function useLenisContext() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => currentLenis,
    () => null
  );
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration:    1.4,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    setCurrentLenis(lenisInstance);

    /* Sync GSAP ScrollTrigger with Lenis */
    lenisInstance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenisInstance.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenisInstance.destroy();
      setCurrentLenis(null);
    };
  }, []);

  return children;
}
