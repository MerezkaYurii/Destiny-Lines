'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDictionary } from '@/app/lib/get-dictionary';

// Получаем тип словаря автоматически из функции getDictionary
type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

export default function RulesModal({ dict }: { dict: Dictionary }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        onClick={() => setIsOpen(false)}
className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-slate-950/60 border border-slate-700 p-6 rounded-2xl shadow-2xl text-white"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white transition-colors"
          >
            ✕
          </button>

          <h3 className="text-xl font-medium mb-3">{dict.RulesModal.title}</h3>
          <p className="text-lg text-white font-light underline leading-relaxed mb-6">
            {dict.RulesModal.text}
          </p>
          <ul className="text-md text-white font-light leading-relaxed space-y-2 mb-6 list-disc list-inside">
            <li>{dict.RulesModal.list[0]}</li>
            <li>{dict.RulesModal.list[1]}</li>
            <li>{dict.RulesModal.list[2]}</li>
            <li>{dict.RulesModal.list[3]}</li>
            <li>{dict.RulesModal.list[4]}</li>
            <li>{dict.RulesModal.list[5]}</li>
            <li>{dict.RulesModal.list[6]}</li>
          </ul>
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(false)}
              className="px-20 py-2 bg-[#0f3995] hover:bg-[#0f3995]/70 text-white text-sm font-light rounded-full transition-all shadow-xs hover:shadow-white "
            >
              {dict.RulesModal.button}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
//
