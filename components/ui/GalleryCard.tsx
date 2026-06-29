"use client";

import Image from "next/image";
import type { KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { GalleryItem } from "@/data/gallery";
import { cn } from "@/lib/utils";

interface GalleryCardProps {
  item: GalleryItem;
  locale: string;
  onOpenLightbox: (index: number) => void;
  itemIndex: number;
  priority?: boolean;
  tall?: boolean;
}

export function GalleryCard({
  item,
  locale,
  onOpenLightbox,
  itemIndex,
  priority = false,
  tall = false,
}: GalleryCardProps) {
  const t = useTranslations("gallery.card");
  const isArabic = locale === "ar";
  const title = isArabic ? item.title.ar : item.title.en;
  const alt = isArabic ? item.alt.ar : item.alt.en;
  const caption = item.caption ? (isArabic ? item.caption.ar : item.caption.en) : "";

  const handleOpen = () => onOpenLightbox(itemIndex);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`${t("openImage")}: ${title}`}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative mb-5 break-inside-avoid cursor-zoom-in overflow-hidden rounded-2xl",
        "border border-bella-gold/10 bg-[#EEE7DE] shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
        "transition duration-500 hover:-translate-y-1 hover:border-bella-gold/40",
        tall ? "min-h-[420px]" : "min-h-[330px]",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.95),rgba(238,231,222,0.65)_46%,rgba(201,169,110,0.18))]" />
      <Image
        src={item.src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        className="object-contain p-8 transition duration-700 group-hover:scale-105"
      />

      <div
        className={cn(
          "absolute inset-0 flex items-end bg-gradient-to-t from-bella-charcoal/85 via-bella-charcoal/20 to-transparent",
          "p-5 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100",
          isArabic ? "translate-x-4 group-hover:translate-x-0" : "-translate-x-4 group-hover:translate-x-0",
        )}
      >
        <div className={cn("w-full", isArabic && "text-right")}>
          <p className="text-[10px] uppercase tracking-[0.22em] text-bella-gold/90">
            {item.category}
          </p>
          <h3
            className={cn(
              "mt-1 font-display text-xl leading-tight text-white",
              isArabic && "font-[--font-markazi]",
            )}
          >
            {title}
          </h3>
          {caption && <p className="mt-2 text-xs leading-relaxed text-white/65">{caption}</p>}
          {item.linkedProductSlug && (
            <Link
              href={{
                pathname: "/products/[id]",
                params: { id: item.linkedProductSlug },
              }}
              onClick={(event) => event.stopPropagation()}
              className="mt-4 inline-flex rounded-full border border-bella-gold/40 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-bella-gold transition hover:border-bella-gold hover:bg-bella-gold hover:text-bella-charcoal"
            >
              {t("viewProduct")}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
