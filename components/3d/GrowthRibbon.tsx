"use client";

import dynamic from "next/dynamic";
import React from "react";

const GrowthTrajectoryStream = dynamic(
  () => import("./GrowthTrajectoryStream"),
  {
    ssr: false,
    loading: () => (
      <div className="relative h-[100px] sm:h-[125px] w-full flex items-center justify-center">
        <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse" />
      </div>
    ),
  }
);

export default function GrowthRibbon({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden border-y border-white/10 bg-gradient-to-b from-navy-950/80 via-navy-900/70 to-navy-950/80 backdrop-blur-md py-1 sm:py-2 ${
        className || ""
      }`}
    >
      {/* Subtle edge fade masks to smoothly feather the 3D canvas stream */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-navy-950 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-navy-950 to-transparent"
        aria-hidden="true"
      />

      {/* Pure aesthetic kinetic 3D wave stream */}
      <GrowthTrajectoryStream />
    </div>
  );
}
