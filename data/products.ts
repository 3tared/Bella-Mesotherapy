// data/products.ts
// Bella Mesotherapy — 13 real products with full EN/AR bilingual data

import type { Locale, LocalizedString, ProductHowToStep } from './types';
export type { Locale, LocalizedString, ProductHowToStep };

export type ProductCategory =
  | 'skin-booster'
  | 'brightening'
  | 'firming'
  | 'anti-acne'
  | 'hair-care'
  | 'body-contouring'
  | 'lip-care'
  | 'eye-care'
  | 'scar-treatment';

export interface Product {
  id: string;
  name: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  longDescription: LocalizedString;
  category: ProductCategory;
  howToUse?: ProductHowToStep[];
  keyBenefits: LocalizedString[];
  volume: string;
  sessions: LocalizedString;
  image: string;
  color: {
    primary: string;
    secondary: string;
    text: string;
  };
  accentColor: string;
  featured: boolean;
  order: number;
}

/**
 * Returns a locale-flattened product for use in components.
 * Client component:  const locale = useLocale(); getLocalizedProduct(p, locale as Locale)
 * Server component:  const locale = await getLocale(); getLocalizedProduct(p, locale as Locale)
 */
export function getLocalizedProduct(
  product: Product,
  locale: Locale,
): Omit<Product, 'name' | 'subtitle' | 'description' | 'longDescription' | 'sessions' | 'keyBenefits'> & {
  name: string;
  subtitle: string;
  description: string;
  longDescription: string;
  sessions: string;
  keyBenefits: string[];
} {
  return {
    ...product,
    name: product.name[locale],
    subtitle: product.subtitle[locale],
    description: product.description[locale],
    longDescription: product.longDescription[locale],
    sessions: product.sessions[locale],
    keyBenefits: product.keyBenefits.map(b => b[locale]),
  };
}

const SESSION_PROTOCOL: LocalizedString = {
  en: 'One session every 2–3 weeks · Recommended course: 4–6 sessions',
  ar: 'جلسة واحدة كل 2–3 أسابيع · الدورة الموصى بها: 4–6 جلسات',
};

const STANDARD_VOLUME = '5 ml × 5 vials';

