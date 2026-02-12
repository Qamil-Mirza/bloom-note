'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { CriticallyDampedSpring } from '@/lib/three/spring';
import { useWind } from './wind-provider';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

interface StemSpringRigProps {
  children: React.ReactNode;
  /** Spatial seed for wind variation between flowers */
  spatialOffset?: number;
  stiffness?: number;
  maxBend?: number;
}

interface BoneState {
  springX: CriticallyDampedSpring;
  springZ: CriticallyDampedSpring;
  ref: React.RefObject<Group | null>;
}

export function StemSpringRig({
  children,
  spatialOffset = 0,
  stiffness = 6,
  maxBend = 0.15,
}: StemSpringRigProps) {
  const { stemBoneCount } = usePerformanceTier();
  const windRef = useWind();

  const bones = useMemo(() => {
    return Array.from({ length: stemBoneCount }, (_, i) => {
      // Bottom bones stiffer, top bones swayier
      const boneStiffness = stiffness + (stemBoneCount - 1 - i) * 2;
      return {
        springX: new CriticallyDampedSpring(0, boneStiffness),
        springZ: new CriticallyDampedSpring(0, boneStiffness),
      };
    });
  }, [stemBoneCount, stiffness]);

  // Create refs array
  const refsArray = useRef<(Group | null)[]>([]);
  if (refsArray.current.length !== stemBoneCount) {
    refsArray.current = Array.from({ length: stemBoneCount }, () => null);
  }

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05); // Clamp to prevent explosion
    const wind = windRef.current;
    const perBoneBend = maxBend / stemBoneCount;

    for (let i = 0; i < bones.length; i++) {
      const bone = bones[i];
      // Add spatial variation using offset
      const phase = wind.time + spatialOffset + i * 0.5;
      const windInfluence = (i + 1) / stemBoneCount; // top bones get more wind

      bone.springX.target = Math.sin(phase) * wind.x * windInfluence * 10;
      bone.springZ.target = Math.cos(phase * 0.7) * wind.z * windInfluence * 10;

      bone.springX.update(dt);
      bone.springZ.update(dt);

      const node = refsArray.current[i];
      if (node) {
        // Clamp rotation per bone
        node.rotation.x = Math.max(-perBoneBend, Math.min(perBoneBend, bone.springX.value));
        node.rotation.z = Math.max(-perBoneBend, Math.min(perBoneBend, bone.springZ.value));
      }
    }
  });

  // Build nested groups: bone[0] > bone[1] > ... > children
  let content: React.ReactNode = children;
  for (let i = bones.length - 1; i >= 0; i--) {
    const idx = i;
    content = (
      <group ref={(el) => { refsArray.current[idx] = el; }}>
        {content}
      </group>
    );
  }

  return <>{content}</>;
}
