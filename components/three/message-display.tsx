'use client';

import { Text } from '@react-three/drei';
import type { CardMessage } from '@/types/card';

interface MessageDisplayProps {
  message: CardMessage;
  visible: boolean;
}

export function MessageDisplay({ message, visible }: MessageDisplayProps) {
  if (!visible || !message.text) return null;

  const fontMap = {
    cursive: '/fonts/DancingScript-Regular.ttf',
    serif: '/fonts/Merriweather-Regular.ttf',
    sans: undefined, // Use default three.js font
  };

  return (
    <Text
      position={[0, 4, 0]}
      fontSize={0.5}
      color={message.color}
      anchorX="center"
      anchorY="middle"
      maxWidth={8}
      textAlign="center"
      font={fontMap[message.font]}
    >
      {message.text}
    </Text>
  );
}
