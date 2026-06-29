# BELLA — HOME PAGE FINAL AUDIT REPORT

> **Audit date:** 2026-06-21  
> **Auditor:** Senior Frontend Auditor (Read-Only)  
> **Scope:** `app/[locale]/page.tsx` and all components it renders  
> **Build:** Next.js 15 App Router · TypeScript · Tailwind v4 · Framer Motion · Lenis · next-intl

---

## 1. Section Inventory

The Home page renders **10 items** — not 8 sections + velocity banner. The accurate count is **9 sections + 1 velocity/marquee banner**, totalling 10 render positions. The claimed "8 sections" appears to have been written before the `FAQSection` was added.

| # | Order in `page.tsx` | Component | File path | Description | Server / Client | UI library / pattern |
|---|---|---|---|---|---|---|
| 1 | 1st | `HeroSection` | `components/sections/HeroSection.tsx` | Full-viewport hero with particles, animated BELLA wordmark, tagline, morphing sub-text, and two CTAs | **Client** (`'use client'`) | Aceternity (`TextHoverEffect`), Magic UI (`Particles`, `BlurText`, `SpinningText`, `MorphingText`, `AnimatedShinyText`, `ShimmerButton`) |
| 2 | 2nd | `TrustBarSection` | `components/sections/TrustBarSection.tsx` | Thin auto-scrolling marquee bar of six trust-copy phrases | **Client** (`'use client'`) | Magic UI (`Marquee`) |
| 3 | 3rd | `ManifestoSection` | `components/sections/ManifestoSection.tsx` | Two-column brand manifesto + 4-stat counter row on ivory background | **Client** (`'use client'`) | Custom; Framer Motion |
| 4 | 4th | `ProductsSection` | `components/sections/ProductsSection.tsx` | 3-column 3D product card grid (desktop) / horizontal scroll (mobile), showing featured products | **Client** (`'use client'`) | Aceternity (`CardContainer`/`CardBody`/`CardItem` 3D card), Magic UI (`BorderBeam`) |
| 5 | 5th | `VelocityBanner` | `components/ui/VelocityBanner.tsx` | Dual-row scroll-velocity-reactive marquee of 8 brand keywords | **Client** (`'use client'`) | React Bits / custom (`scroll-based-velocity.tsx`) |
| 6 | 6th | `IngredientsSection` | `components/sections/IngredientsSection.tsx` | Lamp-effect header + 3-column `CardSpotlight` cards for 3 featured ingredients | **Client** (`'use client'`); lazy-loaded via `next/dynamic` | Aceternity (`LampContainer`, `CardSpotlight`) |
| 7 | 7th | `BenefitsSection` | `components/sections/BenefitsSection.tsx` | Dark background; 4-column number ticker stats + 3 benefit cards with Roman numerals | **Client** (`'use client'`) | Magic UI (`NumberTicker`); custom |
| 8 | 8th | `HowItWorksSection` | `components/sections/HowItWorksSection.tsx` | 4-step protocol timeline with Aceternity TracingBeam on ivory background | **Client** (`'use client'`) | Aceternity (`TracingBeam`) |
| 9 | 9th | `TestimonialsSection` | `components/sections/TestimonialsSection.tsx` | Dark background; two rows of infinite auto-scrolling testimonial cards | **Client** (`'use client'`) | Aceternity (`InfiniteMovingCards`), Magic UI (`BlurText`) |
| 10 | 10th | `FAQSection` | `components/sections/FAQSection.tsx` | Accordion FAQ (5 items) on ivory background | **Client** (`'use client'`) | Custom; Framer Motion `AnimatePresence` |
| 11 | 11th | `CTASection` | `components/sections/CTASection.tsx` | Final dark CTA with lamp effect, primary shop button (external), secondary story link | **Client** (`'use client'`) | Aceternity (`LampContainer`), Magic UI (`ShimmerButton`) |

**Finding:** Every single section is a Client Component. There are zero Server Components among the 10 page-level sections. This is a significant performance concern (see §3 Performance Flags).

**Finding:** The section count is **9 sections + 1 velocity banner = 10 items**, not "8 sections + velocity banner". The `FAQSection` was apparently not counted in the original specification.

---

## 2. Per-Section Deep Dive

---

### Section 1 — HeroSection

#### a) Content & Copy

**English strings** (source: `messages/en.json` → `home.hero`):

| Key | Value |
|---|---|
| `eyebrow` | `"Advanced Mesotherapy"` |
| `headline` | `"Science meets\nbeauty."` |
| `cta` | `"Explore Products"` |
| `secondary` | `"Our Story"` |
| `scroll` | `"Scroll to discover"` |

**Arabic strings** (source: `messages/ar.json` → `home.hero`):

| Key | Value |
|---|---|
| `eyebrow` | `"ميزوثيرابي متقدم"` |
| `headline` | `"العلم\nيلتقي بالجمال."` |
| `cta` | `"اكتشف المنتجات"` |
| `secondary` | `"قصتنا"` |
| `scroll` | `"اسحب للاستكشاف"` |

> ⚠️ **Note:** `home.hero.sub` exists in `en.json` (`"Precision-formulated for transformative skin renewal."`) but is **never rendered** in `HeroSection.tsx`. The `MorphingText` component renders hardcoded English words instead (see hardcoded strings below).

**Hardcoded strings (not from i18n):**
- **Line 128:** `texts={["Precision.", "Science.", "Transformation.", "Bella."]}` — these four morphing words are hardcoded in English and **will not change in the Arabic locale**. Arabic users see English cycling text below the Arabic headline.
- **Line 173:** `bella • mesotherapy • luxury •` — the `SpinningText` content is hardcoded English, displayed desktop-only.
- **Line 94:** `✦` — decorative emoji/symbol, locale-neutral.

#### b) Images & Media

No `<Image>` components are used in `HeroSection`. The hero uses:
- An SVG noise grain texture inlined as a `data:image/svg+xml` URL (line 65) — no file reference.
- CSS radial-gradient for the mobile fallback.
- Particles rendered as canvas via the `Particles` component.

No broken image references. No `next/image` issues to flag.

#### c) Animation

| Element | Trigger | Duration | Easing | Delay |
|---|---|---|---|---|
| Eyebrow pill | `initial→animate` (on mount) | 0.8s | `[0.25,0.46,0.45,0.94]` | 0.2s |
| BELLA wordmark wrapper | `initial→animate` (on mount) | 1.2s | `[0.25,0.46,0.45,0.94]` | 0.4s |
| `TextHoverEffect` SVG gradient | On hover | `duration={0.4}` (internal) | internal | — |
| `BlurText` tagline | `initial→animate` (on mount, word-by-word) | internal | internal | 120ms per word |
| MorphingText sub-text wrapper | `initial→animate` (on mount) | 0.7s | `[0.25,0.46,0.45,0.94]` | 0.9s |
| CTA buttons row | `initial→animate` (on mount) | 0.7s | `[0.25,0.46,0.45,0.94]` | 1.1s |
| `SpinningText` wrapper (desktop only) | `initial→animate` (on mount) | 1s | default | 1.8s |
| Scroll indicator | `initial→animate` (on mount) | 1.0s | default | 1.6s |
| Scroll caret bounce | `animate={{ y: [0,10,0] }}` (continuous) | 1.8s | `easeInOut` | Infinite, on mount |

**`prefers-reduced-motion` handling:**  
✅ `prefersReducedMotion` state is correctly read via `window.matchMedia`. The scroll caret bounce respects it: `animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}`.  
⚠️ However, all other mount animations (`motion.div initial→animate`) do **not** check `prefersReducedMotion` — they rely solely on the global CSS rule in `globals.css` (lines 92–97: `animation-duration: 0.01ms !important`). The CSS approach works for CSS animations but may not fully suppress Framer Motion spring physics. This is a pattern-level concern, not unique to HeroSection.

**RTL animation audit:**  
- No directional slide-in animations (all are `y` or `scale`/`opacity` — direction-neutral). ✅  
- `SpinningText` is circular — direction-neutral. ✅  
- `MorphingText` hardcoded English words in Arabic — functional gap (flagged above).

#### d) Typography

| Element | Font family (className/style) | Weight | Size | Breakpoints |
|---|---|---|---|---|
| Eyebrow pill | `font-body` → `DM Sans`; `style` override not set | `font-medium` | `text-[11px]` | Same all breakpoints |
| `BlurText` tagline | `font-display` + `style={{ fontFamily: "var(--font-cormorant)" }}` | `font-light italic` | `text-fluid-xl` (`clamp(1.5rem,4vw,2rem)`) | Fluid |
| `MorphingText` sub-text | `font-body` | `font-normal` | `text-[13px]` | Same all breakpoints |
| CTA primary button | `font-body` | `font-medium` | `text-[13px]` | Same all breakpoints |
| CTA secondary link | `font-body` | default | `text-[13px]` | Same all breakpoints |
| `SpinningText` decoration | via className: `text-[9px]` | default | `text-[9px]` | Desktop only |
| Scroll label | `font-body` | default | `text-[9px]` | Same all breakpoints |

**Heading hierarchy:** The `TextHoverEffect` renders `BELLA` as an SVG, not a heading element. There is **no `<h1>` in HeroSection**. The first `<h2>` appears in `ManifestoSection`. This means the page has **no `<h1>` at all** — a significant SEO and accessibility failure.

#### e) Spacing & Layout

