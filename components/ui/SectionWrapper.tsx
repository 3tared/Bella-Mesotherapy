"use client";

import { motion } from "framer-motion";
import { cn }     from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface SectionWrapperProps {
  id?:         string;
  className?:  string;
  children:    React.ReactNode;
  fullWidth?:  boolean;
  dark?:       boolean;
  noPadding?:  boolean;
}

export function SectionWrapper({
  id,
  className,
  children,
  fullWidth  = false,
  dark       = false,
  noPadding  = false,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={staggerContainer}
      className={cn(
        "relative w-full overflow-hidden",
        !noPadding && "py-[clamp(5rem,10vw,9rem)]",
        dark && "bg-bella-charcoal text-bella-ivory",
        className
      )}
    >
      <div className={cn(!fullWidth && "mx-auto max-w-7xl px-6 lg:px-8")}>
        {children}
      </div>
    </motion.section>
  );
}

/* Reusable animated heading */
export function SectionHeading({
  eyebrow,
  headline,
  subtext,
  centered = false,
  light    = false,
}: {
  eyebrow?:  string;
  headline:  string;
  subtext?:  string;
  centered?: boolean;
  light?:    boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn("mb-16", centered && "text-center")}
    >
      {eyebrow && (
        <p className={cn(
          "mb-3 font-body text-sm tracking-[0.25em] uppercase",
          light ? "text-bella-gold-light" : "text-bella-gold"
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn(
        "font-display text-fluid-3xl leading-tight",
        light ? "text-white" : "text-bella-charcoal dark:text-bella-ivory"
      )}>
        {headline}
      </h2>
      {subtext && (
        <p className={cn(
          "mt-4 max-w-2xl text-fluid-base leading-relaxed",
          centered && "mx-auto",
          light ? "text-white/60" : "text-bella-stone"
        )}>
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
