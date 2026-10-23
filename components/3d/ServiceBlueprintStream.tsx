"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

const NUM_NODES = 36;

/**
 * 3D Kinetic Service Blueprint Stream Mesh
 * An elegant, lightweight dual kinetic wave symbolizing strategy (Cyan)
 * and commercial execution (Orange) with connecting telemetry struts.
 */
function BlueprintWave() {
  const groupRef = useRef<THREE.Group>(null);
  const meshCyanRef = useRef<THREE.InstancedMesh>(null);
  const meshOrangeRef = useRef<THREE.InstancedMesh>(null);
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const linePositions = useMemo(() => new Float32Array(NUM_NODES * 2 * 3), []);

  const colors = useMemo(
    () => ({
      cyan: new THREE.Color("#00E5FF"),
      orange: new THREE.Color("#FF7B00"),
    }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Gentle cursor parallax
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.08,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      -state.pointer.y * 0.05,
      4,
      delta
    );

    const meshCyan = meshCyanRef.current;
    const meshOrange = meshOrangeRef.current;
    const lineGeo = lineGeometryRef.current;

    for (let i = 0; i < NUM_NODES; i++) {
      const pct = i / (NUM_NODES - 1);
      const x = -7.0 + pct * 14.0;

      // Strategy Wave (Cyan)
      const y1 =
        Math.sin(pct * Math.PI * 3 + t * 1.4) * 0.35 +
        Math.cos(pct * Math.PI * 2 + t * 0.7) * 0.15;
      const z1 = Math.cos(pct * Math.PI * 2.5 + t * 1.0) * 0.28;

      // Execution Wave (Orange)
      const y2 =
        Math.sin(pct * Math.PI * 3 + t * 1.4 + Math.PI * 0.75) * 0.35 +
        Math.cos(pct * Math.PI * 2 + t * 0.7 + 1.2) * 0.15;
      const z2 = Math.cos(pct * Math.PI * 2.5 + t * 1.0 + Math.PI * 0.75) * 0.28;

      // Milestone nodes: ~20%, ~50%, ~80%
      const isMilestone = i === 7 || i === 18 || i === 29;
      const pulse = isMilestone ? 1.0 + Math.sin(t * 3.5 + i) * 0.35 : 1.0;

      if (meshCyan) {
        dummy.position.set(x, y1, z1);
        dummy.scale.setScalar((isMilestone ? 0.085 : 0.05) * pulse);
        dummy.updateMatrix();
        meshCyan.setMatrixAt(i, dummy.matrix);
      }

      if (meshOrange) {
        dummy.position.set(x, y2, z2);
        dummy.scale.setScalar((isMilestone ? 0.085 : 0.05) * pulse);
        dummy.updateMatrix();
        meshOrange.setMatrixAt(i, dummy.matrix);
      }

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
      {/* Cyan Instanced Spheres */}
      <instancedMesh
        ref={meshCyanRef}
        args={[undefined, undefined, NUM_NODES]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color={colors.cyan} toneMapped={false} />
      </instancedMesh>

      {/* Orange Instanced Spheres */}
      <instancedMesh
        ref={meshOrangeRef}
        args={[undefined, undefined, NUM_NODES]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 10, 10]} />
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
          opacity={0.24}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function ServiceBlueprintStream() {
  return (
    <div className="relative h-[90px] sm:h-[115px] w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <Sparkles
          count={22}
          scale={9}
          size={1.5}
          speed={0.3}
          opacity={0.3}
          color="#FF7B00"
        />
        <BlueprintWave />
      </Canvas>
    </div>
  );
}
