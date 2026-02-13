"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { CanvasWrapper } from "@/components/three/canvas-wrapper";
import { Lights } from "@/components/three/lights";
import { Flower } from "@/components/three/flowers";
import { OrbitControls } from "@react-three/drei";
import { autoArrangeHeroFlowers } from "@/lib/utils/three-helpers";
import { BouquetWrapper } from "@/components/three/bouquet-wrapper";
import { WindProvider } from "@/components/three/physics/wind-provider";
import { BouquetPhysicsRig } from "@/components/three/physics/bouquet-physics-rig";
import { StemSpringRig } from "@/components/three/physics/stem-spring-rig";
import { SceneEffects } from "@/components/three/effects";
import { usePerformanceTier } from "@/hooks/use-performance-tier";
import type { FlowerConfig } from "@/types/flower";

const demoBouquet: FlowerConfig[] = autoArrangeHeroFlowers([
  { type: "rose", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 1.2, color: "#ec4899" },
  { type: "tulip", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 1.0, color: "#f43f5e" },
  { type: "daisy", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 1.1, color: "#fecce3" },
  { type: "rose", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 1.0, color: "#fb7185" },
  { type: "sunflower", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 0.9, color: "#fbbf24" },
  { type: "tulip", position: { x: 0, y: 0, z: 0 }, rotation: [0, 0, 0], scale: 1.1, color: "#c084fc" },
]);

function HeroScene() {
  const { enableBloom } = usePerformanceTier();

  return (
    <>
      <Lights />
      <OrbitControls
        enableZoom={false}
        autoRotate
        autoRotateSpeed={1.5}
        enablePan={false}
      />
      <WindProvider>
        <BouquetPhysicsRig>
          <group position={[0, 0.2, 0]} scale={0.9}>
            {demoBouquet.map((flower, i) => (
              <StemSpringRig key={i} spatialOffset={i * 1.7}>
                <Flower config={flower} />
              </StemSpringRig>
            ))}
            <BouquetWrapper />
          </group>
        </BouquetPhysicsRig>
      </WindProvider>
      <SceneEffects enabled={enableBloom} />
    </>
  );
}

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">💐</span>
            <span className="text-xl font-bold text-white tracking-tight">
              BloomNote
            </span>
          </div>
          <Link
            href="/create"
            className="px-5 py-2 rounded-full bg-romantic-600 text-white text-sm font-medium hover:bg-romantic-500 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section with Lamp Effect */}
      <LampContainer className="min-h-screen">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center"
        >

          <h1 className="bg-gradient-to-br from-romantic-200 via-white to-romantic-300 py-4 bg-clip-text text-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-transparent">
            Create a 3D
            <br />
            Valentine Card
          </h1>
          <p className="text-romantic-200/60 text-center text-lg md:text-xl max-w-xl mt-6 leading-relaxed">
            Build personalized 3D pop-up cards with animated flower bouquets.
            Share with a link. Free forever.
          </p>
          <Link
            href="/create"
            className="mt-10 group relative inline-flex items-center"
          >
            <span className="absolute inset-0 rounded-full bg-romantic-500/30 blur-xl group-hover:bg-romantic-500/50 transition-all duration-500" />
            <span className="relative px-8 py-4 rounded-full bg-gradient-to-r from-romantic-600 to-romantic-500 text-white font-semibold text-lg hover:from-romantic-500 hover:to-romantic-400 transition-all duration-300 shadow-lg shadow-romantic-500/25">
              Create Your Card →
            </span>
          </Link>

          <p className="mt-6 text-slate-500 text-sm">
            Free forever · No signup required
          </p>
        </motion.div>
      </LampContainer>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">💐</span>
            <span className="text-sm font-medium text-slate-400">
              BloomNote
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Made with love for Valentine&apos;s Day
          </p>
        </div>
      </footer>
    </div>
  );
}
