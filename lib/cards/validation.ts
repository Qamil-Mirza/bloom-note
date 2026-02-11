import { z } from 'zod';
import { MAX_FLOWERS, MIN_FLOWERS, MAX_MESSAGE_LENGTH } from '@/lib/utils/constants';

const FlowerPositionSchema = z.object({
  x: z.number().min(-5).max(5),
  y: z.number().min(-2).max(5),
  z: z.number().min(0).max(3),
});

const FlowerConfigSchema = z.object({
  type: z.enum(['rose', 'tulip', 'daisy', 'sunflower']),
  position: FlowerPositionSchema,
  rotation: z.tuple([z.number(), z.number(), z.number()]),
  scale: z.number().min(0.5).max(2.0),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

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
  flowers: z.array(FlowerConfigSchema).min(MIN_FLOWERS).max(MAX_FLOWERS),
  theme: CardThemeSchema,
  message: CardMessageSchema,
});

export type ValidatedCardConfig = z.infer<typeof CardConfigSchema>;
