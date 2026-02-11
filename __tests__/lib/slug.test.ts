import { generateSlug } from '@/lib/cards/slug';
import { SLUG_LENGTH } from '@/lib/utils/constants';

describe('generateSlug', () => {
  it('should generate a slug of correct length', () => {
    const slug = generateSlug();
    expect(slug).toHaveLength(SLUG_LENGTH);
  });

  it('should generate unique slugs', () => {
    const slug1 = generateSlug();
    const slug2 = generateSlug();
    const slug3 = generateSlug();

    expect(slug1).not.toBe(slug2);
    expect(slug2).not.toBe(slug3);
    expect(slug1).not.toBe(slug3);
  });

  it('should generate URL-safe slugs', () => {
    const slug = generateSlug();
    // nanoid uses URL-safe characters: A-Za-z0-9_-
    expect(slug).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('should generate 100 unique slugs', () => {
    const slugs = new Set();
    for (let i = 0; i < 100; i++) {
      slugs.add(generateSlug());
    }
    expect(slugs.size).toBe(100);
  });
});
