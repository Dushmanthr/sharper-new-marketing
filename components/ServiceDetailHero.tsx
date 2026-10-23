"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe2,
  ChevronRight,
  Phone,
  ArrowRight,
  Calendar,
} from "lucide-react";
import Reveal from "./Reveal";
import ConsultationModal from "./ConsultationModal";
import { type Service, site } from "@/lib/site";

interface ServiceDetailHeroProps {
  service: Service;
}

export default function ServiceDetailHero({ service }: ServiceDetailHeroProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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

        <div className="container-page relative z-10 pt-8 sm:pt-14 md:pt-16 lg:pt-20 pb-8 sm:pb-14 md:pb-16 text-center">
          {/* Live Pill Beacon Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-orange-300 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.15)] max-w-full">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <Globe2 className="h-3.5 w-3.5 text-orange-400 shrink-0" />
              <span className="truncate sm:whitespace-normal">
                {service.kicker || "Core Specialist Discipline"} · UK & International Delivery
              </span>
            </div>
          </Reveal>

          {/* Display Heading with Gradient Clip */}
          <Reveal delay={0.05}>
            <h1 className="mt-3.5 sm:mt-5 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight text-white">
              {service.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-xs">
                {service.title.split(" ").slice(-1)[0]}
              </span>
            </h1>
          </Reveal>

          {/* Lead Narrative */}
          <Reveal delay={0.1}>
            <p className="mx-auto mt-3.5 sm:mt-4 max-w-2xl text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed text-navy-100">
              {service.lead}
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
              <Link href="/services" className="transition-colors hover:text-orange-400">
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-navy-400" />
              <span className="font-semibold text-orange-400">{service.short}</span>
            </nav>
          </Reveal>

          {/* Action CTA Buttons */}
          <Reveal delay={0.15}>
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto px-4">
              {/* Modern Consultation Modal Trigger */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(244,123,32,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(244,123,32,0.55)] active:scale-[0.98] cursor-pointer"
              >
                {/* Subtle light sweep animation */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-full"
                >
                  <span className="absolute -inset-full top-0 block -translate-x-full transform bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </span>

                <Calendar className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
                <span>Discuss Your {service.short} Goals</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Direct Telephone Contact Button */}
              <a
                href={site.phoneHref}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/15 hover:border-white/30 shadow-md"
              >
                <Phone className="h-4 w-4 text-orange-400" />
                <span>{site.phoneIntl}</span>
              </a>
            </div>
          </Reveal>

          {/* Live Credentials Bar — Frosted Glass Cards */}
          <Reveal delay={0.2}>
            <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 max-w-5xl mx-auto border-t border-white/10 pt-5 sm:pt-8 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20">
                <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  4-Phase
                </span>
                <p className="text-[10px] sm:text-xs text-navy-200 font-medium mt-1 leading-tight sm:leading-snug">
                  Structured Framework
                </p>
              </div>
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all hover:bg-orange-500/[0.12] hover:border-orange-500/30">
                <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-orange-400 tracking-tight">
                  100%
                </span>
                <p className="text-[10px] sm:text-xs text-orange-200/90 font-medium mt-1 leading-tight sm:leading-snug">
                  Data-Informed Strategy
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4 backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/20">
                <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  UK & Global
                </span>
                <p className="text-[10px] sm:text-xs text-navy-200 font-medium mt-1 leading-tight sm:leading-snug">
                  Senior Consultancy Team
                </p>
              </div>
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/[0.06] p-3 sm:p-4 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.1)] transition-all hover:bg-orange-500/[0.12] hover:border-orange-500/30">
                <span className="font-display text-lg sm:text-2xl lg:text-3xl font-bold text-orange-400 tracking-tight">
                  Measurable
                </span>
                <p className="text-[10px] sm:text-xs text-orange-200/90 font-medium mt-1 leading-tight sm:leading-snug">
                  Commercial Outcomes
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

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="consultation"
        preselectedService={service.slug}
      />
    </>
  );
}
