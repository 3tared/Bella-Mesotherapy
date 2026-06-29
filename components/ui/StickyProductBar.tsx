"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale, LocalizedString } from "@/data/products";

interface StickyProductBarProps {
  productName: LocalizedString | string;
  productImage: string;
  locale: Locale;
  triggerRef: React.RefObject<HTMLElement | null>;
  onBookNow: () => void;
}

export function StickyProductBar({
  productName,
  productImage,
  locale,
  triggerRef,
  onBookNow,
}: StickyProductBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const isRTL = locale === "ar";
  const localizedProductName =
    typeof productName === "string" ? productName : productName[locale];

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-20% 0px 0px 0px" },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [triggerRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-bella-gold/20 bg-bella-charcoal/90 px-4 py-3 backdrop-blur-md sm:px-6"
        >
          <div
            className={cn(
              "mx-auto flex max-w-7xl items-center justify-between gap-4",
              isRTL && "flex-row-reverse",
            )}
          >
            <div
              className={cn(
                "flex min-w-0 items-center gap-3",
                isRTL && "flex-row-reverse text-right",
              )}
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-bella-gold/20 bg-bella-ivory/5">
                <Image
                  src={productImage}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-bella-gold/60">
                  Bella
                </p>
                <p className="truncate font-display text-sm leading-tight text-bella-ivory">
                  {localizedProductName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onBookNow}
              className="shrink-0 whitespace-nowrap rounded-full bg-bella-gold px-6 py-2.5 text-sm font-medium text-bella-charcoal transition-all hover:shadow-[0_4px_20px_rgba(201,169,110,0.4)]"
            >
              {isRTL ? "احجزي الآن" : "Book Now"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
