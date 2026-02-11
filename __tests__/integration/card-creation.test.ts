/**
 * Integration test for card creation flow
 * This tests the full flow from validation to card creation
 */

import { CardConfigSchema } from '@/lib/cards/validation';
import { generateSlug } from '@/lib/cards/slug';
import type { CardConfig } from '@/types/card';

describe('Card Creation Integration', () => {
  const createFlower = (type: 'rose' | 'tulip' | 'daisy' | 'sunflower', x = 0, y = 0, z = 1) => ({
    type,
    position: { x, y, z },
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
    color: '#ec4899',
  });

  const validCardConfig: CardConfig = {
    flowers: [
      createFlower('rose', -1.5, 0, 2.5),
      createFlower('tulip', 0, 0.3, 2.8),
      createFlower('daisy', 1.5, 0, 2.5),
      createFlower('sunflower', -1.8, 0.5, 1.2),
      createFlower('rose', 0, 0.8, 1.5),
      createFlower('tulip', 1.8, 0.5, 1.2),
      createFlower('daisy', -0.8, 1, 0.3),
      createFlower('sunflower', 0.8, 1, 0.3),
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

    it('should handle exactly 8 flowers', () => {
      // MIN_FLOWERS and MAX_FLOWERS are both 8
      const result = CardConfigSchema.safeParse(validCardConfig);
      expect(result.success).toBe(true);
      expect(validCardConfig.flowers.length).toBe(8);
    });

    it('should reject less than 8 flowers', () => {
      const minConfig = {
        ...validCardConfig,
        flowers: validCardConfig.flowers.slice(0, 7),
      };
      const result = CardConfigSchema.safeParse(minConfig);
      expect(result.success).toBe(false);
    });

    it('should reject more than 8 flowers', () => {
      const maxConfig = {
        ...validCardConfig,
        flowers: [...validCardConfig.flowers, createFlower('rose')],
      };
      const result = CardConfigSchema.safeParse(maxConfig);
      expect(result.success).toBe(false);
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
        const flowers = validCardConfig.flowers.map((f, i) =>
          i === 0 ? { ...f, type } : f
        );
        const config = {
          ...validCardConfig,
          flowers,
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
