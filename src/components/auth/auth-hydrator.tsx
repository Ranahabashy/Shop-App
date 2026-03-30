'use client';

import { useEffect } from 'react';
import { serviceContainer } from '@/src/application/services/container';
import { useAuthStore } from '@/src/lib/auth-store';

export function AuthHydrator() {
  const { setSession, clearSession, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) return;

    serviceContainer.getCurrentUser
      .execute()
      .then((user) => {
        const cachedToken = typeof window !== 'undefined' ? localStorage.getItem('solid-shop-token') ?? 'restored-session' : 'restored-session';
        setSession({ user, accessToken: cachedToken });
      })
      .catch(() => {
        clearSession();
      });
  }, [clearSession, isAuthenticated, setSession]);

  return null;
}
