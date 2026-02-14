'use client';

import { Environment } from '@react-three/drei';
import { usePerformanceTier } from '@/hooks/use-performance-tier';

export function Lights() {
  const { tier } = usePerformanceTier();
  return (
    <>
      {/* IBL environment for realistic reflections — skip on low tier */}
      {tier !== 'low' && <Environment preset="studio" />}

      {/* Ambient light — higher on low tier to compensate for missing HDR */}
      <ambientLight intensity={tier === 'low' ? 0.5 : 0.15} />

      {/* Key light — warm, upper-right */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.2}
        color="#fff5e6"
      />

      {/* Fill light — cool, left */}
      <directionalLight
        position={[-6, 3, 2]}
        intensity={0.4}
        color="#e0e8ff"
      />

      {/* Rim light — pink, behind */}
      <pointLight
        position={[0, 4, -6]}
        intensity={0.6}
        color="#ff8fbf"
      />
    </>
  );
}
