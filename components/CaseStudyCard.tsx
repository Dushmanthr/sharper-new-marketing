"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Calendar, Globe2 } from "lucide-react";
import type { CaseStudy } from "@/lib/site";

/**
 * Clean, user-friendly Case Study Card
 * Combines frosted glass surfaces, high-contrast typography, and a cinematic visual header
 * to deliver the signature agency vibe without being overly dark.
 */
export default function CaseStudyCard({
  study,
  index = 0,
}: {
  study: CaseStudy;
  index?: number;
}) {
  const topResult = study.results[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:bg-white/95 hover:shadow-2xl ring-1 ring-black/[0.02]"
    >
      {/* Visual Header / Metric Highlight */}
      <div className="relative aspect-16/9 w-full overflow-hidden bg-navy-950">
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/30 to-transparent" />

        {/* Category Pill Badge */}
        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-navy-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-xs">
            <Building2 className="h-3 w-3 text-orange-400" />
            {study.category}
          </span>
        </div>

        {/* Primary Metric Floating Badge */}
        {topResult && (
          <div className="absolute bottom-3.5 left-4 right-4 flex items-baseline justify-between rounded-2xl border border-white/20 bg-navy-950/75 px-4 py-2.5 backdrop-blur-md shadow-md">
            <div>
              <span className="font-display text-2xl font-bold text-orange-400 tracking-tight">
                {topResult.metric}
              </span>
              <p className="text-[11px] font-medium text-white/90">{topResult.label}</p>
            </div>
            <span className="text-[10px] text-white/60 font-medium">{topResult.period}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* Service Capability Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {study.services.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-orange-500/15 bg-orange-500/5 px-2.5 py-0.5 text-[11px] font-semibold text-navy-800 transition-colors group-hover:border-orange-500/30 group-hover:bg-orange-500/10"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl font-bold leading-snug text-navy-900 transition-colors duration-200 group-hover:text-orange-600">
          <Link href={`/case-studies/${study.slug}`}>{study.title}</Link>
        </h3>

        {/* Summary Excerpt */}
        <p className="mt-2.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-ink-muted">
          {study.summary}
        </p>

        {/* Client Metadata Card */}
        <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-navy-100/60 bg-surface-muted/60 p-3.5 text-xs">
          <div>
            <span className="flex items-center gap-1 font-semibold text-navy-800 text-[11px]">
              <Globe2 className="h-3 w-3 text-orange-500" /> Target Market:
            </span>
            <p className="mt-0.5 truncate text-[11px] text-ink-muted font-medium">
              {study.clientOverview.targetMarket}
            </p>
          </div>
          <div>
            <span className="flex items-center gap-1 font-semibold text-navy-800 text-[11px]">
              <Calendar className="h-3 w-3 text-cyan-600" /> Timeframe:
            </span>
            <p className="mt-0.5 truncate text-[11px] text-ink-muted font-medium">
              {study.clientOverview.timeframe}
            </p>
          </div>
        </div>

        {/* Bottom CTA Link */}
        <div className="mt-6 border-t border-navy-100/60 pt-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-orange-600 transition-colors group-hover:text-orange-500">
          <span>Read 5-Part Case Study</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </motion.article>
  );
}
