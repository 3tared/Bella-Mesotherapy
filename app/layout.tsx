import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import {
  Cormorant_Garamond,
  DM_Sans,
  Italiana,
  Markazi_Text,
  Noto_Sans_Arabic,
} from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600", "700"],
  style:    ["normal", "italic"],
  variable: "--font-cormorant",
  display:  "swap",
});

const dmSans = DM_Sans({
  subsets:  ["latin"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display:  "swap",
});

const italiana = Italiana({
  subsets:  ["latin"],
  weight:   ["400"],
  variable: "--font-italiana",
  display:  "swap",
});

const markaziText = Markazi_Text({
  subsets:  ["arabic"],
  weight:   ["400", "500", "600", "700"],
  variable: "--font-markazi",
  display:  "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets:  ["arabic"],
  weight:   ["300", "400", "500", "600"],
  variable: "--font-noto-sans-arabic",
  display:  "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bella",
  description: "Advanced mesotherapy formulations by Bella.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF8F5" },
    { media: "(prefers-color-scheme: dark)",  color: "#0E0E0C" },
  ],
  width:        "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // next-intl middleware sets this header on every request
  const headersList = await headers();
  const locale = headersList.get("x-next-intl-locale") ?? "en";
  const isRTL   = locale === "ar";

  const fontClasses = [
    cormorant.variable,
    dmSans.variable,
    italiana.variable,
    markaziText.variable,
    notoSansArabic.variable,
  ].join(" ");

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={fontClasses}
    >
      <head>
        {/* Anti-FOUC: apply theme class before first paint. Safe in RSC — script tags are only
            forbidden inside "use client" components, not Server Component layouts. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var r=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme:dark)').matches)||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light';document.documentElement.classList.add(r);}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
