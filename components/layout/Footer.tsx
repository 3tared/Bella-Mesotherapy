"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { brand } from "@/data/brand";
import { NAV_ALL } from "@/data/navigation";
import {
  featuredProducts,
  getLocalizedProduct,
  type Locale,
} from "@/data/products";
import { cn } from "@/lib/utils";
import { ItalyBadge } from "@/components/ui/ItalyBadge";
import { BrandAddress } from "@/components/ui/BrandAddress";

const navigateLinks = NAV_ALL.filter((item) => item.key !== "products");

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    const timeout = window.setTimeout(() => setSubmitted(false), 4000);
    return () => window.clearTimeout(timeout);
  }, [submitted]);

  async function handleNewsletterSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    if (!email) return;

    // TODO(bella): wire to an email provider once Mailchimp/Klaviyo/etc. is chosen.
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    setSubmitted(true);
    setEmail("");
  }

  const featured = featuredProducts
    .slice(0, 3)
    .map((product) => getLocalizedProduct(product, locale));

  const blockClassName = cn(
    isRTL ? "text-right" : "text-left",
    "min-w-0",
  );
  const headingClassName =
    "mb-5 text-xs uppercase tracking-[0.25em] text-white/70";
  const linkClassName =
    "text-sm text-white/40 transition-colors hover:text-bella-gold";

  const brandBlock = (
    <div
      key="brand"
      dir={isRTL ? "rtl" : "ltr"}
      className={blockClassName}
    >
      <span
        className="font-accent text-3xl tracking-[0.4em] text-bella-gold"
        style={{ fontFamily: "var(--font-italiana)" }}
      >
        {brand.name.toUpperCase()}
      </span>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/40">
        {t("tagline")}
      </p>
      <div className="mt-4">
        <ItalyBadge variant="pill" tone="dark" />
      </div>
      <div className="mt-6 text-xs uppercase tracking-[0.2em] text-bella-gold/60">
        <BrandAddress variant="lines" />
      </div>
    </div>
  );

  const shopBlock = (
    <div
      key="shop"
      dir={isRTL ? "rtl" : "ltr"}
      className={blockClassName}
    >
      <p className={headingClassName}>{t("shopHeading")}</p>
      <ul className="space-y-3">
        {featured.map((product) => (
          <li key={product.id}>
            <Link
              href={{
                pathname: "/products/[id]",
                params: { id: product.id },
              }}
              className={linkClassName}
            >
              {product.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/products" className={linkClassName}>
            {t("allProducts")}
          </Link>
        </li>
      </ul>
    </div>
  );

  const navigateBlock = (
    <div
      key="navigate"
      dir={isRTL ? "rtl" : "ltr"}
      className={blockClassName}
    >
      <p className={headingClassName}>{t("navigateHeading")}</p>
      <ul className="space-y-3">
        {navigateLinks.map((link) => (
          <li key={link.key}>
            <Link href={link.href} className={linkClassName}>
              {tNav(link.key)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  const connectBlock = (
    <div
      key="connect"
      dir={isRTL ? "rtl" : "ltr"}
      className={blockClassName}
    >
      <p className={headingClassName}>{t("connectHeading")}</p>
      <ul className="space-y-3">
        <li>
          <a
            href={`https://instagram.com/${brand.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            {t("instagram")}
          </a>
        </li>
        <li>
          <a href={`mailto:${brand.email}`} className={linkClassName}>
            {brand.email}
          </a>
        </li>
        <li>
          <a
            href={brand.shopUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClassName, "inline-flex items-center gap-2")}
          >
            {tNav("shop")}
            <span aria-hidden="true">↗</span>
          </a>
        </li>
      </ul>
    </div>
  );

  const blocks = [brandBlock, shopBlock, navigateBlock, connectBlock];
  const orderedBlocks = isRTL ? [...blocks].reverse() : blocks;

  return (
    <footer className="border-t border-bella-gold/10 bg-bella-charcoal text-bella-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {orderedBlocks}
        </div>

        <div
          className={cn(
            "mt-16 flex flex-col gap-6 border-y border-bella-gold/10 py-8 md:flex-row md:items-end md:justify-between",
            isRTL ? "text-right" : "text-left",
          )}
        >
          <p className="font-display text-2xl text-white/70">
            {t("newsletterHeading")}
          </p>

          <div className="w-full max-w-xl">
            {submitted ? (
              <p
                className="border-b border-bella-gold/30 pb-3 text-sm text-bella-gold"
                aria-live="polite"
              >
                {t("newsletterSuccess")}
              </p>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex items-center gap-4 border-b border-bella-gold/30"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={t("newsletterPlaceholder")}
                  aria-label={t("newsletterPlaceholder")}
                  required
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/25"
                />
                <button
                  type="submit"
                  aria-label={t("newsletterButton")}
                  className="flex h-10 w-10 shrink-0 items-center justify-center text-bella-gold transition-transform hover:translate-x-1 rtl:hover:-translate-x-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className={cn("h-5 w-5", isRTL && "rotate-180")}
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="font-accent select-none overflow-hidden py-6 text-center leading-[0.82] tracking-[0.08em] text-transparent"
          style={{
            fontFamily: "var(--font-italiana)",
            fontSize: "clamp(6rem, 18vw, 16rem)",
            WebkitTextStroke: "1px rgba(201, 169, 110, 0.24)",
          }}
        >
          {brand.name.toUpperCase()}
        </motion.div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-bella-gold/20 to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-white/50">
            © <span dir="ltr">{new Date().getFullYear()}</span>{" "}
            {t("copyrightName")} {t("rights")}
          </p>
          <p className="text-xs uppercase tracking-widest text-white/50">
            {t("philosophy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
