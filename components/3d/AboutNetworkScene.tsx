"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/**
 * 3D Global Network Lattice Scene
 * An elegant, lightweight holographic connectivity sphere with pulsing nodes
 * and subtle dual orbital rings in brand Orange and Electric Cyan.
 * Scaled and positioned to remain perfectly framed across mobile, tablet, and desktop viewports.
 */
function NetworkLattice() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);

  // Icosahedron with detail 1 provides 42 balanced surface nodes
  const { geometry, nodePositions } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.48, 1);
    const posAttr = geo.attributes.position;
    const positions: THREE.Vector3[] = [];
    const dummySet = new Set<string>();

    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      const key = `${v.x.toFixed(2)},${v.y.toFixed(2)},${v.z.toFixed(2)}`;
      if (!dummySet.has(key)) {
        dummySet.add(key);
        positions.push(v);
      }
    }
    return { geometry: geo, nodePositions: positions };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Gentle constant rotation with subtle cursor parallax dampening
      groupRef.current.rotation.y = t * 0.12 + state.pointer.x * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.1 - state.pointer.y * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.18;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.14;
    }

    // Gentle node pulsing
    if (nodesRef.current) {
      for (let i = 0; i < nodePositions.length; i++) {
        const p = nodePositions[i];
        const pulse = 1 + Math.sin(t * 2.5 + i * 0.4) * 0.25;
        dummy.position.copy(p);
        dummy.scale.setScalar(0.04 * pulse);
        dummy.updateMatrix();
        nodesRef.current.setMatrixAt(i, dummy.matrix);
      }
      nodesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Geodesic Wireframe */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#00E5FF"
          wireframe
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Surface Node Spheres */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, nodePositions.length]}
        frustumCulled={false}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial color="#FF7B00" toneMapped={false} />
      </instancedMesh>

      {/* Primary Tilted Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[1.92, 1.96, 64]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Counter-Tilted Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[2.08, 2.12, 64]} />
        <meshBasicMaterial
          color="#FF7B00"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function AboutNetworkScene() {
  return (
    <div className="relative h-full w-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5.6], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, -5, -3]} intensity={2} color="#00e5ff" />
        <directionalLight position={[5, -5, -3]} intensity={2} color="#ff7b00" />

        <Sparkles
          count={28}
          scale={7}
          size={1.6}
          speed={0.3}
          opacity={0.35}
          color="#38bdf8"
        />

        <NetworkLattice />
      </Canvas>
    </div>
  );
}
