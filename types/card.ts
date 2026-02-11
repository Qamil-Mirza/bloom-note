import type { FlowerConfig } from './flower';

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
  flowers: FlowerConfig[];
  theme: CardTheme;
  message: CardMessage;
}

export interface Card {
  id: string;
  slug: string;
  config: CardConfig;
  message: string;
  created_at: string;
  views: number;
  last_viewed_at?: string;
  deleted_at?: string;
}
