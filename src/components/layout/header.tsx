'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { APP_NAME } from '@lib/constants';
import { useAuthStore } from '@lib/auth-store';
import { serviceContainer } from '@services/container';
import { UserProfileDropdown } from './user-profile-dropdown';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { HeaderSearch } from './header-search';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, clearSession } = useAuthStore();

  const isAuthPage = pathname === '/login' || pathname === '/register';

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

    return `text-sm font-medium transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900'
      }`;
  };

  return (
    <header className="sticky top-0 z-[9999] border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <Link
          href="/products"
          className="shrink-0 flex items-center gap-2 font-semibold tracking-tight text-slate-900"
        >
          <HiOutlineShoppingCart size={22} className="text-brand-600 text-md" />
          {APP_NAME}
        </Link>

        <nav className="flex flex-1 items-center justify-end gap-2">
          <HeaderSearch />

          {isAuthPage ? (
            <>
              <Link href="/products" className={getLinkClass('/products')}>
                Products
              </Link>
              <Link href="/login" className={getLinkClass('/login')}>
                Login
              </Link>
              <Link href="/register" className={getLinkClass('/register')}>
                Register
              </Link>
            </>
          ) : isAuthenticated ? (
            <UserProfileDropdown user={user} onLogout={handleLogout} />
          ) : (
            <>
              <Link href="/products" className={getLinkClass('/products')}>
                Products
              </Link>
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