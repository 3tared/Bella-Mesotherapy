"use client";

import { useTranslations } from "next-intl";
import { motion }          from "motion/react";
import { NumberTicker }    from "@/components/ui/number-ticker";
import { staggerContainer, fadeUp, cardReveal } from "@/lib/animations";
import { brand }           from "@/data/brand";

export function BenefitsSection() {
  const t = useTranslations("home.benefits");
  const statValues = brand.stats.map(({ value }) =>
    Number.parseInt(value.replace(/\D/g, ""), 10)
  );

  /* next-intl returns raw array from JSON — access by index */
  const statsData = statValues.map((value, i) => ({
    value,
    suffix: t(`stats.${i}.suffix`),
    label:  t(`stats.${i}.label`),
  }));

  const cardsData = [0, 1, 2].map((i) => ({
    numeral: t(`cards.${i}.numeral`),
    title:   t(`cards.${i}.title`),
    desc:    t(`cards.${i}.desc`),
  }));

  return (
    <section
      id="benefits"
      className="relative w-full overflow-hidden py-[clamp(5rem,10vw,9rem)]"
      data-surface="dark"
      style={{ background: "var(--surface-dark)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[var(--surface-dark-muted)] to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="sr-only">{t("heading")}</h2>
        {/* Stats row — BUG 4 FIX: use border-r instead of absolute positioned separator */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-24 grid grid-cols-2 gap-[1px] border border-bella-gold/8 bg-bella-gold/8 md:grid-cols-4"
        >
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center gap-2 bg-[var(--surface-dark)] px-6 py-10 text-center"
            >
              {/* RTL FIX: numbers always display LTR */}
              <div dir="ltr" className="flex items-baseline gap-1">
                <NumberTicker
                  value={stat.value}
                  direction="up"
                  delay={0.3 + i * 0.15}
                  className="font-display text-5xl font-light tabular-nums text-white lg:text-6xl"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                />
                {stat.suffix && (
                  <span
                    className="text-brand-gold font-display text-3xl"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="text-on-dark-muted font-body text-[10px] uppercase tracking-[0.25em]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits cards — i18n */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-10 md:grid-cols-3"
        >
          {cardsData.map((b) => (
            <motion.div
              key={b.numeral}
              variants={cardReveal}
              className="border-t border-bella-gold/20 pt-8"
            >
              {/* Roman numeral */}
              <span
                className="mb-5 block text-5xl text-bella-gold/20"
                style={{ fontFamily: "var(--font-italiana)" }}
                aria-hidden="true"
              >
                {b.numeral}
              </span>

              {/* Title */}
              <h3
                className="mb-3 font-display text-2xl text-white"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                {b.title}
              </h3>

              {/* Description */}
              <p className="text-on-dark-muted font-body text-[13px] leading-relaxed">
                {b.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
