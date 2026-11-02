'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Link } from '@/i18n/navigation';

import {
  products,
  ingredients,
  getLocalizedProduct,
  type Ingredient,
  type ProductCategory,
  type Locale,
} from '@/data';
import { ProductImage } from '@/components/ui/ProductImage';
import { ItalyBadge } from '@/components/ui/ItalyBadge';

type FilterKey = ProductCategory | 'all';

const CATEGORY_KEYS: FilterKey[] = [
  'all',
  'skin-booster',
  'brightening',
  'firming',
  'anti-acne',
  'hair-care',
  'body-contouring',
  'lip-care',
  'eye-care',
  'scar-treatment',
];

const CATEGORY_BADGE: Record<ProductCategory, { bg: string; text: string }> = {
  'skin-booster': { bg: 'rgba(91,168,181,0.12)', text: '#1A5560' },
  brightening: { bg: 'rgba(155,142,196,0.12)', text: '#3B2D6B' },
  firming: { bg: 'rgba(155,139,122,0.12)', text: '#4A3728' },
  'anti-acne': { bg: 'rgba(107,168,136,0.12)', text: '#1A4A38' },
  'hair-care': { bg: 'rgba(107,66,38,0.10)', text: '#3A1A0A' },
  'body-contouring': { bg: 'rgba(168,120,80,0.12)', text: '#4A2810' },
  'lip-care': { bg: 'rgba(196,122,138,0.12)', text: '#5C1A2E' },
  'eye-care': { bg: 'rgba(123,107,168,0.12)', text: '#2E2460' },
  'scar-treatment': { bg: 'rgba(122,158,126,0.12)', text: '#2A4A2E' },
};

function categoryToI18nKey(category: string): string {
  return category.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase());
}

function getCategoryCount(category: FilterKey): number {
  return category === 'all'
    ? products.length
    : products.filter((product) => product.category === category).length;
}

