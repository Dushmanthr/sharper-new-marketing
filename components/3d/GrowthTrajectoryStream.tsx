"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

const NUM_POINTS = 38;

/**
 * 3D Kinetic Growth Trajectory Wave Mesh
 * An elegant dual-interwoven performance wave with connecting telemetry struts
 * and pulsing milestone beacons in signature brand Cyan & Orange.
 */
function TrajectoryWaveMesh() {
  const groupRef = useRef<THREE.Group>(null);
  const meshCyanRef = useRef<THREE.InstancedMesh>(null);
  const meshOrangeRef = useRef<THREE.InstancedMesh>(null);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-allocated line vertices buffer (connecting cyan & orange wave pairs)
  const linePositions = useMemo(() => {
    return new Float32Array(NUM_POINTS * 2 * 3);
  }, []);

  const colors = useMemo(
    () => ({
      cyan: new THREE.Color("#00E5FF"),
      orange: new THREE.Color("#FF7B00"),
      dimCyan: new THREE.Color("#0284C7"),
      dimOrange: new THREE.Color("#C2410C"),
    }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Subtle interactive cursor parallax
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.08,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.06,
      4,
      delta
    );

    const meshCyan = meshCyanRef.current;
    const meshOrange = meshOrangeRef.current;
    const lineGeo = lineGeometryRef.current;

    for (let i = 0; i < NUM_POINTS; i++) {
      const pct = i / (NUM_POINTS - 1);
      const x = -7.2 + pct * 14.4;

      // Cyan Trajectory Wave (Data, Rankings & Optimization)
      const y1 =
        Math.sin(pct * Math.PI * 3.2 + t * 1.5) * 0.38 +
        Math.cos(pct * Math.PI * 1.8 + t * 0.8) * 0.18;
      const z1 = Math.cos(pct * Math.PI * 2.8 + t * 1.1) * 0.32;

      // Orange Trajectory Wave (Commercial Growth & Inbound Leads)
      const y2 =
        Math.sin(pct * Math.PI * 3.2 + t * 1.5 + Math.PI * 0.7) * 0.38 +
        Math.cos(pct * Math.PI * 1.8 + t * 0.8 + 1.2) * 0.18;
      const z2 = Math.cos(pct * Math.PI * 2.8 + t * 1.1 + Math.PI * 0.7) * 0.32;

      // Milestone pulse highlight indices: ~15%, ~38%, ~62%, ~85%
      const isMilestone = i === 6 || i === 15 || i === 24 || i === 33;
      const pulse = isMilestone ? 1.0 + Math.sin(t * 3.5 + i) * 0.35 : 1.0;

      // Update Cyan Nodes
      if (meshCyan) {
        dummy.position.set(x, y1, z1);
        dummy.scale.setScalar((isMilestone ? 0.09 : 0.055) * pulse);
        dummy.updateMatrix();
        meshCyan.setMatrixAt(i, dummy.matrix);
      }

      // Update Orange Nodes
      if (meshOrange) {
        dummy.position.set(x, y2, z2);
        dummy.scale.setScalar((isMilestone ? 0.09 : 0.055) * pulse);
        dummy.updateMatrix();
        meshOrange.setMatrixAt(i, dummy.matrix);
      }

      // Update Connecting Strut Vertices
      const lineIdx = i * 6;
      linePositions[lineIdx] = x;
      linePositions[lineIdx + 1] = y1;
      linePositions[lineIdx + 2] = z1;
      linePositions[lineIdx + 3] = x;
      linePositions[lineIdx + 4] = y2;
      linePositions[lineIdx + 5] = z2;
    }

    if (meshCyan) meshCyan.instanceMatrix.needsUpdate = true;
    if (meshOrange) meshOrange.instanceMatrix.needsUpdate = true;

    if (lineGeo && lineGeo.attributes && lineGeo.attributes.position) {
      lineGeo.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wave 1: Cyan Instanced Spheres */}
      <instancedMesh
        ref={meshCyanRef}
        args={[undefined, undefined, NUM_POINTS]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={colors.cyan} toneMapped={false} />
      </instancedMesh>

      {/* Wave 2: Orange Instanced Spheres */}
      <instancedMesh
        ref={meshOrangeRef}
        args={[undefined, undefined, NUM_POINTS]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial color={colors.orange} toneMapped={false} />
      </instancedMesh>

      {/* Connecting Telemetry Struts */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function GrowthTrajectoryStream() {
  return (
    <div className="relative h-[100px] sm:h-[125px] w-full">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        {/* Ambient base lighting */}
        <ambientLight intensity={0.9} />

        {/* Floating atmospheric ambient sparkles */}
        <Sparkles
          count={25}
          scale={10}
          size={1.6}
          speed={0.3}
          opacity={0.35}
          color="#FF7B00"
        />

        {/* Dual Kinetic Growth Wave */}
        <TrajectoryWaveMesh />
      </Canvas>
    </div>
  );
}
