'use client';

import { useTarotStore } from '@/app/store/useTarotStore';
import { Dictionary } from '@/i18n-config';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DECK } from '@/app/types/tarot';
import { exportElementToPdf } from '@/app/utils/exportPdf';
import GlobalLoader from './GlobalLoader';
interface AiResponse {
  output: string;
}

export default function TarotContentFullResult({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { tarotData } = useTarotStore();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    dict.NumerologyContentFullResult.readyToSend,
  );
  const [resultAI, setResultAI] = useState<AiResponse | null>(null);

  useEffect(() => {
    const runNumerologyFullResult = async () => {
      if (!tarotData) return;

      // const formData = new FormData();
      // formData.append('question', tarotData.question);
      // formData.append('lang', tarotData.lang);
      // formData.append('cards', JSON.stringify(tarotData.cards));
      try {
        setLoading(true);
        setStatus(dict.TarotContentFullResult.dataSending);
        const response = await fetch('/api/tarot-full-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: tarotData.question,
            lang: tarotData.lang,
            cards: tarotData.cards,
          }),
        });

        if (!response.ok) throw new Error('Ошибка сервера');

        const result = await response.json();

        setResultAI(result);
        setStatus(dict.TarotContentFullResult.ready);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    runNumerologyFullResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tarotData, lang]);

  if (!tarotData) {
    return (
      <div className="text-white p-10">
        {dict.TarotContentFullResult.dataMissing}
      </div>
    );
  }

  const handleDownload = () => {
    exportElementToPdf('pdf-container', 'tarot-full-report.pdf');
  };

  return (
    <section className=" px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full ">
      {loading && <GlobalLoader />}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 "
        >
          {dict.TarotContentFullResult.button}
        </button>
      </div>
      <div
        id="pdf-container"
        className="  container mx-auto bg-gray-900/60  w-full overflow-hidden rounded-2xl relative  shadow-lg"
      >
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-light text-left pl-10 text-white  ">
            {dict.TarotContentFullResult.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        </div>

        {/* Данные клиента */}
        <div className="pl-10 mb-8 text-xl text-white font-light text-center">
          <p>
            {dict.TarotContentFullResult.question}{' '}
            <span>{tarotData.question}</span>
          </p>

          {/* Блок с картами */}
          <div>
            <p className="mb-2 text-xl font-light text-center underline">
              {dict.TarotContentFullResult.cards}
            </p>

            {/* Контейнер для картинок (flexbox для горизонтального ряда) */}
            <div className=" flex flex-wrap gap-6 justify-center">
              {tarotData.cards.map((cardName, index) => {
                const cardData = DECK.find((c) => c.name === cardName);

                return (
                  <div
                    key={index}
                    className="relative w-32 h-52 overflow-hidden rounded-lg shadow-lg border border-amber-300/30"
                  >
                    {cardData ? (
                      <Image
                        src={cardData.imagePath}
                        alt={cardName}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-white">
                        {' '}
                        ?
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="pl-10 pr-10 ">
            <p className="text-white font-light text-sm">{status}</p>
          </div>
        ) : (
          resultAI && (
            <div className="pl-10 pr-10 text-white font-light  leading-relaxed whitespace-pre-line">
              <h3 className="text-lg font-light mb-2">
                {dict.TarotContentFullResult.analysis}
              </h3>
              <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
                {/* Обращаемся к [0] элементу массива */}
                {resultAI && Array.isArray(resultAI) && resultAI.length > 0
                  ? resultAI[0].output
                  : 'AI response not found...'}
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 "
        >
          {dict.TarotContentFullResult.button}
        </button>
      </div>
    </section>
  );
}
