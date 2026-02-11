'use client';

import { useRef } from 'react';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';

interface TulipProps {
  config: FlowerConfig;
}

export function Tulip({ config }: TulipProps) {
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

      {/* Petals - 6 cone shapes in a circle */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.3;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.5,
              Math.sin(angle) * radius,
            ]}
            rotation={[
              Math.PI / 6,
              angle,
              0,
            ]}
          >
            <coneGeometry args={[0.2, 0.8, 8]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      })}

      {/* Center */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
