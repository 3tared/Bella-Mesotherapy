'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { featuredIngredientIds, ingredients, type Ingredient } from '@/data';

const featuredIngredients = featuredIngredientIds
  .map((id) => ingredients.find((ingredient) => ingredient.id === id))
  .filter((ingredient): ingredient is Ingredient => Boolean(ingredient));

export default function ProductsIngredients() {
  const t = useTranslations('products');
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#1A1A1A] px-6 py-24 text-center lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 45% at 20% 20%, rgba(201,169,110,0.14) 0%, transparent 65%)',
            'radial-gradient(ellipse 45% 55% at 82% 70%, rgba(250,248,245,0.06) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4 text-[9px] font-medium uppercase tracking-[5px] text-[#C9A96E]"
        >
          {t('ingredients.sectionEyebrow')}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-light leading-[1.02] text-[#FAF8F5]"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          {t('ingredients.sectionTitle')}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-6 mt-5 h-px w-16 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mb-12 max-w-xl text-sm font-light leading-relaxed text-[#FAF8F5]/55"
        >
          {t('ingredients.sectionSubtitle')}
        </motion.p>

        <motion.div
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08, delayChildren: 0.52 },
            },
          }}
          className="flex flex-wrap justify-center gap-3"
          dir="ltr"
        >
          {featuredIngredients.map((ingredient) => (
            <motion.div
              key={ingredient.id}
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-full border border-[#FAF8F5]/14 px-5 py-3 text-left transition-colors duration-300 hover:border-[#C9A96E] hover:text-[#C9A96E]"
            >
              <p className="text-[11px] font-medium tracking-[2px] uppercase text-inherit">
                {ingredient.name.en}
              </p>
              <p className="mt-1 text-[10px] font-light italic tracking-wide text-[#FAF8F5]/38">
                {ingredient.latinName}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
