"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/site";
import Icon from "./Icon";
import Reveal from "./Reveal";

/**
 * Image-topped service card used in the "What We Offer" grids.
 * Styled with dark navy glassmorphism, glowing chromatic neon accents,
 * specular top sheen, and smooth micro-interactions to mirror the landing page aesthetic.
 */
export default function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Reveal index={index} as="article" className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-950/80 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-500/50 hover:bg-navy-900/90 hover:shadow-[0_12px_40px_-8px_rgba(244,123,32,0.3)] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-400"
      >
        {/* Subtle top specular sheen highlight on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Ambient radial glow inside card on hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-500/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Visual Header / Image with Cinematic Dark Gradient Vignette */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-navy-950">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={
              service.contain
                ? "object-contain p-6 opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                : "object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
            }
          />

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />

          {/* Floating Neon Icon Badge (Matching ServicesTicker signature icon style) */}
          <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-500/25 to-orange-500/5 text-orange-400 shadow-inner backdrop-blur-md transition-all duration-300 group-hover:border-orange-400 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(244,123,32,0.6)]">
            <Icon
              name={service.icon}
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Top-Right Kicker Pill */}
          {service.kicker && (
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center rounded-full border border-white/15 bg-navy-900/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-orange-300 backdrop-blur-md shadow-xs">
                {service.kicker}
              </span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-white transition-colors duration-200 group-hover:text-orange-400">
              {service.short}
            </h3>
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-navy-300 transition-all duration-200 group-hover:border-orange-500/40 group-hover:bg-orange-500/20 group-hover:text-orange-400">
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className="mt-2.5 flex-1 text-xs sm:text-sm leading-relaxed text-navy-200/80">
            {service.excerpt}
          </p>

          {/* Capabilities Pill Badges */}
          {service.whatWeDo && (
            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
              {service.whatWeDo.slice(0, 2).map((item, i) => (
                <span
                  key={i}
                  className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-navy-200 transition-colors group-hover:border-orange-500/20 group-hover:text-orange-200"
                >
                  {item.title}
                </span>
              ))}
            </div>
          )}

          {/* Bottom Action Indicator */}
          <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold uppercase tracking-wider text-orange-400 transition-colors group-hover:text-orange-300">
            <span>Explore Blueprint</span>
            <span className="flex items-center gap-1 text-[11px] font-normal normal-case tracking-normal text-navy-400 group-hover:text-orange-200/90">
              4-Phase Framework{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
