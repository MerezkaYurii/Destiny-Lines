'use client';

import { useDictionary } from '@/app/hooks/useDictionary';

import { useTarotStore } from '@/app/store/useTarotStore';
import { TarotResultProps } from '@/app/types/tarot';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

  // Достаем tarotData из твоего стора
  const { tarotData } = useTarotStore();

  const reportData = Array.isArray(report) ? report[0] : report;
  const [loading, setLoading] = useState(false);

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

  // const onBuyClick = () => {
  //   // Сохраняем вопрос и массив карт из tarotData в localStorage
  //   if (tarotData) {
  //     if (tarotData.question) {
  //       localStorage.setItem('tarot_question', tarotData.question);
  //     }
  //     if (tarotData.cards && tarotData.cards.length > 0) {
  //       localStorage.setItem('tarot_cards', JSON.stringify(tarotData.cards));
  //     }
  //   }

  //   handleCheckout(
  //     getEnvVar('NEXT_PUBLIC_STRIPE_PRICE_TAROT'),
  //     lang,
  //     'tarotFullResult',
  //     setLoading,
  //   );
  // };

  const onBuyClick = () => {
    // Сохраняем вопрос и массив карт из tarotData в localStorage
    if (tarotData) {
      if (tarotData.question) {
        localStorage.setItem('tarot_question', tarotData.question);
      }
      if (tarotData.cards && tarotData.cards.length > 0) {
        localStorage.setItem('tarot_cards', JSON.stringify(tarotData.cards));
      }
    }

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
        <div className="p-4 bg-gray-700 rounded-lg text-center mt-6">
          <h3 className="text-lg font-light text-white underline mb-2">
            {dict.ResultDisplayTarot.full_analysis}
          </h3>
          <p className="text-sm text-white mb-4 font-light">
            {dict.ResultDisplayTarot.full_analysis_text}
          </p>
          <button
            disabled={loading}
            onClick={onBuyClick}
            className="px-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all"
          >
            {loading
              ? 'Loading...'
              : dict.ResultDisplayTarot.full_analysis_button}
          </button>
        </div>
      </div>
    </section>
  );
}
