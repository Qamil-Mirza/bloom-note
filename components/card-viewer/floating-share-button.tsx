'use client';

import { motion } from 'motion/react';
import { useShare } from '@/hooks/use-share';

interface FloatingShareButtonProps {
  url: string;
  accentColor: string;
}

export function FloatingShareButton({ url, accentColor }: FloatingShareButtonProps) {
  const { share, copied } = useShare();

  const handleShare = () => {
    share(url, 'Check out this Valentine card!', 'Someone made this beautiful 3D card for you!');
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onClick={handleShare}
      className="fixed top-6 right-6 z-30 flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-medium backdrop-blur-md shadow-lg cursor-pointer"
      style={{
        backgroundColor: `color-mix(in srgb, ${accentColor} 70%, transparent)`,
        paddingTop: 'max(0.625rem, env(safe-area-inset-top))',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      {copied ? 'Copied!' : 'Share'}
    </motion.button>
  );
}
