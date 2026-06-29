# BELLA Home Page Final Pass Report

Date: June 23, 2026  
Scope: Home page stabilization, localization, interaction, accessibility, and measured performance pass

## Outcome

The English and Arabic Home routes now pass the production build, TypeScript, lint, link, asset, responsive, keyboard, reduced-motion, metadata, and browser-console checks completed in this pass. The page was visually inspected in both locales at desktop and mobile sizes.

The work stayed within the requested precision-pass boundaries. It did not migrate the whole application between motion libraries, rebuild every Server/Client boundary, restructure `data/` or `messages/`, or redesign the brand.

## Phase-by-phase changes

### Phase 0 — Pre-flight verification

- `package.json` / `package-lock.json`
  - Confirmed that `motion@12.39.0` and the direct `framer-motion@12.39.0` dependency are separately represented. `motion` also depends on the matching `framer-motion` version.
  - Both import paths are still used outside Home, so neither dependency was removed.
  - Standardized the Home section animation imports on `motion/react`; other routes were left untouched to avoid a project-wide migration.
- `app/layout.tsx`
  - Confirmed that Cormorant Garamond, DM Sans, Italiana, Markazi Text, and Noto Sans Arabic are all loaded through `next/font/google` and expose the five expected CSS variables.
- Read the installed Next.js 16.2.6 guides under `node_modules/next/dist/docs/` before implementation, including Server/Client components, images, fonts, metadata/Open Graph, accessibility, lazy loading, production, and upgrade guidance.

### Phase 1 — Semantics and headings

- `components/sections/HeroSection.tsx`
  - Added one localized, screen-reader-visible `<h1>`.
  - Kept the decorative BELLA wordmark out of the accessibility tree.
- `components/sections/TrustBarSection.tsx`
  - Added an accessible section `<h2>`.
- `components/sections/BenefitsSection.tsx`
  - Added the missing section `<h2>`.
- `components/sections/TestimonialsSection.tsx`
  - Wrapped the animated visual headline in a semantic `<h2>`.
- Browser inspection confirms exactly one H1 and a logical H2/H3 hierarchy across Home.

### Phase 2 — Gold and dark-text contrast

- `app/globals.css`
  - Added:
    - `--brand-gold-decorative: #C9A96E`
    - `--brand-gold-text: #8A6A34`
    - `--brand-gold-text-hover: #745421`
    - dark-surface gold text overrides
    - `--text-on-dark-muted`
  - `#8A6A34` measures approximately 5.01:1 on white and 4.73:1 on Bella ivory.
  - Added reusable readable-gold and dark-muted text utilities.
- Home section files
  - Reclassified readable labels/links versus decorative lines, borders, washes, icons, and display numerals instance by instance.
  - Replaced failing low-opacity Benefits text with the passing dark-muted token.

### Phase 3 — RTL

- `components/ui/aceternity/tracing-beam.tsx`
  - Added real `side` and `dir` handling.
- `components/sections/HowItWorksSection.tsx`
  - Removed the ineffective arbitrary-selector hack and supplies locale direction to the beam.
- `components/sections/TrustBarSection.tsx`
  - Reverses marquee direction in Arabic.
- `components/ui/DirectionArrow.tsx`
  - Added one reusable direction-aware arrow.
- `components/sections/ProductsSection.tsx`
- `components/sections/IngredientsSection.tsx`
  - Replaced literal arrows with the direction-aware icon.
- `components/sections/FAQSection.tsx`
  - Uses logical `text-start`.
- `components/layout/Navbar.tsx`
  - Synchronizes the document `lang` and `dir` after a mid-session locale change.
- `messages/en.json`, `messages/ar.json`
  - Added localized product and ingredient category labels.
- `proxy.ts`
  - Corrected the locale matcher so internal product/detail links resolve through locale routing.
- Product mobile scrollers now receive the locale direction. The beam resolves left in English and right in Arabic.

### Phase 4 — Resource-aware continuous motion

- `components/ui/marquee.tsx`
  - Added viewport, Page Visibility, reduced-motion, and hover pause behavior.
