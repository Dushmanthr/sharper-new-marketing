"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X, Phone, Globe, Calendar, Clock } from "lucide-react";
import { services, site, socials } from "@/lib/site";
import Button from "./Button";
import SocialIcon from "./SocialIcon";
import ConsultationModal from "./ConsultationModal";
import { trackEvent } from "@/lib/analytics";

export default function Header() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin") || pathname?.includes("/admin")) return null;

  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"consultation" | "quotation" | "audit">("consultation");
  const [londonTime, setLondonTime] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 15);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Live London Time ticker
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setLondonTime(timeStr);
      } catch {
        setLondonTime("");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const openConsultation = (tab: "consultation" | "quotation" | "audit" = "consultation") => {
    setModalTab(tab);
    setIsModalOpen(true);
    setMobileOpen(false);
    trackEvent("service_explored", { trigger: "header_cta", tab });
  };

  return (
    <>
      <header className="sticky top-0 z-40 transition-all duration-300">
        {/* International Utility Bar (Gracefully collapses on desktop scroll for maximum screen real estate) */}
        <div
          className={clsx(
            "hidden bg-navy-950 text-navy-200 lg:block border-b border-navy-800/80 transition-all duration-300 ease-in-out overflow-hidden",
            scrolled ? "max-h-0 opacity-0 border-b-0 py-0" : "max-h-12 opacity-100",
          )}
        >
          <div className="container-page flex h-9 items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-navy-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-medium text-white">UK Head Office:</span>
                {londonTime ? (
                  <span className="text-orange-300 font-mono">{londonTime} GMT</span>
                ) : (
                  <span>09:00–17:00 GMT</span>
                )}
              </span>
              <span className="text-navy-600">|</span>
              <span className="inline-flex items-center gap-1 text-navy-300">
                <Globe className="h-3 w-3 text-orange-400" /> Serving UK & International Clients
              </span>
            </div>

            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="text-navy-400">Follow:</span>
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-navy-300 transition-colors hover:text-orange-400"
                  >
                    <SocialIcon name={s.icon} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <span className="text-navy-600">|</span>
              <a
                href={site.phoneHref}
                onClick={() => trackEvent("phone_click", { location: "header_utility" })}
                className="font-medium text-white transition-colors hover:text-orange-400"
              >
                Intl: {site.phoneIntl}
              </a>
            </div>
          </div>
        </div>

        {/* Main Header Bar with Glassmorphism */}
        <div
          className={clsx(
            "relative transition-all duration-300 ease-in-out",
            scrolled
              ? "border-b border-white/60 bg-white/75 backdrop-blur-xl backdrop-saturate-150 shadow-[0_12px_32px_-8px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.02]"
              : "border-b border-navy-100/80 bg-white/95 backdrop-blur-md shadow-none",
          )}
        >
          {/* Subtle specular top sheen on scroll */}
          <div
            className={clsx(
              "pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />

          <div
            className={clsx(
              "container-page flex items-center justify-between transition-all duration-300 ease-in-out",
              scrolled ? "h-16 lg:h-18" : "h-20 lg:h-24",
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 focus:outline-none"
              aria-label={`${site.name} home`}
            >
              <Image
                src="/logo/logo.svg"
                alt={`${site.name} logo`}
                width={150}
                height={46}
                priority
                fetchPriority="high"
                sizes="150px"
                className={clsx(
                  "w-auto transition-all duration-300 group-hover:scale-[1.02]",
                  scrolled ? "h-10 sm:h-11 lg:h-13" : "h-12 sm:h-14 lg:h-16",
                )}
              />
            </Link>

            {/* Desktop Nav with Glass Capsule Accents */}
            <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Primary">
              <Link
                href="/"
                className={clsx(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive("/") && pathname === "/"
                    ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                    : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                )}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="group relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={clsx(
                    "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive("/services")
                      ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                      : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                  )}
                >
                  Services
                  <ChevronDown
                    className={clsx(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </Link>

                <div
                  className={clsx(
                    "absolute left-1/2 top-full w-84 -translate-x-1/2 pt-2 transition-all duration-200",
                    servicesOpen
                      ? "visible opacity-100 translate-y-0"
                      : "invisible -translate-y-1.5 opacity-0 pointer-events-none",
                  )}
                >
                  <div className="grid gap-1 rounded-2xl border border-white/60 bg-white/90 backdrop-blur-2xl p-3 shadow-[0_20px_50px_rgba(15,23,42,0.12)] ring-1 ring-black/[0.05]">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group/item flex items-center justify-between rounded-xl px-3 py-2 text-sm text-navy-800 transition-colors hover:bg-gradient-to-r hover:from-orange-50/90 hover:to-amber-50/40 hover:text-orange-700"
                      >
                        <span className="font-medium">{s.short}</span>
                        <span className="text-xs text-orange-500 opacity-0 transition-opacity group-hover/item:opacity-100 font-medium">
                          Explore →
                        </span>
                      </Link>
                    ))}
                    <div className="mt-2 border-t border-navy-100/60 pt-2">
                      <Link
                        href="/services"
                        className="block rounded-xl bg-navy-50/80 px-3 py-1.5 text-center text-xs font-semibold text-navy-800 hover:bg-orange-100 hover:text-orange-800 transition-colors"
                      >
                        View All 6 Core Services
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="/case-studies"
                className={clsx(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive("/case-studies")
                    ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                    : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                )}
              >
                Case Studies
              </Link>

              {/* Blogs */}
              <Link
                href="/blog"
                className={clsx(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive("/blog")
                    ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                    : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                )}
              >
                Blogs
              </Link>

              <Link
                href="/about"
                className={clsx(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive("/about")
                    ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                    : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                )}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className={clsx(
                  "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                  isActive("/contact")
                    ? "bg-orange-500/10 text-orange-600 font-semibold border border-orange-500/20 shadow-xs backdrop-blur-xs"
                    : "text-navy-800 hover:text-orange-600 hover:bg-navy-900/[0.04]",
                )}
              >
                Contact Us
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-3 lg:flex">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => openConsultation("quotation")}
                className={clsx(
                  "rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                  scrolled
                    ? "border border-navy-200/60 bg-white/60 text-navy-800 backdrop-blur-xs hover:border-orange-500/50 hover:bg-orange-50/60 hover:text-orange-600 shadow-xs"
                    : "text-navy-700 hover:text-orange-600 hover:bg-navy-50",
                )}
              >
                Request Quote
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => openConsultation("consultation")}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 active:scale-95"
              >
                <Calendar className="h-3.5 w-3.5" /> Book Consultation
              </motion.button>
            </div>

            {/* Mobile Actions: Book Consultation CTA + Glass Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => openConsultation("consultation")}
                className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white shadow-sm shadow-orange-500/25 transition-all hover:from-orange-600 hover:to-orange-700 active:scale-95"
                aria-label="Book Consultation"
              >
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span className="xs:hidden">Book</span>
                <span className="hidden xs:inline">Book Consultation</span>
              </motion.button>

              <button
                type="button"
                suppressHydrationWarning
                className={clsx(
                  "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl transition-all duration-200",
                  scrolled
                    ? "bg-navy-900/5 border border-navy-200/50 text-navy-900 backdrop-blur-xs hover:bg-orange-50 hover:text-orange-600 shadow-xs"
                    : "text-navy-900 hover:bg-navy-50",
                )}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Dynamic Ambient Scroll Progress Bar */}
          <div
            className={clsx(
              "pointer-events-none absolute bottom-0 left-0 right-0 h-[2.5px] overflow-hidden transition-opacity duration-300",
              scrolled ? "opacity-100" : "opacity-0",
            )}
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-cyan-400 shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-100 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>

        {/* Mobile Drawer with Glass Backdrop and Panel */}
        <div
          className={clsx(
            "fixed inset-0 top-0 z-40 lg:hidden",
            mobileOpen ? "visible" : "invisible",
          )}
        >
          <div
            className={clsx(
              "absolute inset-0 bg-navy-950/60 backdrop-blur-md transition-opacity duration-300",
              mobileOpen ? "opacity-100" : "opacity-0",
            )}
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className={clsx(
              "absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white/95 backdrop-blur-2xl border-l border-white/50 p-6 shadow-2xl transition-transform duration-300 ease-out",
              mobileOpen ? "translate-x-0" : "translate-x-full",
            )}
            aria-label="Mobile Navigation"
          >
            <div className="mb-6 flex items-center justify-between border-b border-navy-100 pb-4">
              <Image
                src="/logo/sharper_labs_logo.png"
                alt={`${site.name} logo`}
                width={150}
                height={46}
                loading="lazy"
                sizes="150px"
                className="h-10 w-auto"
              />
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-50 text-navy-900 transition-colors hover:bg-orange-50 hover:text-orange-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "border-b border-navy-50 py-3 text-base font-medium transition-colors",
                  isActive("/") && pathname === "/"
                    ? "text-orange-600 font-semibold"
                    : "text-navy-800 hover:text-orange-600",
                )}
              >
                Home
              </Link>

              <div className="border-b border-navy-50 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Core Services
                  </p>
                  <Link
                    href="/services"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-semibold text-orange-600 hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-1.5 pl-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="py-1 text-sm text-navy-700 hover:text-orange-600 transition-colors"
                    >
                      {s.short}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/case-studies"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "border-b border-navy-50 py-3 text-base font-medium transition-colors",
                  isActive("/case-studies")
                    ? "text-orange-600 font-semibold"
                    : "text-navy-800 hover:text-orange-600",
                )}
              >
                Case Studies
              </Link>

              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "border-b border-navy-50 py-3 text-base font-medium transition-colors",
                  isActive("/blog")
                    ? "text-orange-600 font-semibold"
                    : "text-navy-800 hover:text-orange-600",
                )}
              >
                Blogs
              </Link>

              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "border-b border-navy-50 py-3 text-base font-medium transition-colors",
                  isActive("/about")
                    ? "text-orange-600 font-semibold"
                    : "text-navy-800 hover:text-orange-600",
                )}
              >
                About Us
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  "border-b border-navy-50 py-3 text-base font-medium transition-colors",
                  isActive("/contact")
                    ? "text-orange-600 font-semibold"
                    : "text-navy-800 hover:text-orange-600",
                )}
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openConsultation("consultation")}
                className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-center text-sm font-semibold text-white shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 transition-all"
              >
                Book Free Consultation
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => openConsultation("quotation")}
                className="w-full rounded-xl border border-navy-200/80 bg-white/70 backdrop-blur-xs py-2.5 text-center text-sm font-semibold text-navy-800 hover:border-orange-500 hover:text-orange-600 transition-all"
              >
                Request Quotation
              </motion.button>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 text-center text-xs font-semibold text-navy-600 pt-2 hover:text-orange-600 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-orange-500" /> {site.phoneIntl}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Global Consultation / Quotation / Audit Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalTab}
      />
    </>
  );
}

