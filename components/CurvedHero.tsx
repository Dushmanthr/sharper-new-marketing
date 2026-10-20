import type { ReactNode } from "react";

/**
 * Eclipse-style hero: left-aligned text on a navy panel, with a full-height
 * media panel that bleeds to the right edge behind a large concave curve and a
 * sharp orange accent arc. On mobile the layout stacks and the media becomes a
 * simple rounded card (the curve is desktop-only, see .hero-curve-media in
 * globals.css).
 *
 * `media` should be a self-filling element (e.g. next/image with `fill`, or the
 * ImageCarousel in `fill` mode) since its wrapper is a positioned box.
 */
export default function CurvedHero({
  children,
  media,
}: {
  children: ReactNode;
  media: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950/40 text-white backdrop-blur-[2px]">
      <div className="hero-grid absolute inset-0 opacity-30" aria-hidden />
      <div
        aria-hidden
        className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-orange-500/12 blur-3xl pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute right-1/3 top-1/3 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"
      />

      {/* Responsive concave clip (objectBoundingBox units scale with the box). */}
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <defs>
          <clipPath id="heroCurveClip" clipPathUnits="objectBoundingBox">
            <path d="M0.16,0 C0,0.34 0,0.66 0.16,1 L1,1 L1,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Text column */}
      <div className="container-page relative">
        <div className="max-w-xl py-14 sm:py-16 lg:max-w-[46%] lg:py-28 xl:py-32">
            {children}
          </div>
        </div>

      {/* Media: rounded card on mobile, full-height curved bleed on desktop. */}
      <div className="relative mx-5 mb-12 h-72 overflow-hidden rounded-3xl border border-white/10 shadow-2xl sm:mx-8 sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mb-0 lg:h-full lg:w-1/2 lg:overflow-visible lg:rounded-none lg:border-0 lg:shadow-none">
        <div className="hero-curve-media relative h-full w-full overflow-hidden opacity-95">
          {media}
          {/* Subtle gradient vignette to blend curve with 3D space */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950/35 via-transparent to-transparent hidden lg:block" />
        </div>
        {/* Orange accent arc, traces the curve (desktop only). */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          focusable="false"
        >
          <path
            d="M16,0 C0,34 0,66 16,100"
            fill="none"
            stroke="#f47b20"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            className="filter drop-shadow-[0_0_8px_rgba(244,123,32,0.65)]"
          />
        </svg>
      </div>
    </section>
  );
}
