"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Flame,
  ShieldCheck,
  Heart,
  Users2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import SocialIcon from "../SocialIcon";
import ConsultationModal from "../ConsultationModal";

interface SocialPlatformData {
  id: "instagram" | "tiktok" | "linkedin" | "facebook";
  name: string;
  metric: string;
  rate: string;
  pillBg: string;
  glowColor: string;
  borderColor: string;
  badgeGradient: string;
  accentText: string;
  tagline: string;
  reactionEmoji: string;
  reactionLabel: string;
  iconBg: string;
  subIcon: React.ComponentType<{ className?: string }>;
}

const platforms: SocialPlatformData[] = [
  {
    id: "instagram",
    name: "Instagram",
    metric: "+125,000",
    rate: "Real Followers",
    pillBg: "bg-pink-500/10",
    glowColor: "rgba(225, 48, 108, 0.35)",
    borderColor: "hover:border-pink-500/50",
    badgeGradient: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]",
    accentText: "text-pink-400",
    tagline: "Reels & Stories · Viral Funnels",
    reactionEmoji: "❤️",
    reactionLabel: "High Active Reach",
    iconBg: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
    subIcon: TrendingUp,
  },
  {
    id: "tiktok",
    name: "TikTok",
    metric: "+180,000",
    rate: "FYP Followers",
    pillBg: "bg-cyan-500/10",
    glowColor: "rgba(0, 242, 254, 0.35)",
    borderColor: "hover:border-cyan-400/50",
    badgeGradient: "from-[#00f2fe] to-[#fe0979]",
    accentText: "text-cyan-300",
    tagline: "Viral Hooks · FYP Algorithms · Trends",
    reactionEmoji: "🔥",
    reactionLabel: "Compounding Growth",
    iconBg: "bg-black border border-cyan-400/40 text-white",
    subIcon: Flame,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    metric: "+45,000",
    rate: "B2B Decision Makers",
    pillBg: "bg-blue-500/10",
    glowColor: "rgba(10, 102, 194, 0.35)",
    borderColor: "hover:border-blue-400/50",
    badgeGradient: "from-[#0A66C2] to-[#004182]",
    accentText: "text-blue-400",
    tagline: "Founders · C-Suite · Thought Leaders",
    reactionEmoji: "💼",
    reactionLabel: "Verified Executives",
    iconBg: "bg-[#0A66C2]",
    subIcon: ShieldCheck,
  },
  {
    id: "facebook",
    name: "Facebook",
    metric: "+95,000",
    rate: "Active Page Followers",
    pillBg: "bg-blue-600/10",
    glowColor: "rgba(24, 119, 242, 0.35)",
    borderColor: "hover:border-blue-500/50",
    badgeGradient: "from-[#1877F2] to-[#0d5ac4]",
    accentText: "text-blue-300",
    tagline: "Community Groups · Meta Ad Retargeting",
    reactionEmoji: "👍",
    reactionLabel: "Engaged Community",
    iconBg: "bg-[#1877F2]",
    subIcon: Users2,
  },
];

// Double items so ticker stays continuously populated across all viewports
const tickerPlatforms = [...platforms, ...platforms];

export default function SocialFollowersRibbon({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section
        aria-label="Social Media Follower Platforms Ribbon"
        className={`relative z-20 w-full overflow-hidden border-y border-white/10 bg-gradient-to-b from-[#060b18]/95 via-[#0a1329]/90 to-[#060b18]/95 backdrop-blur-xl py-3.5 sm:py-5 select-none ${
          className || ""
        }`}
      >
        {/* Top vibrant chromatic highlight hairline */}
        <div
          className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-pink-500/40 via-cyan-400/40 via-blue-500/40 to-transparent"
          aria-hidden="true"
        />

        {/* Bottom subtle blue hairline */}
        <div
          className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          aria-hidden="true"
        />

        {/* Left & Right feathered gradient entry/exit masks */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-32 bg-gradient-to-r from-[#060b18] via-[#060b18]/80 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-32 bg-gradient-to-l from-[#060b18] via-[#060b18]/80 to-transparent"
          aria-hidden="true"
        />

        {/* Infinite Interactive Ribbon */}
        <div className="ticker-fade-mask relative flex overflow-hidden">
          <div className="animate-ticker flex items-center gap-3 sm:gap-4.5 py-1">
            {tickerPlatforms.map((item, idx) => {
              const SubIcon = item.subIcon;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setIsModalOpen(true)}
                  className={`group relative flex items-center gap-3.5 sm:gap-4 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.05] p-3 sm:p-3.5 sm:pr-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.1] hover:shadow-2xl cursor-pointer ${item.borderColor}`}
                  style={{
                    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  {/* Subtle hover glow bloom */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-0.5 rounded-2xl sm:rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: item.glowColor }}
                  />

                  {/* Cute Social Media Icon Badge */}
                  <div
                    className={`relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.iconBg}`}
                  >
                    <SocialIcon name={item.id} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  {/* Follower Stats & Platform Copy */}
                  <div className="relative z-10 text-left min-w-[170px] sm:min-w-[190px]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-display text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                        {item.name}
                        {/* Cute live radar ping */}
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </span>

                      {/* Cute reaction badge */}
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-white/70 bg-white/10 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                        <span>{item.reactionEmoji}</span>
                        <span className="hidden xs:inline">{item.reactionLabel}</span>
                      </span>
                    </div>

                    {/* Follower Count Metric */}
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span
                        className={`font-display text-base sm:text-lg font-extrabold tracking-tight ${item.accentText}`}
                      >
                        {item.metric}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-semibold text-white/80">
                        {item.rate}
                      </span>
                    </div>

                    {/* Cute Micro-Avatar Stack & Subtitle */}
                    <div className="mt-1.5 flex items-center justify-between gap-2 border-t border-white/10 pt-1.5 text-[10px] text-navy-200">
                      <span className="truncate text-white/60">{item.tagline}</span>
                      <span className="inline-flex items-center text-orange-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 font-semibold shrink-0">
                        Grow <ArrowUpRight className="h-3 w-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="consultation"
        preselectedService="social-media-followers"
      />
    </>
  );
}
