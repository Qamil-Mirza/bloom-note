/**
 * Integration test for card creation flow
 * This tests the full flow from validation to card creation
 */

import { CardConfigSchema } from '@/lib/cards/validation';
import { generateSlug } from '@/lib/cards/slug';
import type { CardConfig } from '@/types/card';

describe('Card Creation Integration', () => {
  const validCardConfig: CardConfig = {
    version: 2,
    giftPresetId: 'tulips',
    theme: {
      background: '#fce7f3',
      cardColor: '#ffffff',
      accent: '#ec4899',
      preset: 'romantic',
    },
    message: {
      text: 'Happy Valentine\'s Day! You mean the world to me.',
      font: 'cursive',
      color: '#4b5563',
    },
  };

  describe('End-to-end card creation', () => {
    it('should validate config before creating card', () => {
      const result = CardConfigSchema.safeParse(validCardConfig);
      expect(result.success).toBe(true);
    });

    it('should generate unique slug for each card', () => {
      const slugs = new Set();
      for (let i = 0; i < 10; i++) {
        slugs.add(generateSlug());
      }
      expect(slugs.size).toBe(10);
    });

    it('should accept all gift preset ids', () => {
      const ids = ['tulips'] as const;
      ids.forEach((id) => {
        const config = { ...validCardConfig, giftPresetId: id };
        const result = CardConfigSchema.safeParse(config);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid gift preset id', () => {
      const config = { ...validCardConfig, giftPresetId: 'invalid' };
      const result = CardConfigSchema.safeParse(config);
      expect(result.success).toBe(false);
    });

    it('should accept empty message', () => {
      const config = {
        ...validCardConfig,
        message: {
          ...validCardConfig.message,
          text: '',
        },
      };
      const result = CardConfigSchema.safeParse(config);
      expect(result.success).toBe(true);
    });

    it('should validate all theme presets', () => {
      const presets: Array<'romantic' | 'playful' | 'elegant'> = [
        'romantic',
        'playful',
        'elegant',
      ];

      presets.forEach((preset) => {
        const config = {
          ...validCardConfig,
          theme: { ...validCardConfig.theme, preset },
        };
        const result = CardConfigSchema.safeParse(config);
        expect(result.success).toBe(true);
      });
    });

    it('should validate all font options', () => {
      const fonts: Array<'cursive' | 'serif' | 'sans'> = [
        'cursive',
        'serif',
        'sans',
      ];

      fonts.forEach((font) => {
        const config = {
          ...validCardConfig,
          message: { ...validCardConfig.message, font },
        };
        const result = CardConfigSchema.safeParse(config);
        expect(result.success).toBe(true);
      });
    });

    it('should require version 2', () => {
      const { version, ...rest } = validCardConfig;
      const result = CardConfigSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });
  });
});
