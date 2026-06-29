"use client";

import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "motion/react";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/aceternity/3d-card-effect";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { team, type TeamMember } from "@/data/team";

function TeamCardContent({
  member,
  locale,
}: {
  member: TeamMember;
  locale: "en" | "ar";
}) {
  return (
    <>
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-bella-gold/35 bg-bella-gold/[0.06] font-display text-xl text-bella-gold">
        {member.initials}
      </div>
      <h3 className="mb-1 font-display text-base text-bella-ivory">
        {member.name[locale]}
      </h3>
      <p className="mb-4 font-body text-[9px] uppercase tracking-[0.12em] text-bella-gold">
        {member.role[locale]}
      </p>
      <p className="font-body text-[12px] font-light leading-relaxed text-bella-ivory/45">
        {member.bio[locale]}
      </p>
    </>
  );
}

export function TeamSection() {
  const t = useTranslations("about.team");
  const locale = useLocale() as "en" | "ar";
  const prefersReducedMotion = useReducedMotion();

  return (
    <SectionWrapper className="bg-bella-charcoal py-28" noPadding>
      <div className="mx-auto max-w-6xl px-6 py-28">
        <div className="mb-16 text-center">
          <BlurFade delay={0} inView>
            <p className="mb-3 font-body text-[10px] uppercase tracking-[0.3em] text-bella-gold">
              {t("eyebrow")}
            </p>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-bella-ivory">
              {t("headline")}
            </h2>
          </BlurFade>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <BlurFade key={member.id} delay={index * 0.08} inView>
              {prefersReducedMotion ? (
                <div className="h-full border border-bella-gold/10 bg-[#141414] p-8 text-center">
                  <TeamCardContent member={member} locale={locale} />
                </div>
              ) : (
                <CardContainer containerClassName="h-full" className="w-full">
                  <CardBody className="h-full min-h-[280px] w-full border border-bella-gold/10 bg-[#141414] p-8 text-center transition-colors duration-300 hover:border-bella-gold/35">
                    <CardItem translateZ={20} className="w-full">
                      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-bella-gold/35 bg-bella-gold/[0.06] font-display text-xl text-bella-gold">
                        {member.initials}
                      </div>
                    </CardItem>
                    <CardItem translateZ={32} className="w-full">
                      <h3 className="mb-1 font-display text-base text-bella-ivory">
                        {member.name[locale]}
                      </h3>
                    </CardItem>
                    <CardItem translateZ={24} className="w-full">
                      <p className="mb-4 font-body text-[9px] uppercase tracking-[0.12em] text-bella-gold">
                        {member.role[locale]}
                      </p>
                    </CardItem>
                    <CardItem translateZ={12} className="w-full">
                      <p className="font-body text-[12px] font-light leading-relaxed text-bella-ivory/45">
                        {member.bio[locale]}
                      </p>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              )}
            </BlurFade>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
