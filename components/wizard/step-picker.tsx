'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DndContext,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useWizard } from '@/hooks/use-wizard';
import { DEFAULT_FLOWER_COLORS, MAX_FLOWERS } from '@/lib/utils/constants';
import type { FlowerType } from '@/types/flower';
import { getBouquetPosition } from '@/lib/utils/three-helpers';

const flowerOptions: { type: FlowerType; label: string; emoji: string }[] = [
  { type: 'rose', label: 'Rose', emoji: '🌹' },
  { type: 'tulip', label: 'Tulip', emoji: '🌷' },
  { type: 'daisy', label: 'Daisy', emoji: '🌼' },
  { type: 'sunflower', label: 'Sunflower', emoji: '🌻' },
];

const emojiMap: Record<FlowerType, string> = {
  rose: '🌹',
  tulip: '🌷',
  daisy: '🌼',
  sunflower: '🌻',
};

function DraggableFlower({
  type,
  label,
  emoji,
  onClick,
}: {
  type: FlowerType;
  label: string;
  emoji: string;
  onClick: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: { type },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-6 border-2 border-gray-200 rounded-lg hover:border-romantic-400 hover:bg-romantic-50 transition-all cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-30' : ''
      }`}
    >
      <span className="text-5xl">{emoji}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
}

function FlowerSlot({
  index,
  flower,
  onClear,
}: {
  index: number;
  flower: FlowerType | null;
  onClear: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${index}`,
    data: { index },
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative flex items-center justify-center w-full aspect-square border-2 rounded-xl transition-all ${
        flower
          ? 'border-romantic-300 bg-romantic-50'
          : isOver
            ? 'border-romantic-400 bg-romantic-100 scale-105'
            : 'border-dashed border-gray-300 bg-gray-50'
      }`}
    >
      {flower ? (
        <>
          <span className="text-4xl">{emojiMap[flower]}</span>
          <button
            onClick={onClear}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-400 hover:bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors"
          >
            X
          </button>
        </>
      ) : (
        <span className="text-gray-400 text-sm">{index + 1}</span>
      )}
    </div>
  );
}

export function StepPicker() {
  const { setFlowers } = useWizard();
  const [slots, setSlots] = useState<(FlowerType | null)[]>(
    Array(MAX_FLOWERS).fill(null)
  );
  const [activeType, setActiveType] = useState<FlowerType | null>(null);

  // Sync slots to wizard context
  useEffect(() => {
    const configs = slots
      .map((type, i) => {
        if (!type) return null;
        const position = getBouquetPosition(i);
        const angle = Math.atan2(position.x, position.z);
        return {
          type,
          position,
          rotation: [0, -angle, 0] as [number, number, number],
          scale: 1,
          color: DEFAULT_FLOWER_COLORS[type],
        };
      })
      .filter((c) => c !== null);
    setFlowers(configs);
  }, [slots, setFlowers]);

  const fillFirstEmpty = useCallback(
    (type: FlowerType) => {
      setSlots((prev) => {
        const idx = prev.indexOf(null);
        if (idx === -1) return prev;
        const next = [...prev];
        next[idx] = type;
        return next;
      });
    },
    []
  );

  const clearSlot = useCallback((index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveType(event.active.data.current?.type ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveType(null);
    const { active, over } = event;
    if (!over) return;

    const type = active.data.current?.type as FlowerType;
    const slotIndex = over.data.current?.index as number;
    if (type == null || slotIndex == null) return;

    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = type;
      return next;
    });
  };

  const filledCount = slots.filter(Boolean).length;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Pick Your Flowers</h2>
      <p className="text-gray-600 text-center mb-8">
        Drag flowers into the {MAX_FLOWERS} slots or click to auto-fill
      </p>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Flower palette */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {flowerOptions.map(({ type, label, emoji }) => (
            <DraggableFlower
              key={type}
              type={type}
              label={label}
              emoji={emoji}
              onClick={() => fillFirstEmpty(type)}
            />
          ))}
        </div>

        {/* Slot grid */}
        <div>
          <h3 className="font-semibold mb-3">
            Bouquet Slots ({filledCount}/{MAX_FLOWERS})
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {slots.map((flower, index) => (
              <FlowerSlot
                key={index}
                index={index}
                flower={flower}
                onClear={() => clearSlot(index)}
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeType ? (
            <span className="text-5xl pointer-events-none">
              {emojiMap[activeType]}
            </span>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
