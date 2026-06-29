"use client";

import { useTranslations, useLocale }   from "next-intl";
import Image                  from "next/image";
import { motion }             from "motion/react";
import { Link }               from "@/i18n/navigation";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/aceternity/3d-card-effect";
import { BorderBeam }         from "@/components/ui/border-beam";
import { DirectionArrow }     from "@/components/ui/DirectionArrow";
import { staggerContainer, cardReveal, fadeUp } from "@/lib/animations";
import { featuredProducts, getLocalizedProduct }   from "@/data/products";
import type { Locale, ProductCategory } from "@/data/products";

type LocalizedProduct = ReturnType<typeof getLocalizedProduct>;

const PRODUCT_CATEGORY_KEYS: Record<ProductCategory, string> = {
  "skin-booster": "skinBooster",
  brightening: "brightening",
  firming: "firming",
  "anti-acne": "antiAcne",
  "hair-care": "hairCare",
  "body-contouring": "bodyContouring",
  "lip-care": "lipCare",
  "eye-care": "eyeCare",
  "scar-treatment": "scarTreatment",
};

function ProductCard3D({
  product,
  index,
}: {
  product: LocalizedProduct;
  index: number;
}) {
  const t = useTranslations("products.card");
  const tCategory = useTranslations("products.filter");

  return (
    <motion.div variants={cardReveal} className="group relative h-full">
      <CardContainer className="h-full w-full" containerClassName="py-0 h-full">
        <CardBody
          className="pointer-fine:hover:border-bella-gold/25 pointer-fine:hover:shadow-[0_24px_80px_rgba(201,169,110,0.1)] relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-bella-gold/12 bg-white transition-all duration-500 will-change-transform focus:outline-none focus:ring-2 focus:ring-bella-gold focus:ring-offset-2"
          role="article"
          tabIndex={0}
        >
          {/* BorderBeam: animated gold border on hover */}
          <BorderBeam
            size={250}
            duration={10}
            colorFrom="#C9A96E"
            colorTo="rgba(201,169,110,0)"
            className="pointer-fine:group-hover:opacity-100 opacity-0 transition-opacity duration-700"
          />

          {/* Product photography on its existing color-identity wash */}
          <CardItem translateZ={50} className="w-full shrink-0">
            <div
              className="relative flex h-56 w-full items-center justify-center overflow-hidden"
              style={{
                background: `radial-gradient(circle at 50% 38%, white 0%, ${product.color.primary} 72%)`,
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14, scale: 0.97 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="pointer-fine:group-hover:-translate-y-1 pointer-fine:group-hover:scale-[1.025] relative h-[88%] w-[72%] transition-transform duration-700 ease-out"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority={index < 3}
                  sizes="(max-width: 767px) 56vw, (max-width: 1023px) 36vw, 24vw"
                  className="object-contain drop-shadow-[0_18px_18px_rgba(26,26,26,0.12)]"
                />
              </motion.div>
              {/* Product category overlay */}
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span
                  className="font-body text-[9px] uppercase tracking-[0.3em] opacity-40"
                  style={{ color: product.color.text }}
                >
                  {tCategory(PRODUCT_CATEGORY_KEYS[product.category])}
                </span>
              </div>
            </div>
          </CardItem>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6">
            <CardItem translateZ={30} className="w-full">
              <h3 className="font-display text-[1.6rem] leading-tight text-bella-charcoal">
                {product.name}
              </h3>
              <p className="mt-0.5 font-body text-[12px] text-bella-charcoal/65">
                {product.subtitle}
              </p>
            </CardItem>

            <CardItem translateZ={20} className="mt-4 w-full flex-1">
              <p className="font-body text-[13px] leading-relaxed text-bella-charcoal/65">
                {product.description}
              </p>
            </CardItem>

            {/* Benefits list */}
            <CardItem translateZ={15} className="mt-5 w-full">
              <ul className="space-y-2">
                {product.keyBenefits.slice(0, 3).map((benefit, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 font-body text-[12px] text-bella-charcoal/65"
                  >
                    <span className="inline-block h-[1px] w-4 shrink-0 bg-bella-gold/60" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardItem>

            {/* Footer */}
            <CardItem translateZ={40} className="mt-6 w-full">
              <div className="flex items-center justify-between border-t border-bella-gold/10 pt-4">
                <span className="font-body text-[11px] text-bella-charcoal/65">
                  {product.volume}
                </span>
                <Link
                  href={{ pathname: "/products/[id]", params: { id: product.id } }}
                  className="text-brand-gold hover-brand-gold inline-flex items-center gap-1.5 font-body text-[11px] font-medium uppercase tracking-[0.2em] transition-colors"
                >
                  {t("learnMore")}
                  <DirectionArrow className="h-3.5 w-3.5" />
                </Link>
              </div>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}

export function ProductsSection() {
  const t      = useTranslations("home.products");
  const locale = useLocale() as Locale;

  const localizedFeatured = featuredProducts.map(p =>
    getLocalizedProduct(p, locale)
  );

  return (
    <section
      id="products"
      className="relative w-full overflow-hidden bg-white py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-brand-gold mb-3 font-body text-[10px] uppercase tracking-[0.3em]"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mb-4 font-display text-fluid-3xl text-bella-charcoal"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            {t("headline")}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-md font-body text-[13px] leading-relaxed text-bella-charcoal/65"
          >
            {t("sub")}
          </motion.p>
        </motion.div>

        {/* Desktop grid — 3D cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={staggerContainer}
          className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3"
        >
          {localizedFeatured.map((product, index) => (
            <ProductCard3D key={product.id} product={product} index={index} />
          ))}
        </motion.div>

        {/* Mobile horizontal scroll */}
        <div
          data-products-scroller
          className="flex gap-4 overflow-x-auto pb-5 md:hidden"
          dir={locale === "ar" ? "rtl" : "ltr"}
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {localizedFeatured.map((product, index) => (
            <div
              key={product.id}
              className="w-[78vw] shrink-0"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard3D product={product} index={index} />
            </div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex justify-center"
        >
          <Link
            href="/products"
            className="group hover-brand-gold inline-flex items-center gap-2 font-body text-[12px] uppercase tracking-[0.25em] text-bella-charcoal/65 transition-colors"
          >
            {t("viewAll")}
            <DirectionArrow className="transition-transform duration-300 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
