'use client';

import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { EnvelopeModel } from './envelope-model';
import { GiftModel } from '../gift-model';
import { Lights } from '../lights';
import { SceneEffects } from '../effects';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import type { GiftPresetId } from '@/types/gift';

export type AnimationState = 'idle' | 'opening' | 'popping' | 'message' | 'complete';

interface EnvelopeSceneProps {
  giftPresetId: GiftPresetId;
  accentColor: string;
  autoPlay?: boolean;
  onAnimationState?: (state: AnimationState) => void;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * Math.min(Math.max(t, 0), 1);
}

// easeOutBack — slight overshoot for a "pop" feel
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
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

  // Envelope animated values
  const flapAngleRef = useRef(0);
  const envelopeYRef = useRef(0);
  const envelopeZRef = useRef(0);
  const envelopeScaleRef = useRef(1);

  // Gift animated values
  const giftYRef = useRef(-1);
  const giftScaleRef = useRef(0);

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
      // 0–1s: flap rotates open
      const flapT = Math.min(t / 1.0, 1);
      flapAngleRef.current = lerp(0, Math.PI, flapT);

      if (t >= 1.0) {
        updateAnimState('popping');
      }
    }

    if (animState === 'popping') {
      // 1–2.5s: gift pops to center, envelope retreats & shrinks & closes
      const popT = Math.min((t - 1.0) / 1.5, 1);
      const popEased = easeOutBack(popT);
      const envelopeEased = 1 - Math.pow(1 - popT, 3); // easeOutCubic

      // Gift pops from inside envelope to screen center
      giftYRef.current = lerp(-1, 1.5, popEased);
      giftScaleRef.current = lerp(0, 1, popEased);

      // Envelope moves back (z), down (y), and shrinks
      envelopeZRef.current = lerp(0, -8, envelopeEased);
      envelopeYRef.current = lerp(0, -2, envelopeEased);
      envelopeScaleRef.current = lerp(1, 0.35, envelopeEased);

      // Flap closes back as envelope retreats
      flapAngleRef.current = lerp(Math.PI, 0, envelopeEased);

      if (t >= 2.5) {
        updateAnimState('message');
      }
    }

    if (animState === 'message') {
      // 2.5–3.5s: gift settles, message overlay slides in
      const messageT = Math.min((t - 2.5) / 1.0, 1);
      const eased = 1 - Math.pow(1 - messageT, 2);

      // Gently settle gift to final position
      giftYRef.current = lerp(1.5, 1.2, eased);
      giftScaleRef.current = 1;

      // Envelope continues to rest in background
      envelopeZRef.current = -8;
      envelopeYRef.current = lerp(-2, -2.5, eased);
      envelopeScaleRef.current = 0.35;
      flapAngleRef.current = 0;

      if (t >= 3.5) {
        updateAnimState('complete');
      }
    }
  });

  return (
    <>
      <Lights />

      <group onClick={handleClick}>
        {/* Envelope — retreats behind gift */}
        <group
          position={[0, envelopeYRef.current, envelopeZRef.current]}
          scale={envelopeScaleRef.current}
        >
          <EnvelopeModel
            flapAngle={flapAngleRef.current}
            accentColor={accentColor}
          />
        </group>

        {/* Guiding text — visible only before opening */}
        {animState === 'idle' && (
          <Text
            position={[0, -2.8, 0.1]}
            fontSize={0.35}
            color="#9a9080"
            anchorX="center"
            anchorY="middle"
          >
            Tap to open
          </Text>
        )}

        {/* Gift — pops to center */}
        <group
          position={[0, giftYRef.current, 0]}
          scale={giftScaleRef.current}
        >
          <GiftModel
            presetId={giftPresetId}
            autoRotate={animState === 'complete' || animState === 'message'}
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
