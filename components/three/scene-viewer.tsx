'use client';

import { useRef, useState } from 'react';
import type { Group } from 'three';
import { Lights } from './lights';
import { Flower } from './flowers';
import { MessageDisplay } from './message-display';
import { useCardAnimation } from './animations';
import { WindProvider } from './physics/wind-provider';
import { BouquetPhysicsRig } from './physics/bouquet-physics-rig';
import { StemSpringRig } from './physics/stem-spring-rig';
import { SceneEffects } from './effects';
import { usePerformanceTier } from '@/hooks/use-performance-tier';
import type { Card } from '@/types/card';

interface SceneViewerProps {
  card: Card;
  autoPlay?: boolean;
}

export function SceneViewer({ card, autoPlay = false }: SceneViewerProps) {
  const { enableBloom } = usePerformanceTier();
  const [animState, setAnimState] = useState<'closed' | 'opening' | 'revealing' | 'complete'>(
    autoPlay ? 'opening' : 'closed'
  );

  const leftCardRef = useRef<Group>(null);
  const rightCardRef = useRef<Group>(null);
  const bouquetRef = useRef<Group>(null);

  useCardAnimation({
    state: animState,
    leftCardRef,
    rightCardRef,
    bouquetRef,
  });

  const handleClick = () => {
    if (animState === 'closed') {
      setAnimState('opening');
      setTimeout(() => setAnimState('revealing'), 1500);
      setTimeout(() => setAnimState('complete'), 3500);
    }
  };

  return (
    <>
      <Lights />

      <WindProvider>
        <group onClick={handleClick}>
          <group ref={leftCardRef}>
            <mesh position={[-2.5, 0, 0]}>
              <boxGeometry args={[5, 7, 0.1]} />
              <meshStandardMaterial color={card.config.theme.cardColor} />
            </mesh>
          </group>

          <group ref={rightCardRef}>
            <mesh position={[2.5, 0, 0]}>
              <boxGeometry args={[5, 7, 0.1]} />
              <meshStandardMaterial color={card.config.theme.cardColor} />
            </mesh>
          </group>

          <BouquetPhysicsRig>
            <group ref={bouquetRef} position={[0, -3, 0]}>
              {card.config.flowers.map((flower, index) => (
                <StemSpringRig key={index} spatialOffset={index * 1.7}>
                  <Flower config={flower} />
                </StemSpringRig>
              ))}
            </group>
          </BouquetPhysicsRig>

          <MessageDisplay
            message={card.config.message}
            visible={animState === 'complete'}
          />
        </group>
      </WindProvider>

      <SceneEffects enabled={enableBloom} />
    </>
  );
}
