import type { FlowerConfig } from '@/types/flower';

/**
 * Pre-determined positions for 8 flowers in a bouquet wrap arrangement
 * These positions create a natural bouquet look with flowers at varying heights and depths
 */
const BOUQUET_POSITIONS = [
  // Front row - 3 flowers
  { x: -1.5, y: 0, z: 2.5 },
  { x: 0, y: 0.3, z: 2.8 },
  { x: 1.5, y: 0, z: 2.5 },
  // Middle row - 3 flowers
  { x: -1.8, y: 0.5, z: 1.2 },
  { x: 0, y: 0.8, z: 1.5 },
  { x: 1.8, y: 0.5, z: 1.2 },
  // Back row - 2 flowers
  { x: -0.8, y: 1, z: 0.3 },
  { x: 0.8, y: 1, z: 0.3 },
];

/**
 * Auto-arrange flowers using pre-determined bouquet positions
 */
export function autoArrangeFlowers(flowers: FlowerConfig[]): FlowerConfig[] {
  return flowers.map((flower, index) => {
    const position = BOUQUET_POSITIONS[index] || { x: 0, y: 0, z: 0 };
    const angle = Math.atan2(position.x, position.z);

    return {
      ...flower,
      position,
      rotation: [0, -angle, 0], // Face outward from center
    };
  });
}

/**
 * Tighter positions for the landing page hero bouquet (6 flowers)
 */
const HERO_BOUQUET_POSITIONS = [
  // 6 flowers in an even radial ring (60° apart) at radius 1.5
  // Heights stagger: taller at back, shorter at front
  { x: 0,     y: 3.5, z: 1.5 },    // front center
  { x: 1.3,   y: 3.3, z: 0.75 },   // front right
  { x: 1.3,   y: 3.1, z: -0.75 },  // back right
  { x: 0,     y: 3.7, z: -1.5 },   // back center (tallest)
  { x: -1.3,  y: 3.1, z: -0.75 },  // back left
  { x: -1.3,  y: 3.3, z: 0.75 },   // front left
];

/**
 * Auto-arrange flowers for the hero bouquet using tighter positions
 */
export function autoArrangeHeroFlowers(flowers: FlowerConfig[]): FlowerConfig[] {
  return flowers.map((flower, index) => {
    const position = HERO_BOUQUET_POSITIONS[index] || { x: 0, y: 0, z: 0 };
    const angle = Math.atan2(position.x, position.z);

    return {
      ...flower,
      position,
      rotation: [0, -angle, 0],
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
 * Get pre-determined position for flower by index
 */
export function getBouquetPosition(index: number): { x: number; y: number; z: number } {
  return BOUQUET_POSITIONS[index] || { x: 0, y: 0, z: 0 };
}
