"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function InfiniteMovingCards({
  items,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  textDirection = "ltr",
  className,
}: {
  items: { quote: string; name: string; title: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  textDirection?: "ltr" | "rtl";
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const duration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    container.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
    container.style.setProperty("--animation-duration", duration);
  }, [direction, speed]);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    let isInView = true;
    let isPageVisible = document.visibilityState === "visible";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPlayState = () => {
      const paused = !isInView || !isPageVisible || reducedMotion.matches;
      if (paused) scroller.style.animationPlayState = "paused";
      else scroller.style.removeProperty("animation-play-state");
    };

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      syncPlayState();
    });
    const handleVisibility = () => {
      isPageVisible = document.visibilityState === "visible";
      syncPlayState();
    };

    observer.observe(container);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", syncPlayState);
    syncPlayState();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", syncPlayState);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 gap-4 py-4",
          "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
          "motion-reduce:[animation-play-state:paused]"
        )}
      >
        {[...items, ...items].map((item, idx) => (
          <li
            key={`${item.name}-${idx}`}
            aria-hidden={idx >= items.length}
            dir={textDirection}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border px-8 py-6 text-start md:w-[450px]"
            style={{
              background: "var(--surface-dark-elevated)",
              borderColor: "rgba(201,169,110,0.15)",
            }}
          >
            {/* 5 gold stars */}
            <div className="mb-3 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#C9A96E] text-xs">★</span>
              ))}
            </div>

            <blockquote>
              <span
                className="relative z-20 text-sm leading-[1.6] font-normal"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span
                    className="text-sm font-medium leading-[1.6]"
                    style={{ color: "rgba(255,255,255,0.9)" }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-brand-gold text-[11px] font-normal leading-[1.6]"
                  >
                    {item.title}
                  </span>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
