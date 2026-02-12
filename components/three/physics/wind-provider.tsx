'use client';

import { createContext, useContext, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface WindState {
  /** Current wind X force */
  x: number;
  /** Current wind Z force */
  z: number;
  /** Elapsed time (for spatial variation) */
  time: number;
}

const WindContext = createContext<React.RefObject<WindState> | null>(null);

interface WindProviderProps {
  speed?: number;
  strength?: number;
  children: React.ReactNode;
}

export function WindProvider({ speed = 0.8, strength = 0.04, children }: WindProviderProps) {
  const windRef = useRef<WindState>({ x: 0, z: 0, time: 0 });

  useFrame((_, delta) => {
    const w = windRef.current;
    w.time += delta * speed;
    w.x = Math.sin(w.time) * strength;
    w.z = Math.cos(w.time * 0.7 + 1.3) * strength * 0.6;
  });

  return (
    <WindContext.Provider value={windRef}>
      {children}
    </WindContext.Provider>
  );
}

export function useWind() {
  const ref = useContext(WindContext);
  if (!ref) throw new Error('useWind must be used within <WindProvider>');
  return ref;
}
