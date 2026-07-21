import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/app/globals.css';
import { i18n } from '@/i18n-config';
import Image from 'next/image';
import { DictionaryProvider } from '@/app/DictionaryContext';
import { getDictionary } from '@/app/lib/get-dictionary';
import { RootLayoutProps } from '@/app/types/generalTypes';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Destiny Lines',
  description: 'Destiny Lines',
  icons: {
    icon: '/logoBlack.svg',
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-roboto',
});

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams?.lang;
  const allowedLocales = ['en', 'ru'];
  const currentLocale = allowedLocales.includes(lang)
    ? (lang as 'en' | 'ru')
    : 'en';

  const dict = await getDictionary(currentLocale);

  return (
    <html lang={currentLocale} className="h-full">
      <body
        className={`${roboto.variable} ${roboto.className} h-full antialiased bg-gray-900`}
      >
        <DictionaryProvider dictionary={dict}>
          {/* СЛОЙ 1: ФИКСИРОВАННЫЙ ФОН + ФУТЕР */}
          <div className="fixed inset-0 z-0 pointer-events-none flex flex-col justify-between">
            {/* Картинка фона (занимает всё пространство, кроме нижнего отступа под футер) */}
            <div className="absolute inset-0 dark:hidden mb-16 mt-[70px]">
              <Image
                src="/bg_image.jpg"
                alt="Theme background"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
          {/* СЛОЙ 2: КОНТЕНТ (СКРОЛЛИТСЯ НЕЗАВИСИМО) */}
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />

            <main className="grow pt-[70px]">
              {children}
              <Toaster position="top-center" reverseOrder={false} />
            </main>
            <Footer />
          </div>
        </DictionaryProvider>
      </body>
    </html>
  );
}
