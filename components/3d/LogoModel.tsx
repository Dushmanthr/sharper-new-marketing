"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { SVGLoader } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LogoPart {
  id: string;
  geometry: THREE.ExtrudeGeometry;
  color: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
}

/**
 * Returns exact brand styling and physical material attributes for each SVG path/polygon
 */
function getPathStyle(path: THREE.ShapePath, index: number): {
  color: string;
  metalness: number;
  roughness: number;
  clearcoat: number;
  clearcoatRoughness: number;
} {
  const node = (path.userData as any)?.node as Element | undefined;
  const cls = node?.getAttribute("class") || "";
  const fill = node?.getAttribute("fill") || (path.userData as any)?.style?.fill || "";

  // 1. Orange / Flame Ribbon (.fil1 or linearGradient #id1)
  if (cls.includes("fil1") || fill.includes("id1")) {
    return {
      color: "#FF6A00", // Vibrant Electric Orange
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    };
  }

  // 2. Cyan / Sea-Teal Ribbon (.fil2 or linearGradient #id0)
  if (cls.includes("fil2") || fill.includes("id0")) {
    return {
      color: "#00B4D8", // Electric Sky Cyan / Teal
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    };
  }

  // 3. Royal Sapphire Ribbon (.fil3 or linearGradient #id2)
  if (cls.includes("fil3") || fill.includes("id2")) {
    return {
      color: "#2563EB", // Royal Sapphire / Cobalt Blue
      metalness: 0.85,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.08,
    };
  }

  // 4. "SHARPER LABS" Letterforms (.fil5 or #003399)
  if (cls.includes("fil5") || fill === "#003399") {
    return {
      color: "#1E3A8A", // Deep Navy / Royal Blue
      metalness: 0.8,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
    };
  }

  // 5. "MARKETING" Letterforms (.fil6 or #FF6600)
  if (cls.includes("fil6") || fill === "#FF6600") {
    return {
      color: "#FF6600", // Sharp Orange
      metalness: 0.8,
      roughness: 0.22,
      clearcoat: 0.7,
      clearcoatRoughness: 0.12,
    };
  }

  // 6. Registered Trademark (R) (.fil4 or #373435)
  if (cls.includes("fil4")) {
    return {
      color: "#64748B", // Chrome Silver Slate
      metalness: 0.92,
      roughness: 0.14,
      clearcoat: 0.95,
      clearcoatRoughness: 0.05,
    };
  }

  // Default color cycle based on index
  const palette = ["#FF6A00", "#00B4D8", "#2563EB"];
  return {
    color: palette[index % palette.length],
    metalness: 0.85,
    roughness: 0.18,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  };
}

/**
 * Procedural fallback logo with exact brand colors if SVG network fetch fails
 */
function createFallbackParts(extrudeSettings: THREE.ExtrudeGeometryOptions): LogoPart[] {
  const parts: LogoPart[] = [];
  const colors = ["#FF6A00", "#00B4D8", "#2563EB"];

  for (let i = 0; i < 3; i++) {
    const angle = (i * 2 * Math.PI) / 3;
    const shape = new THREE.Shape();
    const rOuter = 50;
    const rInner = 24;

    shape.moveTo(Math.cos(angle) * rOuter, Math.sin(angle) * rOuter);
    shape.lineTo(Math.cos(angle + 1.2) * rOuter, Math.sin(angle + 1.2) * rOuter);
    shape.lineTo(Math.cos(angle + 0.8) * rInner, Math.sin(angle + 0.8) * rInner);
    shape.closePath();

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    geom.computeVertexNormals();

    parts.push({
      id: `fallback-${i}`,
      geometry: geom,
      color: colors[i],
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    });
  }

  return parts;
}

/**
 * Mathematical Choreography Evaluator
 * Computes continuous, systematic gyroscopic orientation across the scroll journey [0, 1]
 */
