'use client';

import { useDictionary as useDict } from '@/app/DictionaryContext';

export const useDictionary = () => {
  return useDict();
};
