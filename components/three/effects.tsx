'use client';

import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';

interface SceneEffectsProps {
  enabled?: boolean;
}

export function SceneEffects({ enabled = true }: SceneEffectsProps) {
  if (!enabled) return null;

  return (
    <EffectComposer>
      <Bloom
        intensity={0.3}
        luminanceThreshold={0.8}
        mipmapBlur
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
