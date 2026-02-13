import type { GiftPresetId } from './gift';

export interface CardTheme {
  background: string; // hex color
  cardColor: string; // hex color
  accent: string; // hex color
  preset: 'romantic' | 'playful' | 'elegant';
}

export interface CardMessage {
  text: string; // max 300 chars
  font: 'cursive' | 'serif' | 'sans';
  color: string; // hex color
}

export interface CardConfig {
  version: 2;
  giftPresetId: GiftPresetId;
  theme: CardTheme;
  message: CardMessage;
}

/** Cards created before the gift card migration */
export interface LegacyCardConfig {
  flowers: unknown[];
  theme: CardTheme;
  message: CardMessage;
}

export function isLegacyConfig(config: CardConfig | LegacyCardConfig): config is LegacyCardConfig {
  return !('version' in config) || (config as CardConfig).version !== 2;
}

export interface Card {
  id: string;
  slug: string;
  config: CardConfig | LegacyCardConfig;
  message: string;
  created_at: string;
  views: number;
  last_viewed_at?: string;
  deleted_at?: string;
}
