"use client";

import React, { useRef, useState, useMemo, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles, Environment } from "@react-three/drei";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/lib/site";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MoveHorizontal,
  Building2,
  TrendingUp,
} from "lucide-react";

// Expand case studies to 6 distinct gallery cards around the 360° orbit ring
interface OrbitItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  metric: string;
  metricLabel: string;
  timeframe: string;
  accentColor: string;
}

const orbitItems: OrbitItem[] = [
  {
    id: "orbit-1",
    slug: caseStudies[0]?.slug ?? "international-b2b-supply-chain",
    title: "Scaling Inbound Enterprise Enquiries Across UK & Europe",
    category: "B2B & Tech",
    metric: "+214%",
    metricLabel: "Inbound RFPs Uplift",
    timeframe: "9 Months",
    accentColor: "#FF6A00",
  },
  {
    id: "orbit-2",
    slug: caseStudies[1]?.slug ?? "sustainable-lifestyle-ecommerce-scale",
    title: "Multi-Platform Social Follower Growth",
    category: "E-commerce & Retail",
    metric: "+250K",
    metricLabel: "New Social Followers",
    timeframe: "6 Months",
    accentColor: "#00E5FF",
  },
  {
    id: "orbit-3",
    slug: caseStudies[2]?.slug ?? "healthcare-clinical-advisory-growth",
    title: "Clinical & Healthcare Advisory Enterprise Growth",
    category: "Healthcare & Advisory",
    metric: "+310%",
    metricLabel: "Consultation Requests",
    timeframe: "12 Months",
    accentColor: "#A855F7",
  },
  {
    id: "orbit-4",
    slug: caseStudies[0]?.slug ?? "international-b2b-supply-chain",
    title: "Omnichannel Brand Repositioning & Global Architecture",
    category: "Brand Strategy",
    metric: "+184%",
    metricLabel: "Qualified Inbound Leads",
    timeframe: "8 Months",
    accentColor: "#F59E0B",
  },
  {
    id: "orbit-5",
    slug: caseStudies[1]?.slug ?? "sustainable-lifestyle-ecommerce-scale",
    title: "Next.js Web Re-engineering & Core Web Vitals Optimization",
    category: "Web & UX Engineering",
    metric: "0.9s",
    metricLabel: "Average Page Load",
    timeframe: "4 Months",
    accentColor: "#3B82F6",
  },
  {
    id: "orbit-6",
    slug: caseStudies[2]?.slug ?? "healthcare-clinical-advisory-growth",
    title: "International Multi-Region Organic Search Authority",
    category: "Global SEO",
    metric: "Top-3",
    metricLabel: "Commercial Rankings",
    timeframe: "10 Months",
    accentColor: "#10B981",
  },
];

/**
 * Creates high-DPI canvas textures for each 3D card in the circular orbit
 */
function createCardTexture(item: OrbitItem, index: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // 1. Dark Glassmorphism Gradient Background
  const grad = ctx.createLinearGradient(0, 0, 800, 1000);
  grad.addColorStop(0, "#081024");
  grad.addColorStop(0.4, "#0b1736");
  grad.addColorStop(1, "#050b1a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 800, 1000);

  // 2. Subtle Matrix Lines
  ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
  ctx.lineWidth = 2;
  for (let y = 60; y < 1000; y += 60) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(760, y);
    ctx.stroke();
  }

  // 3. Central Ambient Radial Glow
  const radial = ctx.createRadialGradient(400, 420, 50, 400, 420, 420);
  radial.addColorStop(0, `${item.accentColor}33`);
  radial.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, 800, 1000);

  // 4. Glowing Border Frame
  ctx.strokeStyle = item.accentColor;
  ctx.lineWidth = 10;
  ctx.strokeRect(30, 30, 740, 940);

  // Inner subtle border
  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, 704, 904);

  // Corner Tech Tabs
  ctx.fillStyle = item.accentColor;
  const tab = 30;
  ctx.fillRect(25, 25, tab, 8);
  ctx.fillRect(25, 25, 8, tab);
  ctx.fillRect(800 - 25 - tab, 25, tab, 8);
  ctx.fillRect(800 - 33, 25, 8, tab);
  ctx.fillRect(25, 1000 - 33, tab, 8);
  ctx.fillRect(25, 1000 - 25 - tab, 8, tab);
  ctx.fillRect(800 - 25 - tab, 1000 - 33, tab, 8);
  ctx.fillRect(800 - 33, 1000 - 25 - tab, 8, tab);

  // 5. Header Watermark
  ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SHARPER LABS · CASE STUDY", 70, 95);

  ctx.textAlign = "right";
  ctx.fillStyle = item.accentColor;
  ctx.fillText(`0${index + 1} // ARCHIVE`, 730, 95);

  // 6. Category Pill Badge
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  ctx.roundRect(70, 140, 320, 54, 27);
  ctx.fill();

  ctx.strokeStyle = item.accentColor;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 22px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(item.category.toUpperCase(), 230, 175);

  // 7. Timeframe Pill
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.beginPath();
  ctx.roundRect(410, 140, 220, 54, 27);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
  ctx.font = "18px sans-serif";
  ctx.fillText(`⏱ ${item.timeframe}`, 520, 175);

  // 8. Primary Metric Callout Banner
  ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
  ctx.beginPath();
  ctx.roundRect(70, 240, 660, 240, 30);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = item.accentColor;
  ctx.font = "bold 100px sans-serif";
  ctx.fillText(item.metric, 400, 370);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(item.metricLabel, 400, 430);

  // 9. Case Study Title Text (Multi-line wrap)
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 44px sans-serif";
  ctx.textAlign = "left";

  const words = item.title.split(" ");
  let line = "";
  let yPos = 570;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 640 && n > 0) {
      ctx.fillText(line, 80, yPos);
      line = words[n] + " ";
      yPos += 58;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 80, yPos);

  // 10. Bottom Action CTA Button Graphic
  ctx.fillStyle = item.accentColor;
  ctx.beginPath();
  ctx.roundRect(80, 850, 640, 75, 37);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 26px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("VIEW 5-PART CASE STUDY →", 400, 898);

  const tex = new THREE.CanvasTexture(canvas);
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.needsUpdate = true;
  return tex;
}

