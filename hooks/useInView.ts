"use client";

import { useInView as useFramerInView } from "framer-motion";
import { useRef, RefObject } from "react";

export function useInView<T extends Element>(
  options: { once?: boolean; margin?: string; amount?: number } = {}
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const margin = (options.margin ?? "-10%") as `${number}px ${number}px ${number}px ${number}px` | undefined;
  const isInView = useFramerInView(ref, {
    once:   options.once   ?? true,
    margin,
    amount: options.amount ?? 0.2,
  });
  return [ref, isInView];
}
