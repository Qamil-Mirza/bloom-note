'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { GiftPresetId } from '@/types/gift';
import { getGiftPreset } from '@/lib/utils/gift-presets';

interface GiftModelProps {
  presetId: GiftPresetId;
  autoRotate?: boolean;
  scale?: number;
  position?: [number, number, number];
}

function FallbackGift() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ec4899" />
    </mesh>
  );
}

function LoadedGiftModel({
  glbPath,
  defaultScale,
  defaultYOffset,
  autoRotate,
  scale: scaleOverride,
  position,
}: {
  glbPath: string;
  defaultScale: number;
  defaultYOffset: number;
  autoRotate: boolean;
  scale?: number;
  position?: [number, number, number];
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(glbPath);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    // Normalize to consistent bounding box
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizeScale = 2 / maxDim; // fit within 2-unit box
    clone.scale.multiplyScalar(normalizeScale);
    // Center the model
    const center = box.getCenter(new THREE.Vector3());
    clone.position.sub(center.multiplyScalar(normalizeScale));
    return clone;
  }, [scene]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  const finalScale = scaleOverride ?? defaultScale;

  return (
    <group
      ref={groupRef}
      scale={finalScale}
      position={position ?? [0, defaultYOffset, 0]}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

export function GiftModel({ presetId, autoRotate = false, scale, position }: GiftModelProps) {
  const preset = getGiftPreset(presetId);

  if (!preset) {
    return <FallbackGift />;
  }

  return (
    <LoadedGiftModel
      glbPath={preset.glbPath}
      defaultScale={preset.defaultScale}
      defaultYOffset={preset.defaultYOffset}
      autoRotate={autoRotate}
      scale={scale}
      position={position}
    />
  );
}
