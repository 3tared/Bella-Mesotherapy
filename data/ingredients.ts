// data/ingredients.ts
// 10 real key ingredients used across Bella Mesotherapy products

import type { LocalizedString } from './types';

export type IngredientCategory =
  | 'peptide'
  | 'vitamin'
  | 'acid'
  | 'botanical'
  | 'growth-factor'
  | 'lipid'
  | 'active';

export interface Ingredient {
  id:            string;
  name:          LocalizedString;
  latinName:     string;
  category:      IngredientCategory;
  description:   LocalizedString;
  benefit:       LocalizedString;
  concentration: LocalizedString;
  scienceNote:   LocalizedString;
  usedIn:        string[];
}

/**
 * IDs of the three featured ingredients showcased in IngredientsSection.
 * Import this constant instead of hardcoding IDs in components.
 */
export const featuredIngredientIds = [
  'hyaluronic-acid',
  'glutathione',
  'bioactive-peptides',
] as const;

export const ingredients: Ingredient[] = [

  {
    id:        'hyaluronic-acid',
    name:      { en: 'Hyaluronic Acid', ar: 'حمض الهيالورونيك' },
    latinName: 'Sodium Hyaluronate',
    category:  'acid',
    description: {
      en: 'A naturally occurring polysaccharide found throughout the body, capable of holding up to 1000 times its weight in water. Used across the entire Bella range as both an active ingredient and an optimal mesotherapy delivery vehicle.',
      ar: 'عديد سكاريد يحدث طبيعياً في الجسم، قادر على الاحتفاظ بما يصل إلى 1000 ضعف وزنه من الماء. يُستخدم في المجموعة الكاملة من بيلا كمادة فعّالة وناقل ميزوثيرابي مثالي.',
    },
    benefit: {
      en: 'Deep multi-level hydration, visible plumping, and optimal active ingredient delivery',
      ar: 'ترطيب عميق متعدد المستويات وإضافة حجم ملحوظ وتوصيل مثالي للمكونات الفعّالة',
    },
    concentration: {
      en: 'Multi-molecular weight: HMW, MMW, LMW',
      ar: 'متعدد الأوزان الجزيئية: عالٍ ومتوسط ومنخفض الوزن',
    },
    scienceNote: {
      en: 'The three molecular weight system ensures penetration at different skin depths simultaneously — HMW hydrates the surface, MMW reaches the mid-dermis, LMW penetrates to the deep dermis for structural support.',
      ar: 'يضمن نظام الأوزان الجزيئية الثلاثة الاختراق على أعماق جلدية مختلفة في آنٍ واحد — الوزن العالي يرطّب السطح، المتوسط يصل إلى منتصف الأدمة، المنخفض يخترق إلى الأدمة العميقة للدعم البنيوي.',
    },
    usedIn: [
      'bella-tight', 'bella-amber', 'bella-deep-whitening', 'bella-yaqoot',
      'bella-skin-booster', 'bella-anti-scar', 'bella-rosy-lips', 'bella-ultra-glow',
      'bella-hair-mix', 'bella-acne-free', 'bella-eye-contour', 'bella-slim-fast',
    ],
  },

  {
    id:        'glutathione',
    name:      { en: 'Glutathione', ar: 'الجلوتاثيون' },
    latinName: 'γ-Glutamyl-cysteinyl-glycine',
    category:  'peptide',
    description: {
      en: 'Known as the "master antioxidant", this tripeptide is naturally produced in the body and plays a central role in cellular detoxification and melanin regulation. Its skin-brightening properties make it a cornerstone of advanced depigmentation protocols.',
      ar: 'يُعرف بـ"مضاد الأكسدة الرئيسي"، هذا الببتيد الثلاثي يُنتجه الجسم طبيعياً ويلعب دوراً محورياً في إزالة سموم الخلايا وتنظيم الميلانين. تجعله خصائصه لتفتيح البشرة ركيزة أساسية في بروتوكولات إزالة التصبغ المتقدمة.',
    },
    benefit: {
      en: 'Comprehensive skin brightening through melanin suppression and antioxidant protection',
      ar: 'تفتيح شامل للبشرة من خلال تثبيط الميلانين والحماية المضادة للأكسدة',
    },
    concentration: {
      en: 'High-purity pharmaceutical grade',
      ar: 'درجة صيدلانية عالية النقاء',
    },
    scienceNote: {
      en: 'Inhibits melanin synthesis by interfering with tyrosinase enzyme activity. The switch from eumelanin (dark) to phaeomelanin (light) production results in progressive and even skin tone brightening.',
      ar: 'يثبط تركيب الميلانين بالتدخل في نشاط إنزيم التيروزيناز. يؤدي التحول من إنتاج الأوميلانين (الداكن) إلى الفايوميلانين (الفاتح) إلى تفتيح تدريجي ومتجانس للون البشرة.',
    },
    usedIn: ['bella-deep-whitening', 'bella-yaqoot', 'bella-gluta-c'],
  },

  {
    id:        'bioactive-peptides',
    name:      { en: 'Bioactive Peptides', ar: 'الببتيدات الحيوية' },
    latinName: 'Multi-peptide complex',
    category:  'peptide',
    description: {
      en: 'A synergistic complex of signal peptides that communicate directly with fibroblasts and keratinocytes, instructing them to accelerate collagen synthesis, elastin production, and the skin\'s natural repair mechanisms.',
      ar: 'مركّب متآزر من الببتيدات الإشارية التي تتواصل مباشرةً مع الأرومات الليفية وخلايا الكيراتين، آمرةً إياها بتسريع تركيب الكولاجين وإنتاج الإيلاستين وآليات الإصلاح الطبيعية للجلد.',
    },
    benefit: {
      en: 'Collagen synthesis stimulation, elastin support, and accelerated skin renewal',
      ar: 'تحفيز تركيب الكولاجين ودعم الإيلاستين وتسريع تجديد الجلد',
    },
    concentration: {
      en: 'Therapeutic-grade multi-peptide blend',
      ar: 'مزيج ببتيدي متعدد بدرجة علاجية',
    },
    scienceNote: {
      en: 'Signal peptides act as biological messengers that penetrate to the dermal layer and activate the cellular machinery responsible for structural protein production, providing measurable firming and repair effects.',
      ar: 'تعمل الببتيدات الإشارية كرسائل حيوية تخترق الطبقة الأدمية وتُنشّط الآلية الخلوية المسؤولة عن إنتاج البروتينات البنيوية، مُوفّرةً تأثيرات شد وإصلاح قابلة للقياس.',
    },
    usedIn: [
      'bella-tight', 'bella-yaqoot', 'bella-skin-booster',
      'bella-anti-scar', 'bella-rosy-lips', 'bella-eye-contour',
    ],
  },

  {
    id:        'niacinamide',
    name:      { en: 'Niacinamide', ar: 'النياسيناميد' },
    latinName: 'Nicotinamide (Vitamin B3)',
    category:  'vitamin',
    description: {
      en: 'A multifunctional vitamin that simultaneously regulates sebum, fades pigmentation, strengthens the skin barrier, and improves skin texture. One of the most versatile and well-researched actives in aesthetic medicine.',
      ar: 'فيتامين متعدد الوظائف يُنظّم الزهم ويُخفّف التصبغات ويُقوّي حاجز الجلد ويُحسّن ملمسه في آنٍ واحد. من أكثر المواد الفعّالة تعدداً وأبحاثاً في طب التجميل.',
    },
    benefit: {
      en: 'Tone evening, pore refinement, sebum regulation, and barrier strengthening',
      ar: 'تسوية اللون وتضييق المسام وتنظيم الزهم وتقوية الحاجز الجلدي',
    },
    concentration: {
      en: '5% active concentration',
      ar: 'تركيز فعّال 5%',
    },
    scienceNote: {
      en: 'Inhibits melanosome transfer from melanocytes to keratinocytes, interrupting the pigmentation pathway at the point of transfer rather than production, resulting in progressive and uniform brightening.',
      ar: 'يثبط انتقال الميلانوزومات من الخلايا الصباغية إلى خلايا الكيراتين، مُقاطعاً مسار التصبغ عند نقطة النقل لا الإنتاج، مما يؤدي إلى تفتيح تدريجي ومتجانس.',
    },
    usedIn: ['bella-deep-whitening', 'bella-yaqoot', 'bella-acne-free'],
  },

  {
    id:        'vitamin-c',
    name:      { en: 'Stabilized Vitamin C', ar: 'فيتامين C المستقر' },
    latinName: 'Ascorbyl Glucoside',
    category:  'vitamin',
    description: {
      en: 'A highly stable, bioavailable form of Vitamin C that converts to pure ascorbic acid upon skin contact. Delivers potent antioxidant protection while inhibiting melanin synthesis for comprehensive brightening.',
      ar: 'شكل مستقر للغاية وعالي التوافر البيولوجي من فيتامين C يتحول إلى حمض أسكوربيك نقي عند ملامسة الجلد. يوفر حماية مضادة للأكسدة قوية بينما يثبط تركيب الميلانين للتفتيح الشامل.',
    },
    benefit: {
      en: 'Brightening, antioxidant protection, and collagen synthesis support',
      ar: 'التفتيح والحماية المضادة للأكسدة ودعم تركيب الكولاجين',
    },
    concentration: {
      en: '15% stabilized ascorbyl glucoside',
      ar: '15% من جلوكوزيد الأسكوربيل المستقر',
    },
    scienceNote: {
      en: 'Ascorbyl glucoside remains 60× more stable than L-ascorbic acid while delivering identical bioactivity. Mesotherapy delivery achieves significantly higher dermal concentrations than topical application.',
      ar: 'يظل جلوكوزيد الأسكوربيل أكثر استقراراً بـ 60 مرة من حمض L-الأسكوربيك مع تقديم نشاط حيوي مماثل. يحقق التوصيل عبر الميزوثيرابي تركيزات أدمية أعلى بكثير من التطبيق الموضعي.',
    },
    usedIn: ['bella-gluta-c', 'bella-ultra-glow'],
  },

  {
    id:        'tranexamic-acid',
    name:      { en: 'Tranexamic Acid', ar: 'حمض الترانيكساميك' },
    latinName: 'Trans-4-(aminomethyl)cyclohexane-1-carboxylic acid',
    category:  'active',
    description: {
      en: 'A lysine derivative originally developed for wound care that has emerged as one of the most effective anti-pigmentation actives. Specifically targets UV-induced pigmentation cascades that standard brightening agents cannot reach.',
      ar: 'مشتق الليسين الذي طُوّر في الأصل لرعاية الجروح وأصبح أحد أكثر المواد الفعّالة لمكافحة التصبغ. يستهدف تحديداً سلاسل التصبغ الناجمة عن الأشعة فوق البنفسجية التي لا تستطيع عوامل الإشراق القياسية الوصول إليها.',
    },
    benefit: {
      en: 'Targeted UV-induced pigmentation blocking and melasma treatment',
      ar: 'حجب التصبغ الناجم عن الأشعة فوق البنفسجية وعلاج الكلف بشكل موجّه',
    },
    concentration: {
      en: 'Clinical treatment concentration',
      ar: 'تركيز العلاج السريري',
    },
    scienceNote: {
      en: 'Blocks the UV-induced signaling cascade between keratinocytes and melanocytes by inhibiting plasminogen activators, preventing the activation of tyrosinase that leads to UV-triggered melanin production.',
      ar: 'يحجب سلسلة الإشارات الناجمة عن الأشعة فوق البنفسجية بين خلايا الكيراتين والخلايا الصباغية عن طريق تثبيط منشّطات البلاسمينوجين، مانعاً تنشيط التيروزيناز الذي يؤدي إلى إنتاج الميلانين المُحفَّز بالأشعة.',
    },
    usedIn: ['bella-deep-whitening'],
  },

  {
    id:        'retinol',
    name:      { en: 'Retinol', ar: 'الرتينول' },
    latinName: 'Vitamin A (all-trans-retinol)',
    category:  'vitamin',
    description: {
      en: 'The gold standard of skin renewal actives. Retinol binds to nuclear receptors in skin cells, directly modulating gene expression to accelerate cell turnover, stimulate collagen synthesis, and normalize skin cell function.',
      ar: 'المعيار الذهبي لمواد تجديد الجلد. يرتبط الرتينول بالمستقبلات النووية في خلايا الجلد، مُعدِّلاً التعبير الجيني مباشرةً لتسريع دوران الخلايا وتحفيز تركيب الكولاجين وتطبيع وظيفة خلايا الجلد.',
    },
    benefit: {
      en: 'Accelerated cell renewal, pore refinement, and acne regulation',
      ar: 'تسريع تجديد الخلايا وتضييق المسام وتنظيم حبوب الشباب',
    },
    concentration: {
      en: 'Mesotherapy-optimized concentration',
      ar: 'تركيز مُحسَّن للميزوثيرابي',
    },
    scienceNote: {
      en: 'Unlike topical Retinol that requires conversion through multiple enzymatic steps, mesotherapy delivery achieves direct bioavailability to dermal cells, maximizing efficacy at lower concentrations without the irritation profile of topical forms.',
      ar: 'على خلاف الرتينول الموضعي الذي يتطلب التحويل عبر خطوات إنزيمية متعددة، يحقق توصيل الميزوثيرابي توافراً حيوياً مباشراً للخلايا الأدمية، مُعظِّماً الفاعلية بتركيزات أقل دون تهيج.',
    },
    usedIn: ['bella-acne-free'],
  },

  {
    id:        'succinic-acid',
    name:      { en: 'Succinic Acid', ar: 'حمض السكسينيك' },
    latinName: 'Butanedioic acid',
    category:  'acid',
    description: {
      en: 'A naturally occurring dicarboxylic acid and key intermediate in the Krebs cycle. In aesthetic medicine, it functions as a cellular energizer that revives metabolic activity in fatigued skin cells, accelerating natural regenerative processes.',
      ar: 'حمض ثنائي الكربوكسيل يحدث طبيعياً وهو وسيط رئيسي في دورة كريبس. في طب التجميل يعمل كمُنشّط خلوي يُحيي النشاط الأيضي في خلايا الجلد المتعبة، مُسرّعاً العمليات التجديدية الطبيعية.',
    },
    benefit: {
      en: 'Cellular energy revival, skin metabolism activation, and radiance enhancement',
      ar: 'إحياء الطاقة الخلوية وتنشيط أيض الجلد وتعزيز الإشراق',
    },
    concentration: {
      en: 'Bioavailable metabolic concentration',
      ar: 'تركيز أيضي عالي التوافر الحيوي',
    },
    scienceNote: {
      en: 'As a direct participant in the citric acid cycle, succinic acid restores cellular ATP production in metabolically compromised skin cells, re-energizing the regenerative machinery without stimulating inflammation.',
      ar: 'بوصفه مشاركاً مباشراً في دورة حمض الستريك، يستعيد حمض السكسينيك إنتاج ATP الخلوي في خلايا الجلد المُضطربة أيضياً، مُعيداً تنشيط آلية التجديد دون تحفيز الالتهاب.',
    },
    usedIn: ['bella-amber'],
  },

  {
    id:        'phosphatidylcholine',
    name:      { en: 'Phosphatidylcholine', ar: 'الفوسفاتيديل كولين' },
    latinName: 'PC (Lecithin-derived)',
    category:  'lipid',
    description: {
      en: 'A phospholipid that is a major structural component of cell membranes. When injected into adipose tissue via mesotherapy, it emulsifies and disrupts fat cell membranes, initiating a controlled and targeted fat reduction process.',
      ar: 'فسفوليبيد يُعدّ مكوناً هيكلياً رئيسياً لأغشية الخلايا. عند حقنه في الأنسجة الدهنية عبر الميزوثيرابي يستحلب أغشية خلايا الدهون ويُعطّلها، مُبادراً بعملية تقليص دهون موجّهة ومضبوطة.',
    },
    benefit: {
      en: 'Targeted fat cell disruption and permanent localized fat reduction',
      ar: 'تعطيل خلايا الدهون الموجّه وتقليص الدهون الموضعية بشكل دائم',
    },
    concentration: {
      en: 'Injectable-grade lecithin concentrate',
      ar: 'مركّز ليسيثين بدرجة قابلة للحقن',
    },
    scienceNote: {
      en: 'Phosphatidylcholine disrupts the lipid bilayer of adipocyte membranes through an emulsification mechanism, releasing their contents for metabolic clearance via the lymphatic system — the same principle as naturally occurring fat digestion.',
      ar: 'يُعطّل الفوسفاتيديل كولين الطبقة الثنائية الدهنية لأغشية خلايا الدهون عبر آلية استحلاب، مُطلِقاً محتوياتها للمعالجة الأيضية عبر الجهاز اللمفاوي — نفس مبدأ هضم الدهون الطبيعي.',
    },
    usedIn: ['bella-slim-fast'],
  },

  {
    id:        'minoxidil',
    name:      { en: 'Minoxidil', ar: 'المينوكسيديل' },
    latinName: 'Minoxidil (Loniten®)',
    category:  'active',
    description: {
      en: 'The gold standard clinically validated treatment for hair loss. Originally developed as an oral antihypertensive, its profound hair growth-stimulating effect was discovered serendipitously and has since been refined for direct scalp delivery via mesotherapy.',
      ar: 'العلاج الذهبي المعتمَد سريرياً لتساقط الشعر. طُوّر في الأصل كخافض لضغط الدم عن طريق الفم، وقد اكتُشف تأثيره العميق في تحفيز نمو الشعر بالمصادفة وتُم تحسينه منذ ذلك الحين للتوصيل المباشر لفروة الرأس عبر الميزوثيرابي.',
    },
    benefit: {
      en: 'Direct follicle stimulation, anagen phase prolongation, and hair regrowth promotion',
      ar: 'تحفيز مباشر للبصيلات وإطالة مرحلة النمو وتعزيز إعادة نمو الشعر',
    },
    concentration: {
      en: 'Mesotherapy-optimized concentration',
      ar: 'تركيز مُحسَّن للميزوثيرابي',
    },
    scienceNote: {
      en: 'As a potassium channel opener, Minoxidil increases blood flow and nutrient delivery to hair follicles, extending the anagen (growth) phase while shortening telogen (rest). Mesotherapy delivery bypasses systemic absorption, concentrating effects where needed.',
      ar: 'بوصفه فاتحاً لقنوات البوتاسيوم، يزيد المينوكسيديل من تدفق الدم وتوصيل المغذيات لبصيلات الشعر، مُطيلاً مرحلة الأناجين (النمو) ومُقصّراً التيلوجين (الراحة). يتجاوز توصيل الميزوثيرابي الامتصاص الجهازي، مُركّزاً التأثيرات حيث تُحتاج.',
    },
    usedIn: ['bella-hair-mix'],
  },

];
