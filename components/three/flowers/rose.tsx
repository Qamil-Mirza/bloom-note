'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';
import { usePetalMaterial } from '../materials/petal-material';
import { useStemMaterial } from '../materials/stem-material';
import { InstancedPetals } from './instanced-petals';

interface RoseProps {
  config: FlowerConfig;
}

/** Create a single rose petal using LatheGeometry with a curved silhouette */
function createPetalGeometry(): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [];
  const segments = 8;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Petal silhouette: starts narrow, bulges in middle, tapers at tip
    const x = Math.sin(t * Math.PI) * 0.18;
    const y = t * 0.35;
    points.push(new THREE.Vector2(x, y));
  }
  const geo = new THREE.LatheGeometry(points, 8, 0, Math.PI);
  geo.computeVertexNormals();
  return geo;
}

/** Create a stem with subtle bezier curve using TubeGeometry */
function createStemGeometry(): THREE.TubeGeometry {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0.08, -2, 0.05),
    new THREE.Vector3(-0.05, -1, -0.03),
    new THREE.Vector3(0, 0, 0),
  );
  return new THREE.TubeGeometry(curve, 12, 0.05, 8, false);
}

const petalGeometry = createPetalGeometry();
const stemGeometry = createStemGeometry();

export function Rose({ config }: RoseProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  const petalMat = usePetalMaterial(color);
  const stemMat = useStemMaterial();

  // 3 concentric rings with slight random curl
  const petalTransforms = useMemo(() => {
    const transforms: { position: [number, number, number]; rotation: [number, number, number] }[] = [];
    const rings = [
      { count: 4, radius: 0.12, height: 0.35, tilt: 0.3 },
      { count: 5, radius: 0.25, height: 0.2, tilt: 0.6 },
      { count: 6, radius: 0.38, height: 0.05, tilt: 0.9 },
    ];
    for (const ring of rings) {
      for (let i = 0; i < ring.count; i++) {
        const angle = (i / ring.count) * Math.PI * 2 + ring.radius; // offset per ring
        transforms.push({
          position: [
            Math.cos(angle) * ring.radius,
            ring.height,
            Math.sin(angle) * ring.radius,
          ],
          rotation: [ring.tilt, angle, (i % 2) * 0.1], // slight curl variation
        });
      }
    }
    return transforms;
  }, []);

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
      rotation={rotation}
      scale={scale}
    >
      {/* Curved stem */}
      <mesh geometry={stemGeometry} material={stemMat} />

      {/* Center bud */}
      <mesh position={[0, 0.35, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Petals - instanced LatheGeometry in 3 rings */}
      <InstancedPetals geometry={petalGeometry} material={petalMat} transforms={petalTransforms} />
    </group>
  );
}
