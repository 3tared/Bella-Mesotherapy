// data/types.ts
// Shared types used across all data files

export type Locale = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export type ProductHowToStep = LocalizedString;
