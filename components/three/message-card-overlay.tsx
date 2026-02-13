'use client';

import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/utils/cn';
import type { CardMessage, CardTheme } from '@/types/card';

interface MessageCardOverlayProps {
  visible: boolean;
  message: CardMessage;
  theme: CardTheme;
}

export function MessageCardOverlay({ visible, message, theme }: MessageCardOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-20"
        >
          <div
            className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl"
            style={{ borderColor: theme.accent, borderWidth: '2px' }}
          >
            <p
              className={cn(
                'text-center text-lg leading-relaxed',
                message.font === 'cursive' && 'font-cursive',
                message.font === 'serif' && 'font-serif'
              )}
              style={{ color: message.color }}
            >
              {message.text || 'A special Valentine gift just for you!'}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
