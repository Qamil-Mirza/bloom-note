'use client';

import { useMemo } from 'react';

export type PerformanceTier = 'low' | 'medium' | 'high';

export interface PerformanceTierResult {
  tier: PerformanceTier;
  dpr: [number, number];
  stemBoneCount: number;
  enableBloom: boolean;
  enableTransmission: boolean;
}

function detectTier(): PerformanceTier {
  if (typeof window === 'undefined') return 'medium';

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as { deviceMemory?: number }).deviceMemory ?? 4;

  if (isMobile && (cores <= 4 || memory <= 2)) return 'low';
  if (isMobile) return 'medium';
  if (cores >= 8 && memory >= 8) return 'high';
  return 'medium';
}

export function usePerformanceTier(): PerformanceTierResult {
  return useMemo(() => {
    const tier = detectTier();

    switch (tier) {
      case 'low':
        return {
          tier,
          dpr: [1, 1.5] as [number, number],
          stemBoneCount: 2,
          enableBloom: false,
          enableTransmission: false,
        };
      case 'medium':
        return {
          tier,
          dpr: [1, 1.5] as [number, number],
          stemBoneCount: 3,
          enableBloom: false,
          enableTransmission: true,
        };
      case 'high':
        return {
          tier,
          dpr: [1, 2] as [number, number],
          stemBoneCount: 4,
          enableBloom: true,
          enableTransmission: true,
        };
    }
  }, []);
}
