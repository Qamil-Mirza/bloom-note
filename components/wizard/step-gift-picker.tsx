'use client';

import { useWizard } from '@/hooks/use-wizard';
import { GIFT_PRESETS } from '@/lib/utils/gift-presets';
import { cn } from '@/lib/utils/cn';
import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { GiftModel } from '@/components/three/gift-model';
import { Lights } from '@/components/three/lights';
import { OrbitControls } from '@react-three/drei';
import type { GiftPresetId } from '@/types/gift';

export function StepGiftPicker() {
  const { giftPresetId, setGiftPresetId } = useWizard();

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Choose Your Valentine Gift</h2>
      <p className="text-gray-600 text-center mb-8">
        Pick a 3D gift to send with your Valentine&apos;s card
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
        {GIFT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setGiftPresetId(preset.id)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 border-2 rounded-xl transition-all',
              giftPresetId === preset.id
                ? 'border-romantic-600 bg-romantic-50 ring-2 ring-romantic-200'
                : 'border-gray-200 hover:border-romantic-300'
            )}
          >
            <span className="text-3xl">{preset.emoji}</span>
            <span className="text-sm font-medium">{preset.label}</span>
          </button>
        ))}
      </div>

      {giftPresetId && (
        <div
          className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl overflow-hidden"
          style={{ height: '300px' }}
        >
          <CanvasWrapper
            cameraPosition={[0, 1, 4]}
            fov={45}
          >
            <Lights />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={2}
              enablePan={false}
            />
            <GiftModel presetId={giftPresetId} autoRotate={false} />
          </CanvasWrapper>
        </div>
      )}
    </div>
  );
}
