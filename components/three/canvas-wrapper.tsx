'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

interface CanvasWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function CanvasWrapper({ children, className = '' }: CanvasWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        dpr={[1, 1.5]} // Cap pixel ratio for mobile performance
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
