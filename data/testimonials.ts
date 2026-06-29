import type { LocalizedString } from "./types";

export interface Testimonial {
  id:       string;
  name:     LocalizedString;
  role:     LocalizedString;
  location: LocalizedString;
  text:     LocalizedString;
  rating:   5 | 4 | 3;
  product:  string;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Nour Al-Rashidi", ar: "نور الراشدي" },
    role: { en: "Dermatologist", ar: "طبيبة جلدية" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    text: {
      en: "I've recommended Bella's Skin Booster to over 40 patients this year alone. The multi-weight hyaluronic acid system is clinically brilliant — I see results in 48 hours that used to take two weeks with other brands.",
      ar: "أوصيتُ بأمبول بيلا سكين بوستر لأكثر من 40 مريضة هذا العام وحده. منظومة حمض الهيالورونيك متعددة الأوزان متميزة سريريًا؛ فأنا أرى خلال 48 ساعة نتائج كانت تستغرق أسبوعين مع علامات أخرى.",
    },
    rating: 5,
    product: "bella-skin-booster",
    verified: true,
  },
  {
    id: "t2",
    name: { en: "Layla Mansour", ar: "ليلى منصور" },
    role: { en: "Beauty Editor", ar: "محررة تجميل" },
    location: { en: "Dubai, UAE", ar: "دبي، الإمارات العربية المتحدة" },
    text: {
      en: "Bella Yaqoot is genuinely the first brightening mesotherapy product I've tried that does exactly what it promises. My hyperpigmentation from sun damage has faded by at least 60% after 6 sessions.",
      ar: "بيلا ياقوت هو بالفعل أول منتج ميزوثيرابي للتفتيح أجرّبه ويحقق ما يعد به تمامًا. تراجعت لديّ التصبغات الناتجة عن أضرار الشمس بنسبة لا تقل عن 60% بعد ست جلسات.",
    },
    rating: 5,
    product: "bella-yaqoot",
    verified: true,
  },
  {
    id: "t3",
    name: { en: "Sara El-Masry", ar: "سارة المصري" },
    role: { en: "Aesthetic Nurse", ar: "ممرضة تجميل" },
    location: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" },
    text: {
      en: "Bella Tight has completely changed my post-treatment firming protocol. Client results are visible from session two — the DMAE complex is the real deal.",
      ar: "غيّر بيلا تايت بروتوكول الشد بعد العلاج لديّ بالكامل. تبدأ النتائج بالظهور لدى العميلات من الجلسة الثانية، ومركّب DMAE فعّال بحق.",
    },
    rating: 5,
    product: "bella-tight",
    verified: true,
  },
  {
    id: "t4",
    name: { en: "Mariam Khalil", ar: "مريم خليل" },
    role: { en: "Spa Owner", ar: "مالكة منتجع صحي" },
    location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، المملكة العربية السعودية" },
    text: {
      en: "Bella Amber has become our best-selling treatment. Clients are seeing visible revitalization results from session two. The succinic acid formula quality is at par with European luxury brands.",
      ar: "أصبح بيلا أمبر العلاج الأكثر مبيعًا لدينا. تلاحظ العميلات نتائج واضحة في استعادة حيوية البشرة بدءًا من الجلسة الثانية، وجودة تركيبة حمض السكسينيك تضاهي العلامات الأوروبية الفاخرة.",
    },
    rating: 5,
    product: "bella-amber",
    verified: true,
  },
  {
    id: "t5",
    name: { en: "Dr. Hana Farouk", ar: "د. هناء فاروق" },
    role: { en: "Plastic Surgeon", ar: "جرّاحة تجميل" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    text: {
      en: "What separates Bella from competitors is their commitment to ingredient purity. No fillers, no unnecessary preservatives — just actives at therapeutic concentrations. This is how mesotherapy should always be.",
      ar: "ما يميّز بيلا عن المنافسين هو الالتزام بنقاء المكوّنات: لا مواد حشو ولا مواد حافظة غير ضرورية، بل مواد فعّالة بتركيزات علاجية. هكذا ينبغي أن تكون تركيبات الميزوثيرابي.",
    },
    rating: 5,
    product: "bella-skin-booster",
    verified: true,
  },
  {
    id: "t6",
    name: { en: "Yasmine Abo El Naga", ar: "ياسمين أبو النجا" },
    role: { en: "Influencer & Client", ar: "مؤثرة وعميلة" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    text: {
      en: "Six weeks of Bella Skin Booster sessions and my skin has never looked like this. I've stopped wearing foundation to work. My photographer asked what filter I was using — it was just Bella.",
      ar: "بعد ستة أسابيع من جلسات بيلا سكين بوستر، لم تبدُ بشرتي بهذا الصفاء من قبل. توقفت عن وضع كريم الأساس في العمل، حتى إن مصوّري سألني عن الفلتر الذي أستخدمه؛ ولم يكن هناك سوى بيلا.",
    },
    rating: 5,
    product: "bella-skin-booster",
    verified: true,
  },
];
