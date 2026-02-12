'use client';

import { useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { Group } from 'three';
import { CriticallyDampedSpring } from '@/lib/three/spring';

interface BouquetPhysicsRigProps {
  children: React.ReactNode;
  stiffness?: number;
  pointerInfluence?: number;
}

export function BouquetPhysicsRig({
  children,
  stiffness = 4,
  pointerInfluence = 0.05,
}: BouquetPhysicsRigProps) {
  const groupRef = useRef<Group>(null);
  const springX = useRef(new CriticallyDampedSpring(0, stiffness));
  const springZ = useRef(new CriticallyDampedSpring(0, stiffness));
  const { size } = useThree();

  useFrame(({ pointer }, delta) => {
    const dt = Math.min(delta, 0.05);

    // Pointer drives target lean
    springX.current.target = -pointer.y * pointerInfluence;
    springZ.current.target = pointer.x * pointerInfluence;

    springX.current.update(dt);
    springZ.current.update(dt);

    if (groupRef.current) {
      groupRef.current.rotation.x = springX.current.value;
      groupRef.current.rotation.z = springZ.current.value;
    }
  });

  /** Call this to trigger a bounce on card reveal */
  const kick = useCallback((force = 2) => {
    springX.current.impulse(force);
    springZ.current.impulse(force * 0.5);
  }, []);

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}
