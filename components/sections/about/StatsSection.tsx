"use client";

import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { aboutStats } from "@/data/about";

export function StatsSection() {
  const t = useTranslations("about.stats");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const isArabic = locale === "ar";

  return (
    <section
      className="border-y border-bella-gold/15 bg-[#141414] py-14"
      aria-label={t("aria")}
      data-surface="dark"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 px-6 md:grid-cols-4">
        {aboutStats.map((stat, index) => (
          <BlurFade key={index} delay={index * 0.08} inView>
            <div className="flex h-full flex-col items-center gap-2 border-b border-bella-gold/10 px-4 py-6 text-center odd:border-r md:border-b-0 md:border-r md:last:border-r-0 rtl:odd:border-r-0 rtl:odd:border-l md:rtl:border-r-0 md:rtl:border-l md:rtl:last:border-l-0">
              <div className="flex items-baseline justify-center font-display text-[clamp(2rem,4vw,3.2rem)] font-light leading-none text-bella-gold">
                {isArabic || prefersReducedMotion ? (
                  <span>{isArabic ? t(`items.${index}.value`) : stat.value}</span>
                ) : (
                  <>
                    <NumberTicker
                      value={stat.numericValue}
                      className="font-display text-[clamp(2rem,4vw,3.2rem)] font-light text-bella-gold"
                    />
                    <span>{stat.suffix}</span>
                  </>
                )}
              </div>
              <p className="font-body text-[9px] uppercase tracking-[0.18em] text-bella-ivory/45">
                {t(`items.${index}.label`)}
              </p>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
