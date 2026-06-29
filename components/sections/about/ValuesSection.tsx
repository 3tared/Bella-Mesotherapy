"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { SectionHeading, SectionWrapper } from "@/components/ui/SectionWrapper";
import { valuePrinciples } from "@/data/about";
import { fadeUp } from "@/lib/animations";

const icons = {
  purity: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l6 6-6 12L6 9l6-6z" />
      <path d="M6 9h12M9 9l3 12 3-12" />
    </svg>
  ),
  precision: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  ),
  transformation: (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 13a8 8 0 0114-5" />
      <path d="M18 4v4h-4" />
      <path d="M20 11a8 8 0 01-14 5" />
      <path d="M6 20v-4h4" />
    </svg>
  ),
} as const;

export function ValuesSection() {
  const t = useTranslations("about.values");
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper dark>
      <SectionHeading eyebrow={t("eyebrow")} headline={t("headline")} centered light />

      <div className="grid gap-5 md:grid-cols-3">
        {valuePrinciples.map((value) => (
          <motion.div
            key={value.key}
            variants={prefersReducedMotion ? undefined : fadeUp}
          >
            <CardSpotlight
              spotlightColor="rgba(201,169,110,0.08)"
              className="h-full border border-bella-gold/10 bg-white/[0.04] p-8 text-center transition-colors duration-300 hover:border-bella-gold/35"
            >
              <div className="relative mx-auto mb-6 flex h-14 w-14 items-center justify-center border border-bella-gold/30 text-bella-gold">
                {icons[value.icon]}
              </div>
              <h3 className="relative font-display text-2xl font-semibold text-bella-ivory">
                {t(`${value.key}.title`)}
              </h3>
              <p className="relative mt-4 font-body text-sm leading-relaxed text-bella-ivory/52">
                {t(`${value.key}.desc`)}
              </p>
            </CardSpotlight>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
