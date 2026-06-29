"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn }               from "@/lib/utils";
import { useMediaQuery }    from "@/hooks/useMediaQuery";

export function MagneticHover({
  children,
  className,
  strength = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 20 });
  const springY = useSpring(y, { stiffness: 180, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!hasFinePointer || prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children:   React.ReactNode;
  className?: string;
  strength?:  number;
  onClick?:   () => void;
  href?:      string;
  external?:  boolean;
}

export function MagneticButton({
  children,
  className,
  strength  = 0.4,
  onClick,
  href,
  external  = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width  / 2)) * strength;
    const y = (e.clientY - (top  + height / 2)) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  if (href) {
    return (
      <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset}>
        <motion.a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          animate={{ x: pos.x, y: pos.y }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className={cn(
            "inline-flex cursor-pointer items-center justify-center",
            className
          )}
        >
          {children}
        </motion.a>
      </div>
    );
  }

  return (
    <div ref={ref} onMouseMove={handleMouse} onMouseLeave={reset}>
      <motion.button
        onClick={onClick}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center",
          className
        )}
      >
        {children}
      </motion.button>
    </div>
  );
}