function evaluateChoreography(
  progress: number,
  maxX: number,
  vpWidth: number,
  device: { isMobile: boolean; isTablet: boolean }
) {
  const p = Math.max(0, Math.min(1, progress));
  const { isMobile, isTablet } = device;

  // Continuous systematic rotation: 2 complete 360° revolutions across the entire page
  const rotY = p * Math.PI * 4;

  let posX = 0;
  let posY = 0;
  let rotX = 0;
  let rotZ = 0;
  let scaleMult = 1.0;

  // Dynamically compute hero X from Three.js viewport width so logo always
  // centers in the right column of the 7/12 + 5/12 grid layout.
  // Center of right column = 75% from left = 25% from center toward right = vpWidth * 0.25
  const startX = isMobile ? 0 : vpWidth * 0.25;
  const startY = isMobile ? 1.35 : isTablet ? -0.78 : -0.82;
  const heroRotX = isMobile ? 0.08 : 0.12;
  const heroScaleMult = isMobile ? 1.15 : isTablet ? 1.35 : 1.55;

  if (p < 0.22) {
    // Stage 1: Hero to Section 2 (UK Heritage)
    // Starts prominently filling the right side of hero, smoothly glides to maxX while scaling down to compact scroll size and rotating 180° around Y
    const t = p / 0.22;
    const smoothT = t * t * (3 - 2 * t);
    posX = THREE.MathUtils.lerp(startX, maxX, smoothT);
    posY = THREE.MathUtils.lerp(startY, -0.1, smoothT);
    rotX = THREE.MathUtils.lerp(heroRotX, 0.22, smoothT);
    rotZ = THREE.MathUtils.lerp(0, -0.14, smoothT); // aerodynamic banking into the turn
    scaleMult = THREE.MathUtils.lerp(heroScaleMult, 1.0, smoothT);
  } else if (p < 0.50) {
    // Stage 2: Section 2 to Section 3 (Core Services)
    // Glides from right (+X) across the screen to left (-X) with dynamic isometric pitch
    const t = (p - 0.22) / (0.50 - 0.22);
    const smoothT = t * t * (3 - 2 * t);
    posX = THREE.MathUtils.lerp(maxX, -maxX, smoothT);
    posY = THREE.MathUtils.lerp(-0.1, 0.1, smoothT);
    rotX = THREE.MathUtils.lerp(0.22, 0.38, smoothT); // dynamic isometric tilt
    rotZ = THREE.MathUtils.lerp(-0.14, 0.18, smoothT); // banks right as it travels left
    scaleMult = THREE.MathUtils.lerp(1.06, 1.12, smoothT);
  } else if (p < 0.78) {
    // Stage 3: Section 3 through Case Studies & Testimonials
    // Smoothly sweeps across to right side, showing off chromatic reflections
    const t = (p - 0.50) / (0.78 - 0.50);
    const smoothT = t * t * (3 - 2 * t);
    posX = THREE.MathUtils.lerp(-maxX, maxX * 0.8, smoothT);
    posY = THREE.MathUtils.lerp(0.1, -0.05, smoothT);
    rotX = THREE.MathUtils.lerp(0.38, 0.18, smoothT);
    rotZ = THREE.MathUtils.lerp(0.18, -0.1, smoothT);
    scaleMult = THREE.MathUtils.lerp(1.12, 1.04, smoothT);
  } else {
    // Stage 4: Contact & Consultation Form (Grand Finale)
    // Glides back to exact center (X=0), levels out facing forward, scales up prominently
    const t = (p - 0.78) / (1.0 - 0.78);
    const smoothT = t * t * (3 - 2 * t);
    posX = THREE.MathUtils.lerp(maxX * 0.8, 0, smoothT);
    posY = THREE.MathUtils.lerp(-0.05, 0, smoothT);
    rotX = THREE.MathUtils.lerp(0.18, 0.0, smoothT); // settles level facing camera
    rotZ = THREE.MathUtils.lerp(-0.1, 0, smoothT);
    scaleMult = THREE.MathUtils.lerp(1.04, 1.3, smoothT); // expands by 30%
  }

  return { posX, posY, rotX, rotY, rotZ, scaleMult };
}

