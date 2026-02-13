import { CardConfigSchema } from '@/lib/cards/validation';
import type { CardConfig } from '@/types/card';

describe('CardConfigSchema', () => {
  const validConfig: CardConfig = {
    version: 2,
    giftPresetId: 'tulips',
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

  it('should reject config without version', () => {
    const { version, ...rest } = validConfig;
    const result = CardConfigSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  it('should reject invalid gift preset id', () => {
    const config = { ...validConfig, giftPresetId: 'invalid' };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });

  it('should accept all valid gift preset ids', () => {
    const ids = ['tulips'];
    ids.forEach((id) => {
      const config = { ...validConfig, giftPresetId: id };
      const result = CardConfigSchema.safeParse(config);
      expect(result.success).toBe(true);
    });
  });

  it('should reject invalid hex color', () => {
    const config = {
      ...validConfig,
      theme: { ...validConfig.theme, accent: 'red' },
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

  it('should reject wrong version number', () => {
    const config = { ...validConfig, version: 1 };
    const result = CardConfigSchema.safeParse(config);
    expect(result.success).toBe(false);
  });
});
