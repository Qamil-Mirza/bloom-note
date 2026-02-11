'use client';

import { useWizard } from '@/hooks/use-wizard';
import { Button } from '@/components/ui/button';
import { DEFAULT_FLOWER_COLORS, MAX_FLOWERS } from '@/lib/utils/constants';
import type { FlowerType } from '@/types/flower';
import { randomPosition } from '@/lib/utils/three-helpers';

const flowerOptions: { type: FlowerType; label: string; emoji: string }[] = [
  { type: 'rose', label: 'Rose', emoji: '🌹' },
  { type: 'tulip', label: 'Tulip', emoji: '🌷' },
  { type: 'daisy', label: 'Daisy', emoji: '🌼' },
  { type: 'sunflower', label: 'Sunflower', emoji: '🌻' },
];

export function StepPicker() {
  const { flowers, addFlower, removeFlower } = useWizard();

  const handleAddFlower = (type: FlowerType) => {
    if (flowers.length >= MAX_FLOWERS) {
      return;
    }

    addFlower({
      type,
      position: randomPosition(),
      rotation: [0, Math.random() * Math.PI * 2, 0],
      scale: 1,
      color: DEFAULT_FLOWER_COLORS[type],
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Pick Your Flowers</h2>
      <p className="text-gray-600 text-center mb-8">
        Choose {MIN_FLOWERS}-{MAX_FLOWERS} flowers for your bouquet
      </p>

      {/* Flower selection grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {flowerOptions.map(({ type, label, emoji }) => (
          <button
            key={type}
            onClick={() => handleAddFlower(type)}
            disabled={flowers.length >= MAX_FLOWERS}
            className="flex flex-col items-center gap-2 p-6 border-2 border-gray-200 rounded-lg hover:border-romantic-400 hover:bg-romantic-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-5xl">{emoji}</span>
            <span className="font-medium">{label}</span>
          </button>
        ))}
      </div>

      {/* Selected flowers */}
      <div>
        <h3 className="font-semibold mb-3">
          Selected Flowers ({flowers.length}/{MAX_FLOWERS})
        </h3>
        {flowers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No flowers selected yet. Click above to add flowers!
          </p>
        ) : (
          <div className="space-y-2">
            {flowers.map((flower, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium capitalize">{flower.type}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeFlower(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Fix: Import MIN_FLOWERS
const MIN_FLOWERS = 1;
