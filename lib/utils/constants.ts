export const MAX_MESSAGE_LENGTH = 300;
export const SLUG_LENGTH = 10;

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
