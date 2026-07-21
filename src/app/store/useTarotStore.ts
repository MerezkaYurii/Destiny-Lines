import { create } from 'zustand';

interface TarotStore {
  tarotData: {
    question: string;
    lang: string;
    cards: string[];
  } | null;
  setTarotData: (data: {
    question: string;
    lang: string;
    cards: string[];
  }) => void;
}

export const useTarotStore = create<TarotStore>()((set) => ({
  tarotData: null,
  setTarotData: (data) => set({ tarotData: data }),
}));
