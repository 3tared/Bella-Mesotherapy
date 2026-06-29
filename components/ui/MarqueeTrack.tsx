"use client";

import { cn } from "@/lib/utils";

interface MarqueeTrackProps {
  children:   React.ReactNode;
  reverse?:   boolean;
  speed?:     "slow" | "base" | "fast";
  className?: string;
}

const speeds = {
  slow: "60s",
  base: "35s",
  fast: "20s",
};

export function MarqueeTrack({
  children,
  reverse   = false,
  speed     = "base",
  className,
}: MarqueeTrackProps) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className="flex min-w-full shrink-0 items-center gap-8"
        style={{
          animation:           `marquee ${speeds[speed]} linear infinite`,
          animationDirection:  reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
      <div
        className="flex min-w-full shrink-0 items-center gap-8"
        aria-hidden
        style={{
          animation:           `marquee ${speeds[speed]} linear infinite`,
          animationDirection:  reverse ? "reverse" : "normal",
        }}
      >
        {children}
      </div>
    </div>
  );
}
