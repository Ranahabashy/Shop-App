import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/components/providers/providers';
import { Header } from '@components/layout/header';
import { AuthHydrator } from '@components/auth/auth-hydrator';
import { APP_NAME } from '@lib/constants';

export const metadata = {
  title: APP_NAME,
  description: 'Everything you need, all in one place',
  icons: {
    icon: '/shop-icon.svg',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthHydrator />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
