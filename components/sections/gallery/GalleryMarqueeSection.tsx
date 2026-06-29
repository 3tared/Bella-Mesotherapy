"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BellaMarquee } from "@/components/ui/BellaMarquee";
import { galleryItems } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryMarqueeSection() {
  const t = useTranslations("gallery.marquee");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section
      className="relative overflow-hidden border-t border-bella-gold/10 bg-bella-charcoal py-14"
      aria-label={t("label")}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bella-charcoal to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bella-charcoal to-transparent" />

      <BellaMarquee reverse={isArabic} pauseOnHover duration="50s" gap="2.5rem">
        {galleryItems.map((item) => {
          const alt = isArabic ? item.alt.ar : item.alt.en;
          const title = isArabic ? item.title.ar : item.title.en;

          return (
            <div
              key={item.id}
              className={cn(
                "group relative h-[140px] w-[110px] shrink-0 overflow-hidden rounded-xl",
                "border border-bella-gold/10 transition duration-300",
                "hover:border-bella-gold/35 hover:shadow-[0_4px_20px_rgba(201,169,110,0.15)]",
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#F0EBE4] to-[#E0D8CC]" />
              <Image
                src={item.src}
                alt={alt}
                fill
                sizes="110px"
                className="object-contain p-3 transition duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-bella-charcoal/80 to-transparent px-2 pb-2 pt-4 transition-transform duration-300 group-hover:translate-y-0">
                <p
                  className={cn(
                    "text-center text-[9px] leading-tight text-white/80",
                    isArabic && "font-[--font-noto-sans-arabic]",
                  )}
                >
                  {title}
                </p>
              </div>
            </div>
          );
        })}
      </BellaMarquee>
    </section>
  );
}
