'use client';

import { useDictionary } from '@/app/hooks/useDictionary';
import { TarotResultProps } from '@/app/types/tarot';
import { useRouter } from 'next/navigation';

export default function ResultDisplayTarot({
  report,
  analysis,
  output,
  text,
  response,
  lang,
}: TarotResultProps) {
  const dict = useDictionary();
  const router = useRouter();
  const reportData = Array.isArray(report) ? report[0] : report;

  const aiResponse =
    text ||
    output ||
    analysis ||
    response ||
    reportData?.output ||
    reportData?.text ||
    '';
  if (!dict) return null;
  if (!report && !aiResponse) return null;

  const handleProClick = () => {
    router.push(`/${lang}/tarotFullResult`);
  };
  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full animate-fadeIn">
      <div className="container mx-auto p-6 bg-gray-900/40 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 text-left text-white">
        <h2 className="text-xl font-medium mb-4 text-center border-b border-gray-700/50 pb-2">
          {dict.ResultDisplayTarot.title}
        </h2>

        <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
          {aiResponse ||
            'AI response not found in the data structure. / Ответ от ИИ не найден в структуре данных.'}
        </div>
        {/* Секция продажи полного разбора */}
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-light text-white  underline mb-2">
            {dict.ResultDisplayTarot.full_analysis}
          </h3>
          <p className="text-sm text-white mb-4 font-light">
            {dict.ResultDisplayTarot.full_analysis_text}
          </p>
          <button
            onClick={handleProClick}
            className="px-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all "
          >
            {dict.ResultDisplayTarot.full_analysis_button}
          </button>
        </div>
      </div>
    </section>
  );
}
