import type { FlowerConfig } from '@/types/flower';

/**
 * Auto-arrange flowers in a circular pattern
 */
export function autoArrangeFlowers(flowers: FlowerConfig[]): FlowerConfig[] {
  const count = flowers.length;
  const radius = Math.min(4, count * 0.5); // Adjust radius based on count

  return flowers.map((flower, index) => {
    const angle = (index / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    return {
      ...flower,
      position: { x, y: 0, z },
      rotation: [0, -angle, 0], // Face outward
    };
  });
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random position for flower
 */
export function randomPosition(): { x: number; y: number; z: number } {
  return {
    x: (Math.random() - 0.5) * 8, // -4 to 4
    y: 0,
    z: (Math.random() - 0.5) * 6, // -3 to 3
  };
}
