'use client';

import React, { useState } from 'react';
import TarotDeck from './TarotDeck';

import { TarotReport } from '@/app/types/tarot';

import { useDictionary } from '@/app/hooks/useDictionary';

import ResultDisplayTarot from './ResultDisplayTarot';

export const TarotContent = ({ lang }: { lang: string }) => {
  const dict = useDictionary();

  const [report, setReport] = useState<TarotReport | null>(null);
  const handleResultUpdate = (report: TarotReport) => {
    setReport(report);
  };
  if (!dict) return null;
  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full z-20">
      <div className="container mx-auto  w-full overflow-hidden rounded-2xl relative  shadow-lg">
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-medium text-left pl-10 text-white  ">
            {dict.Tarot.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white ">
            {dict.Tarot.ruleTitle}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.Tarot.rule1}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.Tarot.rule2}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white">
            {dict.Tarot.rule3}
          </p>
        </div>
        <TarotDeck onResult={handleResultUpdate} lang={lang} />
        <ResultDisplayTarot report={report} lang={lang} />
      </div>
    </section>
  );
};
