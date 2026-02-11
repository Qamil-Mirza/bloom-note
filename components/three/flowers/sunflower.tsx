'use client';

import { useRef } from 'react';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';

interface SunflowerProps {
  config: FlowerConfig;
}

export function Sunflower({ config }: SunflowerProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      rotation={rotation}
      scale={scale}
    >
      {/* Thick stem */}
      <mesh position={[0, -1.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>

      {/* Large brown center with seed pattern */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>

      {/* Seed dots */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 0.1 + (i % 3) * 0.08;

        return (
          <mesh
            key={`seed-${i}`}
            position={[
              Math.cos(angle) * radius,
              0.31,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        );
      })}

      {/* Yellow petals - 16 around the center */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 0.6;

        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0.3,
              Math.sin(angle) * radius,
            ]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <planeGeometry args={[0.2, 0.5]} />
            <meshStandardMaterial color={color} side={2} />
          </mesh>
        );
      })}
    </group>
  );
}
