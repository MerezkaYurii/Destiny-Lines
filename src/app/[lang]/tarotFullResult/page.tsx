import { getDictionary } from '@/app/lib/get-dictionary';

import TarotContentFullResult from '@/components/TarotContentFullResult';
import Image from 'next/image';

export default async function TarotPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ru' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center ">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 dark:hidden mb-16 "
          style={{ marginTop: '70px' }}
        >
          <Image
            src="/TarotBg.jpg"
            alt="Theme background"
            fill
            priority
            sizes="100vw"
            className="object-cover "
          />
        </div>
      </div>

      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6 z-10">
        <TarotContentFullResult lang={lang} dict={dict} />
      </div>
    </main>
  );
}
