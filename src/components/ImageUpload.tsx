'use client';

import React, { useState, ChangeEvent } from 'react';
import { X, Plus } from 'lucide-react';
import Image from 'next/image';

import { useDictionary } from '@/app/hooks/useDictionary';
import { AnalysisResult, Uploads } from '@/app/types/chiromancy';
import {
  UploadedFile,
  useChiromancyStore,
} from '@/app/store/useChiromancyStore';
import { useRouter } from 'next/navigation';
import GlobalLoader from './GlobalLoader';

export const ImageUpload = ({ currentLocale }: { currentLocale: string }) => {
  const { setUploadedFiles } = useChiromancyStore();
  const dict = useDictionary();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploads, setUploads] = useState<Uploads>({
    leftHand: null,
    rightHand: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof Uploads,
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      // Ограничение 5 МБ
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert(dict.ImageUpload.alert1);
        return;
      }

      setUploads((prev) => ({
        ...prev,
        [type]: {
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        },
      }));
    }
  };
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const handleUpload = async () => {
    if (!uploads.leftHand && !uploads.rightHand) return;
    setIsSubmitted(true);
    // Собираем массив существующих файлов
    const filesToSave: UploadedFile[] = [];
    if (uploads.leftHand) {
      filesToSave.push({
        type: 'leftHand',
        preview: uploads.leftHand.preview,
        file: uploads.leftHand.file,
      });
    }

    if (uploads.rightHand) {
      filesToSave.push({
        type: 'rightHand',
        preview: uploads.rightHand.preview,
        file: uploads.rightHand.file,
      });
    }

    // Записываем в стор
    setUploadedFiles(filesToSave);

    setLoading(true);

    const formData = new FormData();
    if (uploads.leftHand) formData.append('leftHand', uploads.leftHand.file);
    if (uploads.rightHand) formData.append('rightHand', uploads.rightHand.file);
    formData.append('lang', currentLocale);
    try {
      const response = await fetch('/api/chiromancy', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Ошибка сервера (${response.status}):`, errorText);
        alert(`Ошибка сервера: ${response.status}`);
        return;
      }

      const data = await response.json();
      setIsSubmitted(true);
      console.log('Ответ от сервера:', data);
      setAnalysisResult(data);
    } catch (error) {
      console.error('Ошибка при отправке или парсинге:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (type: keyof Uploads) => {
    setUploads((prev) => ({ ...prev, [type]: null }));
  };

  const handleProClick = () => {
    const filesArray = Object.entries(uploads)
      .filter(([_, data]) => data !== null)
      .map(([type, data]) => ({
        type,
        preview: data!.preview,
        file: data!.file, // Теперь сохраняем файл для отправки
      }));

    setUploadedFiles(filesArray);
    router.push(`/${currentLocale}/chiromancyFullResult`);
  };

  if (!dict) return null;
  return (
    <div className="flex flex-row flex-wrap gap-4 w-full items-center justify-center  p-4 pt-10">
      {loading && <GlobalLoader />}
      {(Object.keys(uploads) as (keyof Uploads)[]).map((type) => (
        <div
          key={type}
          className="border-2 border-dashed border-gray-300  rounded-lg w-80 h-60 flex flex-row items-center justify-center"
        >
          {!uploads[type] ? (
            <label className="flex items-center justify-center cursor-pointer h-20  ">
              <Plus className="text-white" />
              <span className="text-white text-sm font-light">
                {type === 'leftHand'
                  ? dict.ImageUpload.leftHand
                  : dict.ImageUpload.rightHand}
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, type)}
              />
            </label>
          ) : (
            <div className="relative w-full h-full block">
              <Image
                src={uploads[type]!.preview}
                alt={type}
                fill
                className="object-cover rounded-md"
                unoptimized
              />
              <button
                onClick={() => removeFile(type)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleUpload}
        disabled={loading || isSubmitted}
        className="w-1/2 py-2 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all"
      >
        {loading ? dict.ImageUpload.text1 : dict.ImageUpload.text2}
      </button>
      {/* Блок бесплатного отчета — показываем, если данные пришли */}
      {analysisResult && (
        <div className="mt-8 p-6 bg-gray-900 rounded-xl shadow-md border-2 border-gray-500">
          <h2 className="text-2xl font-medium text-white italic underline mb-4">
            {dict.analysisResult.title}
          </h2>

          {/* ТЕКСТ ОТВЕТА ОТ ИИ */}
          <div className="text-white font-light text-base leading-relaxed whitespace-pre-line mb-6 bug-fix-text">
            {analysisResult.text ||
              (typeof analysisResult === 'string'
                ? analysisResult
                : JSON.stringify(analysisResult))}
          </div>

          {/* Секция продажи полного разбора */}
          <div className="p-4 bg-gray-700 rounded-lg text-center">
            <h3 className="text-lg font-light text-white  underline mb-2">
              {dict.analysisResult.full_analysis}
            </h3>
            <p className="text-sm text-white mb-4 font-light">
              {dict.analysisResult.full_analysis_text}
            </p>
            <button
              onClick={handleProClick}
              className="px-6 py-3 bg-[#0f3995] border-[#0f3995] hover:bg-[#0f3995]/70 text-white font-light rounded-full shadow-xs hover:shadow-white transition-all "
            >
              {dict.analysisResult.full_analysis_button}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
