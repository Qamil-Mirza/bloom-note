"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CanvasWrapper } from "@/components/three/canvas-wrapper";
import { Lights } from "@/components/three/lights";
import { GiftModel } from "@/components/three/gift-model";
import { OrbitControls } from "@react-three/drei";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-slate-950 w-full rounded-md z-0 pb-16 sm:pb-20 md:pb-24",
        className
      )}
    >
      {/* 3D tulip canvas - above content */}
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px] w-full mt-20 sm:mt-24 md:mt-28">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-romantic-500/30 blur-[100px]" />
        </div>
        <CanvasWrapper cameraPosition={[0, 1, 4]} fov={45}>
          <Lights />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
          <GiftModel presetId="tulips" autoRotate={false} />
        </CanvasWrapper>
      </div>

      {/* Content - below the tulip */}
      <div className="relative z-50 flex flex-col items-center px-5 mt-6 sm:mt-8">
        {children}
      </div>
    </div>
  );
};
