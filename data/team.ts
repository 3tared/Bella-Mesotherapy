import type { LocalizedString } from "./types";

export interface TeamMember {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  initials: string;
}

export const team: TeamMember[] = [
  {
    id: "amira-hassan",
    name: { en: "Dr. Amira Hassan", ar: "د. أميرة حسن" },
    role: {
      en: "Co-Founder & Chief Scientist",
      ar: "المؤسسة المشاركة ورئيسة العلماء",
    },
    bio: {
      en: "Board-certified dermatologist with 18+ years of clinical research in peptide biochemistry and skin regeneration.",
      ar: "طبيبة جلدية معتمدة بخبرة تزيد عن 18 عاما في أبحاث كيمياء الببتيدات الحيوية وتجديد البشرة.",
    },
    initials: "AH",
  },
  {
    id: "karim-el-masry",
    name: { en: "Karim El-Masry", ar: "كريم المصري" },
    role: { en: "Co-Founder & CEO", ar: "المؤسس المشارك والرئيس التنفيذي" },
    bio: {
      en: "Former pharmaceutical executive building Bella's vision of clinical-grade luxury across the region.",
      ar: "تنفيذي سابق في قطاع الأدوية يقود رؤية بيلا للفخامة السريرية في المنطقة.",
    },
    initials: "KM",
  },
  {
    id: "laila-nour",
    name: { en: "Dr. Laila Nour", ar: "د. ليلى نور" },
    role: { en: "Head of Formulation", ar: "رئيسة تطوير التركيبات" },
    bio: {
      en: "Biochemist specializing in delivery systems and Bella's three-weight hyaluronic complex.",
      ar: "عالمة كيمياء حيوية متخصصة في أنظمة التوصيل ومركب الهيالورونيك ثلاثي الأوزان من بيلا.",
    },
    initials: "LN",
  },
  {
    id: "sara-farouk",
    name: { en: "Sara Farouk", ar: "سارة فاروق" },
    role: { en: "Creative Director", ar: "المديرة الإبداعية" },
    bio: {
      en: "Designer shaping Bella's visual language where clinical precision meets modern elegance.",
      ar: "مصممة تشكل لغة بيلا البصرية حيث تلتقي الدقة السريرية بالأناقة الحديثة.",
    },
    initials: "SF",
  },
];
