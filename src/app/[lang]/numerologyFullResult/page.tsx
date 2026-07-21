import { getDictionary } from '@/app/lib/get-dictionary';
import Image from 'next/image';

import Link from 'next/link';
import NumerologyContentFullResult from '@/components/NumerologyContentFullResult';

export default async function NumerologyFullResultPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ru' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center ">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 dark:hidden mb-16 mt-[70px]">
          <Image
            src="/NumberBg.jpg"
            alt="Theme background"
            fill
            priority
            sizes="100vw"
            className="object-cover "
          />
        </div>
      </div>
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline  hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>
      <div className="container w-full max-w-7x bg-gray-800/80 mb-20 mt-6 z-10">
        <NumerologyContentFullResult dict={dict} lang={lang} />
      </div>
    </main>
  );
}