const HOW_TO_USE_BY_CATEGORY: Record<ProductCategory, ProductHowToStep[]> = {
  'skin-booster': [
    { en: 'Cleanse and prepare the treatment area using aseptic technique.', ar: 'نظّفي وجهّزي منطقة العلاج باتباع تقنية تعقيم مناسبة.' },
    { en: 'Apply with nappage or micro-papule mesotherapy at the appropriate dermal depth.', ar: 'طبّقي بتقنية الميزوثيرابي المناسبة مثل النفاج أو الحطاطة الدقيقة على العمق الجلدي الملائم.' },
    { en: 'Allow the formula to absorb for 10-15 minutes without touching the area.', ar: 'اتركي التركيبة تمتص لمدة 10-15 دقيقة دون لمس المنطقة.' },
    { en: 'Finish with the recommended soothing and post-treatment protocol.', ar: 'أنهي الجلسة ببروتوكول التهدئة والرعاية اللاحقة الموصى به.' },
  ],
  brightening: [
    { en: 'Cleanse thoroughly and assess pigmentation zones before treatment.', ar: 'نظّفي البشرة جيداً وقيّمي مناطق التصبغ قبل العلاج.' },
    { en: 'Apply evenly across target areas using controlled mesotherapy technique.', ar: 'طبّقي بالتساوي على المناطق المستهدفة باستخدام تقنية ميزوثيرابي محكمة.' },
    { en: 'Let the brightening actives settle, then protect the treated area from UV exposure.', ar: 'اتركي المكونات المضيئة تستقر ثم احمي المنطقة المعالجة من التعرض للأشعة فوق البنفسجية.' },
    { en: 'Repeat according to the 2-3 week professional course for cumulative radiance.', ar: 'كرري وفق دورة مهنية كل 2-3 أسابيع للحصول على إشراق تراكمي.' },
  ],
  firming: [
    { en: 'Cleanse and map areas of laxity before application.', ar: 'نظّفي وحددي مناطق الترهل قبل التطبيق.' },
    { en: 'Use retrograde or micro-papule technique along lifting vectors.', ar: 'استخدمي تقنية الرجعي أو الحطاطة الدقيقة على مسارات الرفع.' },
    { en: 'Massage only as professionally indicated to support even distribution.', ar: 'دلّكي فقط حسب الإرشاد المهني لدعم التوزيع المتساوي.' },
    { en: 'Complete with a calming protocol and schedule the next firming session.', ar: 'أكملي ببروتوكول تهدئة وحددي موعد جلسة الشد التالية.' },
  ],
  'anti-acne': [
    { en: 'Cleanse the skin and avoid active inflamed or compromised areas.', ar: 'نظّفي البشرة وتجنبي المناطق الملتهبة أو المتضررة.' },
    { en: 'Apply precisely to acne-prone zones using sterile micro-papule technique.', ar: 'طبّقي بدقة على المناطق المعرضة للحبوب باستخدام تقنية الحطاطة الدقيقة المعقمة.' },
    { en: 'Allow the balancing actives to absorb before applying post-care.', ar: 'اتركي المكونات المنظمة تمتص قبل تطبيق الرعاية اللاحقة.' },
    { en: 'Continue the recommended course while monitoring skin response.', ar: 'استمري في الدورة الموصى بها مع متابعة استجابة البشرة.' },
  ],
  'hair-care': [
    { en: 'Cleanse the scalp and identify thinning or low-density zones.', ar: 'نظّفي فروة الرأس وحددي مناطق التساقط أو انخفاض الكثافة.' },
    { en: 'Apply with scalp mesotherapy technique across the target grid.', ar: 'طبّقي بتقنية ميزوثيرابي فروة الرأس عبر شبكة المناطق المستهدفة.' },
    { en: 'Leave the scalp undisturbed after application to support direct delivery.', ar: 'اتركي فروة الرأس دون لمس بعد التطبيق لدعم التوصيل المباشر.' },
    { en: 'Follow the professional session interval for progressive follicle support.', ar: 'اتبعي الفاصل المهني بين الجلسات لدعم البصيلات تدريجياً.' },
  ],
  'body-contouring': [
    { en: 'Cleanse and mark localized contouring areas before treatment.', ar: 'نظّفي وحددي مناطق النحت الموضعي قبل العلاج.' },
    { en: 'Administer only by professional protocol at the correct adipose depth.', ar: 'يُطبّق فقط وفق البروتوكول المهني وعلى عمق النسيج الدهني الصحيح.' },
    { en: 'Support the session with post-treatment lymphatic and hydration guidance.', ar: 'ادعمي الجلسة بإرشادات التصريف اللمفاوي والترطيب بعد العلاج.' },
    { en: 'Repeat at the recommended interval for visible contour refinement.', ar: 'كرري في الفاصل الموصى به لتحسين مظهر التناسق تدريجياً.' },
  ],
  'lip-care': [
    { en: 'Cleanse and disinfect the lip and perioral area carefully.', ar: 'نظّفي وطهّري الشفاه والمنطقة المحيطة بها بعناية.' },
    { en: 'Apply with a delicate micro-papule technique suited to sensitive lip tissue.', ar: 'طبّقي بتقنية الحطاطة الدقيقة اللطيفة المناسبة لأنسجة الشفاه الحساسة.' },
    { en: 'Allow the formula to settle without pressure or makeup immediately after.', ar: 'اتركي التركيبة تستقر دون ضغط أو مكياج مباشرة بعد الجلسة.' },
    { en: 'Finish with professional aftercare for comfort and hydration.', ar: 'أنهي برعاية لاحقة مهنية للراحة والترطيب.' },
  ],
  'eye-care': [
    { en: 'Cleanse gently and assess the under-eye area before application.', ar: 'نظّفي بلطف وقيّمي منطقة تحت العين قبل التطبيق.' },
    { en: 'Use only a controlled superficial technique appropriate for the eye contour.', ar: 'استخدمي فقط تقنية سطحية محكمة مناسبة لمحيط العين.' },
    { en: 'Avoid pressure on the area while the formula absorbs.', ar: 'تجنبي الضغط على المنطقة أثناء امتصاص التركيبة.' },
    { en: 'Complete with cooling, soothing aftercare as professionally indicated.', ar: 'أكملي برعاية مهدئة ومبرّدة حسب الإرشاد المهني.' },
  ],
  'scar-treatment': [
    { en: 'Cleanse the area and evaluate scar texture and sensitivity.', ar: 'نظّفي المنطقة وقيّمي ملمس الندبة وحساسيتها.' },
    { en: 'Apply with focused mesotherapy passes around uneven texture.', ar: 'طبّقي بتمريرات ميزوثيرابي مركزة حول القوام غير المتساوي.' },
    { en: 'Allow the repair complex to settle before covering or applying pressure.', ar: 'اتركي مركب الإصلاح يستقر قبل التغطية أو الضغط.' },
    { en: 'Repeat consistently to support gradual texture refinement.', ar: 'كرري بانتظام لدعم تحسين الملمس تدريجياً.' },
  ],
};

