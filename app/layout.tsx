import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dextra.ai'),
  title: 'Dextra — Your AI Right Hand',
  description: 'An open-source AI desktop companion that understands your screen, your apps, and your workflow. One intelligence. Every application.',
  keywords: ['AI', 'desktop assistant', 'open source', 'automation', 'productivity', 'Dextra'],
  authors: [{ name: 'Dextra' }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  openGraph: {
    title: 'Dextra — Your AI Right Hand',
    description: 'An open-source AI desktop companion that understands your screen, your apps, and your workflow.',
    type: 'website',
    url: 'https://dextra.ai',
    images: [
      {
        url: 'https://dextra.ai/og.png',
        width: 1200,
        height: 630,
        alt: 'Dextra — Your AI Right Hand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dextra — Your AI Right Hand',
    description: 'An open-source AI desktop companion that understands your screen, your apps, and your workflow.',
    images: ['https://dextra.ai/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[#050505] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
