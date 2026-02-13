export type GiftPresetId = 'tulips' | 'roses' | 'bear' | 'cat' | 'heart' | 'earth';

export interface GiftPreset {
  id: GiftPresetId;
  label: string;
  emoji: string;
  glbPath: string;
  defaultScale: number;
  defaultYOffset: number;
}
