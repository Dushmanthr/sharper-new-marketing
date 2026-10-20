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
        <ambientLight intensity={0.7} />

        {/* Studio Key Light */}
        <directionalLight position={[6, 9, 8]} intensity={2.2} color="#ffffff" />

        {/* Dynamic Dual Rim-Lights highlighting brand orange & cyan facets */}
        <directionalLight
          position={[-10, 8, -6]}
          intensity={3.2}
          color="#00e5ff" // Electric Cyan edge illumination
        />
        <directionalLight
          position={[10, -8, -6]}
          intensity={2.8}
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
