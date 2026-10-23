"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ShoppingBag, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";
import { caseStudies, type CaseStudy } from "@/lib/site";
import CaseStudyCard from "./CaseStudyCard";

import dynamic from "next/dynamic";
import { Layers, RotateCcw } from "lucide-react";

const OrbitGallery = dynamic(() => import("./3d/OrbitGallery"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[480px] w-full items-center justify-center rounded-3xl border border-white/20 bg-navy-950/40 backdrop-blur-md">
      <div className="flex items-center gap-2.5 text-xs font-semibold text-navy-200">
        <span className="h-2.5 w-2.5 rounded-full bg-orange-400 animate-ping" />
        Loading 3D Radial Orbit Ring...
      </div>
    </div>
  ),
});

const categories = [
  { id: "all", label: "All Sectors" },
  { id: "B2B & Tech", label: "B2B & Tech" },
  { id: "E-commerce & Retail", label: "E-commerce & Retail" },
  { id: "Healthcare & Life Sciences", label: "Healthcare & Advisory" },
];

export default function CaseStudiesShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");

  const filteredStudies =
    selectedCategory === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category === selectedCategory);

  return (
    <div>
      {/* View Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-1.5 rounded-full border border-white/60 bg-white/80 p-1.5 backdrop-blur-xl shadow-md ring-1 ring-black/[0.03]">
          <button
            type="button"
            onClick={() => setViewMode("orbit")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "orbit"
                ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                : "text-navy-700 hover:text-navy-950"
            }`}
          >
            <RotateCcw className="h-3.5 w-3.5 text-orange-400" />
            <span>3D Orbit Ring</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-navy-950 text-white shadow-md shadow-navy-950/20"
                : "text-navy-700 hover:text-navy-950"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Grid Cards</span>
          </button>
        </div>

        {/* Category Filter Pills (Available when in Grid mode) */}
        {viewMode === "grid" && (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <motion.button
                  key={cat.id}
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "text-white"
                      : "bg-white/80 text-navy-700 hover:text-navy-950 border border-white/60 shadow-xs hover:border-orange-300"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeCaseStudyCategory"
                      className="absolute inset-0 rounded-full bg-navy-900 shadow-md"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Display: 3D Orbit Ring or Standard Grid Cards */}
      {viewMode === "orbit" ? (
        <div className="relative">
          {/* Ambient stage glow behind 3D orbit ring */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 sm:h-[450px] sm:w-[450px] rounded-full bg-gradient-to-tr from-orange-500/10 via-cyan-500/10 to-transparent blur-3xl"
          />
          <OrbitGallery />
        </div>
      ) : (
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, i) => (
              <motion.div
                key={study.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <CaseStudyCard study={study} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