- `components/ui/aceternity/infinite-moving-cards.tsx`
  - Replaced DOM cloning with React-rendered repeated items.
  - Added viewport, Page Visibility, reduced-motion, and hover pause behavior.
- `components/ui/scroll-based-velocity.tsx`
  - Reduced motion now fully pauses instead of merely slowing.
- `components/ui/morphing-text.tsx`
  - Retained one animation loop, moved rendering to a stable canvas, and gates it by viewport visibility, page visibility, and reduced-motion preference.
- `components/ui/spinning-text.tsx`
  - Honors reduced motion directly.
- `components/ui/border-beam.tsx`
  - Uses a static reduced-motion state.
- `components/ui/particles.tsx`
  - Fixed lifecycle cleanup and disables particles for mobile/reduced-motion contexts.
- `hooks/useMediaQuery.ts`
  - Added a hydration-safe capability query helper.
- Reduced-motion browser verification showed morphing text, velocity rows, spinning text, trust marquees, and testimonial rows all stationary.

### Phase 5 — Metadata and Open Graph

- `app/layout.tsx`
  - Added `metadataBase` and corrected the root title behavior.
- `app/[locale]/layout.tsx`
  - Added localized metadata generation, absolute Open Graph/Twitter image URLs, locale values, canonical URLs, and `en`/`ar`/`x-default` alternates.
- `app/[locale]/page.tsx`
  - Removed conflicting static English metadata.
- `public/og-image.jpg`
  - Added a 1200×630 brand image; HTTP verification returned 200.
  - The abstract ivory/charcoal/rose-gold background was generated with the built-in image generator, then the BELLA wordmark/tagline were composited deterministically for reliable typography.
  - Generation prompt: “Luxury skincare Open Graph background, 1200×630, warm ivory field with deep charcoal sculptural shadows and restrained rose-gold light, elegant mesotherapy/scientific atmosphere, premium editorial composition, generous central negative space, no text, no logos, no products.”
  - Generated source: `C:\Users\PC\.codex\generated_images\019eebe7-5c84-7ad2-88f2-ed8964d22f22\ig_005ffe26bd77afb0016a38501467b48191b3740bb3b5c13e14.png`
- Rendered head checks passed for localized title, description, Open Graph, Twitter, canonical, and alternate tags.

### Phase 6 — Content deduplication

- `data/brand.ts`
  - Removed the duplicate, unused manifesto copy while retaining true brand configuration and stat values.
- `components/sections/BenefitsSection.tsx`
  - Derives its four numeric values from `brand.stats`.
- Confirmed Manifesto and Benefits now share one source for `98%`, `12+`, `48h`, and `0`.

### Phase 7 — Dark surfaces

- `app/globals.css`
  - Added primary, elevated, muted, and overlay surface tokens.
- Dark Home sections and cards
  - Replaced raw section-level dark hex values with the intentional surface tokens.
  - Kept meaningful depth differences rather than flattening all dark sections to one color.

### Phase 8 — Product imagery

- `data/products.ts`
  - Updated the three Home-featured image paths to optimized WebP assets.
- `public/assets/Skin Booster.webp`
- `public/assets/Yaqoot.webp`
- `public/assets/Amber.webp`
  - Reduced the source assets from roughly 1.1–1.45 MB each to 30–34 KB each.
- `components/sections/ProductsSection.tsx`
  - Added real localized `next/image` product photography, soft brand-color washes, restrained shadows/reflections, coordinated entry reveals, and pointer-capability-gated image/card hover treatment.
  - Kept images lazy because the Products section is below the initial viewport.
  - Removed the unused `featured` prop and no-op card `custom` prop.
  - Mobile cards were visually checked at 360 px and 390 px.

### Phase 9 — Morphing text localization

- `messages/en.json`
  - Uses: Precision, Innovation, Renewal, Bella.
- `messages/ar.json`
  - Uses the compact elevated arc: دقّة، ابتكار، تجدّد، بيلا.
- `components/sections/HeroSection.tsx`
- `components/ui/morphing-text.tsx`
  - Pull locale content from i18n and reserve stable width/height so Arabic cycling does not reflow surrounding content.

