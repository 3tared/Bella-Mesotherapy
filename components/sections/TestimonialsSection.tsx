"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion }                      from "motion/react";
import { InfiniteMovingCards }         from "@/components/ui/aceternity/infinite-moving-cards";
import { BlurText }                    from "@/components/ui/blur-text";
import { testimonials }                from "@/data/testimonials";
import type { Locale }                 from "@/data/types";

export function TestimonialsSection() {
  const t      = useTranslations("home.testimonials");
  const locale = useLocale() as Locale;
  const isRTL  = locale === "ar";

  const toCard = (testimonial: (typeof testimonials)[0]) => ({
    quote: testimonial.text[locale],
    name:  testimonial.name[locale],
    title: `${testimonial.role[locale]} · ${testimonial.location[locale]}`,
  });

  const row1 = testimonials.slice(0, 3).map(toCard);
  const row2 = testimonials.slice(3, 6).map(toCard);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-[clamp(5rem,10vw,9rem)]"
      data-surface="dark"
      style={{ background: "var(--surface-dark-muted)" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--bella-ivory)] to-transparent"
      />

      {/* Header */}
      <div className="mx-auto mb-16 max-w-7xl px-6 text-center lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-brand-gold mb-4 font-body text-[10px] uppercase tracking-[0.3em]"
        >
          {t("eyebrow")}
        </motion.p>

        <h2>
          <BlurText
            text={t("headline")}
            delay={100}
            animateBy="words"
            direction="top"
            className="font-display text-fluid-3xl text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </h2>
      </div>

      {/* Two rows — RTL FIX: reverse scroll direction in Arabic */}
      <div className="space-y-4">
        <InfiniteMovingCards
          items={row1}
          direction={isRTL ? "right" : "left"}
          speed="slow"
          pauseOnHover
          textDirection={isRTL ? "rtl" : "ltr"}
        />
        <InfiniteMovingCards
          items={row2}
          direction={isRTL ? "left" : "right"}
          speed="slow"
          pauseOnHover
          textDirection={isRTL ? "rtl" : "ltr"}
        />
      </div>
    </section>
  );
}
