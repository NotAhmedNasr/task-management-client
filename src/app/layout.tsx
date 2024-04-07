import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navigation/bar';
import AppDataLoader from '@/components/headless/userLoading';

const inter = Inter({ subsets: ['latin'] });
const StoreProvider = dynamic(() => import('./storeProvider'), { ssr: false });

export const metadata: Metadata = {
  title: 'Task Management',
  description: 'Task management web application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AppDataLoader />
          <Navbar />
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
