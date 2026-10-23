"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import { type Testimonial } from "../Testimonials";

const accentColors = [
  "#FF6A00", // 1. Brand Strategy: Electric Orange
  "#00E5FF", // 2. Web & Social: Cyan / Sea-Teal
  "#F59E0B", // 3. Follower Growth & SEO: Amber
  "#A855F7", // 4. Healthcare / Clinical: Purple
  "#3B82F6", // 5. International Advisory: Royal Blue
  "#10B981", // 6. E-Commerce / Performance: Emerald
];

function getInitials(company: string): string {
  const words = company.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return company.slice(0, 2).toUpperCase();
}

/**
 * Procedurally draws a high-resolution, luxury physical glass card texture (1024x1024)
 * with glowing border, metric pill, 5 stars, quote typography, avatar, and client details.
 */
function createTestimonialTexture(item: Testimonial, index: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  const accent = accentColors[index % accentColors.length];

  // 1. Deep Obsidian / Space Navy Base Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
  bgGrad.addColorStop(0, "#081024");
  bgGrad.addColorStop(0.5, "#0d1a38");
  bgGrad.addColorStop(1, "#060c1c");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. High-Tech Subtle Grid Texture
  ctx.strokeStyle = "rgba(255, 255, 255, 0.035)";
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
  const radialGlow = ctx.createRadialGradient(512, 512, 40, 512, 512, 480);
  radialGlow.addColorStop(0, `${accent}33`); // 20% opacity
  radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, 1024, 1024);

  // 4. Outer Glowing Border with Beveled Corners
  ctx.strokeStyle = accent;
  ctx.lineWidth = 10;
  ctx.strokeRect(50, 50, 924, 924);

  // Inner Subtle Boundary Line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(66, 66, 892, 892);

  // Corner Accent Brackets
  const bSize = 34;
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 4;
  // Top-Left
  ctx.beginPath();
  ctx.moveTo(50, 50 + bSize);
  ctx.lineTo(50, 50);
  ctx.lineTo(50 + bSize, 50);
  ctx.stroke();
  // Top-Right
  ctx.beginPath();
  ctx.moveTo(974 - bSize, 50);
  ctx.lineTo(974, 50);
  ctx.lineTo(974, 50 + bSize);
  ctx.stroke();
  // Bottom-Left
  ctx.beginPath();
  ctx.moveTo(50, 974 - bSize);
  ctx.lineTo(50, 974);
  ctx.lineTo(50 + bSize, 974);
  ctx.stroke();
  // Bottom-Right
  ctx.beginPath();
  ctx.moveTo(974 - bSize, 974);
  ctx.lineTo(974, 974);
  ctx.lineTo(974, 974 - bSize);
  ctx.stroke();

  // 5. Header: Metric Badge Pill (Left) & 5 Gold Stars (Right)
  if (item.metric) {
    const pillX = 96;
    const pillY = 96;
    const pillW = 420;
    const pillH = 64;
    const radius = 32;

    ctx.fillStyle = `${accent}25`;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, radius);
    ctx.fill();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, radius);
    ctx.stroke();

    ctx.fillStyle = accent;
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`▲ ${item.metric}`, pillX + pillW / 2, pillY + pillH / 2);
  }

  // 5 Gold Stars
  ctx.fillStyle = "#F59E0B";
  ctx.font = "bold 36px sans-serif";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillText("★★★★★", 928, 128);

  // 6. Quotation Mark Icon
  ctx.fillStyle = `${accent}60`;
  ctx.font = "bold 130px Georgia, serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("“", 96, 175);

  // 7. Testimonial Quote Text with Word Wrapping
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "500 32px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  const maxLineWidth = 832;
  const lineHeight = 48;
  const quoteWords = item.quote.split(" ");
  let currentLine = "";
  let currentY = 270;
  let lineCount = 0;
  const maxLines = 7;

  for (let n = 0; n < quoteWords.length; n++) {
    const testLine = currentLine + quoteWords[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineWidth && n > 0) {
      ctx.fillText(currentLine.trim(), 96, currentY);
      currentLine = quoteWords[n] + " ";
      currentY += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1 && n < quoteWords.length - 1) {
        currentLine += "...";
        break;
      }
    } else {
      currentLine = testLine;
    }
  }
  ctx.fillText(currentLine.trim(), 96, currentY);

  // 8. Divider Line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(96, 750);
  ctx.lineTo(928, 750);
  ctx.stroke();

  // 9. Footer: Avatar Circle with Initials
  const avatarX = 144;
  const avatarY = 835;
  const avatarRadius = 46;

  ctx.fillStyle = "#0A1734";
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(avatarX, avatarY, avatarRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(getInitials(item.company), avatarX, avatarY);

  // 10. Client Role, Company, Location
  ctx.textAlign = "left";
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 30px sans-serif";
  ctx.fillText(item.role, 215, 815);

  ctx.fillStyle = accent;
  ctx.font = "600 24px sans-serif";
  ctx.fillText(`${item.company} · ${item.location}`, 215, 856);

  // Service Badge Tag
  if (item.service) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 20px sans-serif";
    ctx.fillText(`Specialism: ${item.service}`, 215, 892);
  }

  // 11. Subtle Tap/Drag Cue on Bottom
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 18px sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("TAP OR DRAG TO EXPLORE →", 928, 940);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.needsUpdate = true;
  return texture;
}

