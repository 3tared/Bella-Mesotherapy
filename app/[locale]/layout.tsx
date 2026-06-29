import type { Metadata } from "next";
import { NextIntlClientProvider }  from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound }                from "next/navigation";
import { routing }                 from "@/i18n/routing";
import { Providers }               from "@/components/providers";
import { Navbar }                  from "@/components/layout/Navbar";
import { Footer }                  from "@/components/layout/Footer";
import { ScrollProgress }          from "@/components/ui/ScrollProgress";
import { CustomCursor }            from "@/components/ui/CustomCursor";
import { PageTransition }          from "@/components/providers/PageTransition";
import { SITE_URL }                from "@/lib/constants";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const isArabic = locale === "ar";
  const canonical = isArabic ? `${SITE_URL}/ar` : SITE_URL;

  return {
    title: {
      default: t("title"),
      template: `%s | ${isArabic ? "بيلا" : "Bella"}`,
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical,
      languages: {
        en: SITE_URL,
        ar: `${SITE_URL}/ar`,
        "x-default": SITE_URL,
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_EG" : "en_US",
      alternateLocale: isArabic ? ["en_US"] : ["ar_EG"],
      url: canonical,
      siteName: "Bella",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();
  const tA11y = await getTranslations({ locale, namespace: "accessibility" });

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        {/* A11y: Skip to main content link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-bella-gold focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          {tA11y("skipToContent")}
        </a>
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}
