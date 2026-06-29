"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className,
  side = "start",
  dir = "ltr",
}: {
  children: React.ReactNode;
  className?: string;
  side?: "start" | "end";
  dir?: "ltr" | "rtl";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    { stiffness: 500, damping: 90 }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    { stiffness: 500, damping: 90 }
  );

  const isLeft =
    (side === "start" && dir === "ltr") ||
    (side === "end" && dir === "rtl");

  return (
    <motion.div
      ref={ref}
      className={cn("relative mx-auto h-full w-full max-w-4xl", className)}
    >
      <div
        data-tracing-beam-side={isLeft ? "left" : "right"}
        className={cn(
          "absolute top-3",
          isLeft ? "-left-4 md:-left-20" : "-right-4 md:-right-20"
        )}
      >
        {/* Tracing dot */}
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow: "0 0 12px 4px rgba(201, 169, 110, 0.25)",
          }}
          className={cn(
            "flex h-4 w-4 items-center justify-center rounded-full border border-[rgba(201,169,110,0.3)] shadow-sm",
            isLeft ? "ml-[27px]" : "mr-[27px]"
          )}
          style={{ willChange: "transform" }}
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            className="h-2 w-2 rounded-full border border-[rgba(201,169,110,0.4)] bg-[#C9A96E]"
          />
        </motion.div>

        {/* SVG beam line */}
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className={cn("block", isLeft ? "ml-4" : "mr-4 -scale-x-100")}
          aria-hidden="true"
          focusable="false"
        >
          {/* Background line */}
          <path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="rgba(201, 169, 110, 0.12)"
            strokeWidth="1"
          />
          {/* Animated gold line */}
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gold-beam-gradient)"
            strokeWidth="1.5"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="gold-beam-gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#C9A96E" stopOpacity="0" />
              <stop stopColor="#C9A96E" />
              <stop offset="0.325" stopColor="rgba(201,169,110,0.5)" />
              <stop offset="1" stopColor="rgba(201,169,110,0)" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}
