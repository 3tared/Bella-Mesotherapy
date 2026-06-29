"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(x, springConfig);
  const cursorY = useSpring(y, springConfig);

  const dotX = useSpring(x, { damping: 50, stiffness: 400 });
  const dotY = useSpring(y, { damping: 50, stiffness: 400 });

  useEffect(() => {
    // Don't render cursor on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // a11y: don't render cursor when user prefers reduced motion
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ left: cursorX, top: cursorY }}
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border border-bella-gold/50 mix-blend-difference hidden md:block motion-reduce:hidden"
      />
      {/* Inner dot */}
      <motion.div
        style={{ left: dotX, top: dotY, x: 10, y: 10 }}
        className="pointer-events-none fixed z-[9999] h-2 w-2 rounded-full bg-bella-gold hidden md:block motion-reduce:hidden"
      />
    </>
  );
}
