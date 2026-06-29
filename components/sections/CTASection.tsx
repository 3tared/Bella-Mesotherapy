"use client";

import { useTranslations } from "next-intl";
import { motion }          from "motion/react";
import { Link }            from "@/i18n/navigation";
import { LampContainer }   from "@/components/ui/aceternity/lamp";
import { ShimmerButton }   from "@/components/ui/shimmer-button";
import { MagneticHover }   from "@/components/ui/MagneticButton";
import { SHOP_URL }        from "@/lib/constants";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function CTASection() {
  const t = useTranslations("home.cta");

  return (
    <section
      id="cta"
      className="relative w-full overflow-hidden"
      data-surface="dark"
      style={{ background: "var(--surface-dark)" }}
    >
      {/* Decorative concentric circles */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.025]"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 400 400"
          className="h-[50vw] w-[50vw] max-w-[600px]"
          aria-hidden="true"
          focusable="false"
        >
          {[180, 140, 100, 60].map((r) => (
            <circle
              key={r}
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke="#C9A96E"
              strokeWidth="0.4"
            />
          ))}
        </svg>
      </div>

      {/* LampEffect with gold colors */}
      <LampContainer className="pt-32 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-col items-center px-6 text-center"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-brand-gold mb-5 font-body text-[10px] uppercase tracking-[0.3em]"
          >
            {t("eyebrow")}
          </motion.p>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            className="mb-5 max-w-2xl font-display text-fluid-3xl leading-[1.15] text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("headline")}
          </motion.h2>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            className="text-on-dark-muted mb-12 max-w-sm font-body text-[13px] leading-relaxed"
          >
            {t("sub")}
          </motion.p>

          {/* Primary actions */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticHover>
              <ShimmerButton
                type="button"
                shimmerColor="#E8D5A3"
                background="rgba(201,169,110,0.1)"
                borderRadius="9999px"
                className="text-brand-gold border border-[rgba(201,169,110,0.45)] px-11 py-4 font-body text-[13px] font-medium uppercase tracking-[0.2em]"
                onClick={() =>
                  window.open(SHOP_URL, "_blank", "noopener,noreferrer")
                }
              >
                {t("primary")}
              </ShimmerButton>
            </MagneticHover>

            {/* Secondary */}
            <Link
              href="/about"
              className="text-on-dark-muted rounded-full border border-white/12 px-11 py-4 font-body text-[13px] uppercase tracking-[0.2em] transition-all duration-300 hover:border-white/25 hover:text-white"
            >
              {t("secondary")}
            </Link>
          </motion.div>

          {/* Brand philosophy — i18n */}
          <motion.p
            variants={fadeUp}
            className="text-on-dark-muted mt-16 font-body text-[10px] uppercase tracking-[0.4em]"
          >
            {t("philosophy")}
          </motion.p>
        </motion.div>
      </LampContainer>
    </section>
  );
}
