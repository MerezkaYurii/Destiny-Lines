'use client';

import { useChiromancyStore } from '@/app/store/useChiromancyStore';
import { exportElementToPdf } from '@/app/utils/exportPdf';
import { Dictionary } from '@/i18n-config';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import GlobalLoader from './GlobalLoader';
interface AiResponse {
  output: string;
}

export default function ChiromancyContentFullResult({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const { uploadedFiles } = useChiromancyStore();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(
    dict.NumerologyContentFullResult.readyToSend,
  );
  const [resultAI, setResultAI] = useState<AiResponse | null>(null);

  useEffect(() => {
    const runNumerologyFullResult = async () => {
      if (!uploadedFiles) return;

      const formData = new FormData();
      formData.append('leftHand', uploadedFiles[0].file);
      formData.append('rightHand', uploadedFiles[1].file);
      formData.append('lang', lang);
      try {
        setLoading(true);
        setStatus(dict.ChiromancyContentFullResult.dataSending);
        const response = await fetch('/api/chiromancy-full-result', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Ошибка сервера');

        const result = await response.json();
        setResultAI(result);
        setStatus(dict.ChiromancyContentFullResult.ready);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    runNumerologyFullResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles, lang]);

  if (!uploadedFiles) {
    return (
      <div className="text-white p-10">
        {dict.ChiromancyContentFullResult.dataMissing}
      </div>
    );
  }

  const handleDownload = () => {
    exportElementToPdf('pdf-container', 'chiromancy-full-report.pdf');
  };

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full ">
      {loading && <GlobalLoader />}
      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 "
        >
          {dict.ChiromancyContentFullResult.button}
        </button>
      </div>
      <div
        id="pdf-container"
        className="container mx-auto  w-full overflow-hidden rounded-2xl relative  shadow-lg"
      >
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-light text-left pl-10 text-white ">
            {dict.ChiromancyContentFullResult.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        </div>

        {/* Данные клиента */}
        <div className="grid grid-cols-2 gap-2 max-w-xl mx-auto mt-6">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="relative w-full h-60 border  border-gray-600 rounded-xl overflow-hidden"
            >
              <Image
                src={file.preview}
                alt={file.type}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="pl-10 pr-10 ">
          <p className="text-white font-light text-sm">{status}</p>
        </div>
      ) : (
        resultAI && (
          <div className="pl-10 pr-10 text-white leading-relaxed whitespace-pre-line">
            <h3 className="text-lg font-light mb-2">
              {dict.ChiromancyContentFullResult.analysis}
            </h3>
            <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
              {resultAI?.output || 'AI response not found...'}
            </div>
          </div>
        )
      )}

      <div className="flex justify-center">
        <button
          onClick={handleDownload}
          className="  w-3/4 bg-[#0f3995]  hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8 "
        >
          {dict.ChiromancyContentFullResult.button}
        </button>
      </div>
    </section>
  );
}
