'use client';

import { AnimatePresence, motion } from 'motion/react';

interface OpenGiftPromptProps {
  visible: boolean;
  accentColor: string;
  onOpen: () => void;
}

export function OpenGiftPrompt({ visible, accentColor, onOpen }: OpenGiftPromptProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-20 flex items-end justify-center pb-[15vh]"
          onClick={onOpen}
        >
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="relative px-10 py-4 rounded-full text-lg font-semibold text-white backdrop-blur-md shadow-lg cursor-pointer"
            style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 80%, transparent)` }}
          >
            {/* Pulsing ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ backgroundColor: accentColor }}
            />
            <span className="relative z-10">Tap to Open</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
