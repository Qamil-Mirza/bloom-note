'use client';

import { useRef } from 'react';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';

interface DaisyProps {
  config: FlowerConfig;
}

export function Daisy({ config }: DaisyProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      rotation={rotation}
      scale={scale}
    >
      {/* Stem */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Center (yellow) */}
      <mesh position={[0, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 16]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* White petals - 12 around the center */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.35;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.2,
              Math.sin(angle) * radius,
            ]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[0.15, 0.4]} />
            <meshStandardMaterial color={color} side={2} />
          </mesh>
        );
      })}
    </group>
  );
}
