'use client';

import { useRef } from 'react';
import { DoubleSide } from 'three';
import type { Group } from 'three';

interface CardBaseProps {
  color?: string;
  leftRotation?: number;
  rightRotation?: number;
}

export function CardBase({
  color = '#ffffff',
  leftRotation = 0,
  rightRotation = 0,
}: CardBaseProps) {
  const leftRef = useRef<Group>(null);
  const rightRef = useRef<Group>(null);

  return (
    <group position={[0, 0, 0]}>
      {/* Left half of card */}
      <group ref={leftRef} rotation={[0, leftRotation, 0]}>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[5, 7, 0.1]} />
          <meshStandardMaterial
            color={color}
            side={DoubleSide}
          />
        </mesh>
      </group>

      {/* Right half of card */}
      <group ref={rightRef} rotation={[0, rightRotation, 0]}>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[5, 7, 0.1]} />
          <meshStandardMaterial
            color={color}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}
