'use client';

import { useWizard } from '@/hooks/use-wizard';
import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { Lights } from '@/components/three/lights';
import { Flower } from '@/components/three/flowers';
import { OrbitControls } from '@react-three/drei';
import { useState } from 'react';

export function StepArranger() {
  const { flowers, updateFlower } = useWizard();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedFlower = selectedIndex !== null ? flowers[selectedIndex] : null;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Preview Your Bouquet</h2>
      <p className="text-gray-600 text-center mb-6">
        View your beautiful bouquet in 3D
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {/* 3D Preview */}
        <div className="md:col-span-2">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg overflow-hidden" style={{ height: '500px' }}>
            <CanvasWrapper>
              <Lights />
              <OrbitControls enablePan={false} />
              {flowers.map((flower, index) => (
                <group
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                >
                  <Flower config={flower} />
                </group>
              ))}
            </CanvasWrapper>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <h3 className="font-semibold">Flower Size</h3>

          {selectedFlower ? (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {selectedFlower.type.charAt(0).toUpperCase() + selectedFlower.type.slice(1)}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Scale: {selectedFlower.scale.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={selectedFlower.scale}
                  onChange={(e) =>
                    updateFlower(selectedIndex!, {
                      scale: parseFloat(e.target.value),
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm p-4 bg-gray-50 rounded-lg">
              Click on a flower to adjust its size
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
