"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { galleryItems, getFeaturedItems } from "@/data/gallery";
import { cn } from "@/lib/utils";
import { ItalyBadge } from "@/components/ui/ItalyBadge";

const featuredItems = getFeaturedItems(galleryItems);

export function GalleryHeroSection() {
  const t = useTranslations("gallery.hero");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { margin: "-20%", once: false });
  const prefersReducedMotion = useReducedMotion();
  const shouldAnimate = isInView && !prefersReducedMotion;

  return (
    <section
      ref={ref}
      className="relative min-h-[78vh] overflow-hidden bg-bella-charcoal text-bella-ivory"
    >
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#0c0b0a_0%,#1a1a1a_48%,#221b14_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bella-charcoal to-transparent" />

      <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 pb-24 pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className={cn("max-w-2xl", isArabic && "lg:order-2 lg:text-right")}>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.28em] text-bella-gold"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={cn(
              "mt-5 whitespace-pre-line font-display text-5xl leading-[0.95] text-white md:text-7xl",
              isArabic && "font-[--font-markazi] leading-[1.05]",
            )}
          >
            {t("headline")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className={cn(
              "mt-6 max-w-md text-base leading-7 text-white/62",
              isArabic && "font-[--font-noto-sans-arabic] lg:ms-auto",
            )}
          >
            {t("subheadline")}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.65, ease: [0.65, 0, 0.35, 1] }}
            className={cn(
              "mt-8 h-px w-28 origin-left bg-bella-gold",
              isArabic && "origin-right lg:ms-auto",
            )}
          />

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className={cn("mt-5", isArabic && "lg:text-right")}
          >
            <ItalyBadge variant="pill" tone="dark" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className={cn("relative", isArabic && "lg:order-1")}
          aria-label={t("heroProducts")}
        >
          <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-bella-gold/80">
            <span className="h-px w-9 bg-bella-gold/50" />
            <span>{t("heroProducts")}</span>
          </div>

          <div className="flex items-end justify-center gap-3 sm:gap-5">
            {featuredItems.map((item, index) => {
              const isCenter = index === 1;
              const title = isArabic ? item.title.ar : item.title.en;
              const alt = isArabic ? item.alt.ar : item.alt.en;

              return (
                <motion.div
                  key={item.id}
                  animate={
                    shouldAnimate
                      ? { y: isCenter ? [0, -10, 0] : [0, 8, 0] }
                      : { y: 0 }
                  }
                  transition={{
                    duration: isCenter ? 6 : 7,
                    repeat: shouldAnimate ? Infinity : 0,
                    ease: "easeInOut",
                    delay: index * 0.4,
                  }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-bella-gold/15 bg-[#EFE8DF]",
                    "shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
                    isCenter
                      ? "h-[360px] w-[34%] max-w-[220px]"
                      : "h-[300px] w-[29%] max-w-[180px]",
                  )}
                >
                  <Image
                    src={item.src}
                    alt={alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 33vw, 220px"
                    className="object-contain p-5"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bella-charcoal/70 to-transparent px-3 pb-3 pt-12">
                    <p
                      className={cn(
                        "text-center text-[10px] leading-tight text-white/80",
                        isArabic && "font-[--font-noto-sans-arabic]",
                      )}
                    >
                      {title}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
