import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BloomNote - Create 3D Valentine Cards',
  description: 'Create beautiful personalized 3D pop-up Valentine cards with animated flower bouquets. No signup required, free forever.',
  openGraph: {
    title: 'BloomNote - 3D Valentine Card Maker',
    description: 'Create stunning 3D Valentine cards in minutes',
    images: ['/og-image.png'],
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
