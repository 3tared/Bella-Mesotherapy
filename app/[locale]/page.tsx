import dynamic from "next/dynamic";

import { HeroSection }         from "@/components/sections/HeroSection";
import { TrustBarSection }     from "@/components/sections/TrustBarSection";
import { ManifestoSection }    from "@/components/sections/ManifestoSection";
import { ProductsSection }     from "@/components/sections/ProductsSection";
import { VelocityBanner }      from "@/components/ui/VelocityBanner";
import { BenefitsSection }     from "@/components/sections/BenefitsSection";
import { HowItWorksSection }   from "@/components/sections/HowItWorksSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection }          from "@/components/sections/FAQSection";
import { CTASection }          from "@/components/sections/CTASection";

/* Perf FIX 4: Heavy section code-split */
const IngredientsSection = dynamic(
  () =>
    import("@/components/sections/IngredientsSection").then((m) => ({
      default: m.IngredientsSection,
    })),
  {
    loading: () => <div className="h-[600px] bg-[var(--surface-dark-muted)]" />,
  }
);

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBarSection />
      <ManifestoSection />
      <ProductsSection />
      <VelocityBanner />
      <IngredientsSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
