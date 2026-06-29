"use client";

import { useState }                    from "react";
import { useTranslations }             from "next-intl";
import { motion, AnimatePresence }     from "motion/react";
import { staggerContainer, fadeUp }    from "@/lib/animations";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-bella-gold/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-6 py-6 text-start"
        aria-expanded={open}
      >
        <span
          className="font-display text-lg text-bella-charcoal"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-gold shrink-0 text-xl leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-[13px] leading-relaxed text-bella-charcoal/65">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const t = useTranslations("home.faq");

  /* Build FAQ items from i18n */
  const items: { q: string; a: string }[] = [];
  for (let i = 0; i < 5; i++) {
    try {
      items.push({ q: t(`items.${i}.q`), a: t(`items.${i}.a`) });
    } catch {
      break;
    }
  }

  return (
    <section
      id="faq"
      className="relative w-full overflow-hidden bg-[var(--bella-ivory)] py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-gold mb-3 font-body text-[10px] uppercase tracking-[0.3em]"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-14 font-display text-fluid-3xl text-bella-charcoal"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("headline")}
          </motion.h2>

          <div>
            {items.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
