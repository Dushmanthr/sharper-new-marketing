"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

const NUM_NODES = 40;

/**
 * 3D Kinetic Social Stream Mesh
 * Dynamic multi-chromatic wave representing cross-platform follower velocity
 * across Instagram (Pink), TikTok (Cyan/Magenta), LinkedIn (Blue), and Facebook (Royal Blue).
 */
function SocialStreamMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linePositions = useMemo(() => new Float32Array(NUM_NODES * 2 * 3), []);

  // Platform brand colors
  const platformColors = useMemo(
    () => [
      new THREE.Color("#E1306C"), // Instagram
      new THREE.Color("#00F2FE"), // TikTok Cyan
      new THREE.Color("#0A66C2"), // LinkedIn
      new THREE.Color("#1877F2"), // Facebook
    ],
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Interactive pointer parallax
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.1,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.06,
      4,
      delta
    );

    const mesh = meshRef.current;
    const lineGeo = lineGeoRef.current;

    for (let i = 0; i < NUM_NODES; i++) {
      const pct = i / (NUM_NODES - 1);
      const x = -7.2 + pct * 14.4;

      // Primary Follower Surge Wave
      const y1 =
        Math.sin(pct * Math.PI * 4 + t * 1.5) * 0.32 +
        Math.cos(pct * Math.PI * 2.5 + t * 0.8) * 0.16;
      const z1 = Math.cos(pct * Math.PI * 3 + t * 1.2) * 0.25;

      // Secondary Engagement Wave
      const y2 =
        Math.sin(pct * Math.PI * 4 + t * 1.5 + Math.PI * 0.7) * 0.32 +
        Math.cos(pct * Math.PI * 2.5 + t * 0.8 + 1.4) * 0.16;
      const z2 = Math.cos(pct * Math.PI * 3 + t * 1.2 + Math.PI * 0.7) * 0.25;

      // Platform Milestone Beacons (every 10 nodes)
      const isBeacon = i % 10 === 0;
      const pulse = isBeacon ? 1.0 + Math.sin(t * 3.8 + i) * 0.4 : 1.0;

      if (mesh) {
        dummy.position.set(x, y1, z1);
        dummy.scale.setScalar((isBeacon ? 0.09 : 0.045) * pulse);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        // Color by platform sector
        const colorIdx = Math.floor(pct * 4) % 4;
        mesh.setColorAt(i, platformColors[colorIdx]);
      }

      // Inter-wave connection struts
      const lineIdx = i * 6;
      linePositions[lineIdx] = x;
      linePositions[lineIdx + 1] = y1;
      linePositions[lineIdx + 2] = z1;
      linePositions[lineIdx + 3] = x;
      linePositions[lineIdx + 4] = y2;
      linePositions[lineIdx + 5] = z2;
    }

    if (mesh) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }

    if (lineGeo && lineGeo.attributes && lineGeo.attributes.position) {
      lineGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Dynamic kinetic nodes */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, NUM_NODES]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Floating telemetry filaments */}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Magical ambient social sparkles */}
      <Sparkles
        count={36}
        scale={[14, 2, 4]}
        size={2.4}
        speed={0.6}
        opacity={0.5}
        color="#F43F5E"
      />
      <Sparkles
        count={28}
        scale={[14, 2, 4]}
        size={2.2}
        speed={0.7}
        opacity={0.5}
        color="#00F2FE"
      />
    </group>
  );
}

export default function SocialFollowers3DStream() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-75">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <SocialStreamMesh />
      </Canvas>
    </div>
  );
}
