'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

interface EnvelopeModelProps {
  flapAngle: number; // 0 = closed, Math.PI = fully open
  accentColor?: string;
}

function makeLineObj(points: THREE.Vector3[], color: string, opacity: number) {
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
  return new THREE.Line(geo, mat);
}

export function EnvelopeModel({ flapAngle, accentColor = '#ec4899' }: EnvelopeModelProps) {
  const flapGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3, 0);
    shape.lineTo(3, 0);
    shape.lineTo(0, -2.5);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  const heartGeometry = useMemo(() => {
    const s = 0.5;
    const shape = new THREE.Shape();
    shape.moveTo(0, -s);
    shape.bezierCurveTo(-0.2 * s, -0.6 * s, -s, -0.2 * s, -s, 0.2 * s);
    shape.bezierCurveTo(-s, 0.7 * s, -0.35 * s, s, 0, 0.6 * s);
    shape.bezierCurveTo(0.35 * s, s, s, 0.7 * s, s, 0.2 * s);
    shape.bezierCurveTo(s, -0.2 * s, 0.2 * s, -0.6 * s, 0, -s);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const leftFoldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-3, -2);
    shape.lineTo(0, 0);
    shape.lineTo(-3, 2);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  const rightFoldGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(3, -2);
    shape.lineTo(0, 0);
    shape.lineTo(3, 2);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  const leftFoldLine = useMemo(() => makeLineObj(
    [new THREE.Vector3(-3, -2, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(-3, 2, 0)],
    '#b5aa96', 0.7
  ), []);

  const rightFoldLine = useMemo(() => makeLineObj(
    [new THREE.Vector3(3, -2, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(3, 2, 0)],
    '#b5aa96', 0.7
  ), []);

  const bottomFoldLine = useMemo(() => makeLineObj(
    [new THREE.Vector3(-3, -1, 0), new THREE.Vector3(3, -1, 0)],
    '#b5aa96', 0.7
  ), []);

  const flapEdgeLine = useMemo(() => makeLineObj(
    [new THREE.Vector3(-3, 0, 0), new THREE.Vector3(0, -2.5, 0), new THREE.Vector3(3, 0, 0)],
    '#b5aa96', 0.8
  ), []);

  return (
    <group>
      {/* Envelope body — back face */}
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#f5f0e8" side={THREE.DoubleSide} />
      </mesh>

      {/* Envelope body — front face */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[6, 4]} />
        <meshBasicMaterial color="#ede8dc" side={THREE.DoubleSide} />
      </mesh>

      {/* Left side fold */}
      <mesh geometry={leftFoldGeometry} position={[0, 0, 0.06]}>
        <meshBasicMaterial color="#e2dace" side={THREE.DoubleSide} />
      </mesh>
      <primitive object={leftFoldLine} position={[0, 0, 0.07]} />

      {/* Right side fold */}
      <mesh geometry={rightFoldGeometry} position={[0, 0, 0.06]}>
        <meshBasicMaterial color="#e2dace" side={THREE.DoubleSide} />
      </mesh>
      <primitive object={rightFoldLine} position={[0, 0, 0.07]} />

      {/* Bottom fold */}
      <mesh position={[0, -2, 0.08]}>
        <planeGeometry args={[6, 2]} />
        <meshBasicMaterial color="#e8e1d3" side={THREE.DoubleSide} />
      </mesh>
      <primitive object={bottomFoldLine} position={[0, 0, 0.09]} />

      {/* Flap — pivots from top edge */}
      <group position={[0, 2, 0]} rotation={[flapAngle, 0, 0]}>
        <mesh geometry={flapGeometry} position={[0, 0, 0.1]}>
          <meshBasicMaterial color="#ebe4d5" side={THREE.DoubleSide} />
        </mesh>

        {/* Flap edge line */}
        <primitive object={flapEdgeLine} position={[0, 0, 0.11]} />

        {/* Heart on flap */}
        <mesh geometry={heartGeometry} position={[0, -2.1, 0.12]}>
          <meshBasicMaterial color={accentColor} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Soft shadow under flap */}
      <mesh position={[0, 0.75, 0.052]}>
        <planeGeometry args={[5.6, 1.5]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
