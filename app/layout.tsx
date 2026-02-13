import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BloomNote - Send 3D Valentine Gifts',
  description: 'Pick a 3D gift, write your Valentine\'s message, and share with a link. Free forever, no signup required.',
  metadataBase: new URL('https://bloom-note-pink.vercel.app'),
  openGraph: {
    title: 'BloomNote - 3D Valentine Gift Maker',
    description: 'Send stunning 3D Valentine gifts in minutes',
    images: ['/logos/BloomNote-Logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
