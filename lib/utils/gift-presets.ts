import type { GiftPreset, GiftPresetId } from '@/types/gift';

export const GIFT_PRESETS: GiftPreset[] = [
  {
    id: 'tulips',
    label: 'Tulips',
    emoji: '🌷',
    glbPath: '/assets/gifts/tulips.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
  {
    id: 'roses',
    label: 'Roses',
    emoji: '🌹',
    glbPath: '/assets/gifts/Roses.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
  {
    id: 'bear',
    label: 'Bear',
    emoji: '🧸',
    glbPath: '/assets/gifts/Bear.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
  {
    id: 'cat',
    label: 'Cat',
    emoji: '🐱',
    glbPath: '/assets/gifts/cat.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
  {
    id: 'heart',
    label: 'Heart',
    emoji: '❤️',
    glbPath: '/assets/gifts/Heart.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
  {
    id: 'earth',
    label: 'Earth',
    emoji: '🌍',
    glbPath: '/assets/gifts/Earth.glb',
    defaultScale: 1.0,
    defaultYOffset: 0,
  },
];

export function getGiftPreset(id: GiftPresetId): GiftPreset | undefined {
  return GIFT_PRESETS.find((preset) => preset.id === id);
}
