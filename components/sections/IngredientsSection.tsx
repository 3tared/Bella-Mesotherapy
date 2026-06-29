"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion }          from "motion/react";
import { Link }            from "@/i18n/navigation";
import { LampContainer }   from "@/components/ui/aceternity/lamp";
import { CardSpotlight }   from "@/components/ui/aceternity/card-spotlight";
import { DirectionArrow }  from "@/components/ui/DirectionArrow";
import { staggerContainer, cardReveal } from "@/lib/animations";
import { ingredients, featuredIngredientIds }     from "@/data/ingredients";
import type { Locale } from "@/data/types";

const CATEGORY_PILLS: Record<string, string> = {
  acid:            "bg-sky-900/50 text-sky-300 border-sky-700/30",
  peptide:         "bg-violet-900/50 text-violet-300 border-violet-700/30",
  vitamin:         "bg-amber-900/50 text-amber-300 border-amber-700/30",
  botanical:       "bg-emerald-900/50 text-emerald-300 border-emerald-700/30",
  "growth-factor": "bg-rose-900/50 text-rose-300 border-rose-700/30",
  lipid:           "bg-orange-900/50 text-orange-300 border-orange-700/30",
  active:          "bg-cyan-900/50 text-cyan-300 border-cyan-700/30",
};

export function IngredientsSection() {
  const t        = useTranslations("home.ingredients");
  const locale   = useLocale() as Locale;
  const featured = ingredients.filter((ing) =>
    (featuredIngredientIds as readonly string[]).includes(ing.id)
  );

  return (
    <section
      id="ingredients"
      className="relative w-full overflow-hidden"
      data-surface="dark"
      style={{ background: "var(--surface-dark-muted)" }}
    >
      {/* LampEffect header */}
      <LampContainer className="pt-20 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center"
        >
          <p className="text-brand-gold mb-3 font-body text-[10px] uppercase tracking-[0.3em]">
            {t("eyebrow")}
          </p>
          <h2
            className="mb-4 font-display text-fluid-3xl text-white"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("headline")}
          </h2>
          <p className="text-on-dark-muted max-w-md font-body text-[13px] leading-relaxed">
            {t("sub")}
          </p>
        </motion.div>
      </LampContainer>

      {/* Ingredient cards */}
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={staggerContainer}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((ing) => (
            <motion.div key={ing.id} variants={cardReveal}>
              <CardSpotlight
                data-ingredient-card
                className="group h-full rounded-2xl border border-bella-gold/12 bg-[var(--surface-dark-elevated)] transition-all duration-500 hover:border-bella-gold/25 focus-visible:border-bella-gold/40 focus-visible:shadow-[0_18px_60px_rgba(201,169,110,0.08)]"
                spotlightColor="rgba(201,169,110,0.06)"
                tabIndex={0}
              >
                <div className="flex h-full flex-col p-7">
                  {/* Latin name */}
                  <p className="text-brand-gold mb-2 font-body text-[9px] uppercase tracking-[0.25em]">
                    {ing.latinName}
                  </p>

                  {/* Name */}
                  <h3
                    className="mb-4 font-display text-[1.5rem] leading-tight text-white"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {ing.name[locale]}
                  </h3>

                  {/* Category pill */}
                  <span
                    className={`mb-5 inline-block self-start rounded-full border px-3 py-1 font-body text-[9px] uppercase tracking-wider ${
                      CATEGORY_PILLS[ing.category] ??
                      "border-white/10 bg-white/5 text-white/40"
                    }`}
                  >
                    {t(`categories.${ing.category}`)}
                  </span>

                  {/* Description */}
                  <p className="text-on-dark-muted flex-1 font-body text-[13px] leading-relaxed">
                    {ing.description[locale]}
                  </p>

                  {/* Concentration */}
                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/[0.03] px-3 py-2">
                    <span className="text-brand-gold font-body text-[9px] uppercase tracking-wider">
                      {t("concentration")}
                    </span>
                    <span dir="ltr" className="text-brand-gold ms-auto font-body text-[12px] font-medium">
                      {ing.concentration[locale]}
                    </span>
                  </div>

                  {/* Science note */}
                  <div className="mt-4 border-t border-white/5 pt-4">
                    <p
                      className="text-on-dark-muted font-display text-[13px] italic leading-relaxed"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      &ldquo;{ing.scienceNote[locale]}&rdquo;
                    </p>
                  </div>

                  {/* Benefit */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-block h-[1px] w-4 bg-bella-gold/30" />
                    <span className="text-brand-gold font-body text-[11px]">
                      {ing.benefit[locale]}
                    </span>
                  </div>
                </div>
              </CardSpotlight>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 flex justify-center"
        >
          <Link
            href="/products"
            className="group hover-brand-gold text-on-dark-muted inline-flex items-center gap-2.5 font-body text-[11px] uppercase tracking-[0.25em] transition-colors duration-300"
          >
            {t("cta")}
            <DirectionArrow className="transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
