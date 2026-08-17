'use client';

import { useNumerologyStore } from '@/app/store/useNumerologyStore';
import { exportElementToPdf } from '@/app/utils/exportPdf';
import { Dictionary } from '@/i18n-config';
import { useEffect, useState } from 'react';
import GlobalLoader from './GlobalLoader';

interface AiResponse {
  output: string;
}

export default function NumerologyContentFullResult({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { clientData } = useNumerologyStore();

  // Инициализируем сразу в true, если есть данные клиента
  const [loading, setLoading] = useState<boolean>(!!clientData);
  const [status, setStatus] = useState<string>(
    dict.NumerologyContentFullResult.dataSending,
  );
  const [resultAI, setResultAI] = useState<AiResponse | null>(null);

  useEffect(() => {
    if (!clientData) {
      return;
    }

    let isCancelled = false;

    const runNumerologyFullResult = async () => {
      const formData = new FormData();
      formData.append('fullName', clientData.name);
      formData.append('birthDate', clientData.birthDate);
      formData.append('lang', lang);

      try {
        const response = await fetch('/api/numerology-full-result', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Ошибка сервера');

        const result = await response.json();

        if (!isCancelled) {
          setResultAI(result);
          setStatus(dict.NumerologyContentFullResult.ready);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    runNumerologyFullResult();

    return () => {
      isCancelled = true;
    };
  }, [clientData, lang, dict]);

  if (!clientData) {
    return (
      <div className="text-white p-10">
        {dict.NumerologyContentFullResult.dataMissing}
      </div>
    );
  }

  const handleDownload = () => {
    exportElementToPdf('pdf-container', 'numerology-full-report.pdf');
  };

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full ">
      {loading && <GlobalLoader />}

      {!loading && resultAI && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
          >
            {dict.NumerologyContentFullResult.button}
          </button>
        </div>
      )}

      <div
        id="pdf-container"
        className="container mx-auto w-full overflow-hidden rounded-2xl relative shadow-lg"
      >
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl italic underline font-medium text-left pl-10 text-white">
            {dict.NumerologyContentFullResult.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        </div>

        <div className="pl-10 mb-8 text-white font-light">
          <p>
            {dict.NumerologyContentFullResult.name}:{' '}
            <span>{clientData.name}</span>
          </p>
          <p>
            {dict.NumerologyContentFullResult.birthDate}:{' '}
            <span>{clientData.birthDate}</span>
          </p>
        </div>

        {loading ? (
          <div className="pl-10 pr-10">
            <p className="text-white font-light text-sm">{status}</p>
          </div>
        ) : (
          resultAI && (
            <div className="pl-10 pr-10 text-white leading-relaxed whitespace-pre-line">
              <h3 className="text-lg font-light mb-2">
                {dict.NumerologyContentFullResult.analysis}
              </h3>
              <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
                {resultAI?.output || 'AI response not found...'}
              </div>
            </div>
          )
        )}
      </div>

      {!loading && resultAI && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
          >
            {dict.NumerologyContentFullResult.button}
          </button>
        </div>
      )}
    </section>
  );
}
