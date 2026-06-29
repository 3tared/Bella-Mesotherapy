"use client";

import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { featuredIngredientIds, ingredients } from "@/data/ingredients";

export function ScienceSection() {
  const t = useTranslations("about.science");
  const locale = useLocale() as "en" | "ar";
  const isRTL = locale === "ar";
  const prefersReducedMotion = useReducedMotion();
  const featuredIngredients = featuredIngredientIds
    .map((id) => ingredients.find((ingredient) => ingredient.id === id))
    .filter(Boolean);

  return (
    <section
      className="overflow-hidden bg-bella-charcoal py-28"
      aria-label={t("eyebrow")}
      data-surface="dark"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-3xl">
          <BlurFade inView>
            <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-bella-gold">
              {t("eyebrow")}
            </p>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-light leading-tight text-bella-ivory">
              {t("headline")}
            </h2>
          </BlurFade>
          <BlurFade delay={0.18} inView>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-bella-ivory/52">
              {t("subtext")}
            </p>
          </BlurFade>
        </div>
      </div>

      <Marquee
        reverse={isRTL}
        pauseOnHover
        repeat={prefersReducedMotion ? 1 : 4}
        className="[--duration:55s] [--gap:1rem]"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {featuredIngredients.map((ingredient) =>
          ingredient ? (
            <article
              key={ingredient.id}
              className="w-[320px] shrink-0 border border-bella-gold/12 bg-[#141414] p-7 text-start md:w-[420px]"
            >
              <p className="mb-4 font-body text-[9px] uppercase tracking-[0.18em] text-bella-gold">
                {ingredient.concentration[locale]}
              </p>
              <h3 className="mb-3 font-display text-2xl text-bella-ivory">
                {ingredient.name[locale]}
              </h3>
              <p className="mb-5 font-body text-sm leading-relaxed text-bella-ivory/48">
                {ingredient.benefit[locale]}
              </p>
              <p className="border-t border-bella-gold/10 pt-5 font-display text-sm italic leading-relaxed text-bella-ivory/60">
                {ingredient.scienceNote[locale]}
              </p>
            </article>
          ) : null
        )}
      </Marquee>
    </section>
  );
}
