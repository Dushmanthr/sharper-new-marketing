"use client";

import type { ReactNode } from "react";

/**
 * Modern 3D Spatial Hero Layout
 * Features a bold, uncluttered layout where the interactive 3D WebGL
 * brand logo takes center stage on the right, supported by luminous
 * atmospheric lighting, floating particles, and telemetry guide rings.
 */
export default function CurvedHero({
  children,
  media,
}: {
  children: ReactNode;
  media?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950/40 text-white backdrop-blur-[2px]">
      {/* Subtle geometric grid texture */}
      <div className="hero-grid absolute inset-0 opacity-25" aria-hidden />

      {/* Dynamic ambient chromatic glow orbs */}
      <div
        aria-hidden
        className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-1/4 top-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-orange-500/12 blur-[100px] pointer-events-none"
      />

      <div className="container-page relative z-10 pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Strategic Value Proposition & High-Converting Journey */}
          <div className="md:col-span-7 xl:col-span-7 max-w-2xl md:-translate-y-4 lg:-translate-y-6 xl:-translate-y-7">
            {/* Mobile 3D Brand Emblem Stage: dedicated breathing space for 3D logo on mobile */}
            <div className="h-28 sm:h-32 w-full md:hidden relative flex items-center justify-center pointer-events-none mb-3">
              <div className="w-28 h-28 rounded-full border border-orange-500/20 border-dashed animate-[spin_40s_linear_infinite]" />
              <div className="absolute w-20 h-20 rounded-full bg-orange-500/10 blur-xl" />
            </div>

            {children}
          </div>

          {/* Right Column: Dedicated 3D Interactive Brand Centerpiece Stage */}
          <div className="md:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative min-h-0 md:min-h-[460px] lg:min-h-[520px] xl:min-h-[560px] pointer-events-none">
            
            {/* Ambient 3D Stage Core Aura: Gives the 3D rotating logo an ethereal glowing halo behind it */}
            <div 
              aria-hidden 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-to-tr from-orange-500/18 via-cyan-500/14 to-transparent blur-3xl pointer-events-none"
            />

            {/* Subtle orbital tech telemetry rings framing the 3D rotating logo */}
            <div className="hidden md:flex relative items-center justify-center pointer-events-none">
              {/* Outer dashed orbit */}
              <div className="w-80 h-80 lg:w-[400px] lg:h-[400px] xl:w-[460px] xl:h-[460px] rounded-full border border-white/5 border-dashed animate-[spin_75s_linear_infinite] opacity-60" />
              
              {/* Middle chromatic ring */}
              <div className="absolute w-64 h-64 lg:w-[310px] lg:h-[310px] xl:w-[360px] xl:h-[360px] rounded-full border border-orange-500/15 animate-[spin_50s_linear_infinite_reverse] opacity-50" />
              
              {/* Inner focal pulse ring */}
              <div className="absolute w-48 h-48 lg:w-56 lg:h-56 rounded-full border border-cyan-400/20 animate-pulse opacity-40" />
              
              {/* Center subtle glow dot */}
              <div className="absolute h-2.5 w-2.5 rounded-full bg-orange-400/40 blur-xs" />
            </div>

            {/* If media is provided as a fallback, render it gracefully */}
            {media && (
              <div className="pointer-events-auto relative z-10 w-full mt-4">
                {media}
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Subtle bottom fade for seamless transition to ticker */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/60 to-transparent"
      />
    </section>
  );
}
