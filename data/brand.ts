export const brand = {
  name:        "Bella",
  tagline:     "Where science meets beauty",
  subtitle:    "Advanced mesotherapy formulations",
  description: "Bella is born from a belief that radiant skin is the intersection of cutting-edge science and nature's most powerful actives. Each formulation is precision-crafted for visible, lasting transformation.",
  founded:     "2024",
  philosophy:  "Purity. Precision. Transformation.",

  address: {
    street: "Via Romeo Romei, 27",
    postalCode: "00136",
    city: "Roma",
    region: "RM",
    country: "Italy",
    countryCode: "IT",
    full: "Via Romeo Romei, 27, 00136 Roma RM, Italy",
    short: "Roma, Italy",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Via Romeo Romei, 27, 00136 Roma RM, Italy"),
  },
  
  stats: [
    { value: "98%",  label: "Client satisfaction" },
    { value: "12+",  label: "Active ingredients per formula" },
    { value: "48h",  label: "Visible hydration boost" },
    { value: "0",    label: "Harmful additives" },
  ],

  shopUrl:   "https://shop.bella-meso.com",
  instagram: "@bella_meso",
  facebook:  "https://www.facebook.com/bellameso",
  email:     "hello@bella-meso.com",
  phone:     "+201090797965",
  whatsapp:  "+201090797965",
  whatsappUrl: "https://wa.me/201090797965",
} as const;

export type Brand = typeof brand;

