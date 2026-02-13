import { z } from 'zod';
import { MAX_MESSAGE_LENGTH } from '@/lib/utils/constants';

const GIFT_PRESET_IDS = ['tulips', 'roses', 'bear', 'cat', 'heart', 'earth'] as const;

const CardThemeSchema = z.object({
  background: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  cardColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  accent: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  preset: z.enum(['romantic', 'playful', 'elegant']),
});

const CardMessageSchema = z.object({
  text: z.string().max(MAX_MESSAGE_LENGTH),
  font: z.enum(['cursive', 'serif', 'sans']),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const CardConfigSchema = z.object({
  version: z.literal(2),
  giftPresetId: z.enum(GIFT_PRESET_IDS),
  theme: CardThemeSchema,
  message: CardMessageSchema,
});

export type ValidatedCardConfig = z.infer<typeof CardConfigSchema>;
