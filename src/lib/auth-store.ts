'use client';

import { create } from 'zustand';
import type { User } from '@/src/domain/entities/auth';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setSession: (payload: { user: User; accessToken: string }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  setSession: ({ user, accessToken }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('solid-shop-token', accessToken);
      localStorage.setItem('solid-shop-user', JSON.stringify(user));
    }

    set({ user, accessToken, isAuthenticated: true });
  },
  clearSession: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('solid-shop-token');
      localStorage.removeItem('solid-shop-user');
    }

    set({ user: null, accessToken: null, isAuthenticated: false });
  }
}));
