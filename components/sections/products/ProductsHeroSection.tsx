'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { products } from '@/data';

export default function ProductsHeroSection() {
  const t = useTranslations('products');
  const totalProducts = products.length;

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ minHeight: 'clamp(440px, 52vw, 560px)', background: '#F5EFE6' }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 80% 65% at 15% 68%, rgba(201,169,110,0.16) 0%, transparent 60%)',
            'radial-gradient(ellipse 65% 75% at 85% 28%, rgba(201,169,110,0.12) 0%, transparent 58%)',
            'radial-gradient(ellipse 45% 45% at 50% 50%, rgba(201,169,110,0.06) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          mixBlendMode: 'multiply',
        }}
      />

      {([260, 390, 520] as const).map((size, i) => (
        <motion.div
          key={size}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.08 * i,
            duration: 0.9,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: size,
            height: size,
            border: `1px solid rgba(201,169,110,${0.22 - i * 0.06})`,
          }}
        />
      ))}

      <div className="relative z-10 px-6 py-16 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[10px] font-medium tracking-[5px] uppercase text-[#C9A96E] mb-5"
        >
          {t('hero.eyebrow')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-display font-light text-[#1A1A1A] leading-[0.95] mb-5"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-px w-16 mx-auto mb-4 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[11px] tracking-[3px] uppercase font-light text-[#1A1A1A]/40"
        >
          {t('hero.subtitle', { count: totalProducts })}
        </motion.p>
      </div>

      {/* Top gradient - ensures navbar text remains legible over warm hero bg */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.52) 0%, rgba(255,255,255,0.18) 55%, transparent 100%)',
          zIndex: 2,
        }}
      />
    </section>
  );
}
