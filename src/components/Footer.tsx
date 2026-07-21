'use client';

import { useDictionary } from '@/app/hooks/useDictionary';

export default function Footer() {
  const dict = useDictionary();
  if (!dict) return null;

  return (
    <div className="fixed z-50  bottom-0 w-full bg-gray-900/80 text-white py-4 shadow-sm  transition-colors duration-500 ">
      <div className="container mx-auto px-4 text-center ">
        © {new Date().getFullYear()} {dict.footer.title} — {dict.footer.text} ♥
      </div>
    </div>
  );
}
