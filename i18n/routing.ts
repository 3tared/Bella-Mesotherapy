import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales:       ["en", "ar"],
  defaultLocale: "en",
  localePrefix:  "as-needed",
  pathnames: {
    "/":         "/",
    "/about":    { en: "/about",    ar: "/about"    },
    "/products": { en: "/products", ar: "/products" },
    "/products/[id]": {
      en: "/products/[id]",
      ar: "/products/[id]",
    },
    "/gallery":  { en: "/gallery",  ar: "/gallery"  },
    "/contact":  { en: "/contact",  ar: "/contact"  },
  },
});
