'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

export function usePetalMaterial(color: string): THREE.Material {
  const { enableTransmission } = usePerformanceTier();

  return useMemo(() => {
    if (enableTransmission) {
      return new THREE.MeshPhysicalMaterial({
        color,
        transmission: 0.15,
        thickness: 0.8,
        roughness: 0.5,
        clearcoat: 0.3,
        clearcoatRoughness: 0.4,
        sheen: 1.0,
        sheenColor: new THREE.Color(color),
        side: THREE.DoubleSide,
      });
    }
    // Low-tier fallback
    return new THREE.MeshStandardMaterial({
      color,
      roughness: 0.5,
      side: THREE.DoubleSide,
    });
  }, [color, enableTransmission]);
}
