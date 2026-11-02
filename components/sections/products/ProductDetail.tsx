/**
 * BELLA — PRODUCT DETAIL
 * Luxury single product experience using installed UI primitives only.
 */
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale, Product } from "@/data/products";
import { getLocalizedProduct, getRelatedProducts } from "@/data/products";
import { ingredients } from "@/data/ingredients";
import { clinicalData, bellaClinicalStats } from "@/data/clinical";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import BookingModal from "@/components/ui/BookingModal";
import { ProductImage } from "@/components/ui/ProductImage";
import { StickyProductBar } from "@/components/ui/StickyProductBar";
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card-effect";
import { CardSpotlight } from "@/components/ui/aceternity/card-spotlight";
import { TracingBeam } from "@/components/ui/aceternity/tracing-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { ItalyBadge } from "@/components/ui/ItalyBadge";

export function ProductDetail({ product: rawProduct }: { product: Product }) {
  const t = useTranslations("products.single");
  const locale = useLocale() as Locale;
  const isRTL = locale === "ar";
  const heroRef = useRef<HTMLElement | null>(null);
  const [showLongDescription, setShowLongDescription] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const product = getLocalizedProduct(rawProduct, locale);
  const productIngredients = ingredients.filter((ing) =>
    ing.usedIn.includes(rawProduct.id),
  );
  const relatedProducts = getRelatedProducts(rawProduct.id, rawProduct.category, 3);

  return (
    <>
      <section
        ref={heroRef}
        className="relative flex min-h-[72vh] items-center overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${product.color.primary}33 0%, ${product.color.secondary}22 46%, var(--bella-ivory) 100%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bella-ivory/20 to-bella-ivory dark:to-[#0E0E0C]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/products"
              className={cn(
                "inline-flex items-center gap-2 text-sm text-bella-stone transition-colors hover:text-bella-gold",
                isRTL && "flex-row-reverse",
              )}
            >
              <span aria-hidden="true">{isRTL ? "→" : "←"}</span>
              <span>{t("backToProducts")}</span>
            </Link>
          </motion.div>

          <div
            className={cn(
              "mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20",
              isRTL && "lg:[&>*:first-child]:order-2",
            )}
          >
            <CardContainer className="w-full" containerClassName="py-0">
              <CardBody
                className="relative aspect-square h-auto w-full overflow-hidden rounded-3xl border border-bella-gold/10 shadow-[0_30px_100px_rgba(26,26,26,0.12)]"
                style={{ backgroundColor: product.color.primary + "40" }}
              >
                <CardItem
                  translateZ={-20}
                  className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl opacity-60"
                >
                  <Particles
                    className="absolute inset-0"
                    quantity={20}
                    color="#C9A96E"
                    size={0.7}
                    staticity={35}
                  />
                </CardItem>

                <CardItem translateZ={60} className="relative h-full w-full">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    accentColor={product.accentColor}
                    primaryColor={product.color.primary}
                    priority={true}
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </CardItem>

                <CardItem
                  translateZ={80}
                  className="pointer-events-none absolute inset-0 h-full w-full rounded-3xl ring-1 ring-bella-gold/20"
                >
                  <span aria-hidden="true" />
                </CardItem>

                <CardItem
                  translateZ={100}
                  className={cn("absolute top-4", isRTL ? "right-4" : "left-4")}
                >
                  <span className="rounded-full border border-bella-gold/30 bg-bella-charcoal/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] text-bella-gold backdrop-blur-sm">
                    {product.category}
                  </span>
                </CardItem>
              </CardBody>
            </CardContainer>

            <div
              className={cn(
                "flex h-full flex-col justify-center space-y-5",
                isRTL ? "text-right lg:pr-8" : "lg:pl-8",
              )}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <BlurFade delay={0.2} inView>
                <div className={cn("flex items-center gap-3", isRTL && "flex-row-reverse")}>
                  <span className="h-px w-8 bg-bella-gold" />
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-bella-gold">
                    {product.subtitle}
                  </p>
                </div>
              </BlurFade>

              <BlurFade delay={0.35} inView>
                <h1 className="font-display text-fluid-3xl leading-tight text-bella-charcoal dark:text-bella-ivory">
                  {product.name}
                </h1>
              </BlurFade>

              <BlurFade delay={0.4} inView>
                <p
                  className="font-display text-lg tracking-wide text-bella-gold/50"
                  style={
                    locale === "en"
                      ? { fontFamily: "var(--font-markazi)", direction: "rtl", textAlign: "right" }
                      : undefined
                  }
                >
                  {locale === "en" ? rawProduct.name.ar : rawProduct.name.en}
                </p>
              </BlurFade>

              <BlurFade delay={0.45} inView>
                <div className={cn("h-px w-16 bg-bella-gold/40", isRTL && "mr-auto")} />
              </BlurFade>

              <BlurFade delay={0.5} inView>
                <p className="max-w-md text-fluid-base leading-relaxed text-bella-stone">
                  {product.description}
                </p>
              </BlurFade>

              <BlurFade delay={0.55} inView>
                <div className="max-w-md">
                  <button
                    type="button"
                    onClick={() => setShowLongDescription((value) => !value)}
                    className="text-sm font-medium text-bella-gold transition-colors hover:text-bella-gold-dark"
                  >
                    {t("learnMore")}
                  </button>
                  {showLongDescription && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-sm leading-relaxed text-bella-stone/80"
                    >
                      {product.longDescription}
                    </motion.p>
                  )}
                </div>
              </BlurFade>

              <BlurFade delay={0.6} inView>
                <div className={cn("flex flex-wrap gap-6 text-sm text-bella-stone/70", isRTL && "justify-end")}>
                  {product.volume && (
                    <span className={cn("flex items-center gap-1.5", isRTL && "flex-row-reverse")}>
                      <span className="text-bella-gold">◆</span>
                      {product.volume}
                    </span>
                  )}
                  {product.sessions && (
                    <span className={cn("flex items-center gap-1.5", isRTL && "flex-row-reverse")}>
                      <span className="text-bella-gold">◆</span>
                      {product.sessions}
                    </span>
                  )}
                  <span className={cn("flex items-center gap-1.5", isRTL && "flex-row-reverse")}>
                    <span className="text-bella-gold">◆</span>
                    <ItalyBadge variant="inline" tone="light" />
                  </span>
                </div>
              </BlurFade>

              <BlurFade delay={0.7} inView>
                <motion.a
                  href="#book"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsBookingOpen(true);
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex cursor-pointer select-none items-center gap-3 rounded-full bg-bella-gold px-10 py-4 font-medium tracking-wide text-bella-charcoal transition-shadow duration-300 hover:shadow-[0_8px_40px_rgba(201,169,110,0.45)]"
                >
                  {t("bookNow")}
                  <span className="text-xs opacity-70">{isRTL ? "←" : "→"}</span>
                </motion.a>
              </BlurFade>
            </div>
          </div>
        </div>
      </section>

      <SectionWrapper>
        <motion.h2
          variants={fadeUp}
          className="mb-8 font-display text-fluid-2xl text-bella-charcoal dark:text-bella-ivory"
        >
          {t("keyBenefits")}
        </motion.h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {product.keyBenefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={cn(
                "flex items-start gap-4 rounded-xl border border-bella-gold/10 bg-bella-mist/50 p-6 transition-colors hover:border-bella-gold/30 dark:bg-white/5",
                isRTL && "flex-row-reverse text-right",
              )}
            >
              <span className="mt-0.5 text-bella-gold">✦</span>
              <p className="text-bella-stone">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      {product.howToUse && product.howToUse.length > 0 && (
        <SectionWrapper>
          <div className="mx-auto max-w-4xl">
            <motion.div variants={fadeUp} className="mb-16 text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-bella-gold">
                ✦ {t("howToUse")} ✦
              </p>
              <h2 className="font-display text-fluid-2xl text-bella-charcoal dark:text-bella-ivory">
                {t("howToUse")}
              </h2>
            </motion.div>

            <TracingBeam
              side="start"
              dir={isRTL ? "rtl" : "ltr"}
              className={isRTL ? "pr-6 md:pr-20" : "pl-6 md:pl-20"}
            >
              <div className="space-y-12">
                {product.howToUse.map((step, index) => (
                  <BlurFade key={`${step.en}-${index}`} delay={0.1 * (index + 1)} inView>
                    <div
                      className={cn(
                        "flex items-start gap-6",
                        isRTL && "flex-row-reverse text-right",
                      )}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-bella-gold/40 font-display text-sm font-medium text-bella-gold">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <div className="pt-1.5">
                        <p className="mb-1 text-xs uppercase tracking-[0.15em] text-bella-gold/60">
                          {t("step")} {index + 1}
                        </p>
                        <p className="leading-relaxed text-bella-stone">
                          {step[locale]}
                        </p>
                      </div>
                    </div>
                  </BlurFade>
                ))}
              </div>
            </TracingBeam>
          </div>
        </SectionWrapper>
      )}

      <section className="relative overflow-hidden bg-bella-ivory py-[clamp(4.5rem,9vw,8rem)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-bella-gold">
              ✦ {t("clinicalStats")} ✦
            </p>
            <h2 className="font-display text-fluid-2xl text-bella-charcoal">
              {t("clinicalStats")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-bella-stone/70">
              {t("clinicalSubtitle")}
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bellaClinicalStats.map((stat, index) => (
              <BlurFade key={stat.label.en} delay={0.1 * index} inView>
                <div className="h-full rounded-2xl border border-bella-gold/10 bg-white/70 p-6 text-center shadow-[0_18px_60px_rgba(26,26,26,0.05)]">
                  <p className="font-display text-4xl leading-none text-bella-charcoal">
                    <NumberTicker
                      value={stat.value}
                      delay={0.1 * index}
                      className="!text-bella-charcoal"
                    />
                    <span className="text-bella-charcoal/70">{stat.suffix}</span>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-bella-stone">
                    {stat.label[locale]}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {productIngredients.length > 0 && (
        <SectionWrapper dark>
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-bella-gold">✦</p>
            <h2 className="font-display text-fluid-2xl text-bella-ivory">
              {t("ingredients")}
            </h2>
          </motion.div>

          <div
            className="-mx-6 flex gap-5 overflow-x-auto px-6 pb-6 scroll-smooth scrollbar-hide lg:-mx-8 lg:px-8"
            style={{
              scrollSnapType: "x mandatory",
              direction: isRTL ? "rtl" : "ltr",
              WebkitOverflowScrolling: "touch",
              msOverflowStyle: "none",
            }}
          >
            {productIngredients.map((ing, index) => (
              <BlurFade key={ing.id} delay={0.08 * index} inView>
                <CardSpotlight
                  className="h-full w-[280px] shrink-0 cursor-default rounded-2xl border border-bella-gold/10 bg-white/5 p-8 transition-colors duration-500 hover:border-bella-gold/30 lg:w-[320px]"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-bella-gold/60">
                    {ing.category}
                  </p>
                  <h3 className="mb-1 font-display text-xl text-bella-ivory">
                    {ing.name[locale]}
                  </h3>
                  <p className="mb-6 text-sm italic text-bella-ivory/30">
                    {ing.latinName}
                  </p>
                  <div className="mb-6 h-px w-12 bg-bella-gold/30" />
                  <p className="mb-4 text-sm leading-relaxed text-bella-ivory/70">
                    {ing.benefit[locale]}
                  </p>
                  {ing.description && (
                    <p className="mb-4 text-xs leading-relaxed text-bella-ivory/40">
                      {ing.description[locale]}
                    </p>
                  )}
                  {ing.scienceNote && (
                    <div className="mt-4 border-t border-bella-gold/10 pt-4">
                      <p className="text-xs italic leading-relaxed text-bella-gold/50">
                        {ing.scienceNote[locale]}
                      </p>
                    </div>
                  )}
                  {ing.concentration && (
                    <p className="mt-4 text-xs text-bella-ivory/30">
                      {t("concentration")}: {ing.concentration[locale]}
                    </p>
                  )}
                </CardSpotlight>
              </BlurFade>
            ))}
          </div>

          {productIngredients.length > 3 && (
            <p className="mt-4 text-center text-xs tracking-wide text-bella-ivory/30">
              {isRTL ? `← ${t("scrollToExplore")}` : `${t("scrollToExplore")} →`}
            </p>
          )}
        </SectionWrapper>
      )}

      <section className="bg-[#F5F0EB] px-4 py-16 sm:px-6 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl">
          <div className={cn("mb-10 flex items-center gap-3", isRTL && "flex-row-reverse text-right")}>
            <span className="h-px w-8 bg-[#C9A96E]" aria-hidden="true" />
            <h2
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#C9A96E]"
              id="clinical-section"
            >
              {t("professionalUse")}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-[rgba(0,0,0,0.05)] bg-white p-6">
              <h3 className="mb-4 text-sm font-medium tracking-wide text-[#1A1A1A]">
                {t("recommended")}
              </h3>
              <div className="space-y-3">
                {[clinicalData.administration.protocol.frequency, clinicalData.administration.protocol.sessions].map((item) => (
                  <div key={item.en} className={cn("flex items-center gap-3", isRTL && "flex-row-reverse text-right")}>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(201,169,110,0.15)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" aria-hidden="true" />
                    </span>
                    <span className="text-sm text-[#1A1A1A]/70">{item[locale]}</span>
                  </div>
                ))}
                <div className="border-t border-[rgba(0,0,0,0.05)] pt-2">
                  <p className="mb-2 text-xs uppercase tracking-wide text-[#1A1A1A]/40">
                    {t("techniques")}
                  </p>
                  <div className={cn("flex flex-wrap gap-2", isRTL && "justify-end")}>
                    {clinicalData.administration.techniques.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-md bg-[rgba(201,169,110,0.08)] px-2.5 py-1 text-xs text-[#6B4226]"
                      >
                        {tech[locale]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-[rgba(0,0,0,0.05)] bg-white p-5">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/50">
                  {t("warnings")}
                </h3>
                <ul className="space-y-1.5">
                  {clinicalData.warnings.map((w, i) => (
                    <li key={i} className={cn("flex items-start gap-2 text-xs text-[#1A1A1A]/60", isRTL && "flex-row-reverse text-right")}>
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#1A1A1A]/20" aria-hidden="true" />
                      {w[locale]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-[rgba(0,0,0,0.05)] bg-white p-5">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-[#1A1A1A]/50">
                  {t("storage")}
                </h3>
                <ul className="space-y-1.5">
                  {clinicalData.storage.map((s, i) => (
                    <li key={i} className={cn("flex items-start gap-2 text-xs text-[#1A1A1A]/60", isRTL && "flex-row-reverse text-right")}>
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#1A1A1A]/20" aria-hidden="true" />
                      {s[locale]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <SectionWrapper>
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-bella-gold">
              ✦ {t("relatedProducts")} ✦
            </p>
            <h2 className="mb-4 font-display text-fluid-2xl text-bella-charcoal dark:text-bella-ivory">
              {t("relatedProducts")}
            </h2>
            <p className="mx-auto max-w-md text-sm text-bella-stone/60">
              {t("relatedSubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relProduct, index) => (
              <BlurFade key={relProduct.id} delay={0.12 * (index + 1)} inView>
                <Link
                  href={{ pathname: "/products/[id]", params: { id: relProduct.id } }}
                  className="group block h-full"
                >
                  <CardContainer containerClassName="h-full py-0">
                    <CardBody className="h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-bella-gold/10 bg-bella-mist/30 p-0 transition-colors duration-500 hover:border-bella-gold/30">
                      <CardItem translateZ={40} className="relative block w-full">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-bella-mist/50">
                          <ProductImage
                            src={relProduct.image}
                            alt={relProduct.name[locale]}
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 33vw"
                          />
                          {/* Italian Formula chip */}
                          <div className="absolute bottom-3 start-3 z-10">
                            <ItalyBadge variant="chip" />
                          </div>
                        </div>
                      </CardItem>

                      <CardItem translateZ={20} className="block w-full p-6">
                        <p className="mb-2 text-xs uppercase tracking-[0.15em] text-bella-gold/70">
                          {relProduct.category}
                        </p>
                        <h3 className="mb-1 font-display text-xl text-bella-charcoal dark:text-bella-ivory">
                          {relProduct.name[locale]}
                        </h3>
                        <p
                          className="mb-4 text-sm text-bella-gold/40"
                          style={
                            locale === "en"
                              ? { fontFamily: "var(--font-markazi)", direction: "rtl", textAlign: "right" }
                              : undefined
                          }
                        >
                          {locale === "en" ? relProduct.name.ar : relProduct.name.en}
                        </p>
                        <div className="mb-4 h-px w-8 bg-bella-gold/30" />
                        <p className="mb-5 line-clamp-2 text-sm text-bella-stone/70">
                          {relProduct.description[locale]}
                        </p>
                        <CardItem translateZ={30} className="inline-block">
                          <span className="border-b border-bella-gold/30 pb-0.5 text-xs uppercase tracking-[0.15em] text-bella-gold transition-colors duration-300 group-hover:border-bella-gold">
                            {t("viewProduct")} {isRTL ? "←" : "→"}
                          </span>
                        </CardItem>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </Link>
              </BlurFade>
            ))}
          </div>
        </SectionWrapper>
      )}

      <StickyProductBar
        productName={rawProduct.name}
        productImage={rawProduct.image}
        locale={locale}
        triggerRef={heroRef}
        onBookNow={() => setIsBookingOpen(true)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        productName={product.name}
      />
    </>
  );
}
