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
    <section className="relative overflow-hidden bg-transparent text-white">
      <div className="container-page relative z-10 pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 xl:gap-14 items-center">
          
          {/* Left Column: Strategic Value Proposition & High-Converting Journey */}
          <div className="md:col-span-7 xl:col-span-7 max-w-2xl md:-translate-y-4 lg:-translate-y-6 xl:-translate-y-7">
            {/* Mobile 3D Brand Emblem Stage: dedicated breathing space for 3D logo on mobile */}
            <div className="h-28 sm:h-32 w-full md:hidden relative pointer-events-none mb-3" />

            {children}
          </div>

          {/* Right Column: Dedicated 3D Interactive Brand Centerpiece Stage */}
          <div className="md:col-span-5 xl:col-span-5 flex flex-col items-center justify-center relative min-h-0 md:min-h-[460px] lg:min-h-[520px] xl:min-h-[560px] pointer-events-none">
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
