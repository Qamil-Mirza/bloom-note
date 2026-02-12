'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

export function useStemMaterial(): THREE.Material {
  const { enableTransmission } = usePerformanceTier();

  return useMemo(() => {
    if (enableTransmission) {
      return new THREE.MeshPhysicalMaterial({
        color: '#2d5016',
        roughness: 0.7,
        clearcoat: 0.15,
        clearcoatRoughness: 0.6,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: '#2d5016',
      roughness: 0.7,
    });
  }, [enableTransmission]);
}
