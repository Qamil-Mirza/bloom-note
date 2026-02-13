'use client';

import { useState, useCallback } from 'react';
import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { SceneViewer } from '@/components/three/scene-viewer';
import { MessageCardOverlay } from '@/components/three/message-card-overlay';
import { ShareButton } from '@/components/ui/share-button';
import { ViewCounter } from './view-counter';
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
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: config.theme.background }}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">BloomNote 🎁</h1>
        </div>
        <ViewCounter slug={card.slug} initialViews={card.views} />
      </div>

      {/* 3D Card */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div
            className="relative bg-white/50 backdrop-blur rounded-xl shadow-2xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            {!hasOpened && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm">
                <button
                  onClick={() => setHasOpened(true)}
                  className="px-8 py-4 bg-white rounded-full shadow-lg text-lg font-semibold hover:scale-105 transition-transform"
                >
                  Tap to Open Gift 🎁
                </button>
              </div>
            )}
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
            <MessageCardOverlay
              visible={showMessage}
              message={config.message}
              theme={config.theme}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center space-y-4">
        <div>
          <ShareButton url={cardUrl} />
        </div>
        <p className="text-sm text-gray-600">
          Made with <a href="/" className="text-romantic-600 hover:underline">BloomNote</a>
          {' '}- Create your own 3D Valentine gift!
        </p>
      </div>
    </div>
  );
}
