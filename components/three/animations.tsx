'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

type AnimationState = 'closed' | 'opening' | 'revealing' | 'complete';

interface CardAnimationProps {
  state: AnimationState;
  leftCardRef: React.RefObject<Group | null>;
  rightCardRef: React.RefObject<Group | null>;
  bouquetRef: React.RefObject<Group | null>;
}

export function useCardAnimation({
  state,
  leftCardRef,
  rightCardRef,
  bouquetRef,
}: CardAnimationProps) {
  const progressRef = useRef(0);

  useFrame((_, delta) => {
    if (state === 'opening') {
      // Fold animation (0s to 1.5s)
      progressRef.current = Math.min(progressRef.current + delta / 1.5, 1);
      const progress = progressRef.current;

      // Rotate card halves outward
      if (leftCardRef.current) {
        leftCardRef.current.rotation.y = -Math.PI * 0.5 * progress;
      }
      if (rightCardRef.current) {
        rightCardRef.current.rotation.y = Math.PI * 0.5 * progress;
      }
    } else if (state === 'revealing') {
      // Pop-up animation (0s to 2s)
      progressRef.current = Math.min(progressRef.current + delta / 2, 1);
      const progress = progressRef.current;

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      if (bouquetRef.current) {
        bouquetRef.current.position.y = eased * 3;
        bouquetRef.current.rotation.y = eased * Math.PI * 2;
      }
    } else if (state === 'complete') {
      // Idle sway now handled by BouquetPhysicsRig + StemSpringRig
    }
  });

  useEffect(() => {
    progressRef.current = 0;
  }, [state]);
}
