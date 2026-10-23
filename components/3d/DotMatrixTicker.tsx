"use client";

import React, { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

// 5x7 Standard Dot-Matrix LED Font Bitmaps
const FONT_5X7: Record<string, number[]> = {
  A: [0b01110, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  B: [0b11110, 0b10001, 0b10001, 0b11110, 0b10001, 0b10001, 0b11110],
  C: [0b01111, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b01111],
  D: [0b11110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b11110],
  E: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b11111],
  F: [0b11111, 0b10000, 0b10000, 0b11110, 0b10000, 0b10000, 0b10000],
  G: [0b01111, 0b10000, 0b10000, 0b10111, 0b10001, 0b10001, 0b01111],
  H: [0b10001, 0b10001, 0b10001, 0b11111, 0b10001, 0b10001, 0b10001],
  I: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b11111],
  J: [0b00111, 0b00010, 0b00010, 0b00010, 0b10010, 0b10010, 0b01100],
  K: [0b10001, 0b10010, 0b10100, 0b11000, 0b10100, 0b10010, 0b10001],
  L: [0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b10000, 0b11111],
  M: [0b10001, 0b11011, 0b10101, 0b10101, 0b10001, 0b10001, 0b10001],
  N: [0b10001, 0b11001, 0b10101, 0b10011, 0b10001, 0b10001, 0b10001],
  O: [0b01110, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  P: [0b11110, 0b10001, 0b10001, 0b11110, 0b10000, 0b10000, 0b10000],
  Q: [0b01110, 0b10001, 0b10001, 0b10001, 0b10101, 0b10010, 0b01101],
  R: [0b11110, 0b10001, 0b10001, 0b11110, 0b10100, 0b10010, 0b10001],
  S: [0b01111, 0b10000, 0b10000, 0b01110, 0b00001, 0b00001, 0b11110],
  T: [0b11111, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100, 0b00100],
  U: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01110],
  V: [0b10001, 0b10001, 0b10001, 0b10001, 0b10001, 0b01010, 0b00100],
  W: [0b10001, 0b10001, 0b10001, 0b10101, 0b10101, 0b11011, 0b10001],
  X: [0b10001, 0b10001, 0b01010, 0b00100, 0b01010, 0b10001, 0b10001],
  Y: [0b10001, 0b10001, 0b01010, 0b00100, 0b00100, 0b00100, 0b00100],
  Z: [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b10000, 0b11111],
  "0": [0b01110, 0b10011, 0b10101, 0b10101, 0b11001, 0b10001, 0b01110],
  "1": [0b00100, 0b01100, 0b00100, 0b00100, 0b00100, 0b00100, 0b01110],
  "2": [0b01110, 0b10001, 0b00001, 0b00110, 0b01000, 0b10000, 0b11111],
  "3": [0b11111, 0b00010, 0b00100, 0b00010, 0b00001, 0b10001, 0b01110],
  "4": [0b00010, 0b00110, 0b01010, 0b10010, 0b11111, 0b00010, 0b00010],
  "5": [0b11111, 0b10000, 0b11110, 0b00001, 0b00001, 0b10001, 0b01110],
  "6": [0b00110, 0b01000, 0b10000, 0b11110, 0b10001, 0b10001, 0b01110],
  "7": [0b11111, 0b00001, 0b00010, 0b00100, 0b01000, 0b01000, 0b01000],
  "8": [0b01110, 0b10001, 0b10001, 0b01110, 0b10001, 0b10001, 0b01110],
  "9": [0b01110, 0b10001, 0b10001, 0b01111, 0b00001, 0b00010, 0b01100],
  "·": [0b00000, 0b00000, 0b00000, 0b00100, 0b00000, 0b00000, 0b00000],
  "/": [0b00001, 0b00010, 0b00100, 0b00100, 0b01000, 0b10000, 0b00000],
  "-": [0b00000, 0b00000, 0b00000, 0b11111, 0b00000, 0b00000, 0b00000],
  "&": [0b01100, 0b10010, 0b10100, 0b01000, 0b10101, 0b10010, 0b01101],
  ".": [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00110, 0b00110],
  "!": [0b00100, 0b00100, 0b00100, 0b00100, 0b00000, 0b00000, 0b00100],
  "?": [0b01110, 0b10001, 0b00001, 0b00010, 0b00100, 0b00000, 0b00100],
  " ": [0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000, 0b00000],
};

const ROWS = 7;
const COLS = 136;
const SPACING_X = 0.13;
const SPACING_Y = 0.13;

interface DotMatrixSceneProps {
  tickerText?: string;
  speed?: number;
}

