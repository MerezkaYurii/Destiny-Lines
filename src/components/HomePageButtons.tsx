'use client';

import React from 'react';
import Image from 'next/image';
import { useDictionary } from '@/app/DictionaryContext';
import { useRouter, usePathname } from 'next/navigation';

// Оставляем снаружи только то, что не зависит от языка
const buttonsConfig = [
  {
    id: 'button1',
    image: '/NumberButton.jpg',
    path: '/numerology',
  },
  {
    id: 'button2',
    image: '/ChiromancyButton.jpg',
    path: '/chiromancy',
  },
  {
    id: 'button3',
    image: '/TarotButton.jpg',
    path: '/tarot',
  },
];

const HomePageButtons = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dict = useDictionary();

  const getCurrentLang = () => {
    const segments = pathname.split('/');
    // Предполагаем, что язык идет первым сегментом: ['', 'ru', 'numerology']
    return segments[1] || 'en';
  };

  const handleNavigate = (path: string) => {
    const lang = getCurrentLang();
    // Перенаправляем с учетом локали, например: /ru/numerology
    router.push(`/${lang}${path}`);
  };

  if (!dict) return null;

  return (
    <section className="px-4 py-8 md:px-6 lg:px-8">
      <div className="container mx-auto space-y-6">
        {buttonsConfig.map((button) => {
          type ButtonKeys = 'button1' | 'button2' | 'button3';
          const textData = dict.HomePageButtons[button.id as ButtonKeys];

          if (!textData) return null;

          return (
            <div
              key={button.id}
              className="flex flex-col sm:flex-row items-center bg-gray-800/80 rounded-3xl p-6 shadow-xl border border-gray-700/50 hover:border-[#0f3995] transition-all duration-300 gap-6"
            >
              {/* Левая часть: Контейнер для картинки с эффектами */}
              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-white/50 rounded-full blur-xl transform scale-100"></div>

                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#0f3995] shadow-inner z-10">
                  <Image
                    src={button.image}
                    alt={textData.title} // Берем из словаря
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 128px, 128px"
                  />
                </div>
              </div>

              {/* Правая часть: Текст */}
              <div className="grow text-center sm:text-left text-gray-100">
                <h3 className="text-2xl font-medium mb-2 text-white">
                  {textData.title} {/* Берем из словаря */}
                </h3>
                <p className="text-gray-200 text-medium italic leading-relaxed">
                  {textData.description} {/* Берем из словаря */}
                </p>

                {/* Кнопка действия */}
                <button
                  onClick={() => handleNavigate(button.path)}
                  className="mt-4 px-5 py-2 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all text-sm"
                >
                  {dict.HomePageButtons.butn.text}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePageButtons;
