import { notFound }      from "next/navigation";
import { products }      from "@/data/products";
import { ProductDetail } from "@/components/sections/products/ProductDetail";
import type { Metadata } from "next";
import type { Locale } from "@/data/types";
import { SHOP_URL, SITE_URL } from "@/lib/constants";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}): Promise<Metadata> {
  const { id, locale } = await params;
  const product = products.find((p) => p.id === id);
  const currentLocale = locale as Locale;

  if (!product) {
    return {
      title: "Product",
    };
  }

  const title = product.name[currentLocale] ?? product.name.en;
  const description = product.description[currentLocale] ?? product.description.en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    alternates: {
      canonical: `/${currentLocale}/products/${id}`,
      languages: {
        en: `/en/products/${id}`,
        ar: `/ar/products/${id}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name.en,
    description: product.description.en,
    brand: {
      "@type": "Brand",
      name: "Bella",
      url: SITE_URL,
    },
    image: [`${SITE_URL}${product.image}`],
    offers: {
      "@type": "Offer",
      url: SHOP_URL,
      priceCurrency: "EGP",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail product={product} />
    </>
  );
}
