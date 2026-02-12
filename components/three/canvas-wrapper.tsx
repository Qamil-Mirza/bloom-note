'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
  enablePostProcessing?: boolean;
}

export function CanvasWrapper({ children, className = '', enablePostProcessing = false }: CanvasWrapperProps) {
  const { dpr } = usePerformanceTier();

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          // Only apply tone mapping here when postprocessing is NOT active
          // (postprocessing has its own ToneMapping pass to avoid double-mapping)
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
