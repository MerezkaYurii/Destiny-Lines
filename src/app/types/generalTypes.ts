export interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string; // Next.js требует string для динамических сегментов
  }>;
}
