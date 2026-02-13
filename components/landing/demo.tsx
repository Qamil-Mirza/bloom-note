'use client';

import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { Lights } from '@/components/three/lights';
import { GiftModel } from '@/components/three/gift-model';
import { OrbitControls } from '@react-three/drei';

export function Demo() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        See It In Action
      </h2>

      <div
        className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-xl overflow-hidden"
        style={{ height: '400px' }}
      >
        <CanvasWrapper cameraPosition={[0, 1, 4]} fov={45}>
          <Lights />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
          />
          <GiftModel presetId="tulips" autoRotate={false} />
        </CanvasWrapper>
      </div>

      <p className="text-center text-gray-600 mt-4">
        Interactive 3D preview - Drag to rotate
      </p>
    </div>
  );
}
