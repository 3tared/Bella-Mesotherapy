/**
 * BELLA — UI COMPONENT REGISTRY
 * Maps each visual element to its source library.
 * All components are copy-pasted and adapted to bella brand tokens.
 */

export const COMPONENT_REGISTRY = {

  /* ── Cursor ──────────────────────────────────── */
  cursor: {
    source:  "magicui.design/docs/components/smooth-cursor",
    install: "npx magicui-cli@latest add smooth-cursor",
    file:    "components/ui/CustomCursor.tsx",
    notes:   "Replace default cursor on desktop. Style with bella-gold.",
  },

  /* ── Scroll progress bar ─────────────────────── */
  scrollProgress: {
    source:  "magicui.design/docs/components/scroll-progress",
    install: "npx magicui-cli@latest add scroll-progress",
    file:    "components/ui/ScrollProgress.tsx",
    notes:   "2px gold bar at top of viewport.",
  },

  /* ── Hero section ────────────────────────────── */
  heroBackground: {
    source:  "reactbits.dev — Particles or Aurora",
    install: "npx shadcn@latest add https://reactbits.dev/r/Particles-ts-tailwind",
    file:    "components/sections/HeroSection.tsx",
    notes:   "Subtle gold particles on dark hero bg. Low opacity. Pair with Lenis parallax.",
  },
  heroHeadline: {
    source:  "magicui.design/docs/components/text-animate",
    install: "npx magicui-cli@latest add text-animate",
    file:    "components/ui/AnimatedText.tsx",
    notes:   "Word-by-word blur-fade-up reveal. Use animation='blur-in-up'.",
  },
  heroButton: {
    source:  "magicui.design/docs/components/shimmer-button",
    install: "npx magicui-cli@latest add shimmer-button",
    file:    "components/ui/ShimmerButton.tsx",
    notes:   "Gold shimmer effect. Primary CTA only.",
  },

  /* ── Manifesto / Brand story ─────────────────── */
  manifestoText: {
    source:  "magicui.design/docs/components/text-reveal",
    install: "npx magicui-cli@latest add text-reveal",
    file:    "components/sections/ManifestoSection.tsx",
    notes:   "Scroll-triggered word reveal. Use for brand paragraphs.",
  },
  manifestoCounter: {
    source:  "magicui.design/docs/components/number-ticker",
    install: "npx magicui-cli@latest add number-ticker",
    file:    "components/sections/BenefitsSection.tsx",
    notes:   "Animated stat counters (98%, 12+, 48h, 0).",
  },

  /* ── Products ────────────────────────────────── */
  productCard: {
    source:  "ui.aceternity.com/components/3d-card-effect",
    install: "copy-paste from aceternity docs",
    file:    "components/ui/ProductCard.tsx",
    notes:   "3D tilt on hover. Wrap product content inside CardContainer.",
  },
  productCarousel: {
    source:  "ui.aceternity.com/components/apple-cards-carousel",
    install: "copy-paste from aceternity docs",
    file:    "components/sections/ProductsSection.tsx",
    notes:   "Horizontal drag carousel on mobile. Desktop shows grid.",
  },

  /* ── Ingredients ─────────────────────────────── */
  ingredientCard: {
    source:  "ui.aceternity.com/components/card-spotlight",
    install: "copy-paste from aceternity docs",
    file:    "components/sections/IngredientsSection.tsx",
    notes:   "Spotlight effect on hover, reveals ingredient details.",
  },

  /* ── Gallery ─────────────────────────────────── */
  galleryGrid: {
    source:  "ui.aceternity.com/components/focus-cards",
    install: "copy-paste from aceternity docs",
    file:    "components/sections/gallery/GalleryGridSection.tsx",
    notes:   "Hover to focus one card, blur others. Masonry layout.",
  },
  galleryImages: {
    source:  "ui.aceternity.com/components/parallax-hero-images",
    install: "copy-paste from aceternity docs",
    file:    "components/sections/gallery/GalleryHeroSection.tsx",
    notes:   "Mouse-driven parallax at different depths.",
  },

  /* ── Testimonials ────────────────────────────── */
  testimonials: {
    source:  "ui.aceternity.com/components/animated-testimonials",
    install: "copy-paste from aceternity docs",
    file:    "components/sections/TestimonialsSection.tsx",
    notes:   "Animated card flip between testimonials.",
  },
  testimonialMarquee: {
    source:  "magicui.design/docs/components/marquee",
    install: "npx magicui-cli@latest add marquee",
    file:    "components/ui/MarqueeTrack.tsx",
    notes:   "Two-row infinite scroll of name pills.",
  },

  /* ── How it works ────────────────────────────── */
  howItWorks: {
    source:  "motion-primitives.com — AnimatedGroup",
    install: "npx shadcn add https://motion-primitives.com/c/animated-group",
    file:    "components/sections/HowItWorksSection.tsx",
    notes:   "Stagger entrance for step cards.",
  },

  /* ── Backgrounds ─────────────────────────────── */
  dotsBackground: {
    source:  "magicui.design/docs/components/dot-pattern",
    install: "npx magicui-cli@latest add dot-pattern",
    file:    "components/ui/backgrounds/DotPattern.tsx",
    notes:   "Subtle dot grid for mist-colored sections.",
  },
  noiseTexture: {
    source:  "magicui.design/docs/components/noise-texture",
    install: "npx magicui-cli@latest add noise-texture",
    file:    "components/ui/backgrounds/NoiseTexture.tsx",
    notes:   "Grain texture overlay for hero sections. Low opacity.",
  },
  borderBeam: {
    source:  "magicui.design/docs/components/border-beam",
    install: "npx magicui-cli@latest add border-beam",
    file:    "components/ui/BorderBeam.tsx",
    notes:   "Animated border for product cards on hover.",
  },

  /* ── Buttons ─────────────────────────────────── */
  magneticButton: {
    source:  "ui.aceternity.com/components/magnetic-button",
    install: "copy-paste from aceternity docs",
    file:    "components/ui/MagneticButton.tsx",
    notes:   "Cursor-following button for CTAs.",
  },

  /* ── Text effects ────────────────────────────── */
  splitText: {
    source:  "reactbits.dev — SplitText",
    install: "npx shadcn@latest add https://reactbits.dev/r/SplitText-ts-tailwind",
    file:    "components/ui/SplitText.tsx",
    notes:   "Character-by-character reveal for hero headlines.",
  },
  blurText: {
    source:  "reactbits.dev — BlurText",
    install: "npx shadcn@latest add https://reactbits.dev/r/BlurText-ts-tailwind",
    file:    "components/ui/BlurText.tsx",
    notes:   "Blur fade in for secondary headings.",
  },
  countUp: {
    source:  "reactbits.dev — CountUp OR magicui NumberTicker",
    install: "npx magicui-cli@latest add number-ticker",
    file:    "components/ui/NumberTicker.tsx",
    notes:   "Animated counters for stats section.",
  },

  /* ── Page transitions ────────────────────────── */
  pageTransition: {
    source:  "motion-primitives.com — Transition Panel",
    install: "custom using framer-motion AnimatePresence",
    file:    "components/providers/PageTransition.tsx",
    notes:   "Fade + slight Y shift between page navigations.",
  },
} as const;
