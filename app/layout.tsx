import type { Metadata } from 'next';
import { DM_Sans, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fontSans = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const fontDisplay = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Arvix Commerce',
    default: 'Arvix Commerce — Modern E-commerce'
  },
  description: 'Discover curated products and hassle-free shopping with Arvix Commerce.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${fontSans.variable} ${fontDisplay.variable} flex min-h-screen flex-col bg-neutral-50 text-neutral-900 antialiased`}>
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

