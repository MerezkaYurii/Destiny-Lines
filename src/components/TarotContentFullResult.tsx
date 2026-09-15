'use client';

import { useTarotStore } from '@/app/store/useTarotStore';
import { DECK } from '@/app/types/tarot';
import { exportElementToPdf } from '@/app/utils/exportPdf';
import { Dictionary } from '@/i18n-config';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GlobalLoader from './GlobalLoader';

interface AiResponseItem {
  output: string;
}

type AiResponse = AiResponseItem | AiResponseItem[];

interface TarotPayload {
  question: string;
  cards: string[];
}

export default function TarotContentFullResult({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { tarotData } = useTarotStore();

  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const [resultAI, setResultAI] = useState<AiResponse | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);
  const [payload, setPayload] = useState<TarotPayload | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let isCancelled = false;

    const runTarotFullResult = async () => {
      // 1. Пытаемся взять данные из Zustand-стора, иначе берем из localStorage
      let currentQuestion = tarotData?.question;
      let currentCards = tarotData?.cards;

      if (!currentQuestion || !currentCards || currentCards.length === 0) {
        currentQuestion = localStorage.getItem('tarot_question') || '';
        const savedCardsRaw = localStorage.getItem('tarot_cards');

        if (savedCardsRaw) {
          try {
            currentCards = JSON.parse(savedCardsRaw);
          } catch (e) {
            console.error('Failed to parse tarot_cards from localStorage', e);
          }
        }
      }

      if (!currentCards || currentCards.length === 0) {
        setHasError(true);
        setLoading(false);
        return;
      }

      setPayload({
        question: currentQuestion,
        cards: currentCards,
      });

      setLoading(true);
      setStatus(dict.TarotContentFullResult?.dataSending || 'Sending data...');

      try {
        const response = await fetch('/api/tarot-full-result', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: currentQuestion,
            cards: currentCards,
            lang,
          }),
        });

        if (!response.ok) throw new Error('Server error');

        const result = await response.json();

        if (!isCancelled) {
          setResultAI(result);
          setStatus(dict.TarotContentFullResult?.ready || 'Ready');

          // Очищаем localStorage после успешного получения ответа
          localStorage.removeItem('tarot_question');
          localStorage.removeItem('tarot_cards');
        }
      } catch (error) {
        console.error(error);
        if (!isCancelled) setHasError(true);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    runTarotFullResult();

    return () => {
      isCancelled = true;
    };
  }, [tarotData, lang, dict, isHydrated]);

  if (!isHydrated || loading) {
    return <GlobalLoader />;
  }

  if (hasError && !resultAI) {
    return (
      <div className="text-white p-10">
        {dict.TarotContentFullResult?.dataMissing ||
          'Data is missing. Please select cards again.'}
      </div>
    );
  }

  const handleDownload = () => {
    exportElementToPdf('pdf-container', 'tarot-full-report.pdf');
  };

  const getAiText = (): string => {
    if (!resultAI) return 'AI response not found...';
    if (Array.isArray(resultAI)) {
      return resultAI[0]?.output || 'AI response not found...';
    }
    return resultAI.output || 'AI response not found...';
  };

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full">
      {resultAI && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
          >
            {dict.TarotContentFullResult?.button || 'Download PDF'}
          </button>
        </div>
      )}

      <div
        id="pdf-container"
        className="container mx-auto bg-gray-900/60 w-full overflow-hidden rounded-2xl relative shadow-lg mt-8 pb-10"
      >
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl italic underline font-light text-left pl-10 pt-6 text-white">
            {dict.TarotContentFullResult?.title || 'Tarot Result'}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        </div>

        {payload && (
          <div className="px-10 mb-8 text-xl text-white font-light text-center">
            {payload.question && (
              <p className="mb-4">
                {dict.TarotContentFullResult?.question || 'Question:'}{' '}
                <span>{payload.question}</span>
              </p>
            )}

            <div>
              <p className="mb-4 text-xl font-light text-center underline">
                {dict.TarotContentFullResult?.cards || 'Selected Cards'}
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                {payload.cards.map((cardName, index) => {
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
                          ?
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {resultAI && (
          <div className="pl-10 pr-10 text-white font-light leading-relaxed whitespace-pre-line">
            <h3 className="text-lg font-light mb-2">
              {dict.TarotContentFullResult?.analysis || 'Interpretation'}
            </h3>
            <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
              {getAiText()}
            </div>
          </div>
        )}
      </div>

      {resultAI && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
          >
            {dict.TarotContentFullResult?.button || 'Download PDF'}
          </button>
        </div>
      )}
    </section>
  );
}
