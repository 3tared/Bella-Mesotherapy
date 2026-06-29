"use client";

import { useTranslations } from "next-intl";
import { useLocale }       from "next-intl";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

function VelocityContent({ words, className }: { words: string[]; className?: string }) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="mx-3">
          {word}
          {i < words.length - 1 && <span className="mx-3">·</span>}
        </span>
      ))}
    </span>
  );
}

export function VelocityBanner() {
  const t      = useTranslations("home.velocity");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  /* Read words array from i18n */
  const words: string[] = [];
  for (let i = 0; i < 8; i++) {
    try {
      words.push(t(`words.${i}`));
    } catch {
      break;
    }
  }

  return (
    <div className="relative w-full overflow-hidden border-y border-bella-gold/8 bg-white py-5">
      <ScrollVelocityContainer>
        {/* RTL FIX: reverse directions in Arabic */}
        <ScrollVelocityRow baseVelocity={3} direction={isRTL ? -1 : 1}>
          <VelocityContent
            words={words}
            className="font-display text-2xl font-light uppercase tracking-[0.5em] text-bella-charcoal/15"
          />
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={3} direction={isRTL ? 1 : -1}>
          <VelocityContent
            words={words}
            className="font-display text-xl font-light uppercase tracking-[0.5em] text-bella-gold/20"
          />
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}