interface OrbitRingProps {
  currentAngle: React.MutableRefObject<number>;
  targetAngle: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
  velocityRef: React.MutableRefObject<number>;
  onCardClick: (index: number) => void;
  activeIndex: number;
}

function OrbitRingMesh({
  currentAngle,
  targetAngle,
  isDraggingRef,
  velocityRef,
  onCardClick,
  activeIndex,
}: OrbitRingProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cardMeshes = useRef<(THREE.Mesh | null)[]>([]);
  const RADIUS = 4.4;
  const count = orbitItems.length;

  // Pre-generate materials
  const materials = useMemo(() => {
    if (typeof window === "undefined") return [];
    return orbitItems.map((item, i) => {
      const tex = createCardTexture(item, i);
      return new THREE.MeshPhysicalMaterial({
        map: tex,
        metalness: 0.75,
        roughness: 0.22,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
        reflectivity: 0.9,
        side: THREE.DoubleSide,
      });
    });
  }, []);

  useFrame((state, delta) => {
    // Natural friction and idle rotation
    if (!isDraggingRef.current) {
      targetAngle.current += velocityRef.current;
      velocityRef.current *= 0.93;

      // Idle smooth turntable motion
      if (Math.abs(velocityRef.current) < 0.0005) {
        targetAngle.current += 0.0018;
      }
    }

    // Smooth angle damping
    currentAngle.current = THREE.MathUtils.damp(
      currentAngle.current,
      targetAngle.current,
      5.0,
      delta
    );

    const angle = currentAngle.current;
    const time = state.clock.elapsedTime;

    // Viewport-adaptive responsive radius and scale for mobile & tablet
    const viewportWidth = state.viewport.width;
    const isMobile = viewportWidth < 7.5;
    const responsiveRadius = isMobile ? Math.max(3.0, viewportWidth * 0.46) : RADIUS;
    const responsiveCardScale = isMobile ? Math.min(1.0, viewportWidth / 7.8) : 1.0;

    // Position and orient each card in circular orbit
    cardMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;

      const theta = (i / count) * Math.PI * 2 + angle;
      const x = responsiveRadius * Math.sin(theta);
      const z = responsiveRadius * Math.cos(theta);
      const y = Math.sin(theta * 2 + time * 1.2) * 0.12;

      mesh.position.set(x, y, z);

      // Card always looks directly at the camera
      mesh.lookAt(0, 0.4, 9.5);

      // Depth scaling and contrast: cards in front are full scale and bright
      const normalizedZ = (z + responsiveRadius) / (responsiveRadius * 2); // 0 (back) to 1 (front)
      const scale = THREE.MathUtils.lerp(0.72, 1.05, normalizedZ) * responsiveCardScale;
      mesh.scale.set(scale, scale, scale);

      // Depth opacity attenuation
      if (mesh.material && !Array.isArray(mesh.material)) {
        (mesh.material as THREE.MeshPhysicalMaterial).opacity =
          THREE.MathUtils.lerp(0.45, 1.0, normalizedZ);
        (mesh.material as THREE.MeshPhysicalMaterial).transparent = true;
      }
    });
  });

  if (materials.length === 0) return null;

  return (
    <group ref={groupRef}>
      {orbitItems.map((item, i) => (
        <mesh
          key={item.id}
          ref={(el) => {
            cardMeshes.current[i] = el;
          }}
          material={materials[i]}
          onClick={(e) => {
            e.stopPropagation();
            onCardClick(i);
          }}
        >
          <planeGeometry args={[2.2, 2.75]} />
        </mesh>
      ))}
    </group>
  );
}

