import type { LocalizedString } from "./types";

export type GalleryCategory = "all" | "boosters" | "treatments" | "specialists";

export interface GalleryItem {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: LocalizedString;
  title: LocalizedString;
  caption?: LocalizedString;
  category: Exclude<GalleryCategory, "all">;
  linkedProductSlug?: string;
  featured?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gb-skin-booster",
    src: "/assets/Skin Booster.webp",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Skin Booster mesotherapy hydration vial",
      ar: "كبسولة بيلا سكن بوستر للترطيب بالميزوثيرابي",
    },
    title: { en: "Bella Skin Booster", ar: "بيلا سكن بوستر" },
    caption: {
      en: "Deep hydration mesotherapy, the Bella signature formula.",
      ar: "ميزوثيرابي للترطيب العميق، تركيبة بيلا المميزة.",
    },
    category: "boosters",
    linkedProductSlug: "bella-skin-booster",
    featured: true,
  },
  {
    id: "gb-yaqoot",
    src: "/assets/Yaqoot.webp",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Yaqoot ruby radiance mesotherapy vial",
      ar: "كبسولة بيلا ياقوت للإشراق الياقوتي بالميزوثيرابي",
    },
    title: { en: "Bella Yaqoot", ar: "بيلا ياقوت" },
    caption: {
      en: "Luminous glow formula enriched with brightening actives.",
      ar: "تركيبة إشراق مضيئة معززة بمكونات نشطة للتفتيح.",
    },
    category: "boosters",
    linkedProductSlug: "bella-yaqoot",
    featured: true,
  },
  {
    id: "gb-amber",
    src: "/assets/Amber.webp",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Amber warm glow mesotherapy vial",
      ar: "كبسولة بيلا أمبر للتوهج الدافئ بالميزوثيرابي",
    },
    title: { en: "Bella Amber", ar: "بيلا أمبر" },
    caption: {
      en: "Warm golden radiance with amber-inspired bioactives.",
      ar: "إشراق ذهبي دافئ بمكونات نشطة مستوحاة من العنبر.",
    },
    category: "boosters",
    linkedProductSlug: "bella-amber",
    featured: true,
  },
  {
    id: "gt-acne-free",
    src: "/assets/Acne Free.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Acne Free clarifying mesotherapy vial",
      ar: "كبسولة بيلا أكني فري لتنقية البشرة بالميزوثيرابي",
    },
    title: { en: "Bella Acne Free", ar: "بيلا أكني فري" },
    caption: {
      en: "Clinical-grade clarifying formula for acne-prone skin.",
      ar: "تركيبة سريرية لتنقية البشرة المعرضة لحب الشباب.",
    },
    category: "treatments",
    linkedProductSlug: "bella-acne-free",
  },
  {
    id: "gt-anti-scar",
    src: "/assets/Scar Free.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Anti-Scar scar repair mesotherapy vial",
      ar: "كبسولة بيلا أنتي سكار لإصلاح الندبات بالميزوثيرابي",
    },
    title: { en: "Bella Anti-Scar", ar: "بيلا أنتي سكار" },
    caption: {
      en: "Advanced scar repair and skin resurfacing formula.",
      ar: "تركيبة متقدمة لإصلاح الندبات وتجديد سطح الجلد.",
    },
    category: "treatments",
    linkedProductSlug: "bella-anti-scar",
  },
  {
    id: "gt-deep-whitening",
    src: "/assets/Deep Whitening.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Deep Whitening brightening mesotherapy vial",
      ar: "كبسولة بيلا ديب وايتنينج للتفتيح العميق بالميزوثيرابي",
    },
    title: { en: "Bella Deep Whitening", ar: "بيلا ديب وايتنينج" },
    caption: {
      en: "Deep skin brightening with melanin-targeting actives.",
      ar: "تفتيح عميق للبشرة بمكونات تستهدف الميلانين.",
    },
    category: "treatments",
    linkedProductSlug: "bella-deep-whitening",
  },
  {
    id: "gt-ultra-glow",
    src: "/assets/Ultra Glow.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Ultra Glow radiance mesotherapy vial",
      ar: "كبسولة بيلا ألترا جلو للإشراق الفائق بالميزوثيرابي",
    },
    title: { en: "Bella Ultra Glow", ar: "بيلا ألترا جلو" },
    caption: {
      en: "Instant radiance booster with a multi-peptide complex.",
      ar: "معزز إشراق فوري بمركب متعدد الببتيدات.",
    },
    category: "treatments",
    linkedProductSlug: "bella-ultra-glow",
  },
  {
    id: "gt-tight",
    src: "/assets/Bella Tight.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Tight firming mesotherapy vial",
      ar: "كبسولة بيلا تايت لشد البشرة بالميزوثيرابي",
    },
    title: { en: "Bella Tight", ar: "بيلا تايت" },
    caption: {
      en: "Skin firming and tightening with collagen-supporting actives.",
      ar: "شد وتقوية للبشرة بمكونات داعمة للكولاجين.",
    },
    category: "treatments",
    linkedProductSlug: "bella-tight",
  },
  {
    id: "gs-gluta-c",
    src: "/assets/Clusa C.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Gluta C vitamin C brightening mesotherapy vial",
      ar: "كبسولة بيلا جلوتا سي للتفتيح بفيتامين سي بالميزوثيرابي",
    },
    title: { en: "Bella Gluta C", ar: "بيلا جلوتا سي" },
    caption: {
      en: "Vitamin C and glutathione brightening complex.",
      ar: "مركب تفتيح من فيتامين سي والجلوتاثيون.",
    },
    category: "specialists",
    linkedProductSlug: "bella-gluta-c",
  },
  {
    id: "gs-rosy-lips",
    src: "/assets/Rosy Lips.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Rosy Lips lip enhancement mesotherapy vial",
      ar: "كبسولة بيلا روزي ليبس لتحسين الشفاه بالميزوثيرابي",
    },
    title: { en: "Bella Rosy Lips", ar: "بيلا روزي ليبس" },
    caption: {
      en: "Lip hydration and soft plumping with hyaluronic support.",
      ar: "ترطيب وتعبئة ناعمة للشفاه بدعم الهيالورونيك.",
    },
    category: "specialists",
    linkedProductSlug: "bella-rosy-lips",
  },
  {
    id: "gs-hair-mix",
    src: "/assets/Hair Mix.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Hair Mix hair restoration mesotherapy vial",
      ar: "كبسولة بيلا هير ميكس لتجديد الشعر بالميزوثيرابي",
    },
    title: { en: "Bella Hair Mix", ar: "بيلا هير ميكس" },
    caption: {
      en: "Complete hair restoration blend with bio-stimulating support.",
      ar: "مزيج متكامل لتجديد الشعر بدعم محفز حيويا.",
    },
    category: "specialists",
    linkedProductSlug: "bella-hair-mix",
  },
  {
    id: "gs-eye-contour",
    src: "/assets/Eye Contour.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Eye Contour under-eye mesotherapy vial",
      ar: "كبسولة بيلا آي كونتور لمنطقة العين بالميزوثيرابي",
    },
    title: { en: "Bella Eye Contour", ar: "بيلا آي كونتور" },
    caption: {
      en: "Targeted formula for dark circles and puffiness.",
      ar: "تركيبة موجهة للهالات السوداء وانتفاخ العين.",
    },
    category: "specialists",
    linkedProductSlug: "bella-eye-contour",
  },
  {
    id: "gs-slim-fast",
    src: "/assets/Slim Fast.png",
    width: 400,
    height: 600,
    alt: {
      en: "Bella Slim Fast body contouring mesotherapy vial",
      ar: "كبسولة بيلا سليم فاست لنحت الجسم بالميزوثيرابي",
    },
    title: { en: "Bella Slim Fast", ar: "بيلا سليم فاست" },
    caption: {
      en: "Targeted body contouring and fat-reduction formula.",
      ar: "تركيبة موجهة لنحت الجسم وتقليل الدهون.",
    },
    category: "specialists",
    linkedProductSlug: "bella-slim-fast",
  },
];

export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategory,
): GalleryItem[] {
  if (category === "all") return items;
  return items.filter((item) => item.category === category);
}

export function getFeaturedItems(items: GalleryItem[]): GalleryItem[] {
  return items.filter((item) => item.featured);
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "all",
  "boosters",
  "treatments",
  "specialists",
];
