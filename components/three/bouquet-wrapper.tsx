"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useKraftMaterial, useRibbonMaterial } from "./materials/kraft-material";

/**
 * Cone + ribbon wrapper that mimics kraft paper around flower stems.
 * Used only on the landing page hero bouquet.
 */
export function BouquetWrapper() {
  const groupRef = useRef<THREE.Group>(null);
  const kraftMat = useKraftMaterial();
  const ribbonMat = useRibbonMaterial();

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Kraft paper cone — wide opening at top (y=+3.75), narrow at bottom (y=-3.75) */}
      <mesh rotation={[Math.PI, 0, 0]} material={kraftMat}>
        <cylinderGeometry args={[0.9, 3.6, 7.5, 32, 1, true]} />
      </mesh>

      {/* Ribbon ring around the wide opening */}
      <mesh position={[0, 3.75, 0]} rotation={[Math.PI / 2, 0, 0]} material={ribbonMat}>
        <torusGeometry args={[3.6, 0.15, 8, 32]} />
      </mesh>
    </group>
  );
}
