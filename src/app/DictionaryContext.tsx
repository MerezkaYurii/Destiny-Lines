'use client';

import { Dictionary } from '@/i18n-config';
import { createContext, useContext } from 'react';

export const DictionaryContext = createContext<Dictionary | null>(null);

export const DictionaryProvider = ({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: Dictionary;
}) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => {
  const context = useContext(DictionaryContext);
  if (!context)
    throw new Error('useDictionary must be used within DictionaryProvider');
  return context;
};
