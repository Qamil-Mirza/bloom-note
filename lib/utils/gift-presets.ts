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
];

export function getGiftPreset(id: GiftPresetId): GiftPreset | undefined {
  return GIFT_PRESETS.find((preset) => preset.id === id);
}
