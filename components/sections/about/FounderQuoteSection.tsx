"use client";

import { useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";

export function FounderQuoteSection() {
  const t = useTranslations("about.founderQuote");
  useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-[#141414] py-28 text-center"
      aria-label={t("aria")}
      data-surface="dark"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <BlurFade delay={0} inView>
          <div className="mb-6 select-none font-display text-[96px] italic leading-[0.6] text-bella-gold/12" aria-hidden="true">
            &quot;
          </div>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <div className="mx-auto mb-8 h-px w-10 bg-bella-gold" />
        </BlurFade>
        <BlurFade delay={0.18} inView>
          <blockquote className="font-display text-[clamp(1.6rem,3.5vw,2.4rem)] font-light italic leading-[1.45] text-bella-ivory">
            &ldquo;{t("quote")}&rdquo;
          </blockquote>
        </BlurFade>
        <BlurFade delay={0.3} inView>
          <footer className="mt-10 flex flex-col items-center gap-2">
            <cite className="font-display text-lg not-italic text-bella-gold">
              {t("attribution")}
            </cite>
            <span className="font-body text-[10px] uppercase tracking-[0.18em] text-bella-ivory/38">
              {t("role")}
            </span>
          </footer>
        </BlurFade>
      </div>
    </section>
  );
}
