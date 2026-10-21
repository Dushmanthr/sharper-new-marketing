"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  Quote,
  Sparkles,
  MapPin,
  RotateCcw,
  Layers,
  CheckCircle2,
  Palette,
  Code2,
  MousePointerClick,
  Share2,
  Search,
  BarChart3,
  type LucideIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TestimonialsAmbientScene = dynamic(
  () => import("./3d/TestimonialsAmbientScene"),
  { ssr: false }
);

export type Testimonial = {
  quote: string;
  role: string;
  company: string;
  location: string;
  metric?: string;
  service?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sharper Labs Marketing has been immensely supportive in integrating the latest digital marketing techniques with traditional methods to enhance our operations. They produced refined campaigns and strategies to improve our customer experience, and helped drive real growth and a high return on investment. Thank you.",
    role: "Head of Marketing",
    company: "UK Retail Brand",
    location: "London, UK",
    metric: "+184% Online Enquiries",
    service: "Brand Strategy & PPC",
  },
  {
    quote:
      "Their team rebuilt our website and took over our social media, and the difference has been remarkable. Traffic and enquiries are both up, and the reporting is clear enough that we finally understand what's working and why.",
    role: "Managing Director",
    company: "Professional Services Practice",
    location: "St Albans & International",
    metric: "+214% Inbound Leads",
    service: "Web Design & Social Media",
  },
  {
    quote:
      "The PPC and SEO work Sharper Labs delivered paid for itself within months. They researched everything properly, kept refining the campaigns, and were always transparent about spend and results. A genuine marketing partner.",
    role: "Founder & CEO",
    company: "Consumer E-commerce Brand",
    location: "UK & European Markets",
    metric: "3.8x Return on Ad Spend",
    service: "PPC & Organic SEO",
  },
  {
    quote:
      "For a high-value advisory practice, finding an agency that understands E-E-A-T and technical SEO was rare. Sharper Labs delivered top-3 rankings across our key commercial terms and attracted genuine enterprise inquiries.",
    role: "Partner",
    company: "Clinical Advisory Practice",
    location: "UK & Middle East",
    metric: "+310% Consultation Requests",
    service: "Organic SEO & Content Strategy",
  },
  {
    quote:
      "Sharper Labs transformed our digital positioning completely. We went from being viewed as a local firm to competing and winning cross-border contracts across Europe. Their technical execution and international SEO were exceptional.",
    role: "Managing Director",
    company: "Supply Chain & Tech Advisory",
    location: "London & Frankfurt",
    metric: "+214% Enterprise RFPs",
    service: "International SEO & Web Dev",
  },
  {
    quote:
      "Restructuring our paid campaigns and conversion funnels gave us immediate clarity on acquisition costs. They eliminated wasteful ad spend and delivered a 3.8x ROAS across UK and overseas markets.",
    role: "E-Commerce Director",
    company: "Sustainable Consumer Goods",
    location: "UK & GCC Markets",
    metric: "-42% Blended CPA",
    service: "PPC & Data Analysis",
  },
];

const clientMeta: {
  shortName: string;
  accent: string;
  icon: LucideIcon;
}[] = [
  { shortName: "UK Retail", accent: "#FF6A00", icon: Palette },
  { shortName: "Prof. Services", accent: "#00E5FF", icon: Code2 },
  { shortName: "Consumer D2C", accent: "#F59E0B", icon: MousePointerClick },
  { shortName: "Healthcare", accent: "#A855F7", icon: Share2 },
  { shortName: "Tech Advisory", accent: "#3B82F6", icon: Search },
  { shortName: "Sustainable Goods", accent: "#10B981", icon: BarChart3 },
];

function getInitials(company: string): string {
  const words = company.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return company.slice(0, 2).toUpperCase();
}

