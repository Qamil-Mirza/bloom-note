'use client';

import { Rose } from './rose';
import { Tulip } from './tulip';
import { Daisy } from './daisy';
import { Sunflower } from './sunflower';
import type { FlowerConfig } from '@/types/flower';

interface FlowerProps {
  config: FlowerConfig;
}

export function Flower({ config }: FlowerProps) {
  switch (config.type) {
    case 'rose':
      return <Rose config={config} />;
    case 'tulip':
      return <Tulip config={config} />;
    case 'daisy':
      return <Daisy config={config} />;
    case 'sunflower':
      return <Sunflower config={config} />;
    default:
      return null;
  }
}