export default function OrbitGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentAngle = useRef(0);
  const targetAngle = useRef(0);
  const isDraggingRef = useRef(false);
  const velocityRef = useRef(0);
  const pointerDownPos = useRef(0);
  const hasMovedRef = useRef(false);

  const count = orbitItems.length;

  // Snaps the given card index to the front (theta = 0)
  const snapToIndex = useCallback(
    (index: number) => {
      setActiveIndex(index);
      const targetStep = -((index / count) * Math.PI * 2);
      // Find shortest angular distance
      const current = targetAngle.current;
      const diff = (targetStep - (current % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      targetAngle.current = current + diff;
      velocityRef.current = 0;
    },
    [count]
  );

  const prev = () => {
    const nextIndex = (activeIndex - 1 + count) % count;
    snapToIndex(nextIndex);
  };

  const next = () => {
    const nextIndex = (activeIndex + 1) % count;
    snapToIndex(nextIndex);
  };

  // Drag interaction handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    pointerDownPos.current = e.clientX;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - pointerDownPos.current;

    if (Math.abs(dx) > 3) {
      hasMovedRef.current = true;
    }

    const sensitivity = 0.0055;
    targetAngle.current += dx * sensitivity;
    velocityRef.current = dx * sensitivity * 0.4;
    pointerDownPos.current = e.clientX;

    // Estimate front card index
    const normalized =
      ((-targetAngle.current / (Math.PI * 2)) % 1 + 1) % 1;
    const approxIndex = Math.round(normalized * count) % count;
    setActiveIndex(approxIndex);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const activeItem = orbitItems[activeIndex] || orbitItems[0];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* 3D Ring Viewport */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className="relative h-[440px] sm:h-[560px] w-full rounded-3xl border border-white/20 bg-gradient-to-b from-navy-950/80 via-[#0a1329]/60 to-navy-950/80 shadow-2xl backdrop-blur-xl overflow-hidden cursor-grab active:cursor-grabbing touch-none"
      >
        {/* Top Hint Pill */}
        <div className="absolute top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-xs font-semibold text-white/90 backdrop-blur-md shadow-xs whitespace-nowrap">
          <MoveHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-orange-400 animate-pulse" />
          <span>Radial 3D Orbit Ring · Drag or Tap to Spin</span>
        </div>

        {/* Ambient Corner Glows */}
        <div className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

        <Canvas
          camera={{ position: [0, 0.4, 9.5], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
        >
          <ambientLight intensity={1.2} />
          <directionalLight position={[0, 8, 8]} intensity={2.6} color="#ffffff" />
          <directionalLight position={[-8, 0, -4]} intensity={2.8} color="#00e5ff" />
          <directionalLight position={[8, 0, -4]} intensity={2.8} color="#ff7b00" />
          <directionalLight position={[0, -6, 4]} intensity={1.6} color="#3b82f6" />

          <Sparkles count={40} scale={10} size={2.5} speed={0.35} opacity={0.35} color="#38bdf8" />
          <Environment preset="city" />

          <OrbitRingMesh
            currentAngle={currentAngle}
            targetAngle={targetAngle}
            isDraggingRef={isDraggingRef}
            velocityRef={velocityRef}
            onCardClick={snapToIndex}
            activeIndex={activeIndex}
          />
        </Canvas>

        {/* Left / Right Nav Arrows Overlay */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous case study card"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/80 text-white shadow-xl backdrop-blur-md transition-all hover:bg-orange-500 hover:border-orange-400 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next case study card"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/80 text-white shadow-xl backdrop-blur-md transition-all hover:bg-orange-500 hover:border-orange-400 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>

      {/* Active Card Bottom Spotlight Card */}
      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-white/30 bg-white/70 p-5 sm:p-7 backdrop-blur-md shadow-lg">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-navy-900 px-2.5 py-0.5 text-xs font-semibold text-orange-400">
              {activeItem.category}
            </span>
            <span className="text-xs font-medium text-ink-muted">
              Project 0{activeIndex + 1} of 0{count}
            </span>
          </div>
          <h3 className="mt-2 font-display text-base sm:text-lg lg:text-xl font-bold text-navy-900 leading-snug">
            {activeItem.title}
          </h3>
        </div>

        <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-4 shrink-0 border-t border-navy-100/60 pt-4 sm:border-t-0 sm:pt-0">
          <div className="text-left sm:text-right">
            <span className="font-display text-2xl sm:text-3xl font-bold text-orange-600">
              {activeItem.metric}
            </span>
            <p className="text-[11px] font-medium text-ink-muted">{activeItem.metricLabel}</p>
          </div>

          <Link
            href={`/case-studies/${activeItem.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95"
          >
            <span>Read Study</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
