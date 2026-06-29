"use client";

import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { timelineMilestones } from "@/data/about";

export function TimelineSection() {
  const t = useTranslations("about.timeline");
  const isRTL = useLocale() === "ar";
  useReducedMotion();

  return (
    <section className="bg-bella-ivory py-28" aria-label={t("eyebrow")}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-2xl">
          <BlurFade inView>
            <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-bella-gold">
              {t("eyebrow")}
            </p>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-light leading-tight text-bella-charcoal">
              {t("headline")}
            </h2>
          </BlurFade>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {timelineMilestones.map((milestone, index) => (
            <BlurFade key={milestone.key} delay={index * 0.1} inView>
              <article className="relative border-t border-bella-gold/30 pt-8">
                <div
                  className="absolute top-0 h-px w-full bg-gradient-to-r from-bella-gold to-transparent rtl:bg-gradient-to-l"
                  aria-hidden="true"
                />
                <div
                  className={`absolute -top-1.5 h-3 w-3 border border-bella-gold bg-bella-ivory ${
                    isRTL ? "right-0" : "left-0"
                  }`}
                  aria-hidden="true"
                />
                <p className="mb-5 font-display text-4xl font-light text-bella-gold">
                  {t(`items.${index}.year`)}
                </p>
                <h3 className="mb-3 font-display text-xl text-bella-charcoal">
                  {t(`items.${index}.title`)}
                </h3>
                <p className="font-body text-sm leading-relaxed text-bella-stone">
                  {t(`items.${index}.description`)}
                </p>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
