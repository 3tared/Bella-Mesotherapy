import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GalleryGridSection } from "@/components/sections/gallery/GalleryGridSection";
import { GalleryHeroSection } from "@/components/sections/gallery/GalleryHeroSection";
import { GalleryMarqueeSection } from "@/components/sections/gallery/GalleryMarqueeSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.meta" });

  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function GalleryPage() {
  return (
    <>
      <GalleryHeroSection />
      <GalleryGridSection />
      <GalleryMarqueeSection />
    </>
  );
}