- **Section container:** `h-[100svh] w-full`, `flex flex-col items-center justify-center`, `overflow-hidden`
- **Content wrapper (z-20):** `relative z-20 flex flex-col items-center px-6 text-center`
- **Eyebrow → BELLA gap:** `mb-7` (28px) below eyebrow
- **BELLA div:** `mb-4 h-[120px] w-full max-w-4xl md:h-[160px]`
- **BlurText tagline:** wrapped in `mb-5` div (20px)
- **MorphingText:** `mb-11` (44px)
- **SpinningText:** `absolute bottom-12 right-8` (desktop only)
- **Scroll indicator:** `absolute bottom-8` centered
- **Fade overlay:** `h-40` gradient at bottom

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Hero section background | `#0A0A08` | ⚠️ **Hardcoded** raw hex in `style={{ background: "#0A0A08" }}` |
| Particles color | `#C9A96E` | ⚠️ **Hardcoded** raw hex — not `bella-gold` token |
| Mobile gradient | `rgba(201,169,110,0.08)` | ⚠️ **Hardcoded** raw rgba |
| Eyebrow border | `rgba(201,169,110,0.25)` | ⚠️ **Hardcoded** raw rgba |
| Eyebrow bg | `rgba(201,169,110,0.08)` | ⚠️ **Hardcoded** raw rgba |
| Eyebrow text | `text-[#C9A96E]` | ⚠️ **Hardcoded** raw hex |
| ShimmerButton shimmerColor | `#E8D5A3` | ⚠️ **Hardcoded** — matches `bella-gold-light` token but not referenced |
| ShimmerButton background | `rgba(201,169,110,0.08)` | ⚠️ **Hardcoded** raw rgba |
| ShimmerButton border | `rgba(201,169,110,0.4)` | ⚠️ **Hardcoded** raw rgba |
| ShimmerButton text | `text-[#C9A96E]` | ⚠️ **Hardcoded** raw hex |
| Secondary CTA border/text | `border-white/15`, `text-white/40` | Tailwind (opacity modifier on white) ✅ |
| Scroll gradient | `from-[rgba(201,169,110,0.4)]` | ⚠️ **Hardcoded** raw rgba |
| Bottom fade (light) | `from-[#FAF8F5]` | ⚠️ **Hardcoded** — matches `bella-ivory` token |
| Bottom fade (dark) | `dark:from-[#0A0A08]` | ⚠️ **Hardcoded** raw hex |
| Vignette | `rgba(0,0,0,0.75)` | ⚠️ **Hardcoded** raw rgba |

**Summary:** HeroSection has the highest raw-hex hardcoding density of any section. Almost no color references go through the Tailwind `bella-*` token system.

#### g) RTL-Specific Behavior

- `SpinningText` is `absolute bottom-12 right-8` — this positions it on the right side in both LTR and RTL. In RTL it visually belongs on the left. **Minor RTL gap.**
- The secondary CTA (`Link href="/about"`) uses no `dir` or logical properties — acceptable since it's center-aligned.
- The bottom fade gradient (`bg-gradient-to-t`) is vertical — direction-neutral. ✅
- `MorphingText` hardcoded English in Arabic locale — functional gap (flagged above).

---

### Section 2 — TrustBarSection

#### a) Content & Copy

**English strings** (source: `messages/en.json` → `home.trustBar.items`):
1. `"Trusted by 200+ clinics across Egypt & Gulf"`
2. `"Dermatologist recommended"`
3. `"Pharmaceutical-grade manufacturing"`
4. `"Available in 8+ countries"`
5. `"Zero harmful additives"`
6. `"Clinical-grade actives"`

**Arabic strings** (source: `messages/ar.json` → `home.trustBar.items`):
1. `"موثوق بها في أكثر من 200 عيادة في مصر والخليج"`
2. `"موصى بها من أطباء الجلدية"`
3. `"تصنيع بمعايير صيدلانية"`
4. `"متوفرة في أكثر من 8 دول"`
5. `"صفر إضافات ضارة"`
6. `"مواد فعّالة بدرجة سريرية"`

All 6 items are fully translated. ✅  
No hardcoded strings in the component.

#### b) Images & Media

No images. No `next/image`.

#### c) Animation

The `Marquee` component uses CSS `animation-marquee` (40s linear infinite) applied via Tailwind. The duration is passed via `[--duration:40s]` on the `Marquee` wrapper.  

**RTL direction issue:** The `Marquee` component itself has no direction prop passed (`reverse` is not set). The `TrustBarSection` does **not** pass `reverse` for RTL. In Arabic, the marquee scrolls left (LTR direction), which is visually inconsistent for RTL reading context.  
⚠️ **RTL Bug:** Marquee does not reverse direction in Arabic.

**`prefers-reduced-motion`:** The global CSS rule (`animation-duration: 0.01ms`) pauses the CSS marquee effectively. ✅

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Trust bar items | `font-body` (DM Sans) | default | `text-[11px]` |
| Separator dot | `inline-block h-[3px] w-[3px]` (visual only) | — | — |

Letter spacing: `tracking-[0.2em]`, `uppercase`. In RTL, `globals.css` suppresses letter-spacing: ✅

#### e) Spacing & Layout

- Section: `py-3` (12px top/bottom) — notably very thin
- Each item: `mx-8` (32px horizontal margin each side) inside Marquee
- Separator dot: `inline-block h-[3px] w-[3px]`
- Section has `border-y border-bella-gold/10` — uses token ✅

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `bg-white` | Tailwind ✅ |
| Section border | `border-bella-gold/10` | Token ✅ |
| Item text | `text-bella-charcoal/40` | Token ✅ |
| Dot | `bg-bella-gold` | Token ✅ |

TrustBarSection is the **cleanest section for color token usage** — all references use the `bella-*` Tailwind system. ✅

#### g) RTL-Specific Behavior

⚠️ The marquee scrolls left in both locales. In Arabic RTL contexts, marquees conventionally scroll right. The `Marquee` component supports a `reverse` prop but it is not used here.

---

### Section 3 — ManifestoSection

#### a) Content & Copy

**English strings** (source: `messages/en.json` → `home.manifesto` and `home.stats`):

| Key | Value |
|---|---|
| `manifesto.eyebrow` | `"Our Belief"` |
| `manifesto.headline` | `"Your skin deserves the extraordinary."` |
| `manifesto.p1` | `"We believe beauty is not something you chase. It is something you reveal — layer by layer, with the right science and the right care."` |
| `manifesto.p2` | `"Bella is built on the principle that luxury should also be effective. Every drop in every vial carries decades of dermatological research distilled into a single promise: transformation you can see."` |
| `manifesto.p3` | `"This is not skincare. This is a ritual."` |
| `stats.satisfaction` | `"Client satisfaction"` |
| `stats.actives` | `"Active ingredients"` |
| `stats.hydration` | `"Hydration boost"` |
| `stats.additives` | `"Harmful additives"` |

**Arabic strings** (source: `messages/ar.json` → `home.manifesto` and `home.stats`):

| Key | Value |
|---|---|
| `manifesto.eyebrow` | `"فلسفتنا"` |
| `manifesto.headline` | `"بشرتك تستحق الاستثنائي."` |
| `manifesto.p1` | `"نؤمن بأن الجمال ليس شيئاً تسعى إليه، بل هو شيء تكشف عنه — طبقة تلو طبقة، بالعلم الصحيح والعناية المثلى."` |
| `manifesto.p2` | `"بيلا مبنية على مبدأ أن الفخامة يجب أن تكون فعّالة أيضاً. كل قطرة في كل أمبولة تحمل عقوداً من الأبحاث الجلدية في وعد واحد: تحول ترينه بأم عينيك."` |
| `manifesto.p3` | `"هذا ليس العناية بالبشرة. هذه طقوس."` |
| `stats.satisfaction` | `"رضا العملاء"` |
| `stats.actives` | `"مكونات فعّالة"` |
| `stats.hydration` | `"تعزيز الترطيب"` |
| `stats.additives` | `"إضافات ضارة"` |

All strings fully translated. ✅

**Stat values** come from `data/brand.ts` → `brand.stats[0..3].value`: `"98%"`, `"12+"`, `"48h"`, `"0"` — these are English-formatted strings that display with `dir="ltr"` applied. ✅  
**Stat labels** come from `useTranslations("home.stats")` — correctly i18n'd.

**Hardcoded strings:** The watermark number `{isRTL ? "٠١" : "01"}` — this is intentional locale branching for decorative numerals, not a copy oversight. The `ar` value uses Arabic-Indic numerals, which is correct.

⚠️ **Data duplication risk:** The manifesto content exists both in `data/brand.ts` (`brand.manifesto.paragraphs`, `brand.manifesto.headline`) **and** in `messages/en.json` + `messages/ar.json` (via `home.manifesto.*`). The component uses `useTranslations` (correct), but the `data/brand.ts` versions are near-identical strings and could drift out of sync over time.

#### b) Images & Media

No images. No `next/image`. The diagonal line pattern is an inline SVG.

#### c) Animation

| Element | Trigger | Duration | Easing | Stagger |
|---|---|---|---|---|
| Left column (container) | `whileInView` (`once: true`, `margin: "-10%"`) | stagger container | — | `staggerChildren: 0.12`, `delayChildren: 0.1` |
| Eyebrow line + text | `fadeUp` variant | 0.8s | `[0.25,0.46,0.45,0.94]` | per stagger |
| `<h2>` headline | `fadeUp` variant | 0.8s | same | per stagger |
| Vertical gold line | `whileInView: scaleY 0→1` | 1.2s | `[0.65,0,0.35,1]` | 0.3s delay |
| Right column (container) | `whileInView` (`once: true`, `margin: "-10%"`) | stagger container | — | `staggerChildren: 0.12` |
| p1, p2, p3 paragraphs | `fadeUp` variant each | 0.8s each | same | per stagger |
| Stats row (container) | `whileInView` (`once: true`) | stagger | — | same |
| Each stat div | `fadeUp` variant | 0.8s | same | per stagger |

