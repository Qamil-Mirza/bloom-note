'use client';

import { AnimatePresence, motion } from 'motion/react';
import type { AnimationState } from '@/components/three/envelope/envelope-scene';

interface BrandWatermarkProps {
  accentColor: string;
  animState: AnimationState;
}

export function BrandWatermark({ accentColor, animState }: BrandWatermarkProps) {
  const visible = animState === 'idle' || animState === 'complete';

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-6 z-30 text-xl font-bold tracking-wide no-underline px-5 py-3"
          style={{
            color: accentColor,
            paddingTop: 'env(safe-area-inset-top)',
            paddingLeft: 'env(safe-area-inset-left)',
          }}
        >
          💌 BloomNote 
        </motion.a>
      )}
    </AnimatePresence>
  );
}
