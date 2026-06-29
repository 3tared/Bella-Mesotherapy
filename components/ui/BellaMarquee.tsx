"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BellaMarqueeProps {
  children: ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: string;
  gap?: string;
  className?: string;
}

export function BellaMarquee({
  children,
  reverse = false,
  pauseOnHover = false,
  duration = "40s",
  gap = "2rem",
  className,
}: BellaMarqueeProps) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={
        {
          "--duration": duration,
          "--gap": gap,
        } as CSSProperties
      }
    >
      {[0, 1].map((setIndex) => (
        <div
          key={setIndex}
          aria-hidden={setIndex === 1}
          className={cn(
            "flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)]",
            reverse ? "animate-bella-marquee-reverse" : "animate-bella-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
