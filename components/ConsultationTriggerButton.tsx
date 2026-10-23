"use client";

import { useState } from "react";
import { Calendar, ArrowRight, Sparkles } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

interface ConsultationTriggerButtonProps {
  label?: string;
  variant?: "primary" | "secondary" | "subtle";
  initialTab?: "consultation" | "quotation" | "audit";
  className?: string;
}

export default function ConsultationTriggerButton({
  label = "Book Free Strategy Consultation",
  variant = "primary",
  initialTab = "consultation",
  className = "",
}: ConsultationTriggerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl font-semibold transition-all duration-300 cursor-pointer ${
          variant === "primary"
            ? "bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] px-5 py-3 text-sm"
            : variant === "secondary"
            ? "border border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 px-4 py-2.5 text-xs sm:text-sm"
            : "border border-white/20 bg-white/5 text-white hover:bg-white/10 px-4 py-2.5 text-xs sm:text-sm"
        } ${className}`}
      >
        {/* Subtle light sweep animation */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 overflow-hidden rounded-2xl"
        >
          <span className="absolute -inset-full top-0 block -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </span>

        <Calendar className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="truncate">{label}</span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <ConsultationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialTab={initialTab}
      />
    </>
  );
}
