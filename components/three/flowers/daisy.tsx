'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';
import { usePetalMaterial } from '../materials/petal-material';
import { useStemMaterial } from '../materials/stem-material';
import { InstancedPetals } from './instanced-petals';

interface DaisyProps {
  config: FlowerConfig;
}

/** Create a rounded daisy petal using ShapeGeometry with slight Y-curve via vertex displacement */
function createPetalGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  // Rounded elongated petal
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.08, 0.05, 0.1, 0.15, 0.07, 0.35);
  shape.bezierCurveTo(0.03, 0.42, -0.03, 0.42, -0.07, 0.35);
  shape.bezierCurveTo(-0.1, 0.15, -0.08, 0.05, 0, 0);

  const geo = new THREE.ShapeGeometry(shape, 6);

  // Add slight Y-curve: displace vertices along Y based on distance from base
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    // Parabolic lift — peaks at tip
    const lift = y * y * 0.3;
    pos.setZ(i, pos.getZ(i) + lift);
  }
  geo.computeVertexNormals();
  return geo;
}

/** Create a thin stem with subtle curve */
function createStemGeometry(): THREE.TubeGeometry {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0.05, -2, 0.03),
    new THREE.Vector3(-0.03, -1, -0.02),
    new THREE.Vector3(0, 0, 0),
  );
  return new THREE.TubeGeometry(curve, 12, 0.04, 8, false);
}

const petalGeometry = createPetalGeometry();
const stemGeometry = createStemGeometry();

export function Daisy({ config }: DaisyProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  const petalMat = usePetalMaterial(color);
  const stemMat = useStemMaterial();

  const petalTransforms = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 0.22;
      return {
        position: [
          Math.cos(angle) * radius,
          0.2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [Math.PI / 2.5, 0, angle] as [number, number, number],
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
      {/* Curved stem */}
      <mesh geometry={stemGeometry} material={stemMat} />

      {/* Center (yellow dome) */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.18, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#fbbf24" />
      </mesh>

      {/* Petals - instanced rounded shapes */}
      <InstancedPetals geometry={petalGeometry} material={petalMat} transforms={petalTransforms} />
    </group>
  );
}
