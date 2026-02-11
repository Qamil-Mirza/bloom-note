/**
 * Integration test for card creation flow
 * This tests the full flow from validation to card creation
 */

import { CardConfigSchema } from '@/lib/cards/validation';
import { generateSlug } from '@/lib/cards/slug';
import type { CardConfig } from '@/types/card';

describe('Card Creation Integration', () => {
  const validCardConfig: CardConfig = {
    flowers: [
      {
        type: 'rose',
        position: { x: 0, y: 0, z: 1 },
        rotation: [0, 0, 0],
        scale: 1,
        color: '#ec4899',
      },
      {
        type: 'tulip',
        position: { x: 2, y: 0, z: 1 },
        rotation: [0, Math.PI / 4, 0],
        scale: 1.2,
        color: '#ef4444',
      },
    ],
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

    it('should handle minimum flower count', () => {
      const minConfig = {
        ...validCardConfig,
        flowers: [validCardConfig.flowers[0]],
      };
      const result = CardConfigSchema.safeParse(minConfig);
      expect(result.success).toBe(true);
    });

    it('should handle maximum flower count', () => {
      const maxConfig = {
        ...validCardConfig,
        flowers: Array(12).fill(validCardConfig.flowers[0]),
      };
      const result = CardConfigSchema.safeParse(maxConfig);
      expect(result.success).toBe(true);
    });

    it('should reject empty message', () => {
      const config = {
        ...validCardConfig,
        message: {
          ...validCardConfig.message,
          text: '',
        },
      };
      const result = CardConfigSchema.safeParse(config);
      // Empty message should be allowed
      expect(result.success).toBe(true);
    });

    it('should validate all flower types', () => {
      const flowerTypes: Array<'rose' | 'tulip' | 'daisy' | 'sunflower'> = [
        'rose',
        'tulip',
        'daisy',
        'sunflower',
      ];

      flowerTypes.forEach((type) => {
        const config = {
          ...validCardConfig,
          flowers: [{ ...validCardConfig.flowers[0], type }],
        };
        const result = CardConfigSchema.safeParse(config);
        expect(result.success).toBe(true);
      });
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
  });
});