interface TestimonialsRingProps {
  items: Testimonial[];
  currentAngle: React.MutableRefObject<number>;
  targetAngle: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
  velocityRef: React.MutableRefObject<number>;
  onCardClick: (index: number) => void;
  activeIndex: number;
}

function TestimonialsRingMesh({
  items,
  currentAngle,
  targetAngle,
  isDraggingRef,
  velocityRef,
  onCardClick,
  activeIndex,
}: TestimonialsRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cardMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const RADIUS = 4.5;
  const count = items.length;

  // Pre-generate materials
  const materials = useMemo(() => {
    if (typeof window === "undefined") return [];
    return items.map((item, i) => {
      const tex = createTestimonialTexture(item, i);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        metalness: 0.75,
        roughness: 0.2,
        clearcoat: 0.85,
        clearcoatRoughness: 0.1,
        reflectivity: 0.92,
        side: THREE.DoubleSide,
      });
    });
  }, [items]);

  useFrame((state, delta) => {
    // Natural friction and gentle turntable inertia when not dragged
    if (!isDraggingRef.current) {
      targetAngle.current += velocityRef.current;
      velocityRef.current *= 0.92;
    }

    // Smooth physical angle damping (Spring Lerp)
    currentAngle.current = THREE.MathUtils.damp(
      currentAngle.current,
      targetAngle.current,
      5.2,
      delta
    );

    const angle = currentAngle.current;
    const time = state.clock.elapsedTime;

    // Viewport-adaptive responsive radius and scale for mobile & tablet
    const viewportWidth = state.viewport.width;
    const isMobile = viewportWidth < 7.5;
    const responsiveRadius = isMobile ? Math.max(3.0, viewportWidth * 0.46) : RADIUS;
    const responsiveCardScale = isMobile ? Math.min(1.0, viewportWidth / 7.6) : 1.0;

    // Position and orient each card in circular orbit
    cardMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;

      const theta = (i / count) * Math.PI * 2 + angle;
      const x = responsiveRadius * Math.sin(theta);
      const z = responsiveRadius * Math.cos(theta);
      const y = Math.sin(theta * 2 + time * 1.3) * 0.1;

      mesh.position.set(x, y, z);

      // Card always looks directly at the camera
      mesh.lookAt(0, 0, 8.5);

      // Depth scaling and contrast: cards in front are full scale and bright
      const normalizedZ = (z + responsiveRadius) / (responsiveRadius * 2); // 0 (back) to 1 (front)
      const scale = THREE.MathUtils.lerp(0.72, 1.06, normalizedZ) * responsiveCardScale;
      mesh.scale.set(scale, scale, scale);

      // Depth opacity attenuation
      if (mesh.material && !Array.isArray(mesh.material)) {
        (mesh.material as THREE.MeshPhysicalMaterial).opacity =
          THREE.MathUtils.lerp(0.42, 1.0, normalizedZ);
        (mesh.material as THREE.MeshPhysicalMaterial).transparent = true;
      }
    });
  });

  if (materials.length === 0) return null;

  return (
    <group ref={groupRef}>
      {items.map((item, i) => (
        <mesh
          key={i}
          ref={(el) => {
            cardMeshes.current[i] = el;
          }}
          material={materials[i]}
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(i);
          }}
        >
          <planeGeometry args={[2.5, 2.8]} />
        </mesh>
      ))}
    </group>
  );
}

