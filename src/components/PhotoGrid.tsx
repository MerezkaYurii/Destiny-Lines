import { getDictionary } from '@/app/lib/get-dictionary';

import { PhotoGridProps } from '@/app/types/chiromancy';
import { ImageUpload } from './ImageUpload';

export default async function PhotoGrid({ currentLocale }: PhotoGridProps) {
  const dict = await getDictionary(currentLocale);
  return (
    <section className="px-2 py-0.5 sm:px-4 sm:py-1 lg:px-6 lg:py-2 ">
      <div className="container mx-auto  py-2 text-center  bg-gray-700/60 rounded-2xl mt-6 mb-6">
        {/* Заголовок секции */}
        <div>
          <h2 className="text-lg sm:text-xl lg:text-2xl  italic  underline font-medium text-left pl-10 text-white  ">
            {dict.PhotoGrid.title}
          </h2>
          <div className="mt-2 ml-10 h-1 w-16 bg-[#0f3995] rounded" />
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.PhotoGrid.text1}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.PhotoGrid.text2}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-left pl-10 text-white  ">
            {dict.PhotoGrid.text3}
          </p>
          <p className="text-lg sm:text-xl lg:text-xl  italic font-light text-center text-white  ">
            {dict.PhotoGrid.warning}
          </p>
        </div>

        <ImageUpload currentLocale={currentLocale} />
      </div>
    </section>
  );
}
