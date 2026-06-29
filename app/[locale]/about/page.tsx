import type { Metadata } from "next";
import { AboutCTASection } from "@/components/sections/about/AboutCTASection";
import { AboutHeroSection } from "@/components/sections/about/AboutHeroSection";
import { AboutTestimonialsSection } from "@/components/sections/about/AboutTestimonialsSection";
import { CertificationsSection } from "@/components/sections/about/CertificationsSection";
import { FounderQuoteSection } from "@/components/sections/about/FounderQuoteSection";
import { ScienceSection } from "@/components/sections/about/ScienceSection";
import { StatsSection } from "@/components/sections/about/StatsSection";
import { StorySection } from "@/components/sections/about/StorySection";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { TimelineSection } from "@/components/sections/about/TimelineSection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";

export const metadata: Metadata = { title: "Our Story" };

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <StatsSection />
      <StorySection />
      <FounderQuoteSection />
      <ValuesSection />
      <TimelineSection />
      <ScienceSection />
      <AboutTestimonialsSection />
      <CertificationsSection />
      <TeamSection />
      <AboutCTASection />
    </main>
  );
}
