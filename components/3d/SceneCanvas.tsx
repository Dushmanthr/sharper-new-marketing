"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Sparkles } from "@react-three/drei";
import LogoModel from "./LogoModel";

/**
 * Enhanced WebGL Canvas Scene with studio lighting, multi-point chromatic rim-lights,
 * and floating particles tailored for vibrant brand logo materials.
 */
export default function SceneCanvas() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gradient-to-b from-[#060b18] via-[#091124] to-[#040814]"
      aria-hidden="true"
    >
      {/* Geometric grid texture positioned behind the 3D canvas */}
      <div className="hero-grid absolute inset-0 opacity-25" aria-hidden />

      {/* Dynamic ambient chromatic glow orbs positioned behind the 3D logo */}
      <div
        aria-hidden
        className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]"
      />
      <div
        aria-hidden
        className="absolute right-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-orange-500/12 blur-[100px]"
      />
      {/* Ambient 3D Stage Core Aura positioned directly behind the rotating 3D logo */}
      <div
        aria-hidden
        className="hidden md:block absolute right-[15%] top-[25%] -translate-y-1/2 w-96 h-96 lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-tr from-orange-500/15 via-cyan-500/12 to-transparent blur-3xl"
      />

      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        {/* Soft base ambient illumination */}
        <ambientLight intensity={0.9} />

        {/* Studio Key Light */}
        <directionalLight position={[6, 9, 8]} intensity={2.8} color="#ffffff" />

        {/* Dynamic Dual Rim-Lights highlighting brand orange & cyan facets */}
        <directionalLight
          position={[-10, 8, -6]}
          intensity={3.8}
          color="#00e5ff" // Electric Cyan edge illumination
        />
        <directionalLight
          position={[10, -8, -6]}
          intensity={3.4}
          color="#ff7b00" // Vibrant Orange edge illumination
        />

        {/* Rear top accent rim light */}
        <directionalLight
          position={[0, 10, -8]}
          intensity={1.6}
          color="#60a5fa"
        />

        {/* Subtle floating ambient particle dust */}
        <Sparkles
          count={45}
          scale={12}
          size={2.5}
          speed={0.35}
          opacity={0.35}
          color="#38bdf8"
        />

        {/* Studio HDR reflections for metallic clearcoat sheen */}
        <Environment preset="city" />

        {/* Multi-Colored Extruded 3D Logo Model */}
        <LogoModel />
      </Canvas>
    </div>
  );
}
