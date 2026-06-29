"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Link, useRouter } from "@/i18n/navigation";
import { LampContainer } from "@/components/ui/aceternity/lamp";
import { MagneticHover } from "@/components/ui/MagneticButton";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useInView } from "@/hooks/useInView";

export function AboutCTASection() {
  const t = useTranslations("about.cta");
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [sectionRef, isInView] = useInView<HTMLElement>({
    once: false,
    margin: "0px 0px -100px 0px",
  });

  return (
    <section ref={sectionRef} className="bg-bella-charcoal" aria-label={t("eyebrow")} data-surface="dark">
      <LampContainer className="py-32">
        <motion.div
          className="flex flex-col items-center px-6 text-center"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
        >
          <div className="mb-4 h-px w-10 bg-bella-gold" />
          <p className="mb-4 font-body text-[10px] uppercase tracking-[0.28em] text-bella-gold">
            {t("eyebrow")}
          </p>
          <h2 className="mb-5 max-w-2xl whitespace-pre-line font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-[1.1] text-bella-ivory">
            {t("headline")}
          </h2>
          <p className="mb-10 max-w-md font-body text-sm leading-relaxed text-bella-ivory/48">
            {t("subtext")}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticHover>
              <ShimmerButton
                type="button"
                shimmerColor="#E8D5A3"
                background="rgba(201,169,110,0.1)"
                borderRadius="9999px"
                shimmerDuration={isInView && !prefersReducedMotion ? "2s" : "99999s"}
                className="text-brand-gold border border-[rgba(201,169,110,0.45)] px-10 py-3.5 font-body text-[12px] font-medium uppercase tracking-[0.16em]"
                onClick={() => router.push("/products")}
              >
                {t("primary")}
              </ShimmerButton>
            </MagneticHover>
            <Link
              href="/products"
              className="text-on-dark-muted rounded-full border border-bella-ivory/15 px-10 py-3.5 font-body text-[12px] uppercase tracking-[0.16em] transition-all duration-300 hover:border-bella-gold hover:text-bella-gold"
            >
              {t("secondary")}
            </Link>
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