function DotMatrixMesh({
  tickerText = "SHARPER LABS · CREATIVE DIGITAL MARKETING · UK & INTERNATIONAL · BRAND · UI/UX · DATA · SEO · PERFORMANCE · ",
  speed = 1.0,
}: DotMatrixSceneProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scrollOffsetRef = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate column bitmap array from text
  const columnsData = useMemo(() => {
    const cols: boolean[][] = [];
    const upper = tickerText.toUpperCase();

    for (let c = 0; c < upper.length; c++) {
      const char = upper[c];
      const bitmap = FONT_5X7[char] || FONT_5X7[" "];

      // 5 columns per letter
      for (let colIdx = 0; colIdx < 5; colIdx++) {
        const colBits: boolean[] = [];
        const mask = 1 << (4 - colIdx);
        for (let rowIdx = 0; rowIdx < ROWS; rowIdx++) {
          colBits.push((bitmap[rowIdx] & mask) !== 0);
        }
        cols.push(colBits);
      }
      // 1 column spacer between letters
      cols.push(new Array(ROWS).fill(false));
    }

    return cols;
  }, [tickerText]);

  // Pre-allocated colors for lit & unlit states
  const colors = useMemo(() => {
    return {
      cyan: new THREE.Color("#00E5FF"),
      orange: new THREE.Color("#FF7B00"),
      white: new THREE.Color("#FFFFFF"),
      dim: new THREE.Color("#0A1428"),
    };
  }, []);

  // Total instances = ROWS * COLS
  const count = ROWS * COLS;

  // Set initial instance matrices
  useEffect(() => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        const x = (c - COLS / 2) * SPACING_X;
        const y = ((ROWS - 1) / 2 - r) * SPACING_Y;
        dummy.position.set(x, y, 0);
        dummy.scale.setScalar(0.22);
        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
        mesh.setColorAt(idx, colors.dim);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [dummy, colors]);

  // Animation render loop
  useFrame((state, delta) => {
    if (!meshRef.current || columnsData.length === 0) return;
    const mesh = meshRef.current;

    // Advance horizontal ticker column scroll
    scrollOffsetRef.current += delta * 18 * speed;
    const totalCols = columnsData.length;
    const baseColIdx = Math.floor(scrollOffsetRef.current);
    const subColOffset = (scrollOffsetRef.current - baseColIdx) * SPACING_X;

    const time = state.clock.elapsedTime;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;

        // Query column from circular text stream
        const dataCol = (baseColIdx + c) % totalCols;
        const isLit = columnsData[dataCol]?.[r] ?? false;

        const x = (c - COLS / 2) * SPACING_X - subColOffset;
        const y = ((ROWS - 1) / 2 - r) * SPACING_Y;
        // Subtle cylindrical wave depth for agency 3D curvature
        const z = Math.sin((c / COLS) * Math.PI) * 0.15;

        dummy.position.set(x, y, z);

        if (isLit) {
          // Dynamic shimmer pulse along text
          const wave = Math.sin(time * 3 + c * 0.15);
          const scale = 0.95 + wave * 0.12;
          dummy.scale.setScalar(scale);

          // Alternating chromatic neon accents (Cyan & Sharp Orange)
          const isAccent = (baseColIdx + c) % 24 < 12;
          const chosenColor = isAccent ? colors.cyan : colors.orange;
          mesh.setColorAt(idx, chosenColor);
        } else {
          dummy.scale.setScalar(0.22);
          mesh.setColorAt(idx, colors.dim);
        }

        dummy.updateMatrix();
        mesh.setMatrixAt(idx, dummy.matrix);
      }
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <sphereGeometry args={[0.042, 10, 10]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

interface DotMatrixTickerProps {
  className?: string;
  text?: string;
  speed?: number;
}

export default function DotMatrixTicker({
  className = "",
  text,
  speed = 1.0,
}: DotMatrixTickerProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/10 bg-navy-950/70 backdrop-blur-md py-4 select-none ${className}`}
      aria-label="Dot Matrix LED Typography Ticker"
    >
      {/* Top and Bottom Neon Edge Rules */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"
        aria-hidden="true"
      />

      {/* Radial ambient glow behind matrix */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-3/4 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Left and Right Feathered Edge Masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#060b18] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#060b18] to-transparent z-10" />

      {/* Three.js Canvas Container (pointer-events-none ensures frictionless touch scrolling on mobile) */}
      <div className="h-[90px] sm:h-[110px] w-full pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 32 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <DotMatrixMesh tickerText={text} speed={speed} />
        </Canvas>
      </div>
    </div>
  );
}
