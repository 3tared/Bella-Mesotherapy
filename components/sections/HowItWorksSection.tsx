"use client";

import { useTranslations } from "next-intl";
import { useLocale }       from "next-intl";
import { motion }          from "motion/react";
import { TracingBeam }     from "@/components/ui/aceternity/tracing-beam";
import { staggerContainer, fadeUp } from "@/lib/animations";

export function HowItWorksSection() {
  const t      = useTranslations("home.howItWorks");
  const locale = useLocale();
  const isRTL  = locale === "ar";

  /* Build steps from i18n — array of 4 items */
  const steps = [0, 1, 2, 3].map((i) => ({
    number:   t(`steps.${i}.number`),
    title:    t(`steps.${i}.title`),
    desc:     t(`steps.${i}.desc`),
    duration: t(`steps.${i}.duration`),
  }));

  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[var(--bella-ivory)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 max-w-lg"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-gold mb-3 font-body text-[10px] uppercase tracking-[0.3em]"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-fluid-3xl text-bella-charcoal"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("headline")}
          </motion.h2>
        </motion.div>

        {/* TracingBeam — RTL FIX: positioned on right side in Arabic */}
        <TracingBeam side="start" dir={isRTL ? "rtl" : "ltr"} className="px-0">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`relative grid grid-cols-[auto_1fr] gap-8 py-12 md:grid-cols-[8rem_1fr] ${
                  i < steps.length - 1
                    ? "border-b border-bella-gold/10"
                    : ""
                }`}
              >
                {/* Number col */}
                <div className="relative flex flex-col items-start pt-0.5">
                  {/* Giant watermark */}
                  <span
                    className={`pointer-events-none absolute -top-2 select-none text-[5rem] leading-none text-bella-charcoal opacity-[0.05] ${
                      isRTL ? "right-0" : "left-0"
                    }`}
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-italiana)" }}
                  >
                    {step.number}
                  </span>
                  <span dir="ltr" className="text-brand-gold relative z-10 font-body text-[10px] font-medium uppercase tracking-[0.3em]">
                    {step.number}
                  </span>
                  {/* Duration pill */}
                  <span dir="ltr" className="text-brand-gold relative z-10 mt-2 rounded-full border border-bella-gold/20 px-2.5 py-1 font-body text-[9px]">
                    {step.duration}
                  </span>
                </div>

                {/* Content col */}
                <div>
                  <h3
                    className="mb-3 font-display text-2xl text-bella-charcoal md:text-[1.7rem]"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="max-w-lg font-body text-[13px] leading-relaxed text-bella-charcoal/65">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
}
