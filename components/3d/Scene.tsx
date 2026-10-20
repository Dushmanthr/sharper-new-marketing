"use client";

import dynamic from "next/dynamic";

/**
 * 3D Scene Wrapper with Dynamic SSR Bypass
 * Ensures Three.js and WebGL canvas load strictly on the client side,
 * completely preventing SSR hydration mismatches and server compilation errors.
 */
const SceneCanvas = dynamic(() => import("./SceneCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
      aria-hidden="true"
    />
  ),
});

export default function Scene() {
  return <SceneCanvas />;
}
