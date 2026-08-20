import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateXP: (amount: number) => void;
  completeLab: (labId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateXP: (amount) => set((state) => ({
        user: state.user ? { ...state.user, xp: state.user.xp + amount } : null
      })),
      completeLab: (labId) => set((state) => ({
        user: state.user ? { 
          ...state.user, 
          completedLabs: [...new Set([...state.user.completedLabs, labId])] 
        } : null
      })),
    }),
    {
      name: 'auth-storage',
    }
  )
);
