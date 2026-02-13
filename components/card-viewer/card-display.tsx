'use client';

import { useState, useCallback } from 'react';
import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { SceneViewer } from '@/components/three/scene-viewer';
import { MessageCardOverlay } from '@/components/three/message-card-overlay';
import { OpenGiftPrompt } from './open-gift-prompt';
import { FloatingShareButton } from './floating-share-button';
import { BrandWatermark } from './brand-watermark';
import { isLegacyConfig } from '@/types/card';
import type { Card, CardConfig } from '@/types/card';
import type { AnimationState } from '@/components/three/envelope/envelope-scene';

interface CardDisplayProps {
  card: Card;
}

export function CardDisplay({ card }: CardDisplayProps) {
  const [hasOpened, setHasOpened] = useState(false);
  const [animState, setAnimState] = useState<AnimationState>('idle');

  const cardUrl = typeof window !== 'undefined'
    ? window.location.href
    : `${process.env.NEXT_PUBLIC_APP_URL}/c/${card.slug}`;

  const handleAnimationState = useCallback((state: AnimationState) => {
    setAnimState(state);
  }, []);

  if (isLegacyConfig(card.config)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
          <p className="text-4xl mb-4">💐</p>
          <h2 className="text-xl font-bold mb-2">Older Version Card</h2>
          <p className="text-gray-600 mb-6">
            This card was created with an older version of BloomNote and is no longer viewable.
            Create a new Valentine gift to share with your loved ones!
          </p>
          <a
            href="/create"
            className="inline-block px-6 py-3 bg-romantic-600 text-white rounded-full font-medium hover:bg-romantic-500 transition-colors"
          >
            Create New Card
          </a>
        </div>
      </div>
    );
  }

  const config = card.config as CardConfig;
  const showMessage = animState === 'message' || animState === 'complete';

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        backgroundColor: config.theme.background,
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Ambient radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${config.theme.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Full-screen canvas */}
      <div className="absolute inset-0">
        <CanvasWrapper
          className="w-full h-full"
          cameraPosition={[0, 1.5, 7]}
          fov={45}
        >
          <SceneViewer
            card={card}
            autoPlay={hasOpened}
            onAnimationState={handleAnimationState}
          />
        </CanvasWrapper>
      </div>

      {/* Open gift prompt */}
      <OpenGiftPrompt
        visible={!hasOpened}
        accentColor={config.theme.accent}
        onOpen={() => setHasOpened(true)}
      />

      {/* Message overlay */}
      <MessageCardOverlay
        visible={showMessage}
        message={config.message}
        theme={config.theme}
      />

      {/* Floating share button — hidden during animation */}
      {(animState === 'idle' || animState === 'complete') && (
        <FloatingShareButton url={cardUrl} accentColor={config.theme.accent} />
      )}

      {/* Brand watermark */}
      <BrandWatermark accentColor={config.theme.accent} animState={animState} />
    </div>
  );
}
