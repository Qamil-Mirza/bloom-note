export const MAX_FLOWERS = 8;
export const MIN_FLOWERS = 8;
export const MAX_MESSAGE_LENGTH = 300;
export const SLUG_LENGTH = 10;

export const FLOWER_TYPES = ['rose', 'tulip', 'daisy', 'sunflower'] as const;

export const THEME_PRESETS = {
  romantic: {
    background: '#fce7f3',
    cardColor: '#ffffff',
    accent: '#ec4899',
    preset: 'romantic' as const,
  },
  playful: {
    background: '#fef3c7',
    cardColor: '#ffffff',
    accent: '#f59e0b',
    preset: 'playful' as const,
  },
  elegant: {
    background: '#f3e8ff',
    cardColor: '#ffffff',
    accent: '#a855f7',
    preset: 'elegant' as const,
  },
} as const;

export const DEFAULT_FLOWER_COLORS = {
  rose: '#ec4899',
  tulip: '#ef4444',
  daisy: '#fbbf24',
  sunflower: '#fbbf24',
} as const;
