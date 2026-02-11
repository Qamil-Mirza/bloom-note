import { CardConfigSchema } from '@/lib/cards/validation';
import type { CardConfig } from '@/types/card';

describe('CardConfigSchema', () => {
  const createFlower = (type: 'rose' | 'tulip' | 'daisy' | 'sunflower', x = 0, y = 0, z = 1) => ({
    type,
    position: { x, y, z },
    rotation: [0, 0, 0] as [number, number, number],
    scale: 1,
    color: '#ec4899',
  });

  const validConfig: CardConfig = {
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
      text: 'Happy Valentine\'s Day!',
      font: 'cursive',
      color: '#4b5563',
    },
  };

  it('should validate a valid card config', () => {
    const result = CardConfigSchema.safeParse(validConfig);
    expect(result.success).toBe(true);
  });

  it('should reject config with no flowers', () => {
    const config = { ...validConfig, flowers: [] };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject config with too many flowers', () => {
    const config = {
      ...validConfig,
      flowers: Array(9).fill(validConfig.flowers[0]),
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject invalid flower type', () => {
    const config = {
      ...validConfig,
      flowers: [{ ...validConfig.flowers[0], type: 'invalid' }],
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject invalid hex color', () => {
    const config = {
      ...validConfig,
      flowers: [{ ...validConfig.flowers[0], color: 'red' }],
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject message longer than 300 characters', () => {
    const config = {
      ...validConfig,
      message: {
        ...validConfig.message,
        text: 'a'.repeat(301),
      },
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should accept message with exactly 300 characters', () => {
    const config = {
      ...validConfig,
      message: {
        ...validConfig.message,
        text: 'a'.repeat(300),
      },
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(true);
  });

  it('should reject invalid theme preset', () => {
    const config = {
      ...validConfig,
      theme: { ...validConfig.theme, preset: 'invalid' as any },
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject position out of bounds', () => {
    const config = {
      ...validConfig,
      flowers: [
        {
          ...validConfig.flowers[0],
          position: { x: 10, y: 0, z: 0 }, // x out of range (-5 to 5)
        },
      ],
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should reject scale out of bounds', () => {
    const config = {
      ...validConfig,
      flowers: [
        {
          ...validConfig.flowers[0],
          scale: 3, // scale out of range (0.5 to 2.0)
        },
      ],
    };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });
});
