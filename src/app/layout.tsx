import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { GeolocationProvider } from '@/contexts/geolocation-context-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tryp Transit',
  description: 'Tryp Transit',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GeolocationProvider>
          <Navbar />
          {children}
        </GeolocationProvider>
      </body>
    </html>
  );
}