All `whileInView` animations use `once: true` — they do not replay. ✅  
`prefers-reduced-motion`: covered by global CSS rule only.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Eyebrow text | `font-body` | default | `text-[10px]` |
| Headline `h2` | `font-display` + `style={fontFamily: "var(--font-cormorant)"}` | default | `text-fluid-2xl` (`clamp(2rem,5vw,3rem)`) |
| Paragraphs p1, p2 | `font-body` | default | `text-fluid-base` (`clamp(1rem,2vw,1.125rem)`) |
| p3 (italic quote) | `font-display` + `style={fontFamily: "var(--font-cormorant)"}` | — | `text-fluid-lg` (`clamp(1.25rem,3vw,1.5rem)`) |
| Stat value | `font-display` + `style={fontFamily: "var(--font-cormorant)"}` | `font-light` | `text-[2.5rem]` |
| Stat label | `font-body` | default | `text-[10px]` |

**RTL font override:** `globals.css` lines 132–134 replace `font-display` with `var(--font-markazi)` in RTL. However, `--font-markazi` is declared in `globals.css` via the RTL body rule (`line 133`) but **there is no `@font-face` or next/font import for Markazi Text visible in the files read**. This could mean Markazi Text is never actually loaded, falling back to Cormorant Garamond anyway.

#### e) Spacing & Layout

- Section: `py-[clamp(6rem,12vw,11rem)]` — slightly larger than the `section` Tailwind token (`clamp(5rem,10vw,9rem)`)
- Content: `mx-auto max-w-7xl px-6 lg:px-8`
- Two-column grid gap: `gap-14 lg:gap-24`
- Stats row: `mt-20` top margin, `pt-12` top padding after border-t
- Gold divider: `absolute bottom-0` `h-[1px]`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Background | `bg-[#FAF8F5]` | ⚠️ **Hardcoded** — matches `bella-ivory` token |
| Eyebrow text | `text-bella-gold` | Token ✅ |
| Eyebrow line | `bg-bella-gold` | Token ✅ |
| h2 text | `text-bella-charcoal` | Token ✅ |
| p1, p2 text | `text-bella-charcoal` | Token ✅ |
| p3 italic text | `text-bella-gold` | Token ✅ |
| SVG line stroke | `stroke="#C9A96E"` | ⚠️ **Hardcoded** raw hex in inline SVG |
| Watermark number | `text-bella-charcoal opacity-[0.04]` | Token ✅ |
| Vertical gold line | `bg-bella-gold/20` | Token ✅ |
| Stat value | `text-bella-gold` | Token ✅ |
| Stat label | `text-bella-stone` | Token ✅ |
| Stats grid gap | `bg-bella-gold/15` | Token ✅ — used as gap color |
| Bottom divider | `via-bella-gold/25` | Token ✅ |

> ⚠️ **Contrast flag:** `text-bella-gold` (`#C9A96E`) used for `p3` italic text on `bg-[#FAF8F5]` (ivory). Contrast ratio approximately **2.7:1** — fails WCAG AA for normal text (requires 4.5:1). Also applies to eyebrow text.

#### g) RTL-Specific Behavior

The component has explicit RTL handling:
- Grid column order is reversed: `isRTL ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-[2fr_3fr]"` ✅
- Watermark number positions: `isRTL ? "-top-6 -right-4" : "-top-6 -left-4"` ✅
- Arabic numeral display: `{isRTL ? "٠١" : "01"}` ✅
- Vertical gold divider: `isRTL ? "-left-8" : "-right-8"` ✅
- Stat values: `dir="ltr"` applied to keep `"98%"`, `"12+"`, `"48h"`, `"0"` left-to-right ✅

**Overall RTL handling in ManifestoSection is thorough.** ✅

---

### Section 4 — ProductsSection

#### a) Content & Copy

