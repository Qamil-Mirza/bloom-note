'use client';

export function Lights() {
  return (
    <>
      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.6} />

      {/* Main directional light (sun) */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
      />

      {/* Fill light from below with pink tint */}
      <pointLight
        position={[0, -5, 3]}
        intensity={0.3}
        color="#ffeeff"
      />
    </>
  );
}
