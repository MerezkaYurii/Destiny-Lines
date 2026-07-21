'use client';
import { useState } from 'react';
import { DECK, TarotCard, TarotDeckProps } from '@/app/types/tarot';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Установи: npm install framer-motion
import { useDictionary } from '@/app/hooks/useDictionary';
import { useTarotStore } from '@/app/store/useTarotStore';
import GlobalLoader from './GlobalLoader';

const translations = {
  ru: [
    'Общий совет / Что меня ждёт',
    'Любовь и отношения',
    'Карьера и работа',
    'Финансы и деньги',
    'Личное развитие и самооценка',
    'Здоровье и самочувствие',
    'Решение сложной ситуации',
    'Что делать дальше?',
  ],
  en: [
    'General advice / What awaits me',
    'Love and relationships',
    'Career and work',
    'Finance and money',
    'Personal growth and self-esteem',
    'Health and well-being',
    'Difficult situation resolution',
    'What to do next?',
  ],
};

// Функция вынесена за пределы компонента, чтобы React не ругался на impure-вызовы при рендере
function getRandomCardIndices(deckLength: number, count: number = 3): number[] {
  const indices: number[] = [];
  while (indices.length < count) {
    // Используем криптографически безопасный метод или обычный Math.random, но вне компонента
    const r = Math.floor(Math.random() * deckLength);
    if (!indices.includes(r)) indices.push(r);
  }
  return indices;
}

export default function TarotDeck({ onResult, onDraw, lang }: TarotDeckProps) {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const dict = useDictionary();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const categories =
    translations[lang as keyof typeof translations] || translations.ru;

  const handleDraw = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const indices = getRandomCardIndices(DECK.length, 3);
      const drawnCards = indices.map((index) => DECK[index]);
      setSelectedCards(drawnCards);

      if (onDraw) onDraw(indices);

      // Ждем ответа от ИИ
      await handleSendToAI(drawnCards);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Выключаем блокировку в любом случае (даже при ошибке)
    }
  };

  const handleSendToAI = async (drawnCards: TarotCard[]) => {
    setLoading(true);

    // Собираем массив из ID или названий карт
    const cardIdentifiers = drawnCards.map((card) => card.name);

    const payload = {
      question: question.trim(),
      lang: lang || 'en',
      cards: cardIdentifiers,
    };
    useTarotStore.getState().setTarotData(payload);
    try {
      const res = await fetch('/api/tarot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          'Server error (text): / Ошибка сервера (текст):',
          errorText,
        );
        return;
      }

      const data = await res.json();
      setIsSubmitted(true);
      if (onResult) onResult(data); // Передаем результат анализа выше
    } catch (error) {
      console.error('Client-side error / Ошибка на клиенте', error);
    } finally {
      setLoading(false);
    }
  };

  if (!dict) return null;
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] mt-10 p-6 gap-8 bg-slate-900/70 rounded-2xl border border-slate-700">
      {/* ЗАДНИЙ ФОН — теперь под кнопкой */}
      {loading && <GlobalLoader />}
      <div className="absolute inset-0 z-0 pointer-events-none ">
        <Image
          src="/deckOfCards.png"
          alt="Background"
          fill
          className="object-contain opacity-80 rotate-180"
          priority
        />
      </div>

      {/* ИНТЕРФЕЙС ВВОДА ВОПРОСА (Всегда сверху) */}
      <div className="relative z-10 w-full max-w-4xl text-left text-white bg-slate-950/40 p-4 rounded-xl border border-slate-700/50 backdrop-blur-xs">
        <label className="block sm:text-xl text-lg font-light italic underline text-white mb-2">
          {dict.TarotDeck.title}
        </label>

        {/* Список быстрых категорий */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setQuestion(cat)}
              className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                question === cat
                  ? 'bg-[#0f3995] border-white text-white font-light shadow-xs'
                  : 'bg-slate-800/50 border-slate-700 text-white font-light hover:border-slate-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Поле ручного ввода */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={dict.TarotDeck.placeholder}
          className="w-full px-4 py-2 text-sm bg-slate-950/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-hidden focus:border-white transition-all"
        />
      </div>

      {/* КНОПКА — теперь поверх фона и непрозрачная */}
      <motion.button
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        onClick={handleDraw}
        disabled={loading || isSubmitted} // Блокируем кнопку
        className={`relative z-10 px-8 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995] text-white font-light rounded-full shadow-xs hover:shadow-white transition-all ${
          loading || isSubmitted
            ? 'opacity-50 cursor-not-allowed'
            : 'shadow-xs hover:shadow-white'
        }`}
      >
        {loading ? dict.TarotDeck.buttonLoading : dict.TarotDeck.button}
      </motion.button>

      {/* ТРИ КАРТЫ — поверх фона */}
      <div className="relative z-10 flex flex-wrap justify-center gap-6">
        {selectedCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50, rotateY: 180 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="relative w-[150px] h-[250px] rounded-xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl"
          >
            <Image
              src={card.imagePath}
              alt={card.name}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

//bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/80
//bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all
