'use client';
import { useDictionary } from '@/app/hooks/useDictionary';
import { useNumerologyStore } from '@/app/store/useNumerologyStore';
import { NumerologyReport } from '@/app/types/numerology';
import { useState } from 'react';
import GlobalLoader from './GlobalLoader';

export default function NumerologyForm({
  onResult,
}: {
  onResult: (data: NumerologyReport) => void;
}) {
  const dict = useDictionary();
  const { setClientData } = useNumerologyStore();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const currentLanguage = dict.header?.language || 'en';

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('birthDate', formattedDate);
    formData.append('lang', currentLanguage);
    try {
      const res = await fetch('/api/numerology', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error(
          'Server error (text): / Ошибка сервера (текст):',
          errorText,
        );
        setLoading(false);
        return;
      }

      const data = await res.json();
      const clientInfo = {
        name: `${firstName} ${lastName}`,
        birthDate: formattedDate,
      };
      setClientData(clientInfo);
      setIsSubmitted(true);
      onResult(data);
    } catch (error) {
      console.error('Client-side error / Ошибка на клиенте', error);
    } finally {
      setLoading(false);
    }
  };
  if (!dict) return null;
  return (
    <section className="px-2 py-4 sm:px-4 lg:px-6 w-full h-auto">
      {loading && <GlobalLoader />}
      <div className="container mx-auto p-6 pb-8 bg-gray-900/20 backdrop-blur-md rounded-2xl max-w-4xl border border-gray-700/50 h-auto flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-auto">
          {/* Сетка для полей и комментариев */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left items-center">
            {/* ИМЯ */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.NumerologyForm.name}
              </label>
              <input
                type="text"
                placeholder={dict.NumerologyForm.placeholder1}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.NumerologyForm.nameText}
            </div>

            {/* ФАМИЛИЯ */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.NumerologyForm.lastName}
              </label>
              <input
                type="text"
                placeholder={dict.NumerologyForm.placeholder2}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2">
              {dict.NumerologyForm.lastNameText}
            </div>

            {/* ДЕНЬ */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.NumerologyForm.day}
              </label>
              <input
                type="number"
                placeholder={dict.NumerologyForm.placeholder3}
                min="1"
                max="31"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white font-light text-ms hidden md:block pl-2">
              {dict.NumerologyForm.dayText}
            </div>

            {/* МЕСЯЦ */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.NumerologyForm.month}
              </label>
              <input
                type="number"
                placeholder={dict.NumerologyForm.placeholder4}
                min="1"
                max="12"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white font-light text-sm hidden md:block pl-2 text-ms">
              {dict.NumerologyForm.monthText}
            </div>

            {/* ГОД */}
            <div className="flex flex-col">
              <label className="text-white font-light text-ms mb-1">
                {dict.NumerologyForm.year}
              </label>
              <input
                type="number"
                placeholder={dict.NumerologyForm.placeholder5}
                min="1900"
                max={2026}
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>
            <div className="text-white text-ms font-light text-sm hidden md:block pl-2">
              {dict.NumerologyForm.yearText}
            </div>
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading || isSubmitted}
            className="w-full md:w-1/2 mx-auto mt-4 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all disabled:bg-gray-600   block"
          >
            {loading
              ? dict.NumerologyForm.submitLoading
              : dict.NumerologyForm.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