export default function Testimonials({
  items = testimonials,
}: {
  items?: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [viewMode, setViewMode] = useState<"stage" | "grid">("stage");
  const [isPaused, setIsPaused] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      setActive((index + total) % total);
    },
    [total]
  );

  const prev = () => goTo(active - 1);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);

  // Autoplay progression in 3D stage mode without rewind glitch
  useEffect(() => {
    if (isPaused || viewMode !== "stage") return;
    const timer = setInterval(next, 5600);
    return () => clearInterval(timer);
  }, [next, isPaused, viewMode]);

  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsPaused(false);
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe with high intent
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        next();
      } else {
        prev();
      }
    }
  };

  // Cursor 3D micro-tilt on active card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
    setIsPaused(false);
  };

  const activeColor = clientMeta[active]?.accent || "#FF6A00";

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-b from-[#091124]/95 via-[#0c1836]/90 to-[#070e20]/95 py-8 px-4 sm:py-12 sm:px-8 lg:px-10 text-white shadow-2xl backdrop-blur-xl"
      role="region"
      aria-label="Client testimonials showcase"
    >
      {/* Three.js Ambient Reactive WebGL Particle Nebula Backdrop */}
      <TestimonialsAmbientScene accentColor={activeColor} />

      {/* Decorative ambient radial glows */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-35 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: activeColor }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full opacity-25 blur-3xl transition-colors duration-700"
        style={{ backgroundColor: activeColor }}
      />

      {/* Header with Title, Mode Switcher & Controls */}
      <div className="relative z-10 mb-8 sm:mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between px-2 sm:px-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold text-orange-400 backdrop-blur-md shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            <span>Verified Client Evidence</span>
          </div>
          <h2 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Trusted by Growing Brands
          </h2>
          <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-navy-200">
            Explore authentic feedback and verified commercial outcomes across UK and international campaigns.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {/* View Mode Switcher: 3D Stage vs Full Grid */}
          <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-md shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("stage")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "stage"
                  ? "bg-white text-navy-950 shadow-md"
                  : "text-navy-200 hover:text-white"
              }`}
            >
              <RotateCcw className="h-3 w-3 text-orange-500" />
              <span>3D Stage</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white text-navy-950 shadow-md"
                  : "text-navy-200 hover:text-white"
              }`}
            >
              <Layers className="h-3 w-3 text-cyan-400" />
              <span>Grid</span>
            </button>
          </div>

          {/* Auto-sliding indicator pill */}
          {viewMode === "stage" && (
            <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-navy-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 ${
                    !isPaused ? "animate-ping" : ""
                  }`}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[11px] text-navy-300">
                {isPaused ? "Paused" : "Auto-sliding"}
              </span>
            </div>
          )}

          {/* Navigation Controls */}
          {viewMode === "stage" && (
            <div className="flex items-center gap-1.5" role="group" aria-label="Testimonials navigation">
              <span className="text-xs font-semibold text-navy-300 px-1 font-mono">
                0{active + 1} / 0{total}
              </span>
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={prev}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md backdrop-blur-md transition-colors hover:bg-orange-500 hover:border-orange-400 active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={next}
                aria-label="Next testimonial"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-md backdrop-blur-md transition-colors hover:bg-orange-500 hover:border-orange-400 active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Main Display: 3D Cascading Horizon Deck vs Full Grid */}
      {viewMode === "stage" ? (
        <div className="relative z-10 flex flex-col items-center">
          {/* 3D Horizon Deck Viewport */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative flex items-center justify-center w-full h-[460px] sm:h-[480px] lg:h-[500px] overflow-hidden select-none [perspective:1400px]"
          >
            {/* Visual Horizon Floor Sheen */}
            <div className="pointer-events-none absolute bottom-0 inset-x-8 h-24 bg-gradient-to-t from-white/[0.04] to-transparent rounded-full blur-xl" />

            {items.map((item, index) => {
              // Calculate circular modular distance from active card
              const diff = (index - active + total) % total;
              let normalizedDiff = diff;
              if (normalizedDiff > total / 2) {
                normalizedDiff -= total;
              }

              const isCenter = normalizedDiff === 0;
              const isRight = normalizedDiff === 1;
              const isLeft = normalizedDiff === -1;
              const isHidden = Math.abs(normalizedDiff) >= 2;

              const meta = clientMeta[index] || clientMeta[0];

              // Responsive positioning variants based on relative index
              let animateProps = {};
              if (isCenter) {
                animateProps = {
                  x: "0%",
                  y: 0,
                  z: 40,
                  rotateY: mouseTilt.x,
                  rotateX: mouseTilt.y,
                  scale: 1,
                  opacity: 1,
                  zIndex: 30,
                  filter: "brightness(1.05)",
                };
              } else if (isRight) {
                animateProps = {
                  x: "56%",
                  y: 18,
                  z: -120,
                  rotateY: -16,
                  rotateX: 0,
                  scale: 0.88,
                  opacity: 0.65,
                  zIndex: 20,
                  filter: "brightness(0.75)",
                };
              } else if (isLeft) {
                animateProps = {
                  x: "-56%",
                  y: 18,
                  z: -120,
                  rotateY: 16,
                  rotateX: 0,
                  scale: 0.88,
                  opacity: 0.65,
                  zIndex: 20,
                  filter: "brightness(0.75)",
                };
              } else {
                animateProps = {
                  x: normalizedDiff > 0 ? "110%" : "-110%",
                  y: 35,
                  z: -280,
                  rotateY: normalizedDiff > 0 ? -24 : 24,
                  rotateX: 0,
                  scale: 0.72,
                  opacity: 0,
                  zIndex: 10,
                  filter: "brightness(0.5)",
                };
              }

              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={animateProps}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 28,
                    mass: 0.9,
                  }}
                  onMouseMove={isCenter ? handleMouseMove : undefined}
                  onClick={() => !isCenter && goTo(index)}
                  className={`absolute w-[92vw] max-w-[350px] sm:max-w-[420px] lg:max-w-[460px] h-[390px] sm:h-[410px] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl transition-shadow duration-300 [transform-style:preserve-3d] ${
                    isCenter
                      ? "cursor-default shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-2"
                      : "cursor-pointer border border-white/10 hover:border-white/30"
                  }`}
                  style={{
                    backgroundColor: isCenter ? "#0b1530e6" : "#091024d9",
                    borderColor: isCenter ? meta.accent : "rgba(255, 255, 255, 0.12)",
                    boxShadow: isCenter
                      ? `0 0 35px ${meta.accent}30, 0 20px 50px rgba(0,0,0,0.6)`
                      : undefined,
                  }}
                >
                  {/* Top Card Bar: Metric Badge + 5 Gold Stars */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {item.metric ? (
                      <div
                        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold shadow-xs border"
                        style={{
                          backgroundColor: `${meta.accent}20`,
                          color: meta.accent,
                          borderColor: `${meta.accent}50`,
                        }}
                      >
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span>{item.metric}</span>
                      </div>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 border border-white/10">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Quotation Icon & Quote Text */}
                  <Quote
                    className="h-7 w-7 mb-2 opacity-60"
                    style={{ color: meta.accent }}
                  />
                  <blockquote className="text-sm sm:text-[15px] font-medium leading-relaxed text-white line-clamp-5">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Card Footer: Client Info & Verification Check */}
                  <div className="absolute bottom-6 left-6 right-6 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-950 font-display text-sm font-bold border-2 shadow-xs"
                          style={{
                            borderColor: meta.accent,
                            color: meta.accent,
                          }}
                        >
                          {getInitials(item.company)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-display text-sm font-bold text-white">
                            {item.role}
                          </div>
                          <div className="truncate text-xs font-semibold text-orange-400">
                            {item.company}
                          </div>
                          <div className="truncate text-[11px] text-navy-300 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0 text-navy-400" />
                            <span>{item.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                        {item.service && (
                          <p className="mt-1 text-[10px] text-navy-300 font-medium truncate max-w-[120px]">
                            {item.service}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Interactive Client Evidence Selector Dock */}
          <div className="mt-4 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto max-w-full pb-2 px-2 no-scrollbar">
            {items.map((item, idx) => {
              const isSelected = active === idx;
              const meta = clientMeta[idx] || clientMeta[0];
              const Icon = meta.icon;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className={`group relative flex items-center gap-2 rounded-2xl px-3.5 py-2 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                    isSelected
                      ? "text-white shadow-lg border"
                      : "border border-white/10 bg-white/5 text-navy-200 hover:border-white/25 hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: isSelected ? "#0e1a38" : undefined,
                    borderColor: isSelected ? meta.accent : undefined,
                    boxShadow: isSelected ? `0 0 20px ${meta.accent}35` : undefined,
                  }}
                >
                  <Icon
                    className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
                    style={{ color: meta.accent }}
                  />
                  <span>{meta.shortName}</span>
                  {isSelected && (
                    <span
                      className="h-1.5 w-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: meta.accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Full Grid Cards View */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => {
            const meta = clientMeta[index] || clientMeta[0];
            return (
              <div
                key={index}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-navy-950/70 p-6 backdrop-blur-md shadow-lg transition-all hover:border-white/30 hover:-translate-y-1"
                style={{
                  borderTopColor: meta.accent,
                  borderTopWidth: 3,
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    {item.metric ? (
                      <div
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-bold border"
                        style={{
                          backgroundColor: `${meta.accent}20`,
                          color: meta.accent,
                          borderColor: `${meta.accent}50`,
                        }}
                      >
                        <TrendingUp className="h-3 w-3" />
                        <span>{item.metric}</span>
                      </div>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <Quote className="h-5 w-5 mb-2 opacity-50" style={{ color: meta.accent }} />
                  <p className="text-xs sm:text-sm font-medium leading-relaxed text-navy-100">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-900 font-display text-xs font-bold border"
                      style={{
                        borderColor: meta.accent,
                        color: meta.accent,
                      }}
                    >
                      {getInitials(item.company)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-display text-xs font-bold text-white">
                        {item.role}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-orange-400 font-semibold truncate">
                        <span>{item.company}</span>
                      </div>
                      <div className="text-[10px] text-navy-300 truncate">
                        {item.location}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2 text-[11px]">
                    {item.service && (
                      <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-navy-200 border border-white/10 truncate max-w-[150px]">
                        {item.service}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[10px]">
                      <CheckCircle2 className="h-3 w-3" /> Verified Result
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
