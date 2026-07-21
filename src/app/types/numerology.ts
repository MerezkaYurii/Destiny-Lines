export interface UserProfile {
  birthDate: string; // ISO format: YYYY-MM-DD
  name: string;
}

export interface NumerologyReport {
  lifePathNumber: number;
  coreTraits: string[];
  recommendation: string;
  analysis?: string;
  response?: string;
  output?: string;
  text?: string;
  birthDate?: string;
  name?: string;
}
export interface langCode {
  langCode: 'en' | 'ru';
}
export interface NumerologyResult {
  title: string;
  text: string;
  strong_features: string;
  full_analysis: string;
  full_analysis_text: string;
  full_analysis_button: string;
}
