import { create } from 'zustand';

export interface UploadedFile {
  type: string;
  preview: string;
  file: File;
}

export interface ChiromancyStore {
  uploadedFiles: UploadedFile[];
  setUploadedFiles: (files: UploadedFile[]) => void;
}

export const useChiromancyStore = create<ChiromancyStore>()((set) => ({
  uploadedFiles: [],
  setUploadedFiles: (files) => set({ uploadedFiles: files }),
}));
