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
          className="fixed bottom-6 sm:bottom-10 inset-x-0 z-20 flex justify-center px-4 sm:px-6"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="w-full max-w-sm sm:max-w-md bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl shadow-black/10">
            {/* Top accent bar */}
            <div
              className="h-0.5 w-16 mx-auto rounded-full mb-5"
              style={{ backgroundColor: theme.accent }}
            />

            {/* Message with decorative quotes */}
            <div className="relative px-4">
              <span
                className="absolute -top-3 -left-1 text-3xl leading-none font-serif opacity-20 select-none"
                style={{ color: theme.accent }}
              >
                &ldquo;
              </span>
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
              <span
                className="absolute -bottom-4 -right-1 text-3xl leading-none font-serif opacity-20 select-none"
                style={{ color: theme.accent }}
              >
                &rdquo;
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
