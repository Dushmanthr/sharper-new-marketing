"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { services } from "@/lib/site";
import { Move3d, Sparkles as SparklesIcon } from "lucide-react";

// Face configuration mapping for the 6 cube sides:
// [ +X (Right), -X (Left), +Y (Top), -Y (Bottom), +Z (Front), -Z (Back) ]
const faceConfigurations = [
  {
    index: 0,
    serviceIndex: 0, // Brand Marketing
    accentColor: "#FF6A00",
    glowColor: "rgba(255, 106, 0, 0.4)",
    kicker: "Brand Identity",
    title: "Brand Marketing",
    metric: "+184% Brand Recall",
    icon: "🎨",
    targetRot: [0, -Math.PI / 2, 0], // Faces +X
  },
  {
    index: 1,
    serviceIndex: 1, // Website Design
    accentColor: "#00E5FF",
    glowColor: "rgba(0, 229, 255, 0.4)",
    kicker: "UI/UX & Code",
    title: "Website Design",
    metric: "0.9s Load Time",
    icon: "💻",
    targetRot: [0, Math.PI / 2, 0], // Faces -X
  },
  {
    index: 2,
    serviceIndex: 2, // Social Media
    accentColor: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    kicker: "Audience Growth",
    title: "Social Media",
    metric: "+310% Engagement",
    icon: "⚡",
    targetRot: [Math.PI / 2, 0, 0], // Faces +Y
  },
  {
    index: 3,
    serviceIndex: 3, // PPC
    accentColor: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
    kicker: "Performance Paid",
    title: "Pay-Per-Click",
    metric: "3.8x Return On Ad Spend",
    icon: "🎯",
    targetRot: [-Math.PI / 2, 0, 0], // Faces -Y
  },
  {
    index: 4,
    serviceIndex: 4, // Data Analysis (Front face)
    accentColor: "#3B82F6",
    glowColor: "rgba(59, 130, 246, 0.4)",
    kicker: "Intelligence & ROI",
    title: "Data Analysis",
    metric: "100% Verified Tracking",
    icon: "📊",
    targetRot: [0, 0, 0], // Faces +Z (Front)
  },
  {
    index: 5,
    serviceIndex: 5, // Organic SEO (Back face)
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    kicker: "Compounding Growth",
    title: "Organic SEO",
    metric: "Top-3 Search Rankings",
    icon: "🔍",
    targetRot: [0, Math.PI, 0], // Faces -Z (Back)
  },
];

/**
 * Procedurally generates high-resolution canvas textures with glowing borders,
 * sleek typography, holographic grid, and metric chips for each face.
 */
