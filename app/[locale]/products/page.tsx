import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ProductsHeroSection from '@/components/sections/products/ProductsHeroSection';
import { ProductsGridSection } from '@/components/sections/products/ProductsGridSection';
import ProductsIngredients from '@/components/sections/products/ProductsIngredients';
import ProductsCTA from '@/components/sections/products/ProductsCTA';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('productsTitle'),
    description: t('productsDescription'),
  };
}

export default function ProductsPage() {
  return (
    <main>
      <ProductsHeroSection />
      <ProductsGridSection />
      <ProductsIngredients />
      <ProductsCTA />
    </main>
  );
}
