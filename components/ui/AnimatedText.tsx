"use client";

import { motion } from "framer-motion";
import { cn }     from "@/lib/utils";

interface AnimatedTextProps {
  text:       string;
  className?: string;
  delay?:     number;
  once?:      boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  once  = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container = {
    hidden:  {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: delay },
    },
  };

  const child = {
    hidden:  { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity:    1,
      y:          0,
      filter:     "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={container}
      className={cn("flex flex-wrap gap-x-[0.25em]", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