function createFaceTexture(config: (typeof faceConfigurations)[0]): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Deep Obsidian / Space Navy Base Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  bgGrad.addColorStop(0, "#081024");
  bgGrad.addColorStop(0.5, "#0b1736");
  bgGrad.addColorStop(1, "#050b1a");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-Tech Grid Pattern
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 2;
  const step = 64;
  for (let x = step; x < 1024; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 1024);
    ctx.stroke();
  }
  for (let y = step; y < 1024; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  // 3. Central Ambient Radial Glow
  const radialGlow = ctx.createRadialGradient(512, 512, 50, 512, 512, 480);
  radialGlow.addColorStop(0, config.glowColor);
  radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, 1024, 1024);

  // 4. Outer Glowing Neon Frame with Beveled Corner Accents
  ctx.strokeStyle = config.accentColor;
  ctx.lineWidth = 14;
  ctx.strokeRect(50, 50, 924, 924);

  // Outer thin secondary boundary
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(74, 74, 876, 876);

  // Tech Corner Brackets
  ctx.fillStyle = config.accentColor;
  const cornerSize = 40;
  ctx.fillRect(40, 40, cornerSize, 14);
  ctx.fillRect(40, 40, 14, cornerSize);
  ctx.fillRect(1024 - 40 - cornerSize, 40, cornerSize, 14);
  ctx.fillRect(1024 - 54, 40, 14, cornerSize);
  ctx.fillRect(40, 1024 - 54, cornerSize, 14);
  ctx.fillRect(40, 1024 - 40 - cornerSize, 14, cornerSize);
  ctx.fillRect(1024 - 40 - cornerSize, 1024 - 54, cornerSize, 14);
  ctx.fillRect(1024 - 54, 1024 - 40 - cornerSize, 14, cornerSize);

  // 5. Header Watermark Brand Indicator
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SHARPER LABS · 3D PRISM", 110, 140);

  ctx.textAlign = "right";
  ctx.fillStyle = config.accentColor;
  ctx.fillText(`0${config.index + 1} // DISCIPLINE`, 914, 140);

  // 6. Central Large Icon Badge
  ctx.textAlign = "center";
  ctx.font = "140px sans-serif";
  ctx.fillText(config.icon, 512, 380);

  // 7. Category Kicker
  ctx.fillStyle = config.accentColor;
  ctx.font = "bold 34px sans-serif";
  ctx.letterSpacing = "6px";
  ctx.fillText(config.kicker.toUpperCase(), 512, 490);

  // 8. Main Title
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 64px sans-serif";
  ctx.fillText(config.title, 512, 590);

  // 9. Metric Pill Chip
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  const pillW = 600;
  const pillH = 100;
  const pillX = 512 - pillW / 2;
  const pillY = 670;
  const radius = 50;

  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, radius);
  ctx.fill();

  ctx.strokeStyle = config.accentColor;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, radius);
  ctx.stroke();

  ctx.fillStyle = config.accentColor;
  ctx.font = "bold 38px sans-serif";
  ctx.fillText(config.metric, 512, 735);

  // 10. Footer Action Cue
  ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
  ctx.font = "26px sans-serif";
  ctx.fillText("TAP OR DRAG TO ROTATE BLUEPRINT →", 512, 880);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
}

interface CubeProps {
  activeServiceIndex: number;
  onServiceSelect?: (serviceIndex: number) => void;
  isDraggingRef: React.MutableRefObject<boolean>;
}

