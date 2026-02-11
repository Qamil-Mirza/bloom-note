export type FlowerType = 'rose' | 'tulip' | 'daisy' | 'sunflower';

export interface FlowerPosition {
  x: number;
  y: number;
  z: number;
}

export interface FlowerConfig {
  type: FlowerType;
  position: FlowerPosition;
  rotation: [number, number, number]; // x, y, z in radians
  scale: number; // 0.5 to 2.0
  color: string; // hex color
}
