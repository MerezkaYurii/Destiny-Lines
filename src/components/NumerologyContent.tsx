'use client';

import { useState } from 'react';
import NumerologyForm from '@/components/NumerologyForm';

import { Dictionary } from '@/i18n-config';
import { NumerologyReport } from '@/app/types/numerology';
import ResultDisplayNumerology from './ResultDisplayNumerology';

export default function NumerologyContent({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: string;
}) {
  const [report, setReport] = useState<NumerologyReport | null>(null);

  return (
    <section className="px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6 w-full ">
      <div className="container mx-auto  w-full overflow-hidden rounded-2xl relative  shadow-lg">
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-medium text-left pl-10 text-white  ">
            {dict.Numerology.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white underline ">
            {dict.Numerology.text1title}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.Numerology.text1}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white underline ">
            {dict.Numerology.text2title}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.Numerology.text2}
          </p>
        </div>
        <NumerologyForm onResult={setReport} />
        <ResultDisplayNumerology report={report} lang={lang} />
      </div>
    </section>
  );
}