function PrismMesh({
  activeServiceIndex,
  onServiceSelect,
  isDraggingRef,
}: CubeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Rotation angles and velocities
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);
  const currentRotX = useRef(0);
  const currentRotY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0);

  // Drag tracking
  const pointerDownPos = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Generate face materials once client-side
  const materials = useMemo(() => {
    if (typeof window === "undefined") return [];

    return faceConfigurations.map((config) => {
      const tex = createFaceTexture(config);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        metalness: 0.85,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        reflectivity: 0.95,
        side: THREE.FrontSide,
      });
    });
  }, []);

  // Sync rotation target when activeServiceIndex changes from outside
  useEffect(() => {
    const matched = faceConfigurations.find(
      (f) => f.serviceIndex === activeServiceIndex
    );
    if (matched && !isDraggingRef.current) {
      targetRotX.current = matched.targetRot[0];
      targetRotY.current = matched.targetRot[1];
    }
  }, [activeServiceIndex, isDraggingRef]);

  // Three.js Render Frame
  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Apply inertia velocity when not dragging
    if (!isDraggingRef.current) {
      targetRotY.current += velY.current;
      targetRotX.current += velX.current;

      // Natural friction decay
      velX.current *= 0.92;
      velY.current *= 0.92;

      // Very subtle idle turntable drift if completely still
      if (Math.abs(velX.current) < 0.001 && Math.abs(velY.current) < 0.001) {
        targetRotY.current += 0.002;
      }
    }

    // Cursor reactive micro-tilt
    const mouseX = state.pointer.x * 0.12;
    const mouseY = state.pointer.y * 0.12;

    // Smooth physical damping (Lerp toward target)
    const dampSpeed = 5.0;
    currentRotX.current = THREE.MathUtils.damp(
      currentRotX.current,
      targetRotX.current - mouseY,
      dampSpeed,
      delta
    );
    currentRotY.current = THREE.MathUtils.damp(
      currentRotY.current,
      targetRotY.current + mouseX,
      dampSpeed,
      delta
    );

    meshRef.current.rotation.x = currentRotX.current;
    meshRef.current.rotation.y = currentRotY.current;

    // Subtle floating breath on Y
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
  });

  // Pointer Drag Handlers
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    velX.current = 0;
    velY.current = 0;
  };

  const handlePointerMove = (e: any) => {
    if (!isDraggingRef.current) return;
    e.stopPropagation();

    const dx = e.clientX - pointerDownPos.current.x;
    const dy = e.clientY - pointerDownPos.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }

    const sensitivity = 0.008;
    targetRotY.current += dx * sensitivity;
    targetRotX.current += dy * sensitivity;

    velY.current = dx * sensitivity * 0.35;
    velX.current = dy * sensitivity * 0.35;

    pointerDownPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: any) => {
    if (!isDraggingRef.current) return;
    e.stopPropagation();
    isDraggingRef.current = false;

    // If tap/click without drag, cycle to next service
    if (!hasMovedRef.current) {
      const nextIndex = (activeServiceIndex + 1) % services.length;
      onServiceSelect?.(nextIndex);
    }
  };

  if (materials.length === 0) return null;

  return (
    <mesh
      ref={meshRef}
      material={materials}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      scale={2.2}
    >
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

interface ShowcaseCubeProps {
  className?: string;
  activeServiceIndex?: number;
  onServiceSelect?: (index: number) => void;
}

export default function ShowcaseCube({
  className = "",
  activeServiceIndex = 0,
  onServiceSelect,
}: ShowcaseCubeProps) {
  const isDraggingRef = useRef(false);
  const [internalIndex, setInternalIndex] = useState(activeServiceIndex);

  const currentIndex = activeServiceIndex ?? internalIndex;

  const handleSelect = (idx: number) => {
    setInternalIndex(idx);
    onServiceSelect?.(idx);
  };

  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* 3D Canvas Box */}
      <div className="relative h-[340px] sm:h-[400px] w-full max-w-[480px] rounded-3xl border border-white/20 bg-gradient-to-b from-navy-950/70 via-navy-900/50 to-navy-950/80 shadow-2xl backdrop-blur-xl overflow-hidden cursor-grab active:cursor-grabbing">
        {/* Decorative corner glows */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-cyan-500/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-orange-500/20 blur-2xl" />

        {/* Top Hint Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md shadow-xs">
          <Move3d className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>Interactive 3D Prism · Drag to Rotate</span>
        </div>

        <Canvas
          camera={{ position: [0, 0, 4.6], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.1} />
          <directionalLight position={[5, 8, 5]} intensity={2.4} color="#ffffff" />
          <directionalLight position={[-6, -4, -4]} intensity={2.8} color="#00e5ff" />
          <directionalLight position={[6, -4, 4]} intensity={2.2} color="#ff7b00" />
          <directionalLight position={[0, 6, -6]} intensity={1.8} color="#a855f7" />

          <Sparkles count={25} scale={5} size={2} speed={0.4} opacity={0.3} color="#38bdf8" />
          <Environment preset="city" />

          <PrismMesh
            activeServiceIndex={currentIndex}
            onServiceSelect={handleSelect}
            isDraggingRef={isDraggingRef}
          />
        </Canvas>
      </div>

      {/* Quick Face Selector Navigation Tabs */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-md">
        {faceConfigurations.map((face, idx) => {
          const isSelected = currentIndex === face.serviceIndex;
          return (
            <button
              key={face.index}
              type="button"
              onClick={() => handleSelect(face.serviceIndex)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-white text-navy-950 shadow-md ring-2 ring-orange-400"
                  : "border border-white/20 bg-white/5 text-navy-200 hover:border-white/40 hover:bg-white/10"
              }`}
            >
              {face.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
