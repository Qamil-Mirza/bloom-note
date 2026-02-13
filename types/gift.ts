export type GiftPresetId = 'tulips';

export interface GiftPreset {
  id: GiftPresetId;
  label: string;
  emoji: string;
  glbPath: string;
  defaultScale: number;
  defaultYOffset: number;
}
