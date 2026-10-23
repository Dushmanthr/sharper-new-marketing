"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight, Globe2, ChevronRight, Phone } from "lucide-react";
import Button from "./Button";
import Reveal from "./Reveal";
import { site } from "@/lib/site";

const AboutNetworkScene = dynamic(
  () => import("./3d/AboutNetworkScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-36 w-36 sm:h-44 sm:w-44 rounded-full border border-orange-500/20 animate-pulse" />
      </div>
    ),
  }
);

/**
 * Modern Cinematic About Us Hero
 * Shares the signature aesthetic of the homepage, services, and case studies:
 * dark navy space, glowing chromatic ambient halos, live status beacon,
 * gradient typography, interactive 3D global network lattice, and frosted credentials.
 * Fully responsive across mobile, tablet, and desktop viewports.
 */
export default function AboutHero() {
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

      <div className="container-page relative z-10 pt-8 sm:pt-14 md:pt-16 lg:pt-20 pb-8 sm:pb-14 md:pb-16">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-12">
          {/* Left Column: Heading, Narrative, Crumb & CTAs */}
          <div className="text-center lg:text-left lg:col-span-7">
            {/* Live Pill Beacon Badge */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-orange-300 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.15)] max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <Globe2 className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                <span className="truncate sm:whitespace-normal">
                  UK-Based Strategic Marketing Consultancy · Global Reach
                </span>
              </div>
            </Reveal>

            {/* Display Heading with Gradient Clip */}
            <Reveal delay={0.05}>
              <h1 className="mt-3.5 sm:mt-5 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
                About{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-xs">
                  Sharper Labs Marketing
                </span>
              </h1>
            </Reveal>

            {/* Lead Narrative */}
            <Reveal delay={0.1}>
              <p className="mt-3.5 sm:mt-4 max-w-2xl text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed text-navy-100 mx-auto lg:mx-0">
                Local expertise. Global perspective. We combine strategic thinking with practical digital expertise
                to help organisations strengthen their online presence, connect with relevant audiences, and create
                sustainable opportunities for growth.
              </p>
            </Reveal>

            {/* Frosted Breadcrumb Navigation */}
            <Reveal delay={0.12}>
              <nav
                aria-label="Breadcrumb"
                className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs text-navy-200 backdrop-blur-md shadow-sm"
              >
                <Link href="/" className="transition-colors hover:text-orange-400">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-navy-400" />
                <span className="font-semibold text-orange-400">About Us</span>
              </nav>
            </Reveal>

            {/* Dual Primary Action CTA Buttons */}
            <Reveal delay={0.15}>
              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full sm:w-auto">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto justify-center shadow-[0_0_25px_rgba(244,123,32,0.35)] hover:shadow-[0_0_35px_rgba(244,123,32,0.5)]"
                >
                  Discuss Your Marketing Goals <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={site.phoneHref}
                  external
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto justify-center border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/15 hover:border-white/30 shadow-md"
                >
                  <Phone className="h-4 w-4" /> {site.phoneIntl}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive 3D Holographic Global Network */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-2 sm:mt-4 lg:mt-0">
            <div className="relative h-[220px] xs:h-[260px] sm:h-[320px] md:h-[350px] lg:h-[390px] w-full max-w-sm sm:max-w-md mx-auto">
              {/* Subtle ambient back-glow behind the 3D sphere */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/10 via-cyan-500/10 to-transparent blur-2xl"
              />
              <AboutNetworkScene />
            </div>
          </div>
        </div>

        {/* Live Trust Metrics Grid — Frosted Glass Cards */}
        <Reveal delay={0.2}>
          <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 max-w-5xl mx-auto border-t border-white/10 pt-5 sm:pt-8 text-center">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20">
              <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                6 Disciplines
              </span>
              <p className="text-[10px] sm:text-xs text-navy-200 font-medium mt-1 leading-tight sm:leading-snug">
                Strategy & Execution Under One Roof
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all hover:bg-orange-500/[0.12] hover:border-orange-500/30">
              <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-orange-400 tracking-tight">
                100% Data-Informed
              </span>
              <p className="text-[10px] sm:text-xs text-orange-200/90 font-medium mt-1 leading-tight sm:leading-snug">
                Decisions Built on Evidence
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20">
              <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                UK & Global
              </span>
              <p className="text-[10px] sm:text-xs text-navy-200 font-medium mt-1 leading-tight sm:leading-snug">
                Local Expertise, International Reach
              </p>
            </div>
            <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all hover:bg-orange-500/[0.12] hover:border-orange-500/30">
              <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-orange-400 tracking-tight">
                Measurable
              </span>
              <p className="text-[10px] sm:text-xs text-orange-200/90 font-medium mt-1 leading-tight sm:leading-snug">
                Progress, Not Empty Promises
              </p>
            </div>
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
