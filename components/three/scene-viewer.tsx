'use client';

import { EnvelopeScene, type AnimationState } from './envelope/envelope-scene';
import type { Card, CardConfig } from '@/types/card';
import { isLegacyConfig } from '@/types/card';

interface SceneViewerProps {
  card: Card;
  autoPlay?: boolean;
  onAnimationState?: (state: AnimationState) => void;
}

export function SceneViewer({ card, autoPlay = false, onAnimationState }: SceneViewerProps) {
  if (isLegacyConfig(card.config)) {
    return null; // Legacy cards are handled by CardDisplay with a notice
  }

  const config = card.config as CardConfig;

  return (
    <EnvelopeScene
      giftPresetId={config.giftPresetId}
      accentColor={config.theme.accent}
      autoPlay={autoPlay}
      onAnimationState={onAnimationState}
    />
  );
}
