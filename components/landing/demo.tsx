'use client';

import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { Lights } from '@/components/three/lights';
import { Rose } from '@/components/three/flowers/rose';
import { OrbitControls } from '@react-three/drei';

export function Demo() {
  const demoFlower = {
    type: 'rose' as const,
    position: { x: 0, y: 0, z: 0 },
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1.5,
    color: '#ec4899',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        See It In Action
      </h2>

      <div
        className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-xl overflow-hidden"
        style={{ height: '400px' }}
      >
        <CanvasWrapper>
          <Lights />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
          />
          <Rose config={demoFlower} />
        </CanvasWrapper>
      </div>

      <p className="text-center text-gray-600 mt-4">
        Interactive 3D preview - Drag to rotate
      </p>
    </div>
  );
}
