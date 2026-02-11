'use client';

import { useState } from 'react';
import { CanvasWrapper } from '@/components/three/canvas-wrapper';
import { SceneViewer } from '@/components/three/scene-viewer';
import { ShareButton } from '@/components/ui/share-button';
import { ViewCounter } from './view-counter';
import type { Card } from '@/types/card';

interface CardDisplayProps {
  card: Card;
}

export function CardDisplay({ card }: CardDisplayProps) {
  const [hasOpened, setHasOpened] = useState(false);

  const cardUrl = typeof window !== 'undefined'
    ? window.location.href
    : `${process.env.NEXT_PUBLIC_APP_URL}/c/${card.slug}`;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: card.config.theme.background }}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">BloomNote 💐</h1>
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
                  Tap to Open Card 💌
                </button>
              </div>
            )}
            <CanvasWrapper className="w-full h-full">
              <SceneViewer card={card} autoPlay={hasOpened} />
            </CanvasWrapper>
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
          {' '}- Create your own 3D Valentine card!
        </p>
      </div>
    </div>
  );
}
