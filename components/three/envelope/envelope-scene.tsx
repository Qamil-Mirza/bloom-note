'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EnvelopeModel } from './envelope-model';
import { GiftModel } from '../gift-model';
import { Lights } from '../lights';
import { SceneEffects } from '../effects';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import type { GiftPresetId } from '@/types/gift';
import * as THREE from 'three';

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

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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

  // Three.js group refs for direct mutation
  const envelopeGroupRef = useRef<THREE.Group>(null);
  const flapGroupRef = useRef<THREE.Group>(null);
  const giftGroupRef = useRef<THREE.Group>(null);

  const updateAnimState = useCallback(
    (state: AnimationState) => {
      setAnimState(state);
      onAnimationState?.(state);
    },
    [onAnimationState]
  );

  // Start animation when autoPlay becomes true
  useEffect(() => {
    if (autoPlay && animState === 'idle') {
      timeRef.current = 0;
      updateAnimState('opening');
    }
  }, [autoPlay, animState, updateAnimState]);

  const handleClick = useCallback(() => {
    if (animState === 'idle') {
      timeRef.current = 0;
      updateAnimState('opening');
    }
  }, [animState, updateAnimState]);

  useFrame((_, delta) => {
    if (animState === 'idle' || animState === 'complete') return;

    const envelope = envelopeGroupRef.current;
    const flap = flapGroupRef.current;
    const gift = giftGroupRef.current;
    if (!envelope || !flap || !gift) return;

    timeRef.current += delta;
    const t = timeRef.current;

    if (animState === 'opening') {
      // 0–0.8s: flap rotates open
      const flapT = Math.min(t / 0.8, 1);
      flap.rotation.x = lerp(0, Math.PI, easeOutQuart(flapT));

      if (t >= 0.8) {
        updateAnimState('popping');
      }
    }

    if (animState === 'popping') {
      // 0.8–3s: gift eases upward, envelope shrinks away
      const duration = 2.2;
      const popT = Math.min((t - 0.8) / duration, 1);

      // Gift eases up smoothly
      const giftEased = easeOutQuart(popT);
      gift.position.y = lerp(-1, 0.75, giftEased);
      const s = lerp(0, 1, giftEased);
      gift.scale.set(s, s, s);

      // Envelope shrinks away simultaneously
      const envEased = easeInOutCubic(popT);
      envelope.position.y = lerp(0, -2, envEased);
      envelope.position.z = lerp(0, -8, envEased);
      const es = lerp(1, 0.3, envEased);
      envelope.scale.set(es, es, es);

      // Flap closes as envelope retreats
      flap.rotation.x = lerp(Math.PI, 0, envEased);

      if (t >= 0.8 + duration) {
        updateAnimState('message');
      }
    }

    if (animState === 'message') {
      // 3–4s: gift settles to final position
      const messageT = Math.min((t - 3.0) / 1.0, 1);
      const eased = easeOutQuart(messageT);

      gift.position.y = lerp(0.75, 0.6, eased);
      gift.scale.set(1, 1, 1);

      envelope.position.z = -8;
      envelope.position.y = lerp(-2, -2.5, eased);
      envelope.scale.set(0.3, 0.3, 0.3);
      flap.rotation.x = 0;

      if (t >= 4.0) {
        updateAnimState('complete');
      }
    }
  });

  return (
    <>
      <Lights />

      <group onClick={handleClick}>
        {/* Envelope — retreats behind gift */}
        <group ref={envelopeGroupRef}>
          <EnvelopeModel
            ref={flapGroupRef}
            accentColor={accentColor}
          />
        </group>


        {/* Gift — eases to center */}
        <group ref={giftGroupRef} position={[0, -1, 0]} scale={0}>
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