export const products: Product[] = [

  // ─── 01 BELLA SKIN BOOSTER ───────────────────────────────────────────────────
  {
    id: 'bella-skin-booster',
    name: { en: 'Bella Skin Booster', ar: 'بيلا سكن بوستر' },
    subtitle: { en: 'Deep Hydration & Rejuvenation', ar: 'الترطيب العميق والتجديد' },
    description: {
      en: 'An advanced mesotherapy solution formulated to deeply hydrate and revitalize the skin. Combines non-crosslinked Hyaluronic Acid with peptides, amino acids, and brightening agents to improve elasticity, enhance radiance, and stimulate collagen production.',
      ar: 'محلول ميزوثيرابي متطور لترطيب البشرة بعمق وإحيائها. يجمع بين حمض الهيالورونيك غير المترابط والببتيدات والأحماض الأمينية وعوامل الإشراق لتحسين المرونة وتعزيز النضارة وتحفيز إنتاج الكولاجين.',
    },
    longDescription: {
      en: 'A foundational mesotherapy formula built around non-crosslinked Hyaluronic Acid as its primary vehicle. The complete peptide and amino acid complex provides the building blocks skin needs for self-repair and renewal, while brightening agents enhance natural luminosity. Suitable as a standalone treatment or as a preparation base for more advanced protocols. Ideal for dull, dehydrated, or aging skin requiring comprehensive restoration.',
      ar: 'معادلة ميزوثيرابي أساسية مبنية على حمض الهيالورونيك غير المترابط كناقل رئيسي. يوفر مركّب الببتيدات والأحماض الأمينية المكمّلة اللبنات الأساسية التي تحتاجها البشرة للإصلاح الذاتي والتجديد، بينما تعزز عوامل الإشراق النضارة الطبيعية. يصلح علاجاً قائماً بذاته أو قاعدة تحضيرية للبروتوكولات المتقدمة.',
    },
    category: 'skin-booster',
    howToUse: HOW_TO_USE_BY_CATEGORY['skin-booster'],
    keyBenefits: [
      { en: 'Deep skin hydration and rejuvenation', ar: 'ترطيب عميق وتجديد للبشرة' },
      { en: 'Improves skin elasticity', ar: 'تحسين مرونة الجلد' },
      { en: 'Reduces fine lines and early wrinkles', ar: 'تقليل الخطوط الرفيعة والتجاعيد المبكرة' },
      { en: 'Skin brightening and tone correction', ar: 'تفتيح البشرة وتصحيح لونها' },
      { en: 'Treats dull and tired skin', ar: 'علاج البشرة الباهتة والمتعبة' },
      { en: 'Supports collagen production', ar: 'دعم إنتاج الكولاجين' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Skin Booster.webp',
    color: { primary: '#EDF8FA', secondary: '#B8E4EC', text: '#1A5560' },
    accentColor: '#5BA8B5',
    featured: true,
    order: 1,
  },

  // ─── 02 BELLA YAQOOT ─────────────────────────────────────────────────────────
  {
    id: 'bella-yaqoot',
    name: { en: 'Bella Yaqoot', ar: 'بيلا ياقوت' },
    subtitle: { en: 'Ruby Brightening & Renewal', ar: 'الإشراق الياقوتي والتجديد' },
    description: {
      en: 'An advanced mesotherapy skin booster that combines multi-molecular Hyaluronic Acid with Glutathione, Niacinamide, peptides, and essential nutrients to improve skin tone, enhance hydration, and promote overall skin renewal.',
      ar: 'معزز بشرة ميزوثيرابي متطور يجمع بين حمض الهيالورونيك متعدد الجزيئات والجلوتاثيون والنياسيناميد والببتيدات والعناصر الغذائية الأساسية لتحسين لون البشرة وتعزيز الترطيب وتعزيز تجديد الجلد الشامل.',
    },
    longDescription: {
      en: 'Named after the ruby gemstone, this multi-molecular Hyaluronic Acid formula penetrates multiple skin depths simultaneously for profound hydration. The Glutathione and Niacinamide complex works to equalize and brighten tone at the cellular level, while bioactive peptides trigger structural renewal. The synergistic blend delivers a cumulative brightening and rejuvenating effect that intensifies with each session.',
      ar: 'سُمّي باسم الحجر الكريم الياقوت، تخترق هذه المعادلة بحمض الهيالورونيك متعدد الجزيئات طبقات الجلد المتعددة في آنٍ واحد لترطيب عميق متكامل. يعمل مركّب الجلوتاثيون والنياسيناميد على تسوية الإشراق وتفتيحه على المستوى الخلوي، بينما تُحفّز الببتيدات الحيوية التجديد البنيوي.',
    },
    category: 'brightening',
    howToUse: HOW_TO_USE_BY_CATEGORY.brightening,
    keyBenefits: [
      { en: 'Skin brightening and tone correction', ar: 'تفتيح البشرة وتصحيح لونها' },
      { en: 'Deep hydration and skin nourishment', ar: 'ترطيب عميق وتغذية للبشرة' },
      { en: 'Improves uneven skin tone', ar: 'تحسين تجانس لون البشرة' },
      { en: 'Enhances skin radiance', ar: 'تعزيز إشراق البشرة' },
      { en: 'Supports skin rejuvenation and repair', ar: 'دعم تجديد الجلد وإصلاحه' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Yaqoot.webp',
    color: { primary: '#FEF0F4', secondary: '#F4C4D0', text: '#5C0A22' },
    accentColor: '#8B1A40',
    featured: true,
    order: 2,
  },

  // ─── 03 BELLA AMBER ──────────────────────────────────────────────────────────
  {
    id: 'bella-amber',
    name: { en: 'Bella Amber', ar: 'بيلا أمبر' },
    subtitle: { en: 'Radiance & Vitality Booster', ar: 'معزّز الإشراق والحيوية' },
    description: {
      en: 'An advanced mesotherapy skin booster that combines Hyaluronic Acid with Succinic Acid, multivitamins, and amino acids to deeply hydrate, improve elasticity, and revitalize tired and dull skin.',
      ar: 'معزز بشرة ميزوثيرابي متطور يجمع بين حمض الهيالورونيك وحمض السكسينيك والفيتامينات المتعددة والأحماض الأمينية لترطيب البشرة بعمق وتحسين مرونتها وإحياء البشرة المتعبة والباهتة.',
    },
    longDescription: {
      en: 'Succinic acid — the star active in this formula — operates at the cellular energy level, reviving fatigued skin metabolism and accelerating natural regenerative processes. Multi-weight Hyaluronic Acid addresses hydration at every skin depth simultaneously, while the multivitamin and amino acid complex delivers essential nutritional support. The result is an immediate boost in luminosity and a progressive improvement in skin quality over a treatment course.',
      ar: 'حمض السكسينيك — النجم الفعّال في هذه المعادلة — يعمل على مستوى الطاقة الخلوية، مُحييًا عملية الأيض في البشرة المتعبة ومُسرّعاً العمليات التجديدية الطبيعية. يعالج حمض الهيالورونيك متعدد الأوزان ترطيب كل طبقة جلدية في آنٍ واحد، بينما يوفر مركّب الفيتامينات والأحماض الأمينية الدعم الغذائي الأساسي.',
    },
    category: 'skin-booster',
    howToUse: HOW_TO_USE_BY_CATEGORY['skin-booster'],
    keyBenefits: [
      { en: 'Deep skin hydration and revitalization', ar: 'ترطيب عميق وإحياء للبشرة' },
      { en: 'Improves skin elasticity', ar: 'تحسين مرونة الجلد' },
      { en: 'Enhances natural radiance', ar: 'تعزيز الإشراق الطبيعي' },
      { en: 'Reduces signs of fatigue', ar: 'تقليل علامات الإرهاق' },
      { en: 'Supports skin regeneration', ar: 'دعم تجديد الجلد' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Amber.webp',
    color: { primary: '#FEF3E8', secondary: '#F7D9B0', text: '#6B3A1F' },
    accentColor: '#C8732A',
    featured: true,
    order: 3,
  },

  // ─── 04 BELLA TIGHT ──────────────────────────────────────────────────────────
  {
    id: 'bella-tight',
    name: { en: 'Bella Tight', ar: 'بيلا تايت' },
    subtitle: { en: 'Firming & Lifting Complex', ar: 'مركّب الشد والرفع' },
    description: {
      en: 'An advanced mesotherapy solution that combines Hyaluronic Acid with a powerful complex of DMAE, organic silica, and peptides to improve skin firmness, support collagen synthesis, and restore a visibly lifted appearance.',
      ar: 'محلول ميزوثيرابي متطور يجمع بين حمض الهيالورونيك ومركّب قوي من DMAE والسيليكا العضوية والببتيدات لتحسين شد الجلد ودعم تكوين الكولاجين واستعادة المظهر المرفوع.',
    },
    longDescription: {
      en: 'Bella Tight delivers a precision firming treatment powered by DMAE, a bioelectrical stimulant that tightens surface musculature, combined with organic silica to reinforce collagen fibre architecture. The peptide complex signals dermal fibroblasts to accelerate collagen and elastin synthesis. Non-crosslinked Hyaluronic Acid provides immediate volumizing hydration while the complete formula works synergistically to restore structural integrity, enhance elasticity, and deliver a visibly contoured appearance after each session.',
      ar: 'يُقدّم بيلا تايت علاجاً دقيقاً للشد مدعوماً بـ DMAE، المحفّز الكهربائي الحيوي الذي يُحكم شد العضلات السطحية، إلى جانب السيليكا العضوية لتعزيز بنية ألياف الكولاجين. يُصدر مركّب الببتيدات إشارات لأرومات الجلد لتسريع تخليق الكولاجين والإيلاستين، بينما يوفر حمض الهيالورونيك غير المترابط ترطيباً فورياً.',
    },
    category: 'firming',
    howToUse: HOW_TO_USE_BY_CATEGORY.firming,
    keyBenefits: [
      { en: 'Improves skin firmness and elasticity', ar: 'تحسين شد الجلد ومرونته' },
      { en: 'Reduces skin laxity', ar: 'تقليل ترهل الجلد' },
      { en: 'Supports skin tightening and lifting', ar: 'دعم شد البشرة ورفعها' },
      { en: 'Enhances collagen production', ar: 'تعزيز إنتاج الكولاجين' },
      { en: 'Improves facial contours and skin tone', ar: 'تحسين ملامح الوجه وتوحيد لون البشرة' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Bella Tight.png',
    color: { primary: '#F5F0EB', secondary: '#E5D9CC', text: '#4A3728' },
    accentColor: '#9B8B7A',
    featured: false,
    order: 4,
  },

  // ─── 05 BELLA DEEP WHITENING ─────────────────────────────────────────────────
  {
    id: 'bella-deep-whitening',
    name: { en: 'Bella Deep Whitening', ar: 'بيلا ديب وايتنينج' },
    subtitle: { en: 'Advanced Depigmentation Complex', ar: 'مركّب التفتيح العميق المتقدم' },
    description: {
      en: 'An advanced mesotherapy solution that combines Hyaluronic Acid with Glutathione, Tranexamic Acid, Niacinamide, and brightening agents to reduce discoloration, improve skin clarity, and promote an even complexion.',
      ar: 'محلول ميزوثيرابي متطور يجمع بين حمض الهيالورونيك والجلوتاثيون وحمض الترانيكساميك والنياسيناميد وعوامل الإشراق لتقليل التغيرات اللونية وتحسين صفاء البشرة وتعزيز النضارة المتجانسة.',
    },
    longDescription: {
      en: 'A triple-action depigmentation formula: Glutathione suppresses melanin synthesis from within, Tranexamic Acid blocks UV-induced pigmentation cascades, and Niacinamide prevents melanosome transfer to surface cells. Together they create a comprehensive brightening effect that targets existing discoloration while preventing new spots from forming. Hyaluronic Acid ensures optimal delivery and skin comfort throughout the treatment.',
      ar: 'معادلة تفتيح ثلاثية المفعول: يثبط الجلوتاثيون تخليق الميلانين من الداخل، ويحجب حمض الترانيكساميك سلاسل التصبغ الناجمة عن الأشعة فوق البنفسجية، ويمنع النياسيناميد انتقال الميلانوزومات إلى خلايا السطح. يخلق هذا المثلث الفعّال تأثيراً شاملاً للتفتيح يستهدف التصبغات الموجودة مع منع تكوّن البقع الجديدة.',
    },
    category: 'brightening',
    howToUse: HOW_TO_USE_BY_CATEGORY.brightening,
    keyBenefits: [
      { en: 'Reduces hyperpigmentation and dark spots', ar: 'تقليل التصبغات والبقع الداكنة' },
      { en: 'Treats melasma and uneven skin tone', ar: 'علاج الكلف وتوحيد لون البشرة' },
      { en: 'Skin brightening and whitening support', ar: 'تفتيح البشرة ودعم بياضها' },
      { en: 'Improves skin clarity and radiance', ar: 'تحسين صفاء البشرة ونضارتها' },
      { en: 'Prevents pigmentation recurrence', ar: 'الوقاية من عودة التصبغات' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Deep Whitening.png',
    color: { primary: '#F4F2FA', secondary: '#DDD8F0', text: '#3B2D6B' },
    accentColor: '#9B8EC4',
    featured: false,
    order: 5,
  },

  // ─── 06 BELLA ULTRA GLOW ─────────────────────────────────────────────────────
  {
    id: 'bella-ultra-glow',
    name: { en: 'Bella Ultra Glow', ar: 'بيلا ألترا جلو' },
    subtitle: { en: 'Luminosity & Tone Perfecting', ar: 'إكمال اللمعان وتوحيد اللون' },
    description: {
      en: 'An advanced mesotherapy solution formulated to brighten and even out skin tone. Combines non-crosslinked Hyaluronic Acid with brightening agents, antioxidants, and peptides to reduce pigmentation, enhance radiance, and promote a more luminous complexion.',
      ar: 'محلول ميزوثيرابي متطور لتفتيح البشرة وتوحيد لونها. يجمع بين حمض الهيالورونيك غير المترابط وعوامل الإشراق ومضادات الأكسدة والببتيدات لتقليل التصبغات وتعزيز النضارة وتعزيز البشرة المضيئة.',
    },
    longDescription: {
      en: 'A comprehensive luminosity formula combining multiple brightening mechanisms in one treatment. Hyaluronic Acid provides immediate plumping and surface glow, brightening agents target pigmentation-producing enzymes, antioxidants neutralize free radical damage, and peptides stimulate healthy cell turnover. The result is a cumulative brightening effect that deepens and intensifies with each session of the recommended course.',
      ar: 'معادلة إشراق شاملة تجمع آليات تفتيح متعددة في علاج واحد. يوفر حمض الهيالورونيك انتفاخاً فورياً وتوهجاً سطحياً، وتستهدف عوامل الإشراق إنزيمات إنتاج الصبغة، وتُحيّد مضادات الأكسدة أضرار الجذور الحرة، وتُحفّز الببتيدات دوران خلوي صحي.',
    },
    category: 'brightening',
    howToUse: HOW_TO_USE_BY_CATEGORY.brightening,
    keyBenefits: [
      { en: 'Skin brightening and tone correction', ar: 'تفتيح البشرة وتصحيح لونها' },
      { en: 'Reduces hyperpigmentation and dark spots', ar: 'تقليل التصبغات والبقع الداكنة' },
      { en: 'Improves uneven skin tone', ar: 'تحسين تجانس لون البشرة' },
      { en: 'Enhances skin radiance', ar: 'تعزيز إشراق البشرة' },
      { en: 'Treats dull and tired skin', ar: 'علاج البشرة الباهتة والمتعبة' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Ultra Glow.png',
    color: { primary: '#FAF4EC', secondary: '#EDD8B0', text: '#4A3418' },
    accentColor: '#C9A96E',
    featured: false,
    order: 6,
  },

  // ─── 07 BELLA GLUTA C ────────────────────────────────────────────────────────
  {
    id: 'bella-gluta-c',
    name: { en: 'Bella Gluta C', ar: 'بيلا جلوتا سي' },
    subtitle: { en: 'Brightening & Antioxidant Defense', ar: 'التفتيح والحماية بمضادات الأكسدة' },
    description: {
      en: 'An advanced mesotherapy solution formulated to enhance skin brightness and provide antioxidant protection. Combines Vitamin C to reduce pigmentation and improve overall skin clarity and luminosity.',
      ar: 'محلول ميزوثيرابي متطور لتعزيز إشراق البشرة وتوفير الحماية بمضادات الأكسدة. يحتوي على فيتامين C لتقليل التصبغات وتحسين صفاء البشرة وإشراقها بشكل عام.',
    },
    longDescription: {
      en: 'High-potency Vitamin C delivered via mesotherapy bypasses the skin barrier limitations of topical products, ensuring direct cellular delivery. Administered in combination with Glutathione, the brightening effect is amplified through complementary anti-melanogenic pathways. The antioxidant pairing provides comprehensive protection against environmental pigmentation triggers including UV radiation and oxidative stress.',
      ar: 'فيتامين C عالي الفاعلية يُعطى عبر الميزوثيرابي، متجاوزاً قيود الحاجز الجلدي للمنتجات الموضعية لضمان التوصيل الخلوي المباشر. يُعطى بالتوازي مع الجلوتاثيون لتضخيم تأثير التفتيح عبر مسارات مضادة للميلانين مكمّلة.',
    },
    category: 'brightening',
    howToUse: HOW_TO_USE_BY_CATEGORY.brightening,
    keyBenefits: [
      { en: 'Reduces pigmentation and dark spots', ar: 'تقليل التصبغات والبقع الداكنة' },
      { en: 'Skin brightening and whitening support', ar: 'تفتيح البشرة ودعم بياضها' },
      { en: 'Antioxidant protection', ar: 'حماية مضادة للأكسدة' },
      { en: 'Improves skin clarity', ar: 'تحسين صفاء البشرة' },
      { en: 'Enhances even skin tone', ar: 'تعزيز توحيد لون البشرة' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Clusa C.png',
    color: { primary: '#FEF5E4', secondary: '#F5DCA0', text: '#5A3A00' },
    accentColor: '#C48C2C',
    featured: false,
    order: 7,
  },

  // ─── 08 BELLA ACNE FREE ──────────────────────────────────────────────────────
  {
    id: 'bella-acne-free',
    name: { en: 'Bella Acne Free', ar: 'بيلا أكني فري' },
    subtitle: { en: 'Acne Control & Clear Skin', ar: 'التحكم بحبوب الشباب وصفاء البشرة' },
    description: {
      en: 'An advanced mesotherapy solution formulated to treat active acne and regulate excess sebum. Combines non-crosslinked Hyaluronic Acid with Retinol, Niacinamide, Glycolic Acid, and Kojic Acid to target breakouts, reduce inflammation, and improve skin clarity.',
      ar: 'محلول ميزوثيرابي متطور لعلاج حبوب الشباب النشطة وتنظيم الإفراز الزائد للزهم. يجمع بين حمض الهيالورونيك غير المترابط والرتينول والنياسيناميد وحمض الجليكوليك وحمض الكوجيك لاستهداف الحبوب وتقليل الالتهاب وتحسين صفاء البشرة.',
    },
    longDescription: {
      en: 'A multi-target formula addressing the four root causes of acne: excess sebum (Niacinamide), clogged pores (Retinol), surface congestion (Glycolic Acid), and post-inflammatory hyperpigmentation (Kojic Acid). The 20mg Hyaluronic Acid base ensures the treatment is non-stripping, maintaining the skin barrier integrity while the actives work deep within pores. This comprehensive approach addresses both active breakouts and their aftermath.',
      ar: 'معادلة متعددة الأهداف تعالج الأسباب الجذرية الأربعة لحبوب الشباب: زيادة الزهم (النياسيناميد)، انسداد المسام (الرتينول)، الاحتقان السطحي (حمض الجليكوليك)، وفرط التصبغ الالتهابي (حمض الكوجيك). تضمن قاعدة حمض الهيالورونيك أن يكون العلاج غير مُجفَّف مع الحفاظ على سلامة الحاجز الجلدي.',
    },
    category: 'anti-acne',
    howToUse: HOW_TO_USE_BY_CATEGORY['anti-acne'],
    keyBenefits: [
      { en: 'Manages acne-prone skin', ar: 'تنظيم البشرة الميالة لحبوب الشباب' },
      { en: 'Reduces active breakouts', ar: 'تقليل حبوب الشباب النشطة' },
      { en: 'Regulates excess sebum production', ar: 'تنظيم الإفراز الزائد للزهم' },
      { en: 'Minimizes pore appearance', ar: 'تقليل ظهور المسام' },
      { en: 'Soothes inflamed and irritated skin', ar: 'تهدئة الجلد الملتهب والمهيج' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Acne Free.png',
    color: { primary: '#EDF8F4', secondary: '#B8E4D4', text: '#1A4A38' },
    accentColor: '#6BA888',
    featured: false,
    order: 8,
  },

  // ─── 09 BELLA ANTI-SCAR ──────────────────────────────────────────────────────
  {
    id: 'bella-anti-scar',
    name: { en: 'Bella Anti-Scar', ar: 'بيلا أنتي سكار' },
    subtitle: { en: 'Scar Repair & Skin Renewal', ar: 'إصلاح الندبات وتجديد الجلد' },
    description: {
      en: 'An advanced mesotherapy solution formulated to improve the appearance of scars and support skin regeneration. Combines non-crosslinked Hyaluronic Acid with peptides, repair-enhancing agents, and skin-renewing ingredients to promote healing and smooth skin texture.',
      ar: 'محلول ميزوثيرابي متطور لتحسين مظهر الندبات ودعم تجديد الجلد. يجمع بين حمض الهيالورونيك غير المترابط والببتيدات وعوامل تعزيز الإصلاح والمكونات المجددة للجلد لتعزيز الشفاء وتنعيم قوام البشرة.',
    },
    longDescription: {
      en: 'The repair-focused peptide complex targets extracellular matrix remodeling, encouraging the replacement of irregular scar tissue with organized collagen fibres. Non-crosslinked Hyaluronic Acid creates an optimal healing microenvironment by maintaining skin hydration at the treatment site. Repair-enhancing agents accelerate the skin\'s natural regeneration cycle, progressively softening and evening out texture for a more refined skin surface.',
      ar: 'يستهدف مركّب الببتيدات المخصص للإصلاح إعادة تشكيل المصفوفة خارج الخلوية، مُشجّعاً على استبدال نسيج الندبة غير المنتظم بألياف كولاجين منظمة. يخلق حمض الهيالورونيك غير المترابط بيئة تعافٍ مثالية بالحفاظ على ترطيب الجلد في موقع العلاج.',
    },
    category: 'scar-treatment',
    howToUse: HOW_TO_USE_BY_CATEGORY['scar-treatment'],
    keyBenefits: [
      { en: 'Improves scar appearance', ar: 'تحسين مظهر الندبات' },
      { en: 'Reduces post-acne marks', ar: 'تقليل آثار حبوب الشباب' },
      { en: 'Supports skin regeneration', ar: 'دعم تجديد الجلد' },
      { en: 'Smooths uneven skin texture', ar: 'تنعيم وتوحيد قوام الجلد' },
      { en: 'Enhances skin healing process', ar: 'تعزيز عملية شفاء الجلد' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Scar Free.png',
    color: { primary: '#EFF5F0', secondary: '#C4DEC8', text: '#2A4A2E' },
    accentColor: '#7A9E7E',
    featured: false,
    order: 9,
  },

  // ─── 10 BELLA ROSY LIPS ──────────────────────────────────────────────────────
  {
    id: 'bella-rosy-lips',
    name: { en: 'Bella Rosy Lips', ar: 'بيلا رُوزي ليبس' },
    subtitle: { en: 'Lip Hydration & Enhancement', ar: 'ترطيب الشفاه وتجميلها' },
    description: {
      en: 'An advanced mesotherapy solution formulated to hydrate, nourish, and enhance lip appearance. Combines non-crosslinked Hyaluronic Acid with peptides, vitamins, and revitalizing agents to improve lip color, smoothness, and softness.',
      ar: 'محلول ميزوثيرابي متطور لترطيب الشفاه وتغذيتها وتعزيز مظهرها. يجمع بين حمض الهيالورونيك غير المترابط والببتيدات والفيتامينات وعوامل الإحياء لتحسين لون الشفاه ونعومتها وطراوتها.',
    },
    longDescription: {
      en: 'Specifically calibrated for the thinner, more sensitive perioral skin, this formula uses non-crosslinked Hyaluronic Acid for subtle plumping and deep moisture retention. The vitamin complex restores natural lip pigmentation that fades with age, while collagen-stimulating peptides improve structural integrity of the lip tissue. Revitalizing agents enhance microcirculation for a naturally fuller and healthier lip appearance.',
      ar: 'مُعايَرة خصيصاً لجلد منطقة الشفاه الأرقّ والأكثر حساسية، تستخدم هذه المعادلة حمض الهيالورونيك غير المترابط للإضافة الخفيفة للحجم والحفاظ العميق على الترطيب. يستعيد مركّب الفيتامينات صبغة الشفاه الطبيعية التي تتلاشى مع التقدم في العمر، بينما تُحسّن الببتيدات المحفّزة للكولاجين السلامة البنيوية لنسيج الشفاه.',
    },
    category: 'lip-care',
    howToUse: HOW_TO_USE_BY_CATEGORY['lip-care'],
    keyBenefits: [
      { en: 'Lip hydration and nourishment', ar: 'ترطيب الشفاه وتغذيتها' },
      { en: 'Improves lip color and tone', ar: 'تحسين لون الشفاه وتجانسه' },
      { en: 'Enhances lip smoothness', ar: 'تعزيز نعومة الشفاه' },
      { en: 'Reduces dryness and cracks', ar: 'تقليل الجفاف والتشقق' },
      { en: 'Restores soft and healthy lips', ar: 'استعادة الشفاه الطرية والصحية' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Rosy Lips.png',
    color: { primary: '#FEF0F3', secondary: '#F5C4D0', text: '#5C1A2E' },
    accentColor: '#C47A8A',
    featured: false,
    order: 10,
  },

  // ─── 11 BELLA HAIR MIX ───────────────────────────────────────────────────────
  {
    id: 'bella-hair-mix',
    name: { en: 'Bella Hair Mix', ar: 'بيلا هير ميكس' },
    subtitle: { en: 'Hair Growth Stimulation', ar: 'تحفيز نمو الشعر' },
    description: {
      en: 'An advanced mesotherapy solution formulated to stimulate hair follicles and promote healthy, stronger hair growth. Combines non-crosslinked Hyaluronic Acid with Minoxidil and a potent blend of clinically supported ingredients to enhance scalp health and reduce hair thinning.',
      ar: 'محلول ميزوثيرابي متطور مُصمَّم لتحفيز بصيلات الشعر وتعزيز نموه الصحي والأقوى. يجمع بين حمض الهيالورونيك غير المترابط والمينوكسيديل ومزيج قوي من المكونات المدعومة سريرياً لتعزيز صحة فروة الرأس وتقليل تساقط الشعر.',
    },
    longDescription: {
      en: 'Minoxidil — the clinically validated hair growth active — is paired with non-crosslinked Hyaluronic Acid as an optimal mesotherapy vehicle, ensuring direct delivery to the dermal papilla and dramatically improving efficacy versus topical application alone. The Hyaluronic Acid base simultaneously improves scalp hydration and microcirculation. This combination addresses the three key drivers of hair loss: follicle activity, scalp health, and blood supply to the hair bulb.',
      ar: 'يُقترن المينوكسيديل — مُنشّط نمو الشعر المُعتمَد سريرياً — بحمض الهيالورونيك غير المترابط كناقل ميزوثيرابي مثالي، مما يضمن التوصيل المباشر للحليمة الجلدية ويُحسّن الفاعلية بشكل ملحوظ مقارنةً بالتطبيق الموضعي وحده.',
    },
    category: 'hair-care',
    howToUse: HOW_TO_USE_BY_CATEGORY['hair-care'],
    keyBenefits: [
      { en: 'Stimulates hair follicle activity', ar: 'تحفيز نشاط بصيلات الشعر' },
      { en: 'Reduces hair thinning and loss', ar: 'تقليل ترقق الشعر وتساقطه' },
      { en: 'Improves scalp health and circulation', ar: 'تحسين صحة فروة الرأس والدورة الدموية' },
      { en: 'Supports growth phase prolongation', ar: 'دعم إطالة مرحلة النمو' },
      { en: 'Strengthens weak and fragile hair', ar: 'تقوية الشعر الضعيف والهش' },
      { en: 'Addresses postpartum hair loss', ar: 'معالجة تساقط الشعر بعد الولادة' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Hair Mix.png',
    color: { primary: '#F5EEE8', secondary: '#D4B89A', text: '#3A1A0A' },
    accentColor: '#6B4226',
    featured: false,
    order: 12,
  },

  // ─── 12 BELLA EYE CONTOUR ────────────────────────────────────────────────────
  {
    id: 'bella-eye-contour',
    name: { en: 'Bella Eye Contour', ar: 'بيلا آي كونتور' },
    subtitle: { en: 'Dark Circle & Eye Area Correction', ar: 'تصحيح الهالات السوداء ومنطقة العين' },
    description: {
      en: 'An advanced mesotherapy solution formulated to target dark circles and signs of fatigue around the eyes. Combines non-crosslinked Hyaluronic Acid with peptides, brightening agents, and microcirculation enhancers to reduce discoloration and refresh the eye area.',
      ar: 'محلول ميزوثيرابي متطور يستهدف الهالات السوداء وعلامات الإرهاق حول العينين. يجمع بين حمض الهيالورونيك غير المترابط والببتيدات وعوامل الإشراق ومحسّنات الدورة الدموية الدقيقة لتقليل التغير اللوني وتجديد منطقة العين.',
    },
    longDescription: {
      en: 'The periorbital area demands specialized treatment due to its uniquely thin skin and limited lymphatic drainage. Microcirculation enhancers target vascular congestion — the primary cause of bluish dark circles — while peptides strengthen fragile capillary walls to prevent future pooling. Brightening agents address melanin-based discoloration, and Hyaluronic Acid plumps the hollow-looking area under the eye for a genuinely refreshed appearance.',
      ar: 'تستدعي المنطقة المحيطة بالعين علاجاً متخصصاً بسبب رقّة جلدها الفريدة ومحدودية تصريفها اللمفاوي. تستهدف محسّنات الدورة الدموية الدقيقة الاحتقان الوعائي — السبب الرئيسي للهالات الداكنة المزرقة — بينما تُقوّي الببتيدات جدران الشعيرات الهشة لمنع التجمع المستقبلي.',
    },
    category: 'eye-care',
    howToUse: HOW_TO_USE_BY_CATEGORY['eye-care'],
    keyBenefits: [
      { en: 'Reduces dark circles', ar: 'تقليل الهالات السوداء' },
      { en: 'Improves under-eye skin tone', ar: 'تحسين لون بشرة ما تحت العين' },
      { en: 'Enhances microcirculation', ar: 'تعزيز الدورة الدموية الدقيقة' },
      { en: 'Reduces puffiness and fatigue signs', ar: 'تقليل الانتفاخ وعلامات الإرهاق' },
      { en: 'Smooths fine lines around the eyes', ar: 'تنعيم الخطوط الدقيقة حول العينين' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Eye Contour.png',
    color: { primary: '#F3F0FA', secondary: '#D0C8F0', text: '#2E2460' },
    accentColor: '#7B6BA8',
    featured: false,
    order: 11,
  },

  // ─── 13 BELLA SLIM FAST ──────────────────────────────────────────────────────
  {
    id: 'bella-slim-fast',
    name: { en: 'Bella Slim Fast', ar: 'بيلا سليم فاست' },
    subtitle: { en: 'Body Contouring & Fat Reduction', ar: 'نحت الجسم وتقليص الدهون' },
    description: {
      en: 'An advanced mesotherapy solution designed to target localized fat deposits and enhance body contouring. Combines Phosphatidylcholine and Sodium Deoxycholate with L-Carnitine and Caffeine for targeted fat dissolution and improved body contour.',
      ar: 'محلول ميزوثيرابي متطور مُصمَّم لاستهداف رواسب الدهون الموضعية وتحسين تناسق الجسم. يجمع بين الفوسفاتيديل كولين وديوكسيكولات الصوديوم مع L-كارنيتين والكافيين لتحليل الدهون الموجّه وتحسين نحت الجسم.',
    },
    longDescription: {
      en: 'Phosphatidylcholine and Sodium Deoxycholate work synergistically to emulsify adipocyte membranes, triggering permanent fat cell disruption in precisely targeted areas. L-Carnitine then facilitates the metabolic transport of released fatty acids for elimination, while Caffeine stimulates local microcirculation to enhance lymphatic drainage and visibly reduce cellulite appearance.',
      ar: 'يتعاون الفوسفاتيديل كولين وديوكسيكولات الصوديوم على استحلاب أغشية خلايا الدهون، مُحفّزَيْن تكسيراً دائماً لخلايا الدهون في مناطق مستهدفة بدقة. يُيسّر L-كارنيتين بعد ذلك النقل الأيضي للأحماض الدهنية المُطلَقة للتخلص منها، بينما يُحفّز الكافيين الدورة الدموية الموضعية لتعزيز التصريف اللمفاوي.',
    },
    category: 'body-contouring',
    howToUse: HOW_TO_USE_BY_CATEGORY['body-contouring'],
    keyBenefits: [
      { en: 'Reduces localized fat deposits', ar: 'تقليل رواسب الدهون الموضعية' },
      { en: 'Improves body contour', ar: 'تحسين تناسق الجسم' },
      { en: 'Supports fat metabolism', ar: 'دعم أيض الدهون' },
      { en: 'Treats stubborn fat areas', ar: 'علاج مناطق الدهون العنيدة' },
      { en: 'Enhances skin appearance in treated areas', ar: 'تحسين مظهر الجلد في المناطق المعالجة' },
    ],
    volume: STANDARD_VOLUME,
    sessions: SESSION_PROTOCOL,
    image: '/assets/Slim Fast.png',
    color: { primary: '#F8F0E8', secondary: '#E4C8A0', text: '#4A2810' },
    accentColor: '#A87850',
    featured: false,
    order: 13,
  },

];

export const featuredProducts = products
  .filter(p => p.featured)
  .sort((a, b) => a.order - b.order);

export function getRelatedProducts(
  currentProductId: string,
  category: ProductCategory,
  limit: number = 3,
): Product[] {
  const sameCategory = products.filter(
    (p) => p.id !== currentProductId && p.category === category,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = products.filter(
    (p) => p.id !== currentProductId && p.category !== category,
  );

  return [...sameCategory, ...others].slice(0, limit);
}
