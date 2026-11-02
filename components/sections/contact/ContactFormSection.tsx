/**
 * BELLA - CONTACT FORM SECTION
 * @source framer-motion (form entrance animation)
 * @source magicui.design/docs/components/shimmer-button (CTA button)
 */
"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { brand } from "@/data/brand";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ItalyBadge } from "@/components/ui/ItalyBadge";
import { BrandAddress } from "@/components/ui/BrandAddress";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function ContactFormSection() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const labelClassName = "mb-2 block text-xs tracking-widest uppercase text-bella-stone";
  const fieldClassName = "w-full rounded-xl border border-bella-gold/20 bg-transparent px-5 py-4 text-sm text-bella-charcoal placeholder:text-bella-stone/40 transition-all duration-300 focus:border-bella-gold focus:outline-none focus:ring-1 focus:ring-bella-gold/30 dark:text-white";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

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
          phone: formData.phone || "-",
          subject: formData.subject,
          message: formData.message,
          _subject: `Bella Contact - ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <SectionWrapper>
      <div className="grid gap-16 lg:grid-cols-[1fr_400px] lg:gap-24">
        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="space-y-6"
          noValidate
        >
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className={labelClassName}>
                {t("form.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={t("form.placeholder.name")}
                dir={isRTL ? "rtl" : "ltr"}
                className={fieldClassName}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className={labelClassName}>
                {t("form.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={t("form.placeholder.email")}
                dir="ltr"
                className={fieldClassName}
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contact-phone" className={labelClassName}>
              {t("form.phone")}
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t("form.placeholder.phone")}
              dir="ltr"
              className={fieldClassName}
            />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="contact-subject" className={labelClassName}>
              {t("form.subject")}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder={t("form.subjectPlaceholder")}
              dir={isRTL ? "rtl" : "ltr"}
              className={fieldClassName}
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className={labelClassName}>
              {t("form.message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder={t("form.placeholder.message")}
              dir={isRTL ? "rtl" : "ltr"}
              className={cn(fieldClassName, "resize-none")}
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileHover={{ scale: status === "sending" ? 1 : 1.03 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="w-full rounded-full bg-bella-gold py-4 text-sm font-medium tracking-[0.08em] text-bella-charcoal transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.4)] disabled:cursor-not-allowed disabled:opacity-60"
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
                {t("form.sending")}
              </span>
            ) : (
              t("form.submit")
            )}
          </motion.button>

          {/* Success message */}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-bella-gold"
            >
              * {t("form.success")}
            </motion.p>
          )}

          {/* Error message */}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-sm text-red-400"
            >
              {t("form.error")}
            </motion.p>
          )}
        </motion.form>

        {/* Contact info sidebar */}
        <motion.div variants={fadeUp} className="space-y-8">
          <div>
            <h3 className="mb-6 font-display text-2xl text-bella-charcoal dark:text-white">
              {t("info.title")}
            </h3>

            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:+201090797965"
                className={cn(
                  "group flex items-center gap-4",
                  isRTL && "flex-row-reverse text-right"
                )}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-bella-gold/20 bg-bella-gold/5 transition-all duration-300 group-hover:border-bella-gold/50 group-hover:bg-bella-gold/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.32 10a19.79 19.79 0 01-3.07-8.67A2 2 0 012.44 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.16 6.16l.71-.71a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-0.5 text-xs uppercase tracking-[0.15em] text-bella-stone/50">
                    {t("info.phone")}
                  </p>
                  <p className="text-sm font-medium text-bella-charcoal transition-colors duration-300 group-hover:text-bella-gold dark:text-bella-ivory" dir="ltr">
                    {t("info.phoneNumber")}
                  </p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/201090797965"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-4 rounded-xl border border-[#25D366]/20 bg-[#25D366]/10 p-4 transition-all duration-300 hover:border-[#25D366]/40 hover:bg-[#25D366]/15",
                  isRTL && "flex-row-reverse text-right"
                )}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]/15">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.658 1.438 5.168L2 22l4.942-1.42A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2h-.001zm0 18c-1.64 0-3.162-.5-4.43-1.36l-.317-.19-3.268.94.948-3.19-.207-.327A8 8 0 114 12c0 4.411 3.589 8 8 8z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="mb-0.5 text-xs uppercase tracking-[0.15em] text-[#25D366]/70">
                    {t("info.whatsapp")}
                  </p>
                  <p className="text-sm font-medium text-bella-charcoal dark:text-bella-ivory" dir="ltr">
                    {t("info.whatsappNumber")}
                  </p>
                </div>
                <span className="text-sm text-[#25D366]/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#25D366]" aria-hidden="true">
                  &rarr;
                </span>
              </a>

              {/* Email */}
              <div className={cn(
                "flex items-start gap-4",
                isRTL && "flex-row-reverse text-right"
              )}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bella-gold/20 text-bella-gold">
                  @
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-bella-stone">Email</p>
                  <a
                    href={`mailto:${t("info.email")}`}
                    className="text-sm text-bella-charcoal transition-colors hover:text-bella-gold dark:text-white"
                  >
                    {t("info.email")}
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className={cn(
                "flex items-start gap-4",
                isRTL && "flex-row-reverse text-right"
              )}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bella-gold/20 text-bella-gold">
                  IG
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-bella-stone">Instagram</p>
                  <a
                    href="https://instagram.com/bella_meso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bella-charcoal transition-colors hover:text-bella-gold dark:text-white"
                  >
                    {t("info.instagram")}
                  </a>
                </div>
              </div>

              {/* Facebook */}
              <a
                href={brand.facebook ?? "https://www.facebook.com/bellameso"}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-4",
                  isRTL && "flex-row-reverse text-right"
                )}
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-bella-gold/20 bg-bella-gold/5 transition-all duration-300 group-hover:border-bella-gold/50 group-hover:bg-bella-gold/10">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-bella-gold/70 transition-colors duration-300 group-hover:text-bella-gold"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div>
                  <p className="mb-0.5 text-xs uppercase tracking-[0.15em] text-bella-stone/50">
                    {t("info.facebook")}
                  </p>
                  <p className="text-sm font-medium text-bella-charcoal transition-colors duration-300 group-hover:text-bella-gold dark:text-bella-ivory">
                    {t("info.facebookHandle")}
                  </p>
                </div>
              </a>

              {/* Address */}
              <div className={cn("flex items-start gap-4", isRTL && "flex-row-reverse")}>
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-bella-gold/20 bg-bella-gold/5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-bella-gold/70"
                    aria-hidden="true"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={cn(isRTL && "text-right")}>
                  <p className="mb-0.5 text-xs uppercase tracking-[0.15em] text-bella-stone/50 rtl:tracking-normal rtl:normal-case">
                    {t("info.address")}
                  </p>
                  <BrandAddress
                    variant="lines"
                    className="text-sm font-medium text-bella-charcoal dark:text-bella-ivory"
                  />
                  <p className="mt-1 text-xs text-bella-gold/70 rtl:tracking-normal">
                    <a
                      href={brand.address.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-bella-gold"
                    >
                      {t("info.openInMaps")} {isRTL ? "←" : "→"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative card */}
          <div className="rounded-2xl border border-bella-gold/10 bg-bella-mist/50 p-8 dark:bg-white/5">
            <p className="font-accent text-lg italic text-bella-gold" style={{ fontFamily: "var(--font-italiana)" }}>
              &ldquo;We believe every conversation is the beginning of a transformation.&rdquo;
            </p>
            <p className="mt-4 text-xs uppercase tracking-widest text-bella-stone">
              &mdash; The Bella Team
            </p>
            <div className="mt-4">
              <ItalyBadge variant="inline" tone="light" />
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
