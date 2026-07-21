'use client';

import { useDictionary } from '@/app/hooks/useDictionary';
import { NumerologyReport } from '@/app/types/numerology';
import { useRouter } from 'next/navigation';

interface ResultProps {
  report: NumerologyReport | null;
  lang: string;
}

export default function ResultDisplay({ report, lang }: ResultProps) {
  const dict = useDictionary();

  const router = useRouter();

  if (!report) return null;
  const aiResponse =
    report.text || report.output || report.analysis || report.response || '';

  const handleProClick = () => {
    router.push(`/${lang}/numerologyFullResult`);
  };

  if (!dict) return null;
  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full animate-fadeIn">
      <div className="container mx-auto p-6 bg-gray-900/40 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 text-left text-white">
        <h2 className="text-xl font-medium mb-4 text-center border-b border-gray-700/50 pb-2">
          {dict.ResultDisplayNumerology.title}
        </h2>
        <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
          {aiResponse ||
            'AI response not found in the data structure. / Ответ от ИИ не найден в структуре данных.'}
        </div>
        {/* Секция продажи полного разбора */}
        <div className="p-4 bg-gray-700 rounded-lg text-center">
          <h3 className="text-lg font-light text-white  underline mb-2">
            {dict.ResultDisplayNumerology.full_analysis}
          </h3>
          <p className="text-sm text-white mb-4 font-light">
            {dict.ResultDisplayNumerology.full_analysis_text}
          </p>
          <button
            onClick={handleProClick}
            className="px-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white"
          >
            {dict.ResultDisplayNumerology.full_analysis_button}
          </button>
        </div>
      </div>
    </section>
  );
}
