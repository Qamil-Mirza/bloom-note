'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EnvelopeModel } from './envelope-model';
import { GiftModel } from '../gift-model';
import { Lights } from '../lights';
import { SceneEffects } from '../effects';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import type { GiftPresetId } from '@/types/gift';
import * as THREE from 'three';

export type AnimationState = 'idle' | 'opening' | 'rising' | 'message' | 'complete';

interface EnvelopeSceneProps {
  giftPresetId: GiftPresetId;
  accentColor: string;
  autoPlay?: boolean;
  onAnimationState?: (state: AnimationState) => void;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

function AnimatedScene({
  giftPresetId,
  accentColor,
  autoPlay,
  onAnimationState,
}: EnvelopeSceneProps) {
  const { enableBloom } = usePerformanceTier();
  const [animState, setAnimState] = useState<AnimationState>(autoPlay ? 'opening' : 'idle');
  const timeRef = useRef(0);
  const flapAngleRef = useRef(0);
  const giftYRef = useRef(-1);
  const giftScaleRef = useRef(0);
  const envelopeYRef = useRef(0);

  const updateAnimState = useCallback(
    (state: AnimationState) => {
      setAnimState(state);
      onAnimationState?.(state);
    },
    [onAnimationState]
  );

  const handleClick = useCallback(() => {
    if (animState === 'idle') {
      timeRef.current = 0;
      updateAnimState('opening');
    }
  }, [animState, updateAnimState]);

  useFrame((_, delta) => {
    if (animState === 'idle' || animState === 'complete') return;

    timeRef.current += delta;
    const t = timeRef.current;

    if (animState === 'opening') {
      // 0-1s: flap rotates 0 → PI
      const flapT = Math.min(t / 1.0, 1);
      flapAngleRef.current = lerp(0, Math.PI, flapT);

      if (t >= 1.0) {
        updateAnimState('rising');
      }
    }

    if (animState === 'rising') {
      // 1-2.5s: gift rises, envelope slides down
      const risingT = Math.min((t - 1.0) / 1.5, 1);
      const eased = 1 - Math.pow(1 - risingT, 3); // easeOutCubic
      giftYRef.current = lerp(-1, 2.5, eased);
      giftScaleRef.current = lerp(0, 1, eased);
      envelopeYRef.current = lerp(0, -3, eased);
      flapAngleRef.current = Math.PI;

      if (t >= 2.5) {
        updateAnimState('message');
      }
    }

    if (animState === 'message') {
      // 2.5-3.5s: gift settles to idle rotation position
      const messageT = Math.min((t - 2.5) / 1.0, 1);
      giftYRef.current = lerp(2.5, 1.5, messageT);
      flapAngleRef.current = Math.PI;
      giftScaleRef.current = 1;
      envelopeYRef.current = lerp(-3, -4, messageT);

      if (t >= 3.5) {
        updateAnimState('complete');
      }
    }
  });

  return (
    <>
      <Lights />

      <group onClick={handleClick}>
        {/* Envelope */}
        <group position={[0, envelopeYRef.current, 0]}>
          <EnvelopeModel
            flapAngle={flapAngleRef.current}
            accentColor={accentColor}
          />
        </group>

        {/* Gift */}
        <group
          position={[0, giftYRef.current, 0]}
          scale={giftScaleRef.current}
        >
          <GiftModel
            presetId={giftPresetId}
            autoRotate={animState === 'complete'}
          />
        </group>
      </group>

      {animState === 'complete' && (
        <OrbitControls
          enableZoom
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
        />
      )}

      <SceneEffects enabled={enableBloom} />
    </>
  );
}

export function EnvelopeScene(props: EnvelopeSceneProps) {
  return <AnimatedScene {...props} />;
}
