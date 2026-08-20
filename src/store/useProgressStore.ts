import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  labProgress: Record<string, {
    completed: boolean;
    score: number;
    currentTaskIndex: number;
    answers: Record<string, any>;
  }>;
  updateLabProgress: (labId: string, data: any) => void;
  resetLabProgress: (labId: string) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      labProgress: {},
      updateLabProgress: (labId, data) => set((state) => ({
        labProgress: {
          ...state.labProgress,
          [labId]: {
            ...(state.labProgress[labId] || {
              completed: false,
              score: 0,
              currentTaskIndex: 0,
              answers: {}
            }),
            ...data
          }
        }
      })),
      resetLabProgress: (labId) => set((state) => {
        const newProgress = { ...state.labProgress };
        delete newProgress[labId];
        return { labProgress: newProgress };
      }),
    }),
    {
      name: 'progress-storage',
    }
  )
);
