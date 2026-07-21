import { Locale } from '@/i18n-config';
import 'server-only'; // Гарантирует, что эта функция выполняется только на сервере

const dictionaries = {
  en: () =>
    import('../../../dictionaries/en.json').then((module) => module.default),
  ru: () =>
    import('../../../dictionaries/ru.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return (
    dictionaries[locale as keyof typeof dictionaries]?.() ?? dictionaries.en()
  );
};