### Phase 10 — Testimonials

- `data/testimonials.ts`
  - Converted all six testimonials to localized fields.
  - Added natural Arabic names, roles, locations, and faithful text adaptations.
  - Kept Dr. Hana Farouk’s endorsement in a professional clinical register.
- `components/sections/TestimonialsSection.tsx`
  - Resolves fields through the active locale and sets card direction correctly.
- Arabic cards were visually checked for wrapping, alignment, and readability.

### Phase 11 — Arabic register

- `messages/ar.json`
- `data/testimonials.ts`
  - Audited Home copy by context.
  - Consumer/emotional copy uses an elegant feminine address.
  - Scientific notes, protocol steps, factual FAQ answers, and the clinical testimonial use neutral professional language.
  - The FAQ headline remains feminine because it acts as a friendly consumer-facing invitation; the answers beneath it remain neutral.

### Phase 12 — Interaction polish

- `components/sections/HeroSection.tsx`
  - Added slow gradient drift and subtle pointer-fine parallax on a background light field.
  - Desktop-only particles and spinning seal are dynamically loaded and omitted for mobile/reduced motion.
- `components/ui/aceternity/text-hover-effect.tsx`
  - Simplified the decorative wordmark to a CSS-only gradient hover, removing pointer-state hydration work while retaining the premium hover cue.
- `components/ui/MagneticButton.tsx`
  - Added a restrained, pointer-only, reduced-motion-aware magnetic wrapper.
- `components/sections/HeroSection.tsx`
- `components/sections/CTASection.tsx`
  - Applied it only to the two large primary CTAs.
- `components/ui/aceternity/card-spotlight.tsx`
- `components/sections/IngredientsSection.tsx`
  - Added equivalent keyboard-focus emphasis while keeping all scientific content visible by default.
- Home sections
  - Added restrained light/dark seam gradients where transitions were abrupt.
- `components/sections/CTASection.tsx`
  - Removed invalid nested interactive markup from the external shop action.

### Phase 13 — Performance and architecture

- `components/sections/TrustBarSection.tsx`
  - Converted the static section shell to a Server Component around the small marquee client island.
- `components/sections/HeroSection.tsx`
  - Dynamically loads only the measured desktop visual effects (Particles and SpinningText).
- `lib/utils.ts`
  - Extended Tailwind merge for the project’s fluid text scale so valid typography classes are not silently removed.
- No broad Server/Client rewrite or speculative section lazy loading was performed.

#### Before/after measurements

Method: production `next start`, Lighthouse 12.8.2 mobile throttling in Chrome, one report-grade run per locale. Lighthouse results vary between runs; the table records the retained baseline and final report runs without cherry-picking. The Arabic baseline timed out and is incomplete.

| Metric | EN before | EN after | AR before | AR after |
|---|---:|---:|---:|---:|
| Lighthouse performance | 45 | 58 | incomplete | 72 |
| FCP | 2,561 ms | 1,451 ms | 1,961 ms | 1,686 ms |
| LCP | 4,699 ms | 5,695 ms | 5,026 ms | 6,699 ms |
| Total blocking time | 2,987 ms | 668 ms | unavailable | 119 ms |
| Speed Index | 6,367 ms | 5,368 ms | 6,887 ms | 4,481 ms |
| CLS | 0 | 0 | 0 | 0 |
| Total transferred bytes | 718,963 | 793,778 | 816,100 | 890,913 |
| Lighthouse INP | unavailable | unavailable | unavailable | unavailable |

Additional route measurements:

| Metric | Before | After |
|---|---:|---:|
| Raw production script bytes | 1,101,978 | 1,124,051 |
| Script requests | 14 | 15 |
| Explicit reachable `'use client'` files | 32 | 32 |
| Page-level Home client section boundaries | 11 | 10 |
| Final local modules inherited into the client graph | — | 48 |

Interpretation:

