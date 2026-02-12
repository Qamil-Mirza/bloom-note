'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/** Generate a procedural noise normal map as a DataTexture (no external file). */
function createNoiseNormalMap(size = 128): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size * size; i++) {
    const stride = i * 4;
    // Slight random perturbation around flat normal (128, 128, 255)
    data[stride] = 128 + (Math.random() - 0.5) * 30;     // R (X)
    data[stride + 1] = 128 + (Math.random() - 0.5) * 30; // G (Y)
    data[stride + 2] = 255;                                // B (Z)
    data[stride + 3] = 255;                                // A
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.needsUpdate = true;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

export function useKraftMaterial(): THREE.Material {
  return useMemo(() => {
    const normalMap = createNoiseNormalMap();
    return new THREE.MeshPhysicalMaterial({
      color: '#c19a6b',
      roughness: 0.85,
      metalness: 0,
      normalMap,
      normalScale: new THREE.Vector2(0.3, 0.3),
      side: THREE.DoubleSide,
    });
  }, []);
}

export function useRibbonMaterial(): THREE.Material {
  return useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: '#d4956a',
      roughness: 0.6,
      metalness: 0.1,
      clearcoat: 0.2,
      clearcoatRoughness: 0.5,
    });
  }, []);
}
