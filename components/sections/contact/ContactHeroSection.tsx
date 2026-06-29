/**
 * BELLA - CONTACT HERO SECTION
 * @source magicui.design/docs/components/text-animate (word reveal)
 */
"use client";

import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Particles } from "@/components/ui/particles";
import { fadeUp } from "@/lib/animations";

export function ContactHeroSection() {
  const t = useTranslations("contact.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pb-16 pt-24 lg:pb-20 lg:pt-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bella-ivory via-bella-blush/20 to-bella-mist dark:from-[#0E0E0C] dark:via-[#1A1714] dark:to-[#0E0E0C]" />

      {/* Ambient particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Particles
          className="absolute inset-0 opacity-60"
          quantity={25}
          color="#C9A96E"
          staticity={80}
          ease={60}
          size={0.35}
        />
      </div>

      {/* Decorative */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bella-gold/5 blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-sm uppercase tracking-[0.35em] text-bella-gold"
        >
          {t("eyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display text-fluid-3xl leading-tight text-bella-charcoal dark:text-bella-ivory"
        >
          {t("headline").split("\n").map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {locale === "en" && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-2 font-display text-lg text-bella-gold/40"
            style={{ fontFamily: "var(--font-markazi)", direction: "rtl" }}
          >
            نحن هنا لخدمتك
          </motion.p>
        )}

        {locale === "ar" && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-2 font-display text-lg text-bella-gold/40"
          >
            We&apos;re here for you
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="mx-auto mt-10 h-[1px] w-24 origin-center bg-bella-gold"
        />
      </div>
    </section>
  );
}
