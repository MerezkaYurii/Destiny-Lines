import PhotoGrid from '@/components/PhotoGrid';
import Image from 'next/image';
import Link from 'next/link';

export default async function ChiromancyPage({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ru' }>;
}) {
  const { lang } = await params;

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center ">
      <div className="fixed inset-0 z-0 pointer-events-none dark:hidden mb-16 mt-[70px]">
        <Image
          src="/ChiromancyBg.jpg"
          alt="Theme background"
          fill
          priority
          sizes="100vw"
          className="object-cover "
        />
      </div>
      <Link
        href={`/${lang}/`}
        className="text-sm z-10 mt-4 text-white hover:underline  hover:text-gray-400 whitespace-nowrap text-center block"
      >
        ← Back / Назад
      </Link>
      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6 z-10">
        <PhotoGrid currentLocale={lang} />
      </div>
    </main>
  );
}
