import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import Navbar from '@/components/navigation/bar';
import AppDataLoader from '@/components/headless/userLoading';
import { Bounce, ToastContainer } from 'react-toastify';
import AlertDialog from '@/components/dialog/alert';

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
          <main className="py-20 px-5">{children}</main>
        </StoreProvider>
        <AlertDialog />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </body>
    </html>
  );
}
