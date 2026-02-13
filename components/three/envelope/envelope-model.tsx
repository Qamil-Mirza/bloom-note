'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface EnvelopeModelProps {
  flapAngle: number; // 0 = closed, Math.PI = fully open
  accentColor?: string;
}

export function EnvelopeModel({ flapAngle, accentColor = '#ec4899' }: EnvelopeModelProps) {
  const flapGeometry = useMemo(() => {
    // Triangular flap: vertices at (-3, 0, 0), (3, 0, 0), (0, -2.5, 0)
    const shape = new THREE.Shape();
    shape.moveTo(-3, 0);
    shape.lineTo(3, 0);
    shape.lineTo(0, -2.5);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group>
      {/* Envelope body — back face */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#f5f0e8" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope body — front face */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[6, 4]} />
        <meshStandardMaterial color="#ede8dc" side={THREE.DoubleSide} />
      </mesh>

      {/* Left side fold */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              -3, -2, 0.01,
              -3, 2, 0.01,
              0, 0, 0.01,
            ]), 3]}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#e8e0d0" side={THREE.DoubleSide} />
      </mesh>

      {/* Right side fold */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([
              3, -2, 0.01,
              3, 2, 0.01,
              0, 0, 0.01,
            ]), 3]}
          />
        </bufferGeometry>
        <meshStandardMaterial color="#e8e0d0" side={THREE.DoubleSide} />
      </mesh>

      {/* Bottom fold */}
      <mesh position={[0, -2, 0.02]}>
        <planeGeometry args={[6, 2]} />
        <meshStandardMaterial color="#ece4d4" side={THREE.DoubleSide} />
      </mesh>

      {/* Flap — pivots from top edge */}
      <group position={[0, 2, 0]} rotation={[flapAngle, 0, 0]}>
        <mesh geometry={flapGeometry} position={[0, 0, 0]}>
          <meshStandardMaterial color="#f0e8d8" side={THREE.DoubleSide} />
        </mesh>

        {/* Wax seal on flap */}
        <mesh position={[0, -1, 0.06]}>
          <circleGeometry args={[0.45, 32]} />
          <meshStandardMaterial
            color={accentColor}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}