export function ProductsGridSection() {
  const t = useTranslations('products');
  const locale = useLocale() as Locale;
  const isArabic = locale === 'ar';

  const [selected, setSelected] = useState<FilterKey>('all');
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = filterScrollRef.current;
    if (!el) return;

    const timeoutId = window.setTimeout(updateScrollState, 100);
    el.addEventListener('scroll', updateScrollState, { passive: true });

    return () => {
      window.clearTimeout(timeoutId);
      el.removeEventListener('scroll', updateScrollState);
    };
  }, [updateScrollState]);

  useEffect(() => {
    const timeoutId = window.setTimeout(updateScrollState, 50);
    return () => window.clearTimeout(timeoutId);
  }, [selected, updateScrollState]);

  const scrollFilter = (dir: 'left' | 'right') => {
    const el = filterScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? 180 : -180, behavior: 'smooth' });
  };

  const filtered =
    selected === 'all'
      ? products
      : products.filter((product) => product.category === selected);

  const sorted = [...filtered].sort((a, b) => a.order - b.order);

  return (
    <section className="px-4 sm:px-6 lg:px-12 xl:px-20 pb-24">
      <div className="-mx-4 sm:-mx-6 lg:-mx-12 xl:-mx-20 mb-10 bg-[#F5EFE6] border-t border-b border-[rgba(201,169,110,0.22)] py-3.5">
        <div className="relative max-w-[1280px] mx-auto">
          <div className="lg:hidden relative">
            <div
              aria-hidden="true"
              className="absolute start-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, #F5EFE6 30%, transparent)' }}
            />
            <div
              aria-hidden="true"
              className="absolute end-0 top-0 bottom-0 w-10 z-10 pointer-events-none"
              style={{ background: 'linear-gradient(to left, #F5EFE6 30%, transparent)' }}
            />

            <LayoutGroup id="product-filter-mobile">
              <div
                className="flex items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6"
                role="group"
                aria-label={t('filter.all')}
              >
                {CATEGORY_KEYS.map((key) => {
                  const isActive = selected === key;
                  const count = getCategoryCount(key);

                  return (
                    <button
                      key={key}
                      onClick={() => setSelected(key)}
                      className="relative flex-shrink-0 min-h-9 px-4 py-2 lg:px-3 lg:py-2.5 rounded-full text-sm lg:text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                      style={{
                        color: isActive ? '#FAF8F5' : '#1A1A1A',
                        border: isActive ? 'none' : '1px solid rgba(26,26,26,0.18)',
                      }}
                      aria-pressed={isActive}
                      type="button"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="filter-active"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: '#C9A96E' }}
                          transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-2 lg:gap-1.5">
                        <span>
                          {t(`filter.${key === 'all' ? 'all' : categoryToI18nKey(key)}`)}
                        </span>
                        <span
                          className="min-w-5 lg:min-w-4 rounded-full px-1.5 lg:px-1 py-0.5 text-[10px] lg:text-[9px] leading-none"
                          style={{
                            color: isActive ? '#FFFFFF' : '#C9A96E',
                            backgroundColor: isActive
                              ? 'rgba(255,255,255,0.22)'
                              : 'rgba(201,169,110,0.12)',
                          }}
                        >
                          {count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-2.5 px-12 relative">
            <button
              onClick={() => scrollFilter('left')}
              className="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(201,169,110,0.40)] bg-[#F5EFE6] text-[#C9A96E] hover:bg-[rgba(201,169,110,0.14)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
              style={{
                opacity: canScrollLeft ? 1 : 0,
                pointerEvents: canScrollLeft ? 'auto' : 'none',
                transition: 'opacity 0.25s ease',
              }}
              aria-label="Scroll filters left"
              tabIndex={canScrollLeft ? 0 : -1}
              type="button"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <LayoutGroup id="product-filter-desktop">
              <div
                ref={filterScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar"
                style={{ maxWidth: '100%' }}
                role="group"
                aria-label={t('filter.all')}
              >
                {CATEGORY_KEYS.map((key) => {
                  const isActive = selected === key;
                  const count = getCategoryCount(key);

                  return (
                    <button
                      key={key}
                      onClick={() => setSelected(key)}
                      className="relative flex-shrink-0 min-h-9 px-4 py-2 lg:px-3 lg:py-2.5 rounded-full text-sm lg:text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]"
                      style={{
                        color: isActive ? '#FAF8F5' : '#1A1A1A',
                        border: isActive ? 'none' : '1px solid rgba(26,26,26,0.18)',
                      }}
                      aria-pressed={isActive}
                      type="button"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="filter-active"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: '#C9A96E' }}
                          transition={{ type: 'spring', bounce: 0.12, duration: 0.4 }}
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-2 lg:gap-1.5">
                        <span>
                          {t(`filter.${key === 'all' ? 'all' : categoryToI18nKey(key)}`)}
                        </span>
                        <span
                          className="min-w-5 lg:min-w-4 rounded-full px-1.5 lg:px-1 py-0.5 text-[10px] lg:text-[9px] leading-none"
                          style={{
                            color: isActive ? '#FFFFFF' : '#C9A96E',
                            backgroundColor: isActive
                              ? 'rgba(255,255,255,0.22)'
                              : 'rgba(201,169,110,0.12)',
                          }}
                        >
                          {count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <button
              onClick={() => scrollFilter('right')}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(201,169,110,0.40)] bg-[#F5EFE6] text-[#C9A96E] hover:bg-[rgba(201,169,110,0.14)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
              style={{
                opacity: canScrollRight ? 1 : 0,
                pointerEvents: canScrollRight ? 'auto' : 'none',
                transition: 'opacity 0.25s ease',
              }}
              aria-label="Scroll filters right"
              tabIndex={canScrollRight ? 0 : -1}
              type="button"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p className="text-sm text-[#1A1A1A]/40 mb-8 tracking-wide" dir={isArabic ? 'rtl' : 'ltr'}>
        {selected === 'all'
          ? `${sorted.length} ${sorted.length === 1 ? t('card.productSingular') : t('card.productPlural')}`
          : t('card.showCount', { count: sorted.length, total: products.length })}
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {sorted.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="col-span-full py-24 text-center text-[#1A1A1A]/30 tracking-widest uppercase text-sm"
            >
              {t('noProducts')}
            </motion.div>
          ) : (
            sorted.map((product, index) => {
              const localized = getLocalizedProduct(product, locale);
              const productIngredients = ingredients.filter((ingredient) =>
                ingredient.usedIn.includes(product.id),
              );

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: index * 0.055,
                      duration: 0.42,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.18 },
                  }}
                >
                  <ProductCard
                    product={localized}
                    accentColor={product.accentColor}
                    primaryColor={product.color.primary}
                    secondaryColor={product.color.secondary}
                    textColor={product.color.text}
                    isArabic={isArabic}
                    priority={index < 3}
                    ingredients={productIngredients}
                  />
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

interface ProductCardProps {
  product: ReturnType<typeof getLocalizedProduct>;
  accentColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  isArabic: boolean;
  priority?: boolean;
  ingredients?: Ingredient[];
}

function ProductCard({
  product,
  accentColor,
  primaryColor,
  secondaryColor,
  textColor,
  isArabic,
  priority = false,
  ingredients: productIngredients = [],
}: ProductCardProps) {
  const t = useTranslations('products');
  const badge = CATEGORY_BADGE[product.category as ProductCategory];

  return (
    <Link href={{ pathname: '/products/[id]', params: { id: product.id } }} className="block group focus-visible:outline-none">
      <motion.article
        whileHover={{ y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.09)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative rounded-2xl overflow-hidden border border-[rgba(0,0,0,0.05)] h-full flex flex-col"
        style={{ backgroundColor: primaryColor }}
      >
        <span
          className="absolute top-0 start-0 w-[3px] h-full rounded-s-2xl z-10"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <div className="relative h-36 sm:h-48 lg:h-60 overflow-hidden" style={{ backgroundColor: secondaryColor }}>
          <ProductImage
            src={product.image}
            alt={product.name}
            accentColor={accentColor}
            primaryColor={secondaryColor}
            priority={priority}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{ background: `linear-gradient(to bottom, transparent, ${primaryColor})` }}
          />

          {productIngredients.length > 0 && (
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(26,26,26,0.82) 0%, rgba(26,26,26,0.22) 52%, transparent 100%)',
              }}
            >
              <p
                className="text-[9px] font-medium tracking-[3px] uppercase mb-2"
                style={{ color: '#C9A96E' }}
              >
                {t('card.keyIngredients')}
              </p>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5" dir="ltr">
                {productIngredients.slice(0, 3).map((ingredient, i, arr) => (
                  <span key={ingredient.id} className="text-white/80 text-[11px] font-light">
                    {ingredient.name.en}
                    {i < arr.length - 1 && (
                      <span className="text-white/30 ms-2">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(138deg, rgba(255,255,255,0.10) 0%, transparent 48%, rgba(255,255,255,0.04) 100%)',
            }}
          />
          {/* Italian Formula chip — hides when ingredient overlay appears */}
          <div className="absolute bottom-3 start-3 z-[5] group-hover:opacity-0 transition-opacity duration-300">
            <ItalyBadge variant="chip" />
          </div>
        </div>

        <div className="flex-1 flex flex-col p-3 ps-5 sm:p-6 sm:ps-8">
          <div
            aria-hidden="true"
            className="hidden sm:block h-px w-6 group-hover:w-11 mb-3 transition-all duration-400 ease-out"
            style={{
              background: isArabic
                ? `linear-gradient(to left, ${accentColor}, transparent)`
                : `linear-gradient(to right, ${accentColor}, transparent)`,
              marginLeft: isArabic ? 'auto' : undefined,
            }}
          />

          {badge && (
            <span
              className="self-start text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-md mb-3"
              style={{ backgroundColor: badge.bg, color: badge.text }}
            >
              {t(`filter.${categoryToI18nKey(product.category)}`)}
            </span>
          )}

          <h3
            className="text-[1.05rem] sm:text-[1.4rem] font-light leading-tight mb-1"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: textColor }}
          >
            {product.name}
          </h3>

          <p
            className="text-xs tracking-wide uppercase mb-4"
            style={{ color: `${textColor}99` }}
          >
            {product.subtitle}
          </p>

          <ul className="space-y-1.5 flex-1" aria-label={t('card.keyBenefits')}>
            {product.keyBenefits.slice(0, 2).map((benefit, i) => (
              <li
                key={i}
                className={`items-start gap-2.5 text-xs leading-relaxed ${i === 1 ? 'hidden sm:flex' : 'flex'}`}
                style={{ color: `${textColor}CC` }}
              >
                <span
                  className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ backgroundColor: accentColor }}
                  aria-hidden="true"
                />
                {benefit}
              </li>
            ))}
          </ul>

          <div
            className="mt-5 flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase group-hover:gap-3 transition-all duration-300"
            style={{ color: accentColor }}
          >
            {t('card.learnMore')}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              style={{ transform: isArabic ? 'scaleX(-1)' : 'none' }}
            >
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
