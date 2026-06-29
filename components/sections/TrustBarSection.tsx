import { getLocale, getTranslations } from "next-intl/server";
import { Marquee }         from "@/components/ui/marquee";

export async function TrustBarSection() {
  const t = await getTranslations("home.trustBar");
  const isRTL = (await getLocale()) === "ar";

  /* Read items array from i18n */
  const items: string[] = [];
  for (let i = 0; i < 6; i++) {
    try {
      items.push(t(`items.${i}`));
    } catch {
      break;
    }
  }

  return (
    <section
      className="relative overflow-hidden border-y border-bella-gold/10 bg-white py-3"
      aria-labelledby="trust-bar-heading"
    >
      <h2 id="trust-bar-heading" className="sr-only">
        {t("heading")}
      </h2>
      <Marquee reverse={isRTL} pauseOnHover className="[--duration:40s]">
        {items.map((item, i) => (
          <span
            key={i}
            className="mx-8 inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-bella-charcoal/60"
          >
            <span className="inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-bella-gold" />
            {item}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
