import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { GeolocationProvider } from '@/contexts/geolocation-context-provider';
import { AuthProvider } from '@/contexts/auth-context-provider';

const poppins = Poppins({ subsets: ['latin'], weight: ['500', '900'] });

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
      <body className={poppins.className}>
        <AuthProvider>
          <GeolocationProvider>
            <Navbar />
            {children}
          </GeolocationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
