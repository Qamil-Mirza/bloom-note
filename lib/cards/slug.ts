import { nanoid } from 'nanoid';
import { SLUG_LENGTH } from '@/lib/utils/constants';

/**
 * Generate a unique URL-safe slug for a card
 * Uses nanoid with 10 characters (URL-safe alphabet)
 * Collision probability: ~1% at 1.3M cards
 */
export function generateSlug(): string {
  return nanoid(SLUG_LENGTH);
}
