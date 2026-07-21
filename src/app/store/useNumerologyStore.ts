import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NumerologyStore {
  clientData: { name: string; birthDate: string } | null;
  setClientData: (
    clientData: { name: string; birthDate: string } | null,
  ) => void;
}

export const useNumerologyStore = create<NumerologyStore>()(
  persist(
    (set) => ({
      clientData: null,
      setClientData: (clientData) => set({ clientData }),
    }),
    {
      name: 'numerology-storage',
    },
  ),
);
