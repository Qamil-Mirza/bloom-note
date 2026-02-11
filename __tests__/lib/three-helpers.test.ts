import { autoArrangeFlowers, clamp, randomPosition } from '@/lib/utils/three-helpers';
import type { FlowerConfig } from '@/types/flower';

describe('three-helpers', () => {
  describe('autoArrangeFlowers', () => {
    const createFlower = (type: 'rose' | 'tulip' | 'daisy' | 'sunflower'): FlowerConfig => ({
      type,
      position: { x: 0, y: 0, z: 0 },
      rotation: [0, 0, 0],
      scale: 1,
      color: '#ec4899',
    });

    it('should arrange flowers in a circle', () => {
      const flowers = [
        createFlower('rose'),
        createFlower('tulip'),
        createFlower('daisy'),
      ];

      const arranged = autoArrangeFlowers(flowers);

      expect(arranged).toHaveLength(3);
      // Check that flowers are not all at origin
      const notAllAtOrigin = arranged.some(
        (f) => f.position.x !== 0 || f.position.z !== 0
      );
      expect(notAllAtOrigin).toBe(true);
    });

    it('should maintain flower types', () => {
      const flowers = [
        createFlower('rose'),
        createFlower('tulip'),
        createFlower('daisy'),
      ];

      const arranged = autoArrangeFlowers(flowers);

      expect(arranged[0].type).toBe('rose');
      expect(arranged[1].type).toBe('tulip');
      expect(arranged[2].type).toBe('daisy');
    });

    it('should set y position to 0', () => {
      const flowers = [createFlower('rose'), createFlower('tulip')];
      const arranged = autoArrangeFlowers(flowers);

      arranged.forEach((flower) => {
        expect(flower.position.y).toBe(0);
      });
    });

    it('should distribute flowers evenly', () => {
      const flowers = Array(4).fill(null).map(() => createFlower('rose'));
      const arranged = autoArrangeFlowers(flowers);

      // With 4 flowers, they should be roughly 90 degrees apart
      // We just check that they're not all in the same position
      const positions = arranged.map((f) => `${f.position.x},${f.position.z}`);
      const uniquePositions = new Set(positions);
      expect(uniquePositions.size).toBe(4);
    });
  });

  describe('clamp', () => {
    it('should clamp value within range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });

    it('should work with negative ranges', () => {
      expect(clamp(0, -5, 5)).toBe(0);
      expect(clamp(-10, -5, 5)).toBe(-5);
      expect(clamp(10, -5, 5)).toBe(5);
    });
  });

  describe('randomPosition', () => {
    it('should generate position within bounds', () => {
      for (let i = 0; i < 100; i++) {
        const pos = randomPosition();
        expect(pos.x).toBeGreaterThanOrEqual(-4);
        expect(pos.x).toBeLessThanOrEqual(4);
        expect(pos.y).toBe(0);
        expect(pos.z).toBeGreaterThanOrEqual(-3);
        expect(pos.z).toBeLessThanOrEqual(3);
      }
    });

    it('should generate varied positions', () => {
      const positions = Array(10).fill(null).map(() => randomPosition());
      const uniquePositions = new Set(
        positions.map((p) => `${p.x},${p.z}`)
      );
      // Should have at least some variety (not all identical)
      expect(uniquePositions.size).toBeGreaterThan(1);
    });
  });
});
