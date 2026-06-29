"use client";

import { useEffect } from "react";
import { useLenisContext } from "@/components/providers/SmoothScrollProvider";

export function useLenis(
  callback?: (e: { scroll: number; limit: number; velocity: number }) => void
) {
  const lenis = useLenisContext();

  useEffect(() => {
    if (!lenis || !callback) return;
    lenis.on("scroll", callback);
    return () => { lenis.off("scroll", callback); };
  }, [lenis, callback]);

  return lenis;
}
