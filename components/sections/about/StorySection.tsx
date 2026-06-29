"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { SectionHeading, SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUp } from "@/lib/animations";

export function StorySection() {
  const t = useTranslations("about.story");
  const isRTL = useLocale() === "ar";
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = [t("p1"), t("p2"), t("p3")];
  const lineDraw: Variants = {
    hidden: { scaleX: 0, originX: isRTL ? 1 : 0 },
    visible: {
      scaleX: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { duration: 1, ease: [0.65, 0, 0.35, 1] },
    },
  };

  return (
    <SectionWrapper className="bg-bella-mist">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading eyebrow={t("eyebrow")} headline={t("headline")} />

          <motion.div variants={lineDraw} className="mt-8 h-px w-24 bg-bella-gold" />

          <motion.p
            variants={fadeUp}
            className="mt-8 font-accent text-lg italic tracking-wide text-bella-gold/70"
          >
            {t("established")}
          </motion.p>
        </div>

        <TracingBeam className="px-6" side="start" dir={isRTL ? "rtl" : "ltr"}>
          <div className="flex flex-col gap-7">
            {paragraphs.map((paragraph) => (
              <motion.p
                key={paragraph}
                variants={fadeUp}
                className="font-body text-fluid-base leading-relaxed text-bella-stone"
              >
                {paragraph}
              </motion.p>
            ))}

            <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-bella-gold/40 to-transparent" />
              <span className="font-accent text-sm uppercase tracking-[0.3em] text-bella-gold">
                {t("signature")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-bella-gold/40 to-transparent" />
            </motion.div>
          </div>
        </TracingBeam>
      </div>
    </SectionWrapper>
  );
}
