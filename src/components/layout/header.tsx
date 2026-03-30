'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APP_NAME } from '@/src/lib/constants';
import { Button } from '@/src/components/ui/button';
import { useAuthStore } from '@/src/lib/auth-store';
import { serviceContainer } from '@/src/application/services/container';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, clearSession } = useAuthStore();

  const handleLogout = async () => {
    await serviceContainer.logoutUser.execute();
    clearSession();
    router.push('/login');
  };

const getLinkClass = (href: string) => {
  const isActive =
    href === '/products'
      ? pathname === '/products' || pathname.startsWith('/products/')
      : pathname === href;

  return `text-sm font-medium transition ${
    isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
  }`;
};

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/products" className="text-lg font-bold tracking-tight text-slate-900">
          {APP_NAME}
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/products" className={getLinkClass('/products')}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-slate-500 sm:inline">
                Hi, {user?.firstName}
              </span>
              <Button variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className={getLinkClass('/login')}>
                Login
              </Link>
              <Link href="/register" className={getLinkClass('/register')}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}