- The pass substantially reduced initial main-thread blocking and improved FCP and Speed Index.
- The transfer increase is primarily the new real product imagery plus bounded interaction code; the three product assets themselves were reduced by approximately 97% versus their original PNG sources.
- CLS remained zero.
- The large decorative wordmark remained the Lighthouse LCP candidate and was slower in the retained final runs. Its mount-scale animation and JS-driven hover were removed, but eliminating the remaining lab delay would require deeper hero/font/wordmark profiling and potentially a visual or loading-strategy change. This result is recorded rather than hidden.
- Lighthouse navigation runs did not expose INP. No before/after INP value is claimed.

### Phase 14 — Cleanup

- `lib/animations.ts`
  - Removed unused `clipReveal` and `imageZoom`.
  - Kept `lineDraw` because the About story uses it.
- `lib/constants.ts`
  - Kept the Gallery section ID because `GallerySection` uses it.
- `messages/en.json`, `messages/ar.json`
  - Removed the unused `home.hero.sub` key.
- `components/ui/AnimatedText.tsx`
- `components/providers/SmoothScrollProvider.tsx`
- `components/sections/about/AboutHeroSection.tsx`
- `components/sections/about/TeamSection.tsx`
- `components/sections/about/ValuesSection.tsx`
- `i18n/request.ts`
- `lib/animations.ts`
  - Cleared project-wide lint/type issues encountered during the final verification without changing unrelated page behavior.

### Phase 15 — Testing matrix

Passed:

- English and Arabic rendering
- LTR/RTL direction, beam side, marquee direction, logical alignment, direction arrows, and mobile product snapping
- Desktop, 768 px tablet, 390 px mobile, and 360 px mobile
- Chrome production rendering
- Complete visible keyboard tab order: 40 of 40 controls visited with no trap
- FAQ keyboard activation, ingredient-card focus treatment, and primary CTA focus visibility
- Reduced-motion pause behavior for every continuous Home animation
- Mid-session locale switching
- No global horizontal overflow at tested widths
- No hydration, console, page, or local HTTP errors
- All discovered internal Home links returned below 400
- Product assets loaded and the Open Graph image returned 200
- TypeScript and production build
- Lighthouse mobile CPU/network throttling

Manual confirmation still needed:

- Safari/WebKit was not available in this environment.
- A physical iOS/Android touch-device pass is still advisable for tactile swipe and hover-emulation behavior.
- The hidden-tab Page Visibility handlers were implemented and code-reviewed, but a reliable real background-tab transition was not available in the single-window headless run.

### Phase 16 — Final visual confirmation

The rendered Home page was inspected, not only source-reviewed:

- English desktop Hero, Products, Ingredients, Benefits, How It Works, and Testimonials
- Arabic desktop Hero, Products, Ingredients, and Testimonials
- Arabic full-page 360 px and 390 px captures

The final screenshots showed intact composition, no layout explosion, readable product cards, stable Arabic typography, correct RTL placement, and smooth light/dark section seams.

## Judgment calls

1. Kept both motion dependencies because both remain genuinely used project-wide; removing either would have crossed into a library migration.
2. Kept the spinning seal in the same physical corner because it is a decorative brand accent; it is now explicitly hidden from assistive technology.
3. Implemented trust-marquee pause on hover because the pause is temporary and improves reading without undermining the ambient-motion character.
4. Removed the Home-only `featured` prop because it had no behavior or known reuse contract.
5. Kept product images lazy because the section is below the initial viewport.
6. Kept the FAQ headline feminine and its factual answers neutral, separating invitation tone from clinical content.
7. Preserved distinct dark depths as named surfaces instead of flattening the page.
8. Kept the hero entrance pacing; performance work focused on resource gating, hydration reduction, and smarter pauses instead of making the luxury motion abrupt.

## Needs a separate phase

- Project-wide convergence on only `motion/react` or only `framer-motion`.
- A broader Server/Client component-boundary redesign.
- Replacing the site’s animation system with CSS scroll-driven animation.
- Deeper LCP work if the product requirement demands a sub-2.5-second mobile lab LCP; the remaining candidate is the central brand wordmark and meaningful improvement may require revisiting its rendering/loading strategy.
- Safari and physical-device certification.

