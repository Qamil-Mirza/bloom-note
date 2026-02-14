'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
  enablePostProcessing?: boolean;
  cameraPosition?: [number, number, number];
  fov?: number;
}

export function CanvasWrapper({
  children,
  className = '',
  enablePostProcessing = false,
  cameraPosition = [0, 1.5, 7],
  fov = 45,
}: CanvasWrapperProps) {
  const { dpr, tier } = usePerformanceTier();

  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov }}
        dpr={dpr}
        gl={{
          antialias: tier !== 'low',
          alpha: true,
          toneMapping: enablePostProcessing ? THREE.NoToneMapping : THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
