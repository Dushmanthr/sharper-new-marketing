"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

interface TestimonialsAmbientSceneProps {
  accentColor?: string;
}

function AmbientNebula({ accentColor = "#FF6A00" }: { accentColor: string }) {
  const pointsRef = useRef<THREE.Points>(null);
  const targetColor = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const currentColor = useRef(new THREE.Color(accentColor));

  // Generate 80 floating ambient points on an undulating wave
  const count = 90;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth color lerping to active testimonial's accent color
    currentColor.current.lerp(targetColor, delta * 3.0);
    const material = pointsRef.current.material as THREE.PointsMaterial;
    if (material) {
      material.color.copy(currentColor.current);
    }

    // Slow organic celestial rotation
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        color={accentColor}
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function TestimonialsAmbientScene({
  accentColor = "#FF6A00",
}: TestimonialsAmbientSceneProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <Sparkles
          count={45}
          scale={10}
          size={2}
          speed={0.4}
          opacity={0.45}
          color={accentColor}
        />
        <AmbientNebula accentColor={accentColor} />
      </Canvas>
    </div>
  );
}
