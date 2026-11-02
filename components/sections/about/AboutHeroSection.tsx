"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurText } from "@/components/ui/blur-text";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";
import { ItalyBadge } from "@/components/ui/ItalyBadge";

export function AboutHeroSection() {
  const t = useTranslations("about.hero");
  const isRTL = useLocale() === "ar";
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yOuter = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const yInner = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const bellaEase = [0.25, 0.46, 0.45, 0.94] as const;

  const reveal = (delay: number) => ({
    initial: prefersReducedMotion
      ? false
      : { opacity: 0, y: 24, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, delay, ease: bellaEase },
  });

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-bella-charcoal"
      aria-label={t("eyebrow")}
      data-surface="dark"
    >
      {!prefersReducedMotion && (
        <Particles
          className="absolute inset-0 z-0"
          quantity={70}
          staticity={35}
          ease={80}
          size={0.55}
          color="#C9A96E"
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <motion.div style={prefersReducedMotion ? {} : { y: yOuter }}>
          <svg viewBox="0 0 600 600" className="h-[600px] w-[600px] opacity-[0.06]">
            <circle cx="300" cy="300" r="280" fill="none" stroke="#C9A96E" strokeWidth="1" />
            <circle cx="300" cy="300" r="220" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          </svg>
        </motion.div>
        <motion.div className="absolute" style={prefersReducedMotion ? {} : { y: yMiddle }}>
          <svg viewBox="0 0 400 400" className="h-[400px] w-[400px] opacity-[0.07]">
            <circle cx="200" cy="200" r="160" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          </svg>
        </motion.div>
        <motion.div className="absolute" style={prefersReducedMotion ? {} : { y: yInner }}>
          <svg viewBox="0 0 220 220" className="h-[220px] w-[220px] opacity-[0.08]">
            <circle cx="110" cy="110" r="82" fill="none" stroke="#C9A96E" strokeWidth="0.8" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center"
        style={prefersReducedMotion ? {} : { opacity }}
      >
        <motion.div {...reveal(0.1)} className="mb-7">
          <AnimatedShinyText
            shimmerWidth={150}
            className="text-brand-gold inline-flex rounded-full border border-bella-gold/25 bg-bella-gold/8 px-5 py-2 font-body text-[10px] uppercase tracking-[0.3em]"
          >
            {t("eyebrow")}
          </AnimatedShinyText>
        </motion.div>

        {prefersReducedMotion ? (
          <h1 className="mb-8 whitespace-pre-line font-display text-[clamp(3rem,8vw,6.25rem)] font-light leading-[1.02] text-bella-ivory">
            {t("headline")}
          </h1>
        ) : (
          <h1 className="mb-8 max-w-4xl">
            <BlurText
              text={t("headline")}
              delay={120}
              animateBy="words"
              direction="top"
              className="justify-center whitespace-pre-line font-display text-[clamp(3rem,8vw,6.25rem)] font-light leading-[1.02] text-bella-ivory"
            />
          </h1>
        )}

        <motion.div
          {...reveal(0.8)}
          className={cn("mb-7 h-px w-20 bg-bella-gold", isRTL ? "origin-right" : "origin-left")}
        />

        <motion.p
          {...reveal(1)}
          className="max-w-xl font-body text-[11px] uppercase tracking-[0.22em] text-bella-ivory/45"
        >
          {t("subtext")}
        </motion.p>

        <motion.div
          {...reveal(1.2)}
          className="mt-6 flex justify-center"
        >
          <ItalyBadge variant="pill" tone="dark" />
        </motion.div>
      </motion.div>

      <motion.div
        {...reveal(1.35)}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.28em] text-bella-ivory/35">
          {t("scrollCta")}
        </span>
        <motion.div
          className="h-10 w-px bg-gradient-to-b from-bella-gold to-transparent"
          animate={prefersReducedMotion ? {} : { opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
