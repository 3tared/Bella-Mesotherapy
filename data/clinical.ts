// data/clinical.ts
// Shared professional-use information for all Bella Mesotherapy products

import type { LocalizedString } from './types';

export interface ClinicalInfo {
  storageConditions:   LocalizedString;
  shelfLife:           LocalizedString;
  professionalUseOnly: LocalizedString;
  generalWarnings:     LocalizedString[];
  generalDirections:   LocalizedString[];
}

export const clinicalInfo: ClinicalInfo = {
  storageConditions: {
    en: 'Store at 2–8 °C (36–46 °F). Do not freeze. Keep away from direct sunlight and heat sources. Store in original packaging.',
    ar: 'يُحفظ في درجات حرارة 2–8 °م (36–46 °ف). لا يُجمَّد. يُبعد عن الضوء المباشر ومصادر الحرارة. يُحفظ في العبوة الأصلية.',
  },
  shelfLife: {
    en: '24 months from manufacture date when unopened and stored correctly. Use immediately after opening.',
    ar: '24 شهراً من تاريخ التصنيع إذا لم يُفتح ويُحفظ بشكل صحيح. يُستخدم فور الفتح.',
  },
  professionalUseOnly: {
    en: 'For professional use only. To be administered by a licensed medical or aesthetic practitioner trained in mesotherapy techniques.',
    ar: 'للاستخدام المهني فقط. يُعطى من قِبَل ممارس طبي أو تجميلي مرخّص مدرَّب على تقنيات الميزوثيرابي.',
  },
  generalWarnings: [
    {
      en: 'Not for use in patients with known hypersensitivity to any of the components.',
      ar: 'لا يُستخدم في المرضى الذين لديهم فرط حساسية معروف لأي من المكونات.',
    },
    {
      en: 'Avoid use during pregnancy and breastfeeding unless directed by a physician.',
      ar: 'تجنب الاستخدام أثناء الحمل والرضاعة ما لم يوجِّه طبيب.',
    },
    {
      en: 'Do not inject into inflamed, infected, or compromised skin areas.',
      ar: 'لا يُحقن في مناطق الجلد الملتهبة أو المصابة أو المتضررة.',
    },
    {
      en: 'Perform a patch test prior to first use for sensitive skin patients.',
      ar: 'أجرِ اختبار على قعة الجلد قبل الاستخدام الأول للمرضى ذوي البشرة الحساسة.',
    },
    {
      en: 'Keep out of reach of children.',
      ar: 'يُحفظ بعيداً عن متناول الأطفال.',
    },
  ],
  generalDirections: [
    {
      en: 'Cleanse and prepare the treatment area following standard aseptic protocol.',
      ar: 'نظّف منطقة العلاج وجهّزها وفق بروتوكول التعقيم المعياري.',
    },
    {
      en: 'Draw the solution into a sterile syringe with an appropriate needle gauge for the target area.',
      ar: 'اسحب المحلول في محقنة معقمة بحجم إبرة مناسب للمنطقة المستهدفة.',
    },
    {
      en: 'Administer via standard mesotherapy technique (nappage, retrograde, or papule) at the appropriate depth.',
      ar: 'أعطِ العلاج عبر تقنية الميزوثيرابي القياسية (النفاج أو الرجعي أو الحطاطة) على العمق المناسب.',
    },
    {
      en: 'Apply post-treatment soothing protocol as indicated. Advise patient on aftercare.',
      ar: 'طبّق بروتوكول التهدئة بعد العلاج كما هو موضح. أرشد المريض حول الرعاية اللاحقة.',
    },
    {
      en: 'Follow the recommended session interval of 2–3 weeks for optimal results.',
      ar: 'اتّبع الفاصل الزمني الموصى به بين الجلسات 2–3 أسابيع للحصول على نتائج مثلى.',
    },
  ],
};

export const clinicalData = {
  administration: {
    protocol: {
      frequency: {
        en: 'One session every 2–3 weeks',
        ar: 'جلسة واحدة كل 2–3 أسابيع',
      },
      sessions: {
        en: 'Recommended course: 4–6 sessions',
        ar: 'الدورة الموصى بها: 4–6 جلسات',
      },
    },
    techniques: [
      { en: 'Nappage', ar: 'النفاج' },
      { en: 'Retrograde', ar: 'الرجعي' },
      { en: 'Micro-papule', ar: 'الحطاطة الدقيقة' },
    ],
  },
  warnings: clinicalInfo.generalWarnings,
  storage: [
    clinicalInfo.storageConditions,
    clinicalInfo.shelfLife,
  ],
};

export const bellaClinicalStats = [
  {
    value: 13,
    suffix: '',
    label: {
      en: 'Targeted professional formulas',
      ar: 'تركيبة مهنية موجهة',
    },
  },
  {
    value: 1000,
    suffix: 'x',
    label: {
      en: 'Water-binding capacity of hyaluronic acid',
      ar: 'قدرة حمض الهيالورونيك على الارتباط بالماء',
    },
  },
  {
    value: 6,
    suffix: '',
    label: {
      en: 'Recommended sessions in a full course',
      ar: 'جلسات موصى بها في الدورة الكاملة',
    },
  },
  {
    value: 3,
    suffix: '',
    label: {
      en: 'Professional application techniques',
      ar: 'تقنيات تطبيق مهنية',
    },
  },
] as const;
