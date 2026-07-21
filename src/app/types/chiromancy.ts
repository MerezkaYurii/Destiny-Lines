export interface PhotoGridProps {
  currentLocale: 'en' | 'ru';
}

export type Uploads = {
  leftHand: { file: File; preview: string } | null;
  rightHand: { file: File; preview: string } | null;
};
export interface AnalysisResult {
  title: string;
  text: string;
  strong_features: string;
  full_analysis: string;
  full_analysis_text: string;
  full_analysis_button: string;
}
