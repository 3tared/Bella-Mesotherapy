"use client";

import { useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { certificationBadges } from "@/data/about";

const certIcons = {
  gmp: <path d="M9 12l2 2 4-4M7.8 4.7a3.4 3.4 0 002-.8 3.4 3.4 0 014.4 0 3.4 3.4 0 002 .8 3.4 3.4 0 013.1 3.1 3.4 3.4 0 00.8 2 3.4 3.4 0 010 4.4 3.4 3.4 0 00-.8 2 3.4 3.4 0 01-3.1 3.1 3.4 3.4 0 00-2 .8 3.4 3.4 0 01-4.4 0 3.4 3.4 0 00-2-.8 3.4 3.4 0 01-3.1-3.1 3.4 3.4 0 00-.8-2 3.4 3.4 0 010-4.4 3.4 3.4 0 00.8-2 3.4 3.4 0 013.1-3.1z" />,
  pharma: <path d="M8 4h8l-1 1v5.2a2 2 0 00.6 1.4l5 5c1.2 1.2.3 3.4-1.4 3.4H4.8c-1.7 0-2.6-2.2-1.4-3.4l5-5A2 2 0 009 10.2V5L8 4zM7 15h10" />,
  derm: <path d="M4.3 6.3a4.5 4.5 0 000 6.4L12 20.4l7.7-7.7a4.5 4.5 0 00-6.4-6.4L12 7.6l-1.3-1.3a4.5 4.5 0 00-6.4 0z" />,
  global: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
  clinical: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
} as const;

export function CertificationsSection() {
  const t = useTranslations("about.certifications");
  useReducedMotion();

  return (
    <section className="bg-bella-ivory py-16" aria-label={t("eyebrow")}>
      <div className="mx-auto max-w-4xl px-6">
        <BlurFade inView>
          <p className="mb-10 text-center font-body text-[9px] uppercase tracking-[0.22em] text-bella-charcoal/45">
            {t("eyebrow")}
          </p>
        </BlurFade>

        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
          {certificationBadges.map((cert, index) => (
            <BlurFade key={cert.key} delay={index * 0.08} inView>
              <div className="group flex flex-col items-center gap-2 opacity-55 transition-opacity duration-300 hover:opacity-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bella-gold text-bella-gold">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    {certIcons[cert.key]}
                  </svg>
                </div>
                <span className="max-w-[88px] text-center font-body text-[9px] uppercase tracking-[0.1em] text-bella-charcoal/62">
                  {t(`items.${index}.label`)}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
