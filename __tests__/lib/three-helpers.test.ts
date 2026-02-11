import { autoArrangeFlowers, clamp, getBouquetPosition } from '@/lib/utils/three-helpers';
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

    it('should arrange flowers using pre-determined positions', () => {
      const flowers = Array(8).fill(null).map(() => createFlower('rose'));
      const arranged = autoArrangeFlowers(flowers);

      expect(arranged).toHaveLength(8);
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

    it('should use bouquet positions', () => {
      const flowers = Array(8).fill(null).map(() => createFlower('rose'));
      const arranged = autoArrangeFlowers(flowers);

      // First flower should be at front-left position
      expect(arranged[0].position.x).toBe(-1.5);
      expect(arranged[0].position.z).toBe(2.5);
    });

    it('should set appropriate rotations', () => {
      const flowers = Array(8).fill(null).map(() => createFlower('rose'));
      const arranged = autoArrangeFlowers(flowers);

      // All flowers should have rotations
      arranged.forEach((flower) => {
        expect(flower.rotation).toBeDefined();
        expect(flower.rotation.length).toBe(3);
      });
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

  describe('getBouquetPosition', () => {
    it('should return pre-determined positions', () => {
      const pos0 = getBouquetPosition(0);
      expect(pos0.x).toBe(-1.5);
      expect(pos0.y).toBe(0);
      expect(pos0.z).toBe(2.5);
    });

    it('should return different positions for different indices', () => {
      const pos0 = getBouquetPosition(0);
      const pos1 = getBouquetPosition(1);

      expect(pos0.x).not.toBe(pos1.x);
    });

    it('should return origin for out of bounds index', () => {
      const pos = getBouquetPosition(100);
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(0);
      expect(pos.z).toBe(0);
    });

    it('should have 8 unique positions', () => {
      const positions = Array(8).fill(null).map((_, i) => getBouquetPosition(i));
      const uniquePositions = new Set(
        positions.map((p) => `${p.x},${p.y},${p.z}`)
      );
      expect(uniquePositions.size).toBe(8);
    });
  });
});
