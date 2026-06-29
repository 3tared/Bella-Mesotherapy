"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { BlurFade } from "@/components/ui/BlurFade";
import { GalleryCard } from "@/components/ui/GalleryCard";
import {
  filterGalleryItems,
  GALLERY_CATEGORIES,
  galleryItems,
  type GalleryCategory,
} from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryGridSection() {
  const t = useTranslations("gallery");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const filtered = useMemo(
    () => filterGalleryItems(galleryItems, activeFilter),
    [activeFilter],
  );

  const slides = useMemo(
    () =>
      filtered.map((item) => ({
        src: item.src,
        width: item.width,
        height: item.height,
        alt: isArabic ? item.alt.ar : item.alt.en,
        title: isArabic ? item.title.ar : item.title.en,
        description: item.caption ? (isArabic ? item.caption.ar : item.caption.en) : undefined,
        thumbnail: item.src,
      })),
    [filtered, isArabic],
  );

  const counts = useMemo(() => {
    return GALLERY_CATEGORIES.reduce<Record<GalleryCategory, number>>(
      (acc, category) => {
        acc[category] = filterGalleryItems(galleryItems, category).length;
        return acc;
      },
      { all: 0, boosters: 0, treatments: 0, specialists: 0 },
    );
  }, []);

  const handleOpenLightbox = (index: number) => setLightboxIndex(index);

  return (
    <SectionWrapper className="bg-bella-charcoal text-bella-ivory" dark>
      <motion.div
        className={cn(
          "mb-12 flex flex-wrap items-center justify-center gap-3",
          isArabic && "flex-row-reverse",
        )}
      >
        {GALLERY_CATEGORIES.map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={activeFilter === key}
            onClick={() => setActiveFilter(key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em]",
              "transition duration-300",
              activeFilter === key
                ? "border-bella-gold bg-bella-gold text-bella-charcoal"
                : "border-bella-gold/20 text-white/62 hover:border-bella-gold/60 hover:text-bella-gold",
              isArabic && "font-[--font-noto-sans-arabic] tracking-normal",
            )}
          >
            <span>{t(`filters.${key}`)}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px]">
              {counts[key]}
            </span>
          </button>
        ))}
      </motion.div>

      <div
        className={cn(
          "mb-8 text-center text-xs uppercase tracking-[0.18em] text-white/45",
          isArabic && "font-[--font-noto-sans-arabic] tracking-normal",
        )}
      >
        {t("grid.showing", { count: filtered.length })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="columns-1 gap-5 sm:columns-2 lg:columns-3"
          role="list"
          aria-label={isArabic ? "معرض المنتجات" : "Product gallery grid"}
        >
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className={cn("text-white/50", isArabic && "font-[--font-noto-sans-arabic]")}>
                {t("grid.noResults")}
              </p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <div key={item.id} role="listitem">
                <BlurFade delay={index < 6 ? index * 0.07 : 0.35} inView inViewMargin="-30px">
                  <GalleryCard
                    item={item}
                    locale={locale}
                    onOpenLightbox={handleOpenLightbox}
                    itemIndex={index}
                    priority={index < 3}
                    tall={item.category === "boosters"}
                  />
                </BlurFade>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={slides}
        plugins={[Thumbnails, Zoom, Captions]}
        labels={{
          Previous: t("lightbox.previous"),
          Next: t("lightbox.next"),
          Close: t("lightbox.close"),
          Thumbnails: t("lightbox.thumbnails"),
          "Zoom in": t("lightbox.zoomIn"),
          "Zoom out": t("lightbox.zoomOut"),
        }}
        portal={{
          container: { dir: isArabic ? "rtl" : "ltr" },
        }}
        styles={{
          container: { backgroundColor: "rgba(26, 26, 26, 0.97)" },
          captionsTitle: {
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "1.1rem",
            color: "#FAF8F5",
          },
          captionsDescription: {
            color: "rgba(250, 248, 245, 0.6)",
            fontSize: "0.8rem",
          },
        }}
        carousel={{
          finite: false,
          preload: 2,
          imageFit: "contain",
          padding: "16px",
        }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{
          position: "bottom",
          width: 72,
          height: 72,
          gap: 6,
          border: 1,
          borderRadius: 8,
          borderColor: "rgba(201, 169, 110, 0.3)",
          imageFit: "contain",
          showToggle: true,
        }}
        captions={{
          showToggle: false,
          descriptionTextAlign: isArabic ? "end" : "start",
        }}
        animation={{ fade: 250, swipe: 350 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </SectionWrapper>
  );
}
