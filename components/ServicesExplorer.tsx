"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Code2,
  Share2,
  MousePointerClick,
  BarChart3,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Box, Layers } from "lucide-react";
import { services, type Service } from "@/lib/site";
import ConsultationModal from "./ConsultationModal";

const ShowcaseCube = dynamic(() => import("./3d/ShowcaseCube"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] w-full items-center justify-center rounded-3xl border border-white/20 bg-navy-950/40 backdrop-blur-md">
      <div className="flex items-center gap-2 text-xs font-semibold text-navy-200">
        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
        Loading 3D Showcase Prism...
      </div>
    </div>
  ),
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette,
  Code2,
  Share2,
  MousePointerClick,
  BarChart3,
  Search,
};

export default function ServicesExplorer() {
  const [activeSlug, setActiveSlug] = useState(services[0].slug);
  const [viewMode, setViewMode] = useState<"blueprint" | "cube">("cube");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeIndex = Math.max(0, services.findIndex((s) => s.slug === activeSlug));
  const activeService: Service = services[activeIndex] || services[0];
  const IconComponent = iconMap[activeService.icon] || Layers;

  return (
    <div className="relative">
      {/* View Switcher: Interactive 3D Prism vs Blueprint Specs */}
      <div className="flex items-center justify-center mb-6 px-2">
        <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/70 p-1 backdrop-blur-md shadow-xs">
          <button
            type="button"
            onClick={() => setViewMode("cube")}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "cube"
                ? "bg-navy-950 text-white shadow-md"
                : "text-navy-700 hover:text-navy-900"
            }`}
          >
            <Box className="h-3.5 w-3.5 text-cyan-400" />
            <span>Interactive 3D Prism</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("blueprint")}
            className={`flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "blueprint"
                ? "bg-navy-950 text-white shadow-md"
                : "text-navy-700 hover:text-navy-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-orange-400" />
            <span>Blueprint Specs</span>
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-surface-muted/80 backdrop-blur-md border border-navy-100 max-w-4xl mx-auto mb-8 sm:mb-10">
        {services.map((service) => {
          const isSelected = activeSlug === service.slug;
          const ServiceIcon = iconMap[service.icon] || Layers;
          return (
            <motion.button
              key={service.slug}
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              onClick={() => setActiveSlug(service.slug)}
              className={`relative flex items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 text-xs font-semibold sm:text-sm transition-colors duration-200 cursor-pointer ${
                isSelected ? "text-white" : "text-navy-700 hover:text-navy-900 hover:bg-white/60"
              }`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeServiceTab"
                  className="absolute inset-0 rounded-xl bg-navy-900 shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <ServiceIcon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isSelected ? "text-orange-400" : "text-orange-500"}`} />
                {service.short}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Interactive Display: 3D Showcase Prism vs Detailed Blueprint Panel */}
      {viewMode === "cube" ? (
        <div className="flex flex-col items-center">
          <ShowcaseCube
            activeServiceIndex={activeIndex}
            onServiceSelect={(idx) => setActiveSlug(services[idx].slug)}
          />

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto px-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95 cursor-pointer w-full sm:w-auto"
            >
              Discuss {activeService.short} Goals <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              href={`/services/${activeService.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy-200 bg-white/70 px-5 py-3 text-sm font-semibold text-navy-800 backdrop-blur-md transition-colors hover:border-orange-400 hover:text-orange-600 w-full sm:w-auto"
            >
              Full Service Blueprint
            </Link>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden rounded-3xl border border-white/50 bg-white/75 shadow-xl backdrop-blur-md"
          >
            <div className="grid lg:grid-cols-12">
              {/* Left Column: Hook, Lead, What We Do */}
              <div className="p-6 sm:p-8 lg:col-span-7 lg:p-12">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    <IconComponent className="h-4 w-4" />
                  </span>
                  {activeService.kicker}
                </div>

                <h3 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                  {activeService.lead}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-ink-muted">
                  {activeService.hook || activeService.excerpt}
                </p>

                {/* What We Do 4-Grid */}
                <div className="mt-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-navy-400">
                    What We Do
                  </h4>
                  <div className="mt-4 grid gap-3 sm:gap-4 sm:grid-cols-2">
                    {activeService.whatWeDo.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-navy-100/40 bg-white/50 p-4 backdrop-blur-xs transition-all hover:border-orange-200 hover:bg-orange-50/40"
                      >
                        <h5 className="font-display text-sm font-semibold text-navy-900">
                          {item.title}
                        </h5>
                        <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-orange-500/40 active:scale-95 w-full sm:w-auto"
                  >
                    Discuss {activeService.short} Goals <ArrowRight className="h-4 w-4" />
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="w-full sm:w-auto"
                  >
                    <Link
                      href={`/services/${activeService.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-navy-200 px-5 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-orange-400 hover:text-orange-600 w-full sm:w-auto"
                    >
                      Full Service Blueprint
                    </Link>
                  </motion.div>
                </div>
              </div>

              {/* Right Column: Approach & What You Can Expect */}
              <div className="border-t border-navy-800/50 bg-navy-900/80 p-6 sm:p-8 text-white backdrop-blur-md lg:col-span-5 lg:border-t-0 lg:border-l lg:p-12">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    Our Approach
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-navy-100">
                    {activeService.approach}
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-400">
                    What You Can Expect
                  </h4>
                  <ul className="mt-4 space-y-3">
                    {activeService.whatYouCanExpect.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-navy-100">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                  <p className="text-xs font-medium text-orange-200">
                    💡 Serving businesses across the UK and internationally with transparent communication and measurable KPIs.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="consultation"
        preselectedService={activeService.slug}
      />
    </div>
  );
}
