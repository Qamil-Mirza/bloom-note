'use client';

import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import type { Group } from 'three';
import type { FlowerConfig } from '@/types/flower';
import { usePetalMaterial } from '../materials/petal-material';
import { useStemMaterial } from '../materials/stem-material';
import { InstancedPetals } from './instanced-petals';

interface TulipProps {
  config: FlowerConfig;
}

/** Create a tulip petal: teardrop Shape extruded with slight outward flare */
function createPetalGeometry(): THREE.ExtrudeGeometry {
  const shape = new THREE.Shape();
  // Teardrop silhouette
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.15, 0.2, 0.18, 0.5, 0, 0.8);
  shape.bezierCurveTo(-0.18, 0.5, -0.15, 0.2, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
  });
  geo.computeVertexNormals();
  return geo;
}

/** Create a stem with subtle bezier curve */
function createStemGeometry(): THREE.TubeGeometry {
  const curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, -3, 0),
    new THREE.Vector3(0.06, -2, 0.04),
    new THREE.Vector3(-0.04, -1, -0.02),
    new THREE.Vector3(0, 0, 0),
  );
  return new THREE.TubeGeometry(curve, 12, 0.05, 8, false);
}

const petalGeometry = createPetalGeometry();
const stemGeometry = createStemGeometry();

export function Tulip({ config }: TulipProps) {
  const groupRef = useRef<Group>(null);
  const { position, rotation, scale, color } = config;

  const petalMat = usePetalMaterial(color);
  const stemMat = useStemMaterial();

  const petalTransforms = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 0.15;
      return {
        position: [
          Math.cos(angle) * radius,
          0.15,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [
          0.25,  // slight outward flare
          angle,
          0,
        ] as [number, number, number],
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

      {/* Petals - instanced */}
      <InstancedPetals geometry={petalGeometry} material={petalMat} transforms={petalTransforms} />

      {/* Center pistil */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}
