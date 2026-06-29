"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function useScrollProgress(): {
  ref: React.RefObject<HTMLElement | null>;
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  y: MotionValue<string>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return { ref, scrollYProgress, opacity, y };
}