interface Testimonials3DProps {
  items: Testimonial[];
  activeIndex: number;
  onSelect: (index: number) => void;
  isPaused?: boolean;
}

export default function Testimonials3D({
  items,
  activeIndex,
  onSelect,
  isPaused = false,
}: Testimonials3DProps) {
  const currentAngle = useRef(0);
  const targetAngle = useRef(0);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const lastPointerX = useRef(0);
  const lastTime = useRef(0);

  const count = items.length;

  const snapToIndex = useCallback(
    (index: number) => {
      onSelect(index);
      const target = -(index / count) * Math.PI * 2;
      const current = targetAngle.current;
      const diff = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
      targetAngle.current = current + diff;
      velocityRef.current = 0;
    },
    [count, onSelect]
  );

  // Sync when activeIndex is changed from external controls (Next/Prev buttons)
  useEffect(() => {
    if (!isDraggingRef.current) {
      const target = -(activeIndex / count) * Math.PI * 2;
      const current = targetAngle.current;
      const diff = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
      targetAngle.current = current + diff;
    }
  }, [activeIndex, count]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerX.current = e.clientX;
    lastTime.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastPointerX.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);

    targetAngle.current += deltaX * 0.007;
    velocityRef.current = (deltaX / dt) * 0.04;

    lastPointerX.current = e.clientX;
    lastTime.current = now;

    // Calculate nearest active index
    const normalized = ((-targetAngle.current / (Math.PI * 2)) % 1 + 1) % 1;
    const approxIndex = Math.round(normalized * count) % count;
    onSelect(approxIndex);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="relative h-[440px] sm:h-[520px] w-full rounded-3xl border border-white/20 bg-gradient-to-b from-navy-950/85 via-[#0b1530]/70 to-navy-950/85 shadow-2xl backdrop-blur-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none"
    >
      {/* Decorative ambient corner glows */}
      <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

      {/* Top Drag Hint Pill */}
      <div className="absolute top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold text-white/90 backdrop-blur-md shadow-xs whitespace-nowrap">
        <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
        <span>3D Cylinder Arc · Drag or Click to Explore Evidence</span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 8, 8]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[-8, 0, -4]} intensity={2.6} color="#00e5ff" />
        <directionalLight position={[8, 0, -4]} intensity={2.6} color="#ff7b00" />
        <directionalLight position={[0, -6, 4]} intensity={1.5} color="#3b82f6" />

        <Sparkles count={35} scale={9} size={2.2} speed={0.3} opacity={0.35} color="#38bdf8" />
        <Environment preset="city" />

        <TestimonialsRingMesh
          items={items}
          currentAngle={currentAngle}
          targetAngle={targetAngle}
          isDraggingRef={isDraggingRef}
          velocityRef={velocityRef}
          onCardClick={snapToIndex}
          activeIndex={activeIndex}
        />
      </Canvas>
    </div>
  );
}
