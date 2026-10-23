"use client";

import Link from "next/link";
import { ArrowDown, Globe2, ChevronRight, Phone } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";

/**
 * Modern Cinematic Case Studies Hero
 * Mirrors the landing page aesthetic: dark navy gradient space,
 * glowing chromatic ambient halos, live status beacon, gradient typography,
 * and clean frosted pill breadcrumbs.
 */
export default function CaseStudiesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060b18] via-[#091124] to-[#060b18] text-white">
      {/* Subtle geometric grid texture */}
      <div className="hero-grid absolute inset-0 opacity-25" aria-hidden="true" />

      {/* Dynamic ambient chromatic glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/4 top-1/6 h-96 w-96 rounded-full bg-cyan-500/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]"
      />

      {/* Subtle orbital tech telemetry rings in the background */}
      <div
        aria-hidden="true"
        className="hidden lg:flex pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 items-center justify-center opacity-30"
      >
        <div className="w-80 h-80 rounded-full border border-white/10 border-dashed animate-[spin_80s_linear_infinite]" />
        <div className="absolute w-64 h-64 rounded-full border border-orange-500/20 animate-[spin_50s_linear_infinite_reverse]" />
        <div className="absolute w-48 h-48 rounded-full border border-cyan-400/20 animate-pulse" />
      </div>

      <div className="container-page relative z-10 pt-10 sm:pt-14 md:pt-16 lg:pt-20 pb-10 sm:pb-14 md:pb-16 text-center">
        {/* Live Pill Beacon Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold text-orange-300 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <Globe2 className="h-3.5 w-3.5 text-orange-400" />
            <span>Verified Commercial Outcomes · UK & International</span>
          </div>
        </Reveal>

        {/* Display Heading with Gradient Clip */}
        <Reveal delay={0.05}>
          <h1 className="mt-4 sm:mt-5 text-3xl font-bold leading-[1.14] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white">
            Case Studies &{" "}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-xs">
              Measurable Results
            </span>
          </h1>
        </Reveal>

        {/* Lead Narrative */}
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-navy-100">
            Verified customer problems, strategic solutions, and measurable outcomes. Evidence-based growth across B2B, E-commerce, and healthcare sectors.
          </p>
        </Reveal>

        {/* Frosted Breadcrumb Navigation */}
        <Reveal delay={0.12}>
          <nav
            aria-label="Breadcrumb"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-navy-200 backdrop-blur-md shadow-sm"
          >
            <Link href="/" className="transition-colors hover:text-orange-400">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-navy-400" />
            <span className="font-semibold text-orange-400">Case Studies</span>
          </nav>
        </Reveal>

        {/* Action CTA Buttons */}
        <Reveal delay={0.15}>
          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4">
            <Button
              href="#showcase"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto justify-center shadow-[0_0_25px_rgba(244,123,32,0.35)] hover:shadow-[0_0_35px_rgba(244,123,32,0.5)]"
            >
              Explore Client Results <ArrowDown className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full sm:w-auto justify-center border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/30 shadow-md"
            >
              <Phone className="h-4 w-4" /> Book Consultation
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Subtle bottom fade transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy-950/80 to-transparent"
      />
    </section>
  );
}
