'use client';

import { useRef } from 'react';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';

interface RoseProps {
  config: FlowerConfig;
}

export function Rose({ config }: RoseProps) {
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
        <cylinderGeometry args={[0.05, 0.05, 3, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Center of rose */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Petals - arranged in spiral */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 0.3 + (i % 3) * 0.15;
        const height = 0.3 - (i % 3) * 0.1;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius,
            ]}
            rotation={[
              Math.PI / 4,
              angle,
              0,
            ]}
          >
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}
    </group>
  );
}
