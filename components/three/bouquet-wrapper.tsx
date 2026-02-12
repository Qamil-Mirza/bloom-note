"use client";

import { useRef } from "react";
import * as THREE from "three";

/**
 * Cone + ribbon wrapper that mimics kraft paper around flower stems.
 * Used only on the landing page hero bouquet.
 */
export function BouquetWrapper() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Kraft paper cone — wide opening at top (y=+3.75), narrow at bottom (y=-3.75) */}
      <mesh rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.9, 3.6, 7.5, 32, 1, true]} />
        <meshStandardMaterial
          color="#c19a6b"
          roughness={0.8}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ribbon ring around the wide opening */}
      <mesh position={[0, 3.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.6, 0.15, 8, 32]} />
        <meshStandardMaterial color="#d4956a" roughness={0.6} metalness={0.1} />
      </mesh>
    </group>
  );
}
