'use client';
import { motion } from 'framer-motion';
import { useDictionary } from '@/app/hooks/useDictionary';
export default function GlobalLoader() {
  const dict = useDictionary();
  return (
    <div className="fixed inset-0 top-[70px] z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[#0f3995] border-t-transparent rounded-full shadow-lg"
      />
      <p className="mt-4 text-white text-sm font-light tracking-wide">
        {dict.GlobalLoader.text}
      </p>
    </div>
  );
}
