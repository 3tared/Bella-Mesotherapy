"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion, useMotionValue, useSpring } from "motion/react";
import dynamic from "next/dynamic";
import { useRouter }             from "@/i18n/navigation";
import { Link }                  from "@/i18n/navigation";
import { AnimatedShinyText }     from "@/components/ui/animated-shiny-text";
import { ShimmerButton }         from "@/components/ui/shimmer-button";
import { TextHoverEffect }      from "@/components/ui/aceternity/text-hover-effect";
import { BlurText }              from "@/components/ui/blur-text";
import { MorphingText }          from "@/components/ui/morphing-text";
import { MagneticHover }         from "@/components/ui/MagneticButton";
import { useMediaQuery }         from "@/hooks/useMediaQuery";
import { ItalyBadge }            from "@/components/ui/ItalyBadge";

const Particles = dynamic(
  () => import("@/components/ui/particles").then((module) => module.Particles),
  { ssr: false }
);

const SpinningText = dynamic(
  () =>
    import("@/components/ui/spinning-text").then(
      (module) => module.SpinningText
    ),
  { ssr: false }
);

export function HeroSection() {
  const t      = useTranslations("home.hero");
  const isRTL  = useLocale() === "ar";
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 767px)", true);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const revealInitial = prefersReducedMotion ? false : undefined;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const wordmarkX = useSpring(pointerX, { stiffness: 80, damping: 24 });
  const wordmarkY = useSpring(pointerY, { stiffness: 80, damping: 24 });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!hasFinePointer || prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 7);
  };

  const resetParallax = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      id="hero"
      className="relative flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden"
      data-surface="dark"
      style={{ background: "var(--surface-dark)" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetParallax}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[8%] z-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_30%,rgba(201,169,110,0.09),transparent_72%)]"
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0, scale: 1 }
            : { x: [0, 12, 0], y: [0, -8, 0], scale: [1, 1.035, 1] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 z-0 bg-[radial-gradient(circle_18rem_at_50%_36%,rgba(232,213,163,0.035),transparent_72%)]"
        style={{ x: wordmarkX, y: wordmarkY }}
      />

      {/* Layer 1: Particles (desktop only) */}
      {!isMobile && !prefersReducedMotion ? (
        <Particles
          className="absolute inset-0 z-0"
          quantity={80}
          color="#C9A96E"
          size={0.8}
          ease={80}
          refresh={false}
        />
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 30%, rgba(201,169,110,0.08) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Layer 2: Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Layer 3: Vignette */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 20%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Layer 4: Content */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        <h1 className="sr-only">{t("headline")}</h1>

        {/* Eyebrow pill */}
        <motion.div
          initial={revealInitial ?? { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-7"
        >
          <AnimatedShinyText
            shimmerWidth={150}
            className="text-brand-gold inline-flex items-center gap-2 rounded-full border border-[rgba(201,169,110,0.25)] bg-[rgba(201,169,110,0.08)] px-5 py-2 font-body text-[11px] font-medium uppercase tracking-[0.3em]"
          >
            ✦ {t("eyebrow")}
          </AnimatedShinyText>
        </motion.div>

        {/* BELLA — TextHoverEffect (SVG gradient stroke on hover) */}
        <div className="mb-4 h-[120px] w-full max-w-4xl md:h-[160px]">
          <TextHoverEffect text="BELLA" duration={0.4} />
        </div>

        {/* Tagline — BlurText word-by-word */}
        <div className="mb-5">
          <BlurText
            text={t("headline")}
            delay={120}
            animateBy="words"
            direction="top"
            className="font-display text-fluid-xl font-light italic text-white/70"
            style={{ fontFamily: "var(--font-cormorant)" }}
          />
        </div>

        {/* Sub-text — MorphingText cycling brand words */}
        <motion.div
          initial={revealInitial ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-11"
          dir={isRTL ? "rtl" : "ltr"}
        >
          <MorphingText
            texts={t.raw("morph") as string[]}
            className="text-on-dark-muted h-8 min-w-[19rem] max-w-sm font-body text-[13px] font-normal uppercase tracking-[0.3em] filter-none sm:min-w-[24rem] md:h-10 lg:text-[13px]"
          />
        </motion.div>

        {/* CTAs — BUG 1 FIX: no Link nesting inside ShimmerButton (button) */}
        <motion.div
          initial={revealInitial ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {/* Primary: ShimmerButton — uses router.push, NOT Link nesting */}
          <MagneticHover>
            <ShimmerButton
              shimmerColor="#E8D5A3"
              background="rgba(201,169,110,0.08)"
              borderRadius="9999px"
              className="text-brand-gold border border-[rgba(201,169,110,0.4)] px-9 py-3.5 font-body text-[13px] font-medium tracking-[0.2em] uppercase"
              onClick={() => router.push("/products")}
            >
              {t("cta")}
            </ShimmerButton>
          </MagneticHover>

          {/* Secondary: ghost link */}
          <Link
            href="/about"
            className="text-on-dark-muted rounded-full border border-white/15 px-9 py-3.5 font-body text-[13px] tracking-[0.2em] uppercase transition-all duration-300 hover:border-white/30 hover:text-white"
          >
            {t("secondary")}
          </Link>
        </motion.div>

        {/* Italian Formula badge — static entrance after CTAs */}
        <motion.div
          initial={revealInitial ?? { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 flex justify-center"
          style={{ minHeight: "28px" }}
        >
          <ItalyBadge variant="inline" tone="dark" />
        </motion.div>
      </div>

      {/* Decorative brand seal stays in the same visual corner in both directions. */}
      {!isMobile && (
        <motion.div
          initial={revealInitial ?? { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-12 right-8 z-20 hidden md:block"
          aria-hidden="true"
        >
          <SpinningText
            radius={5}
            duration={20}
            className="text-[9px] uppercase tracking-widest text-white/15"
          >
            bella • mesotherapy • luxury •{" "}
          </SpinningText>
        </motion.div>
      )}

      {/* Scroll indicator — a11y: respects reduced motion */}
      <motion.div
        initial={revealInitial ?? { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-on-dark-muted font-body text-[9px] uppercase tracking-[0.4em]">
          {t("scroll")}
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-[rgba(201,169,110,0.4)] to-transparent"
        />
      </motion.div>

      {/* Fade into next section — BUG 5 FIX: dark mode support */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-40 bg-gradient-to-t from-[var(--bella-ivory)] to-transparent dark:from-[var(--surface-dark)]" />
    </section>
  );
}
