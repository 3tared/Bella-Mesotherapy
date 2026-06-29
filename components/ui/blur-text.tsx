"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "characters";
  direction?: "top" | "bottom" | "left" | "right";
  className?: string;
  style?: React.CSSProperties;
}

export function BlurText({
  text,
  delay = 100,
  animateBy = "words",
  direction = "top",
  className,
  style,
}: BlurTextProps) {
  const units = animateBy === "words" ? text.split(" ") : text.split("");

  const getDirectionOffset = () => {
    switch (direction) {
      case "top": return { y: -12 };
      case "bottom": return { y: 12 };
      case "left": return { x: -12 };
      case "right": return { x: 12 };
    }
  };

  const offset = getDirectionOffset();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const child: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      ...offset,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {units.map((unit, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {unit}
          {animateBy === "words" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}
