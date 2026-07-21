import { getDictionary } from '@/app/lib/get-dictionary';
import HomePageButtons from '@/components/HomePageButtons';
import RulesModal from '@/components/RulesModal';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: 'en' | 'ru' }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="flex flex-col items-center relative ">
      <RulesModal dict={dict} />
      <div className="container w-full max-w-7x bg-gray-800/60 mb-20 mt-6">
        <HomePageButtons />;
      </div>
    </main>
  );
}
