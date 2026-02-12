'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface PetalTransform {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface InstancedPetalsProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  transforms: PetalTransform[];
}

const _obj = new THREE.Object3D();

export function InstancedPetals({ geometry, material, transforms }: InstancedPetalsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < transforms.length; i++) {
      const t = transforms[i];
      _obj.position.set(...t.position);
      _obj.rotation.set(...t.rotation);
      _obj.updateMatrix();
      meshRef.current.setMatrixAt(i, _obj.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [transforms]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, transforms.length]}
    />
  );
}
