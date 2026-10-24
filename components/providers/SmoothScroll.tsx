"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Unified Smooth Scroll Provider
 * Synchronizes Lenis inertial scrolling directly with GSAP's RAF ticker
 * and ensures full ScrollTrigger update cycles without lag.
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // 1. Enforce manual scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Initialize Lenis with smooth momentum settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      prevent: (node) => {
        return Boolean(
          node.hasAttribute?.("data-lenis-prevent") ||
          node.closest?.("[data-lenis-prevent]") ||
          node.closest?.("[role='dialog']")
        );
      },
    });

    lenisRef.current = lenis;

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Immediately snap to top on mounting this page if not an anchor link
    if (typeof window !== "undefined" && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    // Direct binding: when Lenis scrolls, notify ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis RAF ticker with GSAP's master ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger to calculate initial geometry
    ScrollTrigger.refresh();

    // Clean disposal on unmount
    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        if ((window as any).lenis === lenis) {
          (window as any).lenis = null;
        }
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // When pathname changes while provider is active
  useEffect(() => {
    if (typeof window !== "undefined" && !window.location.hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();
    }
  }, [pathname]);

  return <>{children}</>;
}