export default function LogoModel() {
  const meshGroupRef = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  const [parts, setParts] = useState<LogoPart[]>([]);

  // Continuous scroll tracking refs
  const scrollProgressRef = useRef(0);
  const scrollVelocityRef = useRef(0);

  // Viewport detection for initial ref placement
  const isMobileInit = size.width < 768;
  const isTabletInit = size.width >= 768 && size.width < 1024;
  // Use viewport width to compute initial hero X, matching evaluateChoreography logic
  const initialStartX = isMobileInit ? 0 : viewport.width * 0.25;
  const initialStartY = isMobileInit ? 1.35 : isTabletInit ? -0.78 : -0.82;

  // Smooth interpolation state refs for frame-independent damping
  // Initialized deep behind (negative Z) with small scale and rotation so it emerges seamlessly
  const currentPosX = useRef(initialStartX);
  const currentPosY = useRef(initialStartY);
  const currentPosZ = useRef(-10.0);
  const currentRotX = useRef((isMobileInit ? 0.08 : 0.12) + 0.3);
  const currentRotY = useRef(Math.PI * 1.5);
  const currentRotZ = useRef(-0.2);
  const currentScale = useRef(0.0001);

  // Initial entrance reveal refs (cinematic emergence from behind on first arrival)
  const introStartTime = useRef<number | null>(null);

  // Extrusion settings strictly complying with architectural requirements
  const extrudeSettings: THREE.ExtrudeGeometryOptions = useMemo(
    () => ({
      depth: 18,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 1.5,
      bevelThickness: 1.5,
    }),
    []
  );

  // Load and parse SVG with exact brand color mapping and collective centering
  useEffect(() => {
    let isCancelled = false;
    const loader = new SVGLoader();

    const processSvgData = (data: ReturnType<typeof loader.parse>) => {
      try {
        const parsedParts: {
          path: THREE.ShapePath;
          shapes: THREE.Shape[];
          style: ReturnType<typeof getPathStyle>;
        }[] = [];

        // Collective bounding box across ALL shapes
        let minX = Infinity,
          minY = Infinity,
          maxX = -Infinity,
          maxY = -Infinity;

        data.paths.forEach((path, idx) => {
          const fill = path.userData?.style?.fill;
          const fillAttr = path.userData?.node?.getAttribute?.("fill");
          const className = path.userData?.node?.getAttribute?.("class") || "";
          const nodeName = path.userData?.node?.nodeName?.toLowerCase();

          // Skip non-rendered background bounding rects
          if (
            fill === "none" ||
            fillAttr === "none" ||
            className.includes("fil0") ||
            (nodeName === "rect" && path.userData?.node?.getAttribute?.("width") === "20000")
          ) {
            return;
          }

          // Parse compound paths preserving holes (e.g. in A, B, O, P, R)
          const shapes = SVGLoader.createShapes(path as unknown as THREE.ShapePath);
          if (shapes.length === 0) return;

          shapes.forEach((shape) => {
            shape.getPoints().forEach((pt) => {
              if (pt.x < minX) minX = pt.x;
              if (pt.y < minY) minY = pt.y;
              if (pt.x > maxX) maxX = pt.x;
              if (pt.y > maxY) maxY = pt.y;
            });
          });

          parsedParts.push({
            path: path as unknown as THREE.ShapePath,
            shapes,
            style: getPathStyle(path as unknown as THREE.ShapePath, idx),
          });
        });

        if (parsedParts.length === 0) {
          if (!isCancelled) {
            setParts(createFallbackParts(extrudeSettings));
          }
          return;
        }

        // Compute collective geometry center and target baseline scaling (~120 units)
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        const spanX = maxX - minX;
        const spanY = maxY - minY;
        const maxDim = Math.max(spanX, spanY);
        const normFactor = maxDim > 0 ? 120 / maxDim : 1;

        // Build individual colored meshes aligned to exact collective center
        const newParts: LogoPart[] = parsedParts.map((item, index) => {
          const geom = new THREE.ExtrudeGeometry(item.shapes, extrudeSettings);

          // Shift vertices so collective center is at (0, 0, 0)
          geom.translate(-centerX, -centerY, -((extrudeSettings.depth ?? 18) / 2));

          // Invert Y-axis (SVGs load upside down in WebGL) and apply proportional scale
          geom.scale(normFactor, -normFactor, 1);

          // Recalculate vertex normals for crisp anisotropic specular highlights
          geom.computeVertexNormals();

          return {
            id: `logo-part-${index}`,
            geometry: geom,
            color: item.style.color,
            metalness: item.style.metalness,
            roughness: item.style.roughness,
            clearcoat: item.style.clearcoat,
            clearcoatRoughness: item.style.clearcoatRoughness,
          };
        });

        if (!isCancelled) {
          setParts((prev) => {
            prev.forEach((p) => p.geometry.dispose());
            return newParts;
          });
        } else {
          newParts.forEach((p) => p.geometry.dispose());
        }
      } catch (err) {
        console.warn("Error parsing SVG into colored 3D parts:", err);
      }
    };

    const loadPaths = ["/logo.svg", "/logo/logo.svg"];

    const tryLoad = async () => {
      for (const path of loadPaths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            const svgText = await res.text();
            if (isCancelled) return;
            const parsed = loader.parse(svgText);
            processSvgData(parsed);
            return;
          }
        } catch {
          // Continue to next path
        }
      }

      if (!isCancelled) {
        setParts(createFallbackParts(extrudeSettings));
      }
    };

    tryLoad();

    return () => {
      isCancelled = true;
    };
  }, [extrudeSettings]);

  // Clean disposal on unmount
  useEffect(() => {
    return () => {
      parts.forEach((p) => p.geometry.dispose());
    };
  }, [parts]);

  // Viewport-based responsive scale & layout calculations
  const isMobile = size.width < 768;
  const isTablet = size.width >= 768 && size.width < 1024;
  const baseScale =
    Math.min(viewport.width / 16, 0.021) *
    (isMobile ? 0.70 : isTablet ? 0.85 : 1.0);
  const maxX = isMobile
    ? Math.min(viewport.width * 0.22, 0.75)
    : isTablet
    ? 1.7
    : 2.3;

  // Single continuous ScrollTrigger tracking scroll progress & kinetic velocity without dead zones
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
        scrollVelocityRef.current = self.getVelocity ? self.getVelocity() : 0;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Three.js Render Loop: Smooth physical damping, aerodynamic banking, and cursor parallax
  useFrame((state, delta) => {
    if (!meshGroupRef.current) return;
    if (parts.length === 0) return;

    const progress = scrollProgressRef.current;
    const velocity = scrollVelocityRef.current;

    // Evaluate continuous systematic choreography
    const target = evaluateChoreography(progress, maxX, viewport.width, { isMobile, isTablet });

    // Initial entrance reveal timing: starts ONLY once 3D parts are loaded and ready
    if (introStartTime.current === null) {
      introStartTime.current = state.clock.elapsedTime;
    }
    const elapsed = state.clock.elapsedTime - introStartTime.current;
    const INTRO_DURATION = 1.6; // 1.6s smooth cinematic emergence from behind
    const introT = Math.min(1.0, elapsed / INTRO_DURATION);
    // Smooth quartic ease-out curve for swift forward momentum that settles gracefully
    const introEase = 1.0 - Math.pow(1.0 - introT, 3.5);
    // If user starts scrolling, instantly complete the intro
    const effectiveIntro = progress > 0.01 ? 1.0 : introEase;

    // Coming from behind: Z travels from deep background (-10.0) to focal plane (0)
    const introPosZ = (1.0 - effectiveIntro) * -10.0;
    // Elegant gyroscopic unwinding spin as it swoops forward
    const introSpin = (1.0 - effectiveIntro) * (Math.PI * 1.5);
    const introRotX = (1.0 - effectiveIntro) * 0.3;
    const introRotZ = (1.0 - effectiveIntro) * -0.2;
    // Scale grows smoothly from tiny (0.001) up to full 1.0
    const introScaleMult = THREE.MathUtils.lerp(0.001, 1.0, effectiveIntro);

    // Subtle kinetic spin boost on fast scroll flicks (natural fluid momentum)
    const kineticSpin = THREE.MathUtils.clamp(velocity * 0.0001, -0.6, 0.6);

    // Subtle rhythmic floating micro-movement
    const idleFloatY = Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
    const idleYaw = Math.cos(state.clock.elapsedTime * 0.9) * 0.025;

    // Interactive mouse cursor parallax tilt
    const mouseTiltX = state.pointer.y * 0.10;
    const mouseTiltY = state.pointer.x * 0.15;

    // Frame-independent physical damping (Three.js damp)
    const dampSpeed = 4.5;
    currentPosX.current = THREE.MathUtils.damp(
      currentPosX.current,
      target.posX,
      dampSpeed,
      delta
    );
    currentPosY.current = THREE.MathUtils.damp(
      currentPosY.current,
      target.posY + idleFloatY,
      dampSpeed,
      delta
    );
    currentPosZ.current = THREE.MathUtils.damp(
      currentPosZ.current,
      introPosZ,
      dampSpeed,
      delta
    );

    currentRotY.current = THREE.MathUtils.damp(
      currentRotY.current,
      target.rotY + introSpin + kineticSpin + mouseTiltY + idleYaw,
      dampSpeed,
      delta
    );
    currentRotX.current = THREE.MathUtils.damp(
      currentRotX.current,
      target.rotX + introRotX - mouseTiltX,
      dampSpeed,
      delta
    );
    currentRotZ.current = THREE.MathUtils.damp(
      currentRotZ.current,
      target.rotZ + introRotZ,
      dampSpeed,
      delta
    );

    currentScale.current = THREE.MathUtils.damp(
      currentScale.current,
      baseScale * target.scaleMult * introScaleMult,
      dampSpeed,
      delta
    );

    // Apply transformed coordinates to the parent mesh group
    meshGroupRef.current.position.set(
      currentPosX.current,
      currentPosY.current,
      currentPosZ.current
    );
    meshGroupRef.current.rotation.set(
      currentRotX.current,
      currentRotY.current,
      currentRotZ.current
    );
    meshGroupRef.current.scale.set(
      currentScale.current,
      currentScale.current,
      currentScale.current
    );
  });

  if (parts.length === 0) return null;

  return (
    <group ref={meshGroupRef}>
      {parts.map((part) => (
        <mesh key={part.id} geometry={part.geometry}>
          {/* Exact brand color physical material with metallic clearcoat sheen and emissive depth */}
          <meshPhysicalMaterial
            color={part.color}
            emissive={part.color}
            emissiveIntensity={0.22}
            metalness={part.metalness}
            roughness={part.roughness}
            clearcoat={part.clearcoat}
            clearcoatRoughness={part.clearcoatRoughness}
            reflectivity={0.96}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