**Section header strings** (source: `messages/en.json` → `home.products`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"Our Formulations"` | `"تركيباتنا"` |
| `headline` | `"Crafted with precision."` | `"مصنوعة بدقة."` |
| `sub` | `"Each Bella formula is built around a single mission: visible, lasting results."` | `"كل تركيبة بيلا مبنية على مهمة واحدة: نتائج مرئية ودائمة."` |
| `viewAll` | `"View all products"` | `"عرض كل المنتجات"` |

**Card `learnMore` label** (source: `messages/en.json` → `products.card.learnMore`): `"Learn more"` (EN) / `"اعرف أكثر"` (AR) ✅

**Product data** (from `data/products.ts` via `featuredProducts` + `getLocalizedProduct`):

Featured products (those with `featured: true`): **`bella-skin-booster`**, **`bella-yaqoot`**, **`bella-amber`** — exactly as specified. ✅

Product content displayed per card (localized):

| Product | EN name | AR name |
|---|---|---|
| `bella-skin-booster` | `"Bella Skin Booster"` | `"بيلا سكن بوستر"` |
| `bella-yaqoot` | `"Bella Yaqoot"` | `"بيلا ياقوت"` |
| `bella-amber` | `"Bella Amber"` | `"بيلا أمبر"` |

Each card also shows: `subtitle`, `description`, first 3 `keyBenefits`, `volume`, and `category`. All fully i18n'd via `getLocalizedProduct`. ✅

**Hardcoded strings in component:**
- **Line 59:** `B` — decorative watermark character, locale-neutral. ✅  
- **Line 118:** `→` — directional arrow, **not flipped for RTL** ⚠️ (should be `←` in Arabic)
- **Line 222:** `→` — "View all" arrow, **not flipped for RTL** ⚠️

**`featured` prop:** `ProductsSection` receives `featured` prop (`featured={true}` in `page.tsx`), but the prop is accepted in the interface and declared, then **completely ignored** — the component always renders `featuredProducts` regardless.

```tsx
// ProductsSection.tsx line 133:
export function ProductsSection({ featured = false }: ProductsSectionProps) {
  // `featured` prop is accepted but never referenced in the body
  const localizedFeatured = featuredProducts.map(p => getLocalizedProduct(p, locale));
```

This is dead logic / dead prop.

#### b) Images & Media

No `<Image>` components in `ProductsSection`. The product card uses a solid-color `div` with a watermark `B` character and a category label instead of product images. All product images defined in `data/products.ts` (e.g. `'/assets/Skin Booster.png'`) are referenced in the data layer but **never rendered on the Home page product cards**.

> ⚠️ **Design Gap:** The product cards on the Home page use color identity bands (background color from `product.color.primary`) with a large "B" watermark instead of the actual product images. Whether this is intentional design or an omission is unclear — but the images exist in `/public/assets/` and are not used in the home featured cards.

#### c) Animation

| Element | Trigger | Duration | Easing | Custom |
|---|---|---|---|---|
| Section header (container) | `whileInView` (`once: true`) | stagger | — | — |
| Eyebrow, h2, sub-text | `fadeUp` variants | 0.8s | `[0.25,0.46,0.45,0.94]` | — |
| Desktop card grid (container) | `whileInView` (`once: true`, `margin: "-8%"`) | stagger | — | — |
| Each `ProductCard3D` | `cardReveal` variant | 0.9s | `[0.25,0.46,0.45,0.94]` | index `custom` prop |
| `BorderBeam` on card | On hover (`opacity-0 → opacity-100`) | CSS 700ms | default | — |
| 3D card tilt | On mouse move / leave | CSS 200ms | linear | — |
| "View all" link | `whileInView` (`once: true`) | 0.6s | default | 0.4s delay |

**`cardReveal` variant** uses `custom={index}` but the variant definition in `lib/animations.ts` does **not use the `custom` prop** — there is no `(custom) =>` function syntax in the variant. The `custom` prop is passed but has no effect. This means all three cards animate identically with no stagger differentiation from `cardReveal`'s definition.

```ts
// lib/animations.ts line 22-30:
export const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 60, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};
// No (custom) => {} function — the staggerChildren on the parent handles ordering
```

The stagger IS achieved via `staggerContainer` on the parent (0.12s between children), so it works in practice. The `custom` prop is just superfluous.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Eyebrow | `font-body` | default | `text-[10px]` |
| `h2` headline | `font-display` + cormorant style | default | `text-fluid-3xl` (`clamp(2.5rem,7vw,4.5rem)`) |
| Sub | `font-body` | default | `text-[13px]` |
| Card `h3` name | `font-display` + cormorant style | default | `text-[1.6rem]` |
| Card subtitle | `font-body` | default | `text-[12px]` |
| Card description | `font-body` | default | `text-[13px]` |
| Card benefits | `font-body` | default | `text-[12px]` |
| Card volume | `font-body` | default | `text-[11px]` |
| Card "Learn more" | `font-body` | `font-medium` | `text-[11px]` |
| Category label | `font-body` | default | `text-[9px]` |

**RTL font:** `globals.css` overrides `font-display` to Markazi Text in RTL. ✅

**Heading hierarchy issue:** Cards use `<h3>` for product names. The section's own header uses `<h2>`. Given there is no `<h1>` on the page at all (see HeroSection findings), the hierarchy is broken site-wide.

#### e) Spacing & Layout

- Section: `py-[clamp(5rem,10vw,9rem)]` — matches `section` Tailwind token
- Content: `mx-auto max-w-7xl px-6 lg:px-8`
- Card grid: `gap-6`, `md:grid-cols-2 lg:grid-cols-3`
- Card header below grid: `mt-14 flex justify-center`
- Mobile scroll: `gap-4 pb-5`, each card `w-[78vw]`
- Color band area: `h-56`
- Card content: `p-6`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Background | `bg-white` | Tailwind ✅ |
| Card border | `border-bella-gold/12` | Token ✅ |
| Card hover border | `hover:border-bella-gold/25` | Token ✅ |
| Card shadow hover | `rgba(201,169,110,0.1)` | ⚠️ **Hardcoded** raw rgba in `shadow-[...]` |
| Card focus ring | `focus:ring-bella-gold` | Token ✅ |
| `BorderBeam` colorFrom | `#C9A96E` | ⚠️ **Hardcoded** — prop on component |
| `BorderBeam` colorTo | `rgba(201,169,110,0)` | ⚠️ **Hardcoded** raw rgba prop |
| Category band bg | `product.color.primary` | From data — OK (product-specific) |
| Watermark `B` | `product.color.text` | From data — OK |
| Category label | `opacity-40` on `product.color.text` | From data — OK |
| `h3` name | `text-bella-charcoal` | Token ✅ |
| Subtitle, desc | `text-bella-stone` | Token ✅ |
| Benefits dash | `bg-bella-gold/60` | Token ✅ |
| Volume | `text-bella-stone/50` | Token ✅ |
| "Learn more" | `text-bella-gold` | Token ✅ |
| "View all" | `text-bella-charcoal/50` | Token ✅ |
| "View all" hover | `hover:text-bella-gold` | Token ✅ |

> ⚠️ **Contrast flag:** `text-bella-gold` on `bg-white` — contrast ≈ **2.4:1**. Fails WCAG AA for text. Used on "Learn more" and eyebrow labels.

#### g) RTL-Specific Behavior

- Grid layout: CSS grid, columns flip naturally with RTL ✅
- `→` arrow in "Learn more" links (line 118) is not flipped in RTL ⚠️
- `→` arrow in "View all" (line 222) is not flipped in RTL ⚠️
- Mobile horizontal scroll: `scroll-snap-type: x mandatory` — may feel unnatural in RTL where natural scroll direction is reversed. No `dir` attribute override present.
- `featured` prop: dead code (see §a above)

---

### Section 5 — VelocityBanner

#### a) Content & Copy

**English strings** (source: `messages/en.json` → `home.velocity.words`):
`["PURITY", "PRECISION", "SCIENCE", "LUXURY", "BELLA", "RENEWAL", "RADIANCE", "TRANSFORM"]`

**Arabic strings** (source: `messages/ar.json` → `home.velocity.words`):
`["النقاء", "الدقة", "العلم", "الفخامة", "بيلا", "التجديد", "الإشراق", "التحول"]`

All 8 words translated. ✅  
The component reads up to 8 words via a for loop (lines 30–36 in `VelocityBanner.tsx`).

No hardcoded strings in the component itself. ✅

#### b) Images & Media

None.

#### c) Animation

The `ScrollVelocityContainer` + `ScrollVelocityRow` system:
- Row 1: `baseVelocity={3}`, `direction={isRTL ? -1 : 1}` — scrolls right in LTR, left in RTL ✅
- Row 2: `baseVelocity={3}`, `direction={isRTL ? 1 : -1}` — counter-direction ✅
- Speed modulated by scroll velocity (spring-damped)
- `IntersectionObserver` gates animation when off-screen ✅ (inside `scroll-based-velocity.tsx` line 125)
- `prefersReducedMotion` checked via `window.matchMedia` in `ScrollVelocityRowImpl` (line 135–137) ✅ — when true, `speedMultiplier` stays at 1 but animation still runs slowly
  - ⚠️ **Partial fix:** `prefers-reduced-motion` slows the animation but does not stop it. A true reduced-motion implementation would pause entirely.
- Page visibility API guards animation when tab is hidden ✅

RTL direction handling: ✅ explicit direction inversion per locale.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Row 1 words | `font-display` (Cormorant) | `font-light` | `text-2xl` (24px) |
| Row 2 words | `font-display` (Cormorant) | `font-light` | `text-xl` (20px) |

`uppercase` applied; tracking `tracking-[0.5em]`. In RTL, global CSS suppresses letter-spacing ✅.

#### e) Spacing & Layout

- Wrapper: `py-5` (20px), `border-y border-bella-gold/8`, `bg-white`
- Word separators: `mx-3` on both word and `·` spans (effectively double-spacing)
- The separator `·` logic: `{i < words.length - 1 && <span>·</span>}` — only renders between items, not after last ✅

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Background | `bg-white` | Tailwind ✅ |
| Border | `border-bella-gold/8` | Token ✅ |
| Row 1 text | `text-bella-charcoal/15` | Token ✅ |
| Row 2 text | `text-bella-gold/20` | Token ✅ |

Clean section — no hardcoded colors. ✅

#### g) RTL-Specific Behavior

Direction handling is explicitly correct. ✅ Arabic words display RTL text naturally. No numbers or arrows to worry about.

---

### Section 6 — IngredientsSection

#### a) Content & Copy

**Section header strings** (source: `messages/en.json` → `home.ingredients`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"The Science"` | `"العلم"` |
| `headline` | `"Inside every vial."` | `"في كل أمبولة."` |
| `sub` | `"Each formula is built around ingredients with decades of peer-reviewed research. Nothing by chance. Everything by design."` | `"بُنيت كل تركيبة حول مكونات تدعمها عقود من الأبحاث المحكّمة. لا شيء بالمصادفة. كل شيء بالتصميم."` |
| `concentration` | `"Concentration"` | `"التركيز"` |
| `cta` | `"Explore the Science"` | `"استكشف العلم"` |

All strings translated. ✅

**Featured ingredients** (from `data/ingredients.ts` → `featuredIngredientIds`): `hyaluronic-acid`, `glutathione`, `bioactive-peptides` — 3 cards rendered.

Per ingredient, the following fields are localized via `ing.name[locale]`, `ing.description[locale]`, `ing.concentration[locale]`, `ing.scienceNote[locale]`, `ing.benefit[locale]`. All are present in both EN and AR in the data. ✅

`ing.latinName` is always displayed in Latin script (e.g., `"Sodium Hyaluronate"`, `"γ-Glutamyl-cysteinyl-glycine"`, `"Multi-peptide complex"`) — this is intentional as Latin scientific names are universal.

**Hardcoded strings:**
- **Line 95:** `{ing.category.replace(/-/g, " ")}` — category labels are rendered from the data file as English strings (`"acid"`, `"peptide"`) with hyphens replaced. These are **not localized**. Arabic users see English category names in the category pills. ⚠️
- **Line 150:** `→` — CTA arrow not flipped for RTL ⚠️ (though `rtl:group-hover:-translate-x-1.5` is applied for hover animation, the `→` character itself remains)

**`CATEGORY_PILLS` map** (lines 12–20): hardcoded in component — this is local styling data, not copy, so acceptable.

#### b) Images & Media

No `<Image>` components.

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| LampContainer conic gradients (2) | `whileInView` | 0.8s | `easeInOut` (delay 0.3s) |
| LampContainer glow / line | `whileInView` | 0.8s | `easeInOut` (delay 0.3s) |
| Header content block | `whileInView` (`once: true`) | 0.9s | `[0.25,0.46,0.45,0.94]` |
| Card grid (container) | `whileInView` (`once: true`, `margin: "-8%"`) | stagger | — |
| Each ingredient card | `cardReveal` variant | 0.9s | `[0.25,0.46,0.45,0.94]` |
| CTA link | `whileInView` (`once: true`) | 0.6s | default (delay 0.5s) |

**`LampContainer` concern:** The lamp effect uses `whileInView` which re-fires each time the component enters the viewport in theory (though `once` is not set in `lamp.tsx` itself — only on the content wrapper). However, since the section is lazy-loaded via `next/dynamic`, this is less of a concern for initial page load.

**`prefers-reduced-motion`:** Only covered by global CSS rule.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Eyebrow | `font-body` | default | `text-[10px]` |
| `h2` headline | `font-display` + cormorant style | default | `text-fluid-3xl` |
| Sub | `font-body` | default | `text-[13px]` |
| Latin name | `font-body` | default | `text-[9px]` |
| Card `h3` name | `font-display` + cormorant style | default | `text-[1.5rem]` |
| Category pill | `font-body` | default | `text-[9px]` |
| Description | `font-body` | default | `text-[13px]` |
| Concentration label | `font-body` | default | `text-[9px]` |
| Concentration value | `font-body` | `font-medium` | `text-[12px]` |
| Science note | `font-display` + cormorant style | italic | `text-[13px]` |
| Benefit | `font-body` | default | `text-[11px]` |

#### e) Spacing & Layout

- Section: no padding on outer element — padding is split: `LampContainer className="pb-8 pt-24"` for header, `pb-28 pt-4` for card grid
- Card grid: `gap-5`, `md:grid-cols-2 lg:grid-cols-3`
- Cards: `p-7`
- CTA: `mt-16 flex justify-center`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `#171715` | ⚠️ **Hardcoded** — close to but not equal to `#1A1A17` (dark surface token) |
| Lamp conic gradient from | `#C9A96E` | ⚠️ **Hardcoded** hex in className |
| Lamp glow orb | `#C9A96E` | ⚠️ **Hardcoded** hex |
| Card bg | `bg-[#1f1f1c]` | ⚠️ **Hardcoded** hex |
| Card border | `border-bella-gold/12` | Token ✅ |
| Card hover border | `hover:border-bella-gold/25` | Token ✅ |
| CardSpotlight color | `rgba(201,169,110,0.06)` | ⚠️ **Hardcoded** raw rgba prop |
| Latin name text | `text-bella-gold/40` | Token ✅ |
| h3 name text | `text-white` | Tailwind ✅ |
| Category pill colors | Various Tailwind `sky/violet/amber/etc` | Standard Tailwind ✅ |
| Description | `text-white/45` | Tailwind ✅ |
| Concentration bg | `bg-white/[0.03]` | Tailwind ✅ |
| Concentration label | `text-bella-gold/40` | Token ✅ |
| Concentration value | `text-bella-gold/80` | Token ✅ |
| Science note border | `border-white/5` | Tailwind ✅ |
| Science note text | `text-white/25` | Tailwind ✅ |
| Benefit dash | `bg-bella-gold/30` | Token ✅ |
| Benefit text | `text-bella-gold/60` | Token ✅ |

> ⚠️ **Three different dark backgrounds in adjacent sections:** IngredientsSection `#171715` vs BenefitsSection `#111110` vs TestimonialsSection `#1A1A17`. None match the Tailwind `color-surface` dark token (`#1A1A17`). This creates subtle but inconsistent dark backgrounds across the page.

#### g) RTL-Specific Behavior

- `ing.concentration[locale]` value is wrapped in `dir="ltr"` on line 108 ✅ — numerical concentrations stay LTR
- `→` arrow on CTA: `rtl:group-hover:-translate-x-1.5` applied for hover direction, but the character itself is `→` (not flipped) ⚠️
- Category labels are English regardless of locale ⚠️

---

### Section 7 — BenefitsSection

#### a) Content & Copy

Stat values are **hardcoded** in the component (line 8): `const STAT_VALUES = [98, 12, 48, 0];`

Suffixes and labels come from `messages/*.json` → `home.benefits.stats[]`:

| Index | EN suffix | EN label | AR suffix | AR label |
|---|---|---|---|---|
| 0 | `"%"` | `"Client satisfaction"` | `"%"` | `"رضا العملاء"` |
| 1 | `"+"` | `"Active ingredients"` | `"+"` | `"مكونات فعّالة"` |
| 2 | `"h"` | `"Hydration boost"` | `"س"` | `"تعزيز الترطيب"` |
| 3 | `""` | `"Harmful additives"` | `""` | `"إضافات ضارة"` |

> ✅ The Arabic `"س"` suffix (abbreviation for ساعة = hour) is a correct localization of the English `"h"` suffix.

Benefit cards (source: `messages/*.json` → `home.benefits.cards[]`):

| # | EN numeral | EN title | EN desc | AR title |
|---|---|---|---|---|
| 0 | `"I"` | `"Clinical Precision"` | `"Every formula meets pharmaceutical-grade..."` | `"الدقة السريرية"` |
| 1 | `"II"` | `"Pure Actives"` | `"No fillers. No parabens..."` | `"مواد فعّالة نقية"` |
| 2 | `"III"` | `"Visible Results"` | `"We measure success in hydration depth..."` | `"نتائج مرئية"` |

All fully translated. ✅

**Hardcoded strings:**
- **Line 8:** `const STAT_VALUES = [98, 12, 48, 0]` — stat numeric values are hardcoded in the component. They also exist in `data/brand.ts` (`brand.stats[]`), but the component does **not import `brand.ts`** — it defines the values locally. This is a data duplication / drift risk.

> ⚠️ **Data inconsistency:** `data/brand.ts` defines `brand.stats[1].value` as `"12+"` (with plus sign), while `BenefitsSection` hardcodes `12` as a number and gets the `"+"` suffix from i18n. Both paths produce the same visual result, but the data lives in two places.

#### b) Images & Media

None.

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| Stats grid (container) | `whileInView` (`once: true`) | stagger | — |
| Each stat div | `fadeUp` variant | 0.8s | `[0.25,0.46,0.45,0.94]` |
| `NumberTicker` | `useInView` (on mount of span, `once: true`) | spring (`damping:60, stiffness:100`) | delay per index (0.3 + i×0.15s) |
| Benefits cards (container) | `whileInView` (`once: true`) | stagger | — |
| Each benefit card | `cardReveal` variant | 0.9s | `[0.25,0.46,0.45,0.94]` |

`NumberTicker` uses `useInView` from `motion/react` with `{ once: true, margin: "0px" }` — fires when span enters viewport with 0px margin. This is quite tight and might trigger early/late depending on viewport size. No `margin` slack.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Stat number | `font-display` + cormorant style | `font-light` | `text-5xl` (48px) / `lg:text-6xl` (60px) |
| Stat suffix | `font-display` + cormorant style | default | `text-3xl` (30px) |
| Stat label | `font-body` | default | `text-[10px]` |
| Benefit numeral | `font-accent` (Italiana) via `style` | default | `text-5xl` (48px) |
| Benefit `h3` title | `font-display` + cormorant style | default | `text-2xl` (24px) |
| Benefit description | `font-body` | default | `text-[13px]` |

#### e) Spacing & Layout

- Section: `py-[clamp(5rem,10vw,9rem)]`
- Stats grid: `mb-24 grid-cols-2 md:grid-cols-4`, `gap-[1px]` (grid lines achieved via gap + background color)
- Each stat cell: `px-6 py-10`
- Benefit cards: `gap-10 md:grid-cols-3`
- Each card: `border-t pt-8`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `#111110` | ⚠️ **Hardcoded** |
| Stats grid gap | `bg-bella-gold/8` | Token ✅ |
| Stats grid border | `border border-bella-gold/8` | Token ✅ |
| Each stat cell bg | `bg-[#111110]` | ⚠️ **Hardcoded** |
| Stat number text | `text-white` | Tailwind ✅ |
| Stat suffix text | `text-bella-gold` | Token ✅ |
| Stat label | `text-white/25` | Tailwind ✅ |
| Benefit numeral | `text-bella-gold/20` | Token ✅ |
| Benefit h3 | `text-white` | Tailwind ✅ |
| Benefit desc | `text-white/35` | Tailwind ✅ |
| Benefit card border | `border-bella-gold/20` | Token ✅ |

#### g) RTL-Specific Behavior

- Stat values wrapped in `dir="ltr"` (line 48) ✅
- Benefit card `border-t` with `pt-8` — in RTL, `border-t` stays top which is correct ✅
- Roman numerals (`I`, `II`, `III`) display identically in both locales — appropriate since these are decorative ✅

---

### Section 8 — HowItWorksSection

#### a) Content & Copy

**Strings** (source: `messages/*.json` → `home.howItWorks`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"The Ritual"` | `"الطقوس"` |
| `headline` | `"How it works."` | `"كيف يعمل."` |

Steps (4 items):

| # | EN number | EN title | EN duration | AR number | AR title | AR duration |
|---|---|---|---|---|---|---|
| 0 | `"01"` | `"Consultation"` | `"30 min"` | `"01"` | `"الاستشارة"` | `"٣٠ دقيقة"` |
| 1 | `"02"` | `"Protocol Design"` | `"15 min"` | `"02"` | `"تصميم البروتوكول"` | `"١٥ دقيقة"` |
| 2 | `"03"` | `"Treatment Session"` | `"45–60 min"` | `"03"` | `"جلسة العلاج"` | `"٤٥–٦٠ دقيقة"` |
| 3 | `"04"` | `"Skin Transformation"` | `"2–4 weeks"` | `"04"` | `"تحول البشرة"` | `"٢–٤ أسابيع"` |

All fully translated. Arabic duration strings use Arabic-Indic numerals and Arabic words. ✅

`step.number` (`"01"–"04"`) is shared between EN and AR — rendered with `dir="ltr"` wrapper on lines 83, 87 ✅.

#### b) Images & Media

None.

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| Section header (container) | `whileInView` (`once: true`) | stagger | — |
| Header eyebrow, h2 | `fadeUp` variants | 0.8s | `[0.25,0.46,0.45,0.94]` |
| Each step div | `whileInView` (`once: true`, `margin: "-5%"`) | 0.7s | `[0.25,0.46,0.45,0.94]` |
| TracingBeam SVG line | Scroll-based `useScrollYProgress` | spring (`stiffness:500, damping:90`) | — |
| TracingBeam dot glow | `animate: boxShadow` (on mount) | 0.2s (delay 0.5s) | default |

Step delays: `delay: i * 0.1` — staggered 0, 0.1, 0.2, 0.3s.

**TracingBeam:** Uses `useScroll` with `target: ref, offset: ["start start", "end start"]`. The line animates as the section scrolls through the viewport. This is scroll-synced, not a simple `whileInView` — it runs continuously while scrolled. ✅ performance (tied to scroll, not a continuous rAF loop).

The `tracing-beam-line` CSS class in `globals.css` is defined for RTL flipping (lines 166–171), but looking at `tracing-beam.tsx`, the beam uses `className="absolute -left-4 top-3 md:-left-20"` — this fixed left positioning does not reference `tracing-beam-line`. The CSS RTL rule likely has **no effect** because the actual class used is not `tracing-beam-line`. ⚠️

Furthermore, the TracingBeam RTL attempt in `HowItWorksSection.tsx` line 52:
```tsx
<TracingBeam className={`px-0 ${isRTL ? "[&>.absolute]:-right-20 [&>.absolute]:left-auto" : ""}`}>
```
This tries to use Tailwind's `[&>selector]` arbitrary group selector to override child positioning, but `&>.absolute` is not a valid child selector in Tailwind's arbitrary syntax (it would need the actual class name). This RTL fix is likely **non-functional**.

#### d) Typography

| Element | Font | Weight | Size | Breakpoints |
|---|---|---|---|---|
| Eyebrow | `font-body` | default | `text-[10px]` | Same |
| `h2` headline | `font-display` + cormorant | default | `text-fluid-3xl` | Fluid |
| Step number (visible) | `font-body` | `font-medium` | `text-[10px]` | Same |
| Duration pill | `font-body` | default | `text-[9px]` | Same |
| Step `h3` title | `font-display` + cormorant | default | `text-2xl` / `md:text-[1.7rem]` | Two breakpoints |
| Step description | `font-body` | default | `text-[13px]` | Same |
| Watermark number | Italiana via `style` | default | `text-[5rem]` | Same |

#### e) Spacing & Layout

- Section: `py-[clamp(5rem,10vw,9rem)]`
- Content: `mx-auto max-w-7xl px-6 lg:px-8`
- Header: `mb-16 max-w-lg`
- TracingBeam: `px-0`
- Each step: `py-12`, `gap-8`, `grid-cols-[auto_1fr] md:grid-cols-[8rem_1fr]`
- Step border-bottom: `border-b border-bella-gold/10` (except last)

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `bg-[#FAF8F5]` | ⚠️ **Hardcoded** — matches `bella-ivory` |
| Eyebrow text | `text-bella-gold` | Token ✅ |
| h2 text | `text-bella-charcoal` | Token ✅ |
| Step number text | `text-bella-gold` | Token ✅ |
| Duration pill border | `border-bella-gold/20` | Token ✅ |
| Duration text | `text-bella-gold/50` | Token ✅ |
| h3 title text | `text-bella-charcoal` | Token ✅ |
| Step desc text | `text-bella-stone` | Token ✅ |
| Step separator | `border-bella-gold/10` | Token ✅ |
| TracingBeam dot border | `rgba(201,169,110,0.3)` | ⚠️ **Hardcoded** in component |
| TracingBeam inner dot | `bg-[#C9A96E]` | ⚠️ **Hardcoded** in component |
| TracingBeam beam stroke | `rgba(201,169,110,0.12)` | ⚠️ **Hardcoded** in component |
| TracingBeam gradient | `#C9A96E`, `rgba(201,169,110,0.5)` | ⚠️ **Hardcoded** in component |

#### g) RTL-Specific Behavior

- TracingBeam RTL repositioning: attempted but likely non-functional (see §c above) ⚠️
- In RTL, the TracingBeam will still appear on the **left** side, while Arabic reading flow would expect it on the **right** ⚠️
- Step number watermarks: `isRTL ? "right-0" : "left-0"` positioning ✅
- `dir="ltr"` on step numbers and durations ✅

---

### Section 9 — TestimonialsSection

#### a) Content & Copy

**Section header** (source: `messages/*.json` → `home.testimonials`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"Trusted by Professionals"` | `"ثقة المختصين"` |
| `headline` | `"Voices of transformation."` | `"أصوات التحول."` |

**Testimonial data** (source: `data/testimonials.ts`):

The `testimonials` array is **not localized** — all fields (`name`, `role`, `location`, `text`) are English-only strings. The `Testimonial` interface has no `LocalizedString` type, just `string`. All 6 testimonials display English text in both EN and AR locales.

> ⚠️ **Missing Arabic translations:** All 6 testimonial testimonies, names, roles, and locations are English-only. Arabic users see English testimonials. This is the largest translation gap on the Home page.

The component passes testimonials to `InfiniteMovingCards` as:
```tsx
const toCard = (testimonial) => ({
  quote: testimonial.text,    // English only
  name: testimonial.name,     // English only
  title: `${testimonial.role} · ${testimonial.location}`, // English only
});
```

Row 1: testimonials[0..2] = Nour Al-Rashidi, Layla Mansour, Sara El-Masry  
Row 2: testimonials[3..5] = Mariam Khalil, Dr. Hana Farouk, Yasmine Abo El Naga

#### b) Images & Media

No `<Image>` components. Cards show stars and text only — no avatar photos.

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| Eyebrow text | `whileInView` (`once: true`) | 0.6s | default |
| `BlurText` headline | On scroll into view (word-by-word) | internal (100ms delay) | internal |
| Row 1 cards | CSS `animate-scroll` (continuous marquee) | 80s per loop (`speed="slow"`) | linear |
| Row 2 cards | CSS `animate-scroll` (continuous) | 80s per loop | linear |

**Direction:** Row 1 `direction={isRTL ? "right" : "left"}`, Row 2 opposite ✅  

**`prefers-reduced-motion`:** The `InfiniteMovingCards` adds `motion-reduce:[animation-play-state:paused]` to the scroller `ul` (line 66 of `infinite-moving-cards.tsx`). ✅ — this correctly pauses the CSS animation.

`pauseOnHover={true}` — hover pauses via `hover:[animation-play-state:paused]` ✅

**Off-screen animation:** The CSS `animate-scroll` runs continuously. There is **no IntersectionObserver** in `InfiniteMovingCards` — the animation runs even when off-screen. ⚠️ Performance concern.

#### d) Typography

**In `InfiniteMovingCards`:**

| Element | Font | Weight | Size |
|---|---|---|---|
| Quote text | `var(--font-cormorant)` via `style` | `font-normal`, italic | `text-sm` (14px) |
| Name | `text-sm font-medium` | medium | 14px |
| Title (role · location) | `text-[11px] font-normal` | normal | 11px |
| Star icons | `text-xs` | — | 12px |

**In section header:**

| Element | Font | Size |
|---|---|---|
| Eyebrow | `font-body` | `text-[10px]` |
| `BlurText` headline | `font-display` + cormorant style | `text-fluid-3xl` |

#### e) Spacing & Layout

- Section: `py-[clamp(5rem,10vw,9rem)]`
- Header: `mx-auto mb-16 max-w-7xl px-6 text-center`
- Card rows: `space-y-4` between the two rows
- Each card: `w-[350px] md:w-[450px]`, `px-8 py-6`, `rounded-2xl`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `#1A1A17` | ⚠️ **Hardcoded** — matches dark surface token value |
| Header eyebrow | `text-bella-gold/50` | Token ✅ |
| BlurText headline | `text-white` | Tailwind ✅ |
| Card bg | `#222220` | ⚠️ **Hardcoded** raw hex inline style |
| Card border | `rgba(201,169,110,0.15)` | ⚠️ **Hardcoded** raw rgba inline style |
| Stars | `text-[#C9A96E]` | ⚠️ **Hardcoded** hex in Aceternity component |
| Quote text | `rgba(255,255,255,0.65)` | ⚠️ **Hardcoded** raw rgba inline style |
| Name | `rgba(255,255,255,0.9)` | ⚠️ **Hardcoded** raw rgba inline style |
| Title | `rgba(201,169,110,0.6)` | ⚠️ **Hardcoded** raw rgba inline style |

#### g) RTL-Specific Behavior

- Scroll direction reversed per locale ✅
- English-only testimonials in Arabic locale ⚠️ (content gap, not a layout issue)
- Cards are LTR-laid-out (fixed widths, horizontal marquee). Arabic text would naturally be RTL but since all content is English, this is moot.

---

### Section 10 — FAQSection

#### a) Content & Copy

**Strings** (source: `messages/*.json` → `home.faq`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"Questions"` | `"أسئلة"` |
| `headline` | `"Everything you need to know."` | `"كل ما تحتاجين معرفته."` |

5 FAQ items (EN and AR fully present). ✅

**EN questions:** What is mesotherapy? | Is mesotherapy painful? | How many sessions do I need? | How soon will I see results? | Are Bella formulas safe?  
**AR questions:** ما هو الميزوثيرابي؟ | هل الميزوثيرابي مؤلم؟ | كم عدد الجلسات التي أحتاجها؟ | متى سأرى النتائج؟ | هل تركيبات بيلا آمنة؟

All items fully translated. ✅

**Hardcoded strings:**
- **Line 29:** `+` — the accordion toggle icon (rotates 45°) is a hardcoded `+` character. In RTL, `+` is direction-neutral ✅.

**Gender note:** AR headline uses feminine form `"تحتاجين"` (you-need, feminine) — this may be unintentionally gendered depending on brand target audience. The EN version is gender-neutral. ⚠️ (Open question for brand)

#### b) Images & Media

None.

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| FAQ container | `whileInView` (`once: true`) | stagger | — |
| Eyebrow, h2 | `fadeUp` variants | 0.8s | `[0.25,0.46,0.45,0.94]` |
| `+` icon rotation | State change (`open`) | 0.3s | default |
| Answer panel expand | `AnimatePresence`, `height: 0→auto` | 0.4s | `[0.25,0.46,0.45,0.94]` |
| Answer panel collapse | exit `height: auto→0` | 0.4s | same |

`AnimatePresence initial={false}` — no animation on initial render ✅  
The accordion toggle (`motion.span rotate`) does not check `prefers-reduced-motion` — relies on global CSS rule.

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Eyebrow | `font-body` | default | `text-[10px]` |
| `h2` headline | `font-display` + cormorant | default | `text-fluid-3xl` |
| Question text | `font-display` + cormorant | default | `text-lg` (18px) |
| Answer text | `font-body` | default | `text-[13px]` |
| Toggle `+` icon | default | default | `text-xl` (20px) |

#### e) Spacing & Layout

- Section: `py-[clamp(5rem,10vw,9rem)]`
- Content: `mx-auto max-w-3xl px-6 lg:px-8` — notably narrower than other sections (3xl vs 7xl)
- `h2` margin: `mb-14`
- Each FAQ item: `py-6`, `border-b border-bella-gold/10`
- Answer: `pb-6`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `bg-[#FAF8F5]` | ⚠️ **Hardcoded** — matches `bella-ivory` |
| Eyebrow | `text-bella-gold` | Token ✅ |
| h2 headline | `text-bella-charcoal` | Token ✅ |
| Question text | `text-bella-charcoal dark:text-white` | Token ✅ |
| Toggle `+` | `text-bella-gold` | Token ✅ |
| Answer text | `text-bella-stone` | Token ✅ |
| Separator | `border-bella-gold/10` | Token ✅ |

FAQSection has solid token usage. ✅

> ⚠️ **Contrast flag (minor):** Question text `text-bella-charcoal` (`#1A1A1A`) on `#FAF8F5` background — contrast ≈ **17:1**. ✅ Passes WCAG AAA.

#### g) RTL-Specific Behavior

- `aria-expanded` is properly set on button ✅
- `text-left` on button — in RTL, this aligns to the left which is opposite of the natural RTL reading direction. Should be `text-start` for logical properties. ⚠️
- The `justify-between` layout of question + toggle should flip correctly in RTL (flex reverses) ✅
- `+` icon at flex-end: in RTL this moves to the left side, which is unusual (typically accordion toggles are on the right in LTR, left in RTL) — actually acceptable since flex reversal puts it on the correct side.

---

### Section 11 — CTASection

#### a) Content & Copy

**Strings** (source: `messages/*.json` → `home.cta`):

| Key | EN Value | AR Value |
|---|---|---|
| `eyebrow` | `"Begin Your Ritual"` | `"ابدئي طقوسك"` |
| `headline` | `"Ready to transform\nyour skin?"` | `"مستعدة لتحويل\nبشرتك؟"` |
| `sub` | `"Discover the Bella collection and begin your ritual."` | `"اكتشفي مجموعة بيلا وابدئي طقوسك."` |
| `primary` | `"Shop Now"` | `"تسوقي الآن"` |
| `secondary` | `"Learn Our Story"` | `"اعرفي قصتنا"` |
| `philosophy` | `"Purity · Precision · Transformation"` | `"النقاء · الدقة · التحول"` |

All strings fully translated. ✅

**Gendered Arabic:** `eyebrow` (`"ابدئي"`), `headline` (`"مستعدة"`), `sub` (`"اكتشفي"`), `primary` (`"تسوقي"`), `secondary` (`"اعرفي"`) — all use feminine imperative form. Same gender concern as FAQSection.

**Hardcoded strings:**  
Primary CTA link target uses `SHOP_URL` from `lib/constants.ts` = `"https://shop.bella-meso.com"` — imported constant, not hardcoded ✅

Concentric circles SVG: decorative only, no text. ✅

#### b) Images & Media

No images. `og-image.jpg` referenced in layout metadata — **this file does not exist** in `/public/`. Referenced at `images: [{ url: "/og-image.jpg" }]` in `layout.tsx` line 40. This is a broken OG/Twitter card image reference. ⚠️

#### c) Animation

| Element | Trigger | Duration | Easing |
|---|---|---|---|
| LampContainer gradients | `whileInView` | 0.8s | `easeInOut` (delay 0.3s) |
| Content container | `whileInView` (`once: true`) | stagger | — |
| Eyebrow | `fadeUp` variant | 0.8s | `[0.25,0.46,0.45,0.94]` |
| h2 headline | `fadeUp` variant | 0.8s | same |
| Sub text | `fadeUp` variant | 0.8s | same |
| CTAs | `fadeUp` variant | 0.8s | same |
| Philosophy text | `fadeUp` variant | 0.8s | same |

#### d) Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Eyebrow | `font-body` | default | `text-[10px]` |
| `h2` headline | `font-display` + cormorant | default | `text-fluid-3xl` |
| Sub | `font-body` | default | `text-[13px]` |
| Primary CTA | `font-body` | `font-medium` | `text-[13px]` |
| Secondary CTA | `font-body` | default | `text-[13px]` |
| Philosophy | `font-body` | default | `text-[10px]` |

#### e) Spacing & Layout

- Section: no `py-` — padding comes from `LampContainer className="py-32"` (128px top/bottom)
- Content: `flex flex-col items-center px-6 text-center`
- h2 margin: `mb-5 max-w-2xl`
- Sub margin: `mb-12 max-w-sm`
- CTAs gap: `gap-4 flex-wrap`
- Philosophy: `mt-16`

#### f) Color Usage

| Usage | Value | Source |
|---|---|---|
| Section bg | `#0A0A08` | ⚠️ **Hardcoded** — same as Hero background |
| Circles SVG stroke | `#C9A96E` | ⚠️ **Hardcoded** hex |
| Lamp gradient from | `#C9A96E` | ⚠️ **Hardcoded** in `lamp.tsx` |
| Lamp glow | `#C9A96E` | ⚠️ **Hardcoded** in `lamp.tsx` |
| Eyebrow text | `text-bella-gold/50` | Token ✅ |
| h2 text | `text-white` | Tailwind ✅ |
| Sub text | `text-white/35` | Tailwind ✅ |
| ShimmerButton border | `rgba(201,169,110,0.45)` | ⚠️ **Hardcoded** raw rgba |
| ShimmerButton text | `text-[#C9A96E]` | ⚠️ **Hardcoded** hex |
| Secondary CTA border | `border-white/12` | Tailwind ✅ |
| Secondary CTA text | `text-white/35` | Tailwind ✅ |
| Philosophy | `text-white/15` | Tailwind ✅ |

#### g) RTL-Specific Behavior

- Center-aligned text and flex layout — RTL works naturally ✅
- `<a className="contents">` wrapping `ShimmerButton` — `display: contents` removes box from layout, allowing natural RTL ✅
- Secondary CTA `Link href="/about"` — no directional issues ✅
- Arabic strings use feminine form (see content note above)

---

## 3. Site-Wide Cross-Cutting Findings

---

### Vertical Rhythm Table

Section-to-section vertical spacing — measured as padding on the outgoing section's bottom + incoming section's top padding (all py- classes):

| # | Section | Outer `py-` | Approx rendered value |
|---|---|---|---|
| 1 | HeroSection | none (fills 100svh) | full viewport height |
| 2 | TrustBarSection | `py-3` | ~12px |
| 3 | ManifestoSection | `py-[clamp(6rem,12vw,11rem)]` | 96px–176px ⚠️ **larger than others** |
| 4 | ProductsSection | `py-[clamp(5rem,10vw,9rem)]` | 80px–144px |
| 5 | VelocityBanner | `py-5` | ~20px |
| 6 | IngredientsSection | LampContainer `pt-24 pb-8` + cards `pb-28 pt-4` | ~96px + 32px + 112px ≈ 240px total (no outer py) ⚠️ **inconsistent structure** |
| 7 | BenefitsSection | `py-[clamp(5rem,10vw,9rem)]` | 80px–144px |
| 8 | HowItWorksSection | `py-[clamp(5rem,10vw,9rem)]` | 80px–144px |
| 9 | TestimonialsSection | `py-[clamp(5rem,10vw,9rem)]` | 80px–144px |
| 10 | FAQSection | `py-[clamp(5rem,10vw,9rem)]` | 80px–144px |
| 11 | CTASection | LampContainer `py-32` | ~256px ⚠️ |

**Rhythm inconsistencies identified:**
1. **ManifestoSection** uses `clamp(6rem,12vw,11rem)` while most others use `clamp(5rem,10vw,9rem)` — subtle inconsistency at the max end (11rem vs 9rem)
2. **TrustBarSection** (`py-3`) and **VelocityBanner** (`py-5`) break rhythm with their deliberately thin form — intentional separator design ✅
3. **IngredientsSection** uses an unconventional structure — outer section has no py, with LampContainer + card grid each having their own padding. Total visible space is significantly larger than other sections.
4. **CTASection** padding is governed by the LampContainer (`py-32` = 256px) — largest of any section.

---

### Dead Code

| File | Finding |
|---|---|
| `ProductsSection.tsx` line 133 | `featured` prop is accepted but never read. The prop `featured = false` is declared but the body always uses `featuredProducts`. Dead prop. |
| `ProductsSection.tsx` line 28 | `cardReveal` variant passes `custom={index}` to `motion.div` but `cardReveal` in `lib/animations.ts` is not a function variant — `custom` has no effect. Superfluous prop. |
| `HowItWorksSection.tsx` line 52 | `[&>.absolute]:-right-20 [&>.absolute]:left-auto` — this Tailwind arbitrary group selector is not valid for targeting children by class. Dead RTL fix attempt. |
| `data/brand.ts` | `brand.manifesto.headline` and `brand.manifesto.paragraphs[]` duplicate the content from `messages/en.json → home.manifesto`. Both exist but only `messages/` is used by components. The `brand.ts` data is not imported by any home page component. |
| `lib/brand.ts` | This file exists (`sizeBytes: 939`) but was not imported by any home page component examined. Its content and purpose are unknown without reading it, but it may be a secondary brand data file. |
| `SECTION_IDS.gallery` in `lib/constants.ts` | The home page has no GallerySection — `gallery` is listed in `SECTION_IDS` but doesn't appear in `page.tsx`. |
| `clipReveal` in `lib/animations.ts` | Exported but not imported by any home section component. Potentially dead export. |
| `lineDraw` in `lib/animations.ts` | Exported but not imported by any home section component. Potentially dead export. |
| `imageZoom` in `lib/animations.ts` | Exported but not imported by any home section component. Potentially dead export. |

No `console.log` statements found in home page components. No TODO comments found in home page component files.

---

### Performance Flags

**Client Component count:** **All 10 sections + VelocityBanner are Client Components** (`'use client'`). Only `IngredientsSection` is code-split via `next/dynamic`. This means the initial JS bundle for the home page is very large — every section's animation libraries, interaction handlers, and i18n context are bundled together for client hydration.

| Flag | Detail |
|---|---|
| **Heavy libraries in all sections** | Framer Motion (`motion`) is imported in 8 of 10 sections. Since all are Client Components, Framer Motion ships to the client for the entire page on initial load. |
| **`motion/react` vs `framer-motion` import inconsistency** | `HeroSection`, `ManifestoSection`, `ProductsSection`, `FAQSection`, `CTASection` import from `"framer-motion"`. But `scroll-based-velocity.tsx` and `number-ticker.tsx` import from `"motion/react"`. Both are the same library (v11+), but the mixed import paths may prevent bundle deduplication and inflate JS size. |
| **`InfiniteMovingCards` (TestimonialsSection)** | The CSS `animate-scroll` runs continuously with no IntersectionObserver. The two rows animate even when the section is off-screen. This is a battery and compositing concern, especially on mobile. |
| **`TrustBarSection` Marquee** | The `Marquee` component uses pure CSS animation (no JS rAF) — less expensive, but still runs off-screen. |
| **`MorphingText` (HeroSection)** | Uses continuous internal animation cycling through 4 English words. No locale-awareness — likely runs its own rAF or interval. Not gated by viewport. |
| **`SpinningText` (HeroSection)** | Continuous rotation animation. Hidden on mobile, but runs on desktop always. |
| **`Particles` (HeroSection)** | Disabled on mobile via `isMobile` state check ✅. On desktop: 80 particles with canvas rendering. |
| **Layout-shift risk** | All images in `public/assets/` are large PNGs (1–1.5MB each). None appear in the Home page itself (product cards use color divs, not `<Image>`), so no CLS risk from images on the Home page. |
| **Font display strategy** | The `@font-face` declarations and `font-display` settings are not visible in the files read. Fonts are referenced via CSS variables (`--font-cormorant`, `--font-dm-sans`, etc.) but the actual font loading mechanism (next/font, Google Fonts link, or custom @font-face) is unclear from the files examined. If Google Fonts is used via `<link>`, there's a render-blocking risk without `font-display: swap`. |
| **Hydration cost** | All 10 sections hydrate on the client with their full motion context. No sections are deferred beyond IngredientsSection. |
| **`useRouter` import (HeroSection)** | `useRouter` is imported on line 6 from `@/i18n/navigation` but the returned `router` is only used in the `ShimmerButton` `onClick`. This adds the router to the component's hydration cost. |

---

### Accessibility Flags

| Flag | Severity | Detail |
|---|---|---|
| **No `<h1>` on the page** | Critical | `TextHoverEffect` renders "BELLA" as SVG — not a heading. The first `<h2>` appears in ManifestoSection. The page has no H1, violating WCAG 1.3.1 and hurting SEO. |
| **`text-bella-gold` on ivory background** | High | `#C9A96E` on `#FAF8F5` → contrast ratio ≈ 2.7:1. Fails WCAG AA (4.5:1) for normal-size text. Affects: ManifestoSection eyebrow, p3, stats labels (text-bella-stone is better); HeroSection eyebrow pill text; ProductsSection eyebrow; HowItWorksSection eyebrow. |
| **`text-bella-gold` on white background** | High | `#C9A96E` on `#FFFFFF` → contrast ratio ≈ 2.4:1. Affects: ProductsSection "Learn more" links, eyebrow, VelocityBanner bg-white. |
| **`text-white/35` and `text-white/30`** on dark backgrounds | Medium | `rgba(255,255,255,0.35)` on `#111110` → effective contrast ≈ 2.5:1. Fails WCAG AA. Affects: BenefitsSection descriptions. |
| **`text-white/25` labels** | Medium | BenefitsSection stat labels `text-white/25` on `#111110` → ≈ 1.8:1. Fails WCAG AA and AAA. |
| **FAQSection `text-left` not logical** | Low | `text-left` on accordion button — should be `text-start` for RTL logical alignment. |
| **Missing `aria-label` on SpinningText** | Low | The `SpinningText` spinning decoration has no `aria-hidden` — screen readers will attempt to read rotating text characters. |
| **Missing `<h1>` alt for SEO** | Critical | No `<h1>` heading. The page `<title>` is set correctly (`"Bella | Luxury Mesotherapy"`), but there's no visible H1 for heading hierarchy. |
| **`focusable="false"` on SVGs** | ✅ Present | CTA section concentric circles SVG has `focusable="false"` ✅. TracingBeam SVG has `aria-hidden="true" focusable="false"` ✅. |
| **Focus state** | ✅ Good | Global `:focus-visible` is defined in `globals.css` with a gold 2px outline. ✅ `CardBody` also has explicit `focus:ring-2 focus:ring-bella-gold focus:ring-offset-2`. |
| **Skip link** | ✅ Present | `href="#main-content"` skip link in locale layout ✅. |
| **`aria-expanded` on FAQ** | ✅ Present | ✅ |

---

### Data Layer Consistency

| Check | Result |
|---|---|
| Home page imports from `data/*.ts` | ✅ ManifestoSection uses `data/brand.ts`. ProductsSection uses `data/products.ts` via `featuredProducts` + `getLocalizedProduct`. IngredientsSection uses `data/ingredients.ts` via `ingredients` + `featuredIngredientIds`. TestimonialsSection uses `data/testimonials.ts` directly. |
| No local duplicate data in section components | ⚠️ BenefitsSection hardcodes `STAT_VALUES = [98, 12, 48, 0]` locally instead of importing from `data/brand.ts`. |
| `getLocalizedProduct` usage | ✅ ProductsSection correctly uses `getLocalizedProduct(p, locale as Locale)` |
| Featured products on home page | ✅ `featuredProducts` = products where `featured: true` = `bella-skin-booster` (order 1), `bella-yaqoot` (order 2), `bella-amber` (order 3) — matches specification exactly |
| `featuredIngredientIds` | ✅ `['hyaluronic-acid', 'glutathione', 'bioactive-peptides']` — 3 cards shown |
| ManifestoSection data source | ⚠️ ManifestoSection uses `data/brand.ts` for stat *values* only (`brand.stats[0..3].value`), then overlays i18n labels. But `data/brand.ts` also contains `brand.manifesto.headline` and `brand.manifesto.paragraphs[]` which duplicate `messages/en.json → home.manifesto`. These two sources can drift. |
| Testimonials localization | ⚠️ `data/testimonials.ts` has no `LocalizedString` types — all content is English-only. Arabic users see English testimonials. |

---

## 4. Open Questions / Ambiguities

1. **Missing `<h1>`:** The page has no H1 heading — "BELLA" is rendered as SVG only. Is this an intentional design decision (brand logo as the hero identity), or does the team want a visually hidden `<h1>` for SEO/accessibility? A decision is needed before the final pass.

2. **`MorphingText` English words in Arabic:** `texts={["Precision.", "Science.", "Transformation.", "Bella."]}` are hardcoded English strings. The `home.hero.sub` key exists in AR (`"تركيبات دقيقة لتجديد البشرة بشكل ملموس."`) but is not used. Should the morphing text use i18n'd words? Or is English branding intentional even in the Arabic locale?

3. **Product cards — no product images:** The featured product cards on the Home page show color identity bands with a "B" watermark instead of actual product photos (which exist in `/public/assets/`). Is this the intended design, or is it an unimplemented feature?

4. **Testimonials not translated:** The `Testimonial` interface uses plain `string` (not `LocalizedString`). All 6 testimonials are English-only. Is this intentional (testimonials as authentic verbatim quotes in original language), or should Arabic translations be added?

5. **`og-image.jpg` missing:** The OpenGraph and Twitter card metadata in `app/[locale]/layout.tsx` references `/og-image.jpg` which does not exist in `/public/`. This means social sharing previews are broken. Needs to be created or the reference needs updating.

6. **Three distinct dark backgrounds:** HeroSection/CTASection use `#0A0A08`, BenefitsSection uses `#111110`, TestimonialsSection uses `#1A1A17`, IngredientsSection uses `#171715`. Is there a canonical dark background color? Currently `#1A1A17` matches the `.dark` CSS variable `--color-surface`, but the others don't. Should these be unified to a single token?

7. **`SpinningText` RTL position:** Currently `absolute bottom-12 right-8` in both locales. In RTL, should it move to the left side? Or is this intentional (brand decoration, not content)?

8. **Feminine Arabic imperative forms:** CTA section and FAQ headline use feminine Arabic forms (`"ابدئي"`, `"مستعدة"`, `"تحتاجين"`). Is Bella's primary Arabic-market audience female? If so, is this intentional? If not, neutral forms should be used.

9. **TracingBeam RTL:** The attempted RTL fix for TracingBeam in `HowItWorksSection` is non-functional. Should the beam genuinely appear on the right side in Arabic, or is left-aligned acceptable?

10. **Markazi Text / Noto Sans Arabic loading:** The CSS references `var(--font-markazi)` and `var(--font-noto-sans-arabic)` for RTL font overrides, but the loading mechanism (next/font or link tags) could not be confirmed from the files examined. Are these fonts actually being loaded in the Arabic locale?

11. **`featured` prop on `ProductsSection`:** The prop is declared but ignored — the component always shows the 3 featured products. Is this prop intended for future use (showing all products vs. featured), or is it dead code that should be removed?

12. **`home.hero.sub` key unused:** EN: `"Precision-formulated for transformative skin renewal."` / AR equivalent present. This key exists in both message files but is never rendered. Is it a leftover from a previous design, or is it intended for a future sub-headline element?

---

*End of Audit Report — generated 2026-06-21*
