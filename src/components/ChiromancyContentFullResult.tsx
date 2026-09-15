'use client';

import { exportElementToPdf } from '@/app/utils/exportPdf';
import { base64ToFile } from '@/app/utils/fileHelpers';
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
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<string>('');
  const [resultAI, setResultAI] = useState<AiResponse | null>(null);
  const [hasError, setHasError] = useState<boolean>(false);

  const [images, setImages] = useState<{ left: string; right: string } | null>(
    null,
  );

  useEffect(() => {
    queueMicrotask(() => {
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    let isCancelled = false;

    const runChiromancyFullResult = async () => {
      const leftBase64 = localStorage.getItem('chiromancy_left_hand');
      const rightBase64 = localStorage.getItem('chiromancy_right_hand');

      if (!leftBase64 || !rightBase64) {
        setHasError(true);
        setLoading(false);
        return;
      }

      setImages({ left: leftBase64, right: rightBase64 });

      setLoading(true);
      setStatus(
        dict.ChiromancyContentFullResult?.dataSending || 'Sending data...',
      );

      try {
        const leftFile = base64ToFile(leftBase64, 'leftHand.jpg');
        const rightFile = base64ToFile(rightBase64, 'rightHand.jpg');

        const formData = new FormData();
        formData.append('leftHand', leftFile);
        formData.append('rightHand', rightFile);
        formData.append('lang', lang);

        const response = await fetch('/api/chiromancy-full-result', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Error server');

        const result = await response.json();

        if (!isCancelled) {
          setResultAI(result);
          setStatus(dict.ChiromancyContentFullResult?.ready || 'Ready');

          localStorage.removeItem('chiromancy_left_hand');
          localStorage.removeItem('chiromancy_right_hand');
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

    runChiromancyFullResult();

    return () => {
      isCancelled = true;
    };
  }, [lang, dict, isHydrated]);

  if (!isHydrated || loading) {
    return <GlobalLoader />;
  }

  if (hasError && !resultAI) {
    return (
      <div className="text-white p-10">
        {dict.ChiromancyContentFullResult?.dataMissing ||
          'Data is missing. Please upload images again.'}
      </div>
    );
  }

  const handleDownload = () => {
    exportElementToPdf('pdf-container', 'chiromancy-full-report.pdf');
  };

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full">
      {resultAI && (
        <div className="flex justify-center">
          <button
            onClick={handleDownload}
            className="w-3/4 bg-[#0f3995] hover:bg-[#0f3995]/60 text-white font-light rounded-full shadow-sm hover:shadow-white transition-all py-3 mt-8"
          >
            {dict.ChiromancyContentFullResult?.button || 'Download PDF'}
          </button>
        </div>
      )}

      <div
        id="pdf-container"
        className="container mx-auto w-full overflow-hidden rounded-2xl relative shadow-lg mt-8 pb-10"
      >
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl lg:text-2xl italic underline font-medium text-left pl-10 pt-6 text-white">
            {dict.ChiromancyContentFullResult?.title || 'Chiromancy Result'}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
        </div>

        {images && (
          <div className="flex flex-col sm:flex-row gap-4 px-10 mb-8">
            <div className="w-full sm:w-1/2 relative h-64 sm:h-80">
              <Image
                src={images.left}
                alt="Left Hand"
                fill
                unoptimized
                className="rounded-lg object-cover shadow-md"
              />
            </div>
            <div className="w-full sm:w-1/2 relative h-64 sm:h-80">
              <Image
                src={images.right}
                alt="Right Hand"
                fill
                unoptimized
                className="rounded-lg object-cover shadow-md"
              />
            </div>
          </div>
        )}

        {resultAI && (
          <div className="pl-10 pr-10 text-white leading-relaxed whitespace-pre-line">
            <h3 className="text-lg font-light mb-4">
              {dict.ChiromancyContentFullResult?.analysis || 'Analysis'}
            </h3>
            <div className="whitespace-pre-line text-base font-light leading-relaxed text-white">
              {resultAI?.output || 'AI response not found...'}
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
            {dict.ChiromancyContentFullResult?.button || 'Download PDF'}
          </button>
        </div>
      )}
    </section>
  );
}
