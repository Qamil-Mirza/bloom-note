'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';
import { usePetalMaterial } from '../materials/petal-material';
import { useStemMaterial } from '../materials/stem-material';
import { InstancedPetals } from './instanced-petals';

interface SunflowerProps {
  config: FlowerConfig;
}

/** Create a sunflower petal using LatheGeometry with droop at tips */
function createPetalGeometry(): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [];
  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Wider at base, tapers toward tip with slight droop
    const x = Math.sin(t * Math.PI) * 0.12 * (1 - t * 0.3);
    const y = t * 0.45 - t * t * 0.08; // droop at tip
    points.push(new THREE.Vector2(x, y));
  }
  const geo = new THREE.LatheGeometry(points, 6, 0, Math.PI);
  geo.computeVertexNormals();
  return geo;
}

/** Thick stem with natural curve */
function createStemGeometry(): THREE.TubeGeometry {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0.1, -2, 0.06),
    new THREE.Vector3(-0.06, -1, -0.04),
    new THREE.Vector3(0, 0, 0),
  );
  return new THREE.TubeGeometry(curve, 12, 0.08, 8, false);
}

const petalGeometry = createPetalGeometry();
const stemGeometry = createStemGeometry();

export function Sunflower({ config }: SunflowerProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  const petalMat = usePetalMaterial(color);
  const stemMat = useStemMaterial();

  const petalTransforms = useMemo(() =>
    Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 0.45;
      return {
        position: [
          Math.cos(angle) * radius,
          0.3,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [Math.PI / 2.2, 0, angle] as [number, number, number],
      };
    }),
  []);

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      rotation={rotation}
      scale={scale}
    >
      {/* Curved thick stem */}
      <mesh geometry={stemGeometry} material={stemMat} />

      {/* Large brown center dome with seed pattern */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.38, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
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
              0.32,
              Math.sin(angle) * radius,
            ]}
          >
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
        );
      })}

      {/* Yellow petals - instanced LatheGeometry with droop */}
      <InstancedPetals geometry={petalGeometry} material={petalMat} transforms={petalTransforms} />
    </group>
  );
}
