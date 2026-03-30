import './globals.css';
import { ReactNode } from 'react';
import { Providers } from '@/src/components/providers';
import { Header } from '@/src/components/layout/header';
import { AuthHydrator } from '@/src/components/auth/auth-hydrator';
import { APP_NAME } from '@/src/lib/constants';

export const metadata = {
  title: APP_NAME,
  description: 'Responsive product app with auth, clean architecture, and reusable components.'
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
