"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion }                      from "motion/react";
import { staggerContainer, fadeUp }    from "@/lib/animations";
import { brand }                       from "@/data/brand";

export function ManifestoSection() {
  const t      = useTranslations("home.manifesto");
  const tStats = useTranslations("home.stats");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  const STATS = [
    { value: brand.stats[0].value, label: tStats("satisfaction") },
    { value: brand.stats[1].value, label: tStats("actives") },
    { value: brand.stats[2].value, label: tStats("hydration") },
    { value: brand.stats[3].value, label: tStats("additives") },
  ];

  return (
    <section
      id="manifesto"
      className="relative w-full overflow-hidden bg-[var(--bella-ivory)] py-[clamp(6rem,12vw,11rem)]"
    >
      {/* ENHANCE 3: Subtle diagonal line pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.02]" aria-hidden="true">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="manifesto-lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="40" y2="0" stroke="#C9A96E" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#manifesto-lines)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Two-column header */}
        <div
          className={`relative grid gap-14 lg:gap-24 ${
            isRTL ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"
          }`}
        >
          {/* LEFT col: decorative + section identity */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="relative"
          >
            {/* Giant watermark number */}
            <span
              className={`pointer-events-none absolute select-none leading-none text-bella-charcoal opacity-[0.04] ${
                isRTL
                  ? "-top-6 -right-4 text-[15vw]"
                  : "-top-6 -left-4 text-[15vw]"
              }`}
              aria-hidden="true"
              style={{ fontFamily: "var(--font-italiana)" }}
            >
              {isRTL ? "٠١" : "01"}
            </span>

            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              className="relative z-10 mb-6 flex items-center gap-3"
            >
              <span className="h-[1px] w-7 bg-bella-gold" />
              <p className="text-brand-gold font-body text-[10px] uppercase tracking-[0.3em]">
                {t("eyebrow")}
              </p>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="relative z-10 font-display text-fluid-2xl leading-[1.2] text-bella-charcoal"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("headline")}
            </motion.h2>

            {/* Decorative vertical gold line (desktop) */}
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.65, 0, 0.35, 1],
              }}
              className={`absolute bottom-0 top-0 hidden w-[1px] bg-bella-gold/20 lg:block ${
                isRTL ? "-left-8" : "-right-8"
              }`}
            />
          </motion.div>

          {/* RIGHT col: manifesto paragraphs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
            className="flex flex-col justify-center space-y-8"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-fluid-base leading-[1.8] text-bella-charcoal"
            >
              {t("p1")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="font-body text-fluid-base leading-[1.8] text-bella-charcoal"
            >
              {t("p2")}
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-brand-gold font-display text-fluid-lg italic leading-relaxed"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              {t("p3")}
            </motion.p>
          </motion.div>
        </div>

        {/* Stats teaser row — RTL FIX: dir="ltr" on numbers */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mt-20 grid grid-cols-2 border-t border-bella-gold/15 pt-12 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center gap-1.5 px-4 py-6 text-center"
            >
              <span
                dir="ltr"
                className="text-brand-gold font-display text-[2.5rem] font-light leading-none"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {stat.value}
              </span>
              <span className="font-body text-[10px] uppercase tracking-[0.2em] text-bella-charcoal/65">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gold gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-bella-gold/25 to-transparent" />
    </section>
  );
}
