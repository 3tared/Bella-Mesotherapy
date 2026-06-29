"use client";

import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { InfiniteMovingCards } from "@/components/ui/aceternity/infinite-moving-cards";
import { BlurFade } from "@/components/ui/blur-fade";
import { testimonials } from "@/data/testimonials";

const professionalRoles = ["Dermatologist", "Aesthetic Nurse", "Plastic Surgeon"];

export function AboutTestimonialsSection() {
  const t = useTranslations("about.testimonials");
  const locale = useLocale() as "en" | "ar";
  const prefersReducedMotion = useReducedMotion();
  const professionalTestimonials = testimonials
    .filter((testimonial) => professionalRoles.includes(testimonial.role.en))
    .map((testimonial) => ({
      quote: testimonial.text[locale],
      name: testimonial.name[locale],
      title: `${testimonial.role[locale]} · ${testimonial.location[locale]}`,
    }));

  return (
    <section className="overflow-hidden bg-[#141414] py-28" aria-label={t("eyebrow")} data-surface="dark">
      <div className="mx-auto mb-12 max-w-6xl px-6 text-center">
        <BlurFade inView>
          <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-bella-gold">
            {t("eyebrow")}
          </p>
        </BlurFade>
        <BlurFade delay={0.1} inView>
          <h2 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-light text-bella-ivory">
            {t("headline")}
          </h2>
        </BlurFade>
      </div>
      <InfiniteMovingCards
        items={professionalTestimonials}
        direction={locale === "ar" ? "right" : "left"}
        speed={prefersReducedMotion ? "slow" : "normal"}
        pauseOnHover
        textDirection={locale === "ar" ? "rtl" : "ltr"}
        className="mx-auto"
      />
    </section>
  );
}
