"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
}

// Bella team: create a Formspree form, then replace the placeholder endpoint
// in .env.local with the real https://formspree.io/f/xxxxxxxx URL.
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

export default function BookingModal({
  isOpen,
  onClose,
  productName,
}: BookingModalProps) {
  const t = useTranslations("products.single");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  const resetAndClose = () => {
    setStatus("idle");
    setFormData({ name: "", email: "", phone: "" });
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) return;

    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          product: productName,
          _subject: `New Booking Request - ${productName}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            backgroundColor: "rgba(26,26,26,0.75)",
            backdropFilter: "blur(8px)",
          }}
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className={cn(
              "relative w-full max-w-md rounded-2xl p-8",
              "border border-bella-gold/20 bg-bella-ivory dark:bg-bella-charcoal",
              "shadow-[0_24px_80px_rgba(0,0,0,0.3)]",
            )}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <button
              type="button"
              onClick={resetAndClose}
              className={cn(
                "absolute top-4 text-bella-stone/50 transition-colors hover:text-bella-charcoal dark:hover:text-bella-ivory",
                isRTL ? "left-4" : "right-4",
              )}
              aria-label={t("close")}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M15 5L5 15M5 5l10 10"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                />
              </svg>
            </button>

            <div className="mb-7">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-bella-gold">
                Bella
              </p>
              <h2 className="mb-1.5 font-display text-2xl text-bella-charcoal dark:text-bella-ivory">
                {t("bookingTitle")}
              </h2>
              <p className="text-sm text-bella-stone/70">
                {t("bookingSubtitle")}
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-bella-gold/25 bg-bella-gold/10 px-3 py-1">
                <span className="text-xs text-bella-gold" aria-hidden="true">
                  Bella
                </span>
                <span className="text-xs font-medium text-bella-stone">
                  {productName}
                </span>
              </div>
            </div>

            <div className="mb-7 h-px w-full bg-bella-gold/15" />

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-bella-gold/30 bg-bella-gold/10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12l5 5L19 7"
                      stroke="#C9A96E"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <p className="mb-2 font-display text-lg text-bella-charcoal dark:text-bella-ivory">
                  {t("bookingSuccess")}
                </p>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="mt-4 text-sm text-bella-gold underline-offset-2 hover:underline"
                >
                  {t("close")}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-bella-stone/70">
                    {t("nameLabel")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("namePlaceholder")}
                    required
                    dir={isRTL ? "rtl" : "ltr"}
                    className="w-full rounded-xl border border-bella-gold/20 bg-white px-4 py-3 text-sm text-bella-charcoal transition-colors duration-200 placeholder:text-bella-stone/40 focus:border-bella-gold/60 focus:outline-none focus:ring-1 focus:ring-bella-gold/30 dark:bg-bella-charcoal/50 dark:text-bella-ivory"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-bella-stone/70">
                    {t("emailLabel")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("emailPlaceholder")}
                    required
                    dir="ltr"
                    className="w-full rounded-xl border border-bella-gold/20 bg-white px-4 py-3 text-sm text-bella-charcoal transition-colors duration-200 placeholder:text-bella-stone/40 focus:border-bella-gold/60 focus:outline-none focus:ring-1 focus:ring-bella-gold/30 dark:bg-bella-charcoal/50 dark:text-bella-ivory"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wide text-bella-stone/70">
                    {t("phoneLabel")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t("phonePlaceholder")}
                    required
                    dir="ltr"
                    className="w-full rounded-xl border border-bella-gold/20 bg-white px-4 py-3 text-sm text-bella-charcoal transition-colors duration-200 placeholder:text-bella-stone/40 focus:border-bella-gold/60 focus:outline-none focus:ring-1 focus:ring-bella-gold/30 dark:bg-bella-charcoal/50 dark:text-bella-ivory"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-500">{t("bookingError")}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
                  className="w-full rounded-full bg-bella-gold py-3.5 text-sm font-medium tracking-wide text-bella-charcoal transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                        <path
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          fill="currentColor"
                        />
                      </svg>
                      {t("sending")}
                    </span>
                  ) : (
                    t("submitBooking")
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
