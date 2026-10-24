"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop Provider Component
 * Ensures every page navigation starts at the very top (Hero section)
 * by resetting browser scroll restoration, window coordinates, Lenis, and GSAP ScrollTrigger.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Enforce manual scroll restoration so the browser doesn't restore bottom scroll offsets
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // 2. If the navigation targets an anchor hash (e.g. #main, #contact), honor the anchor
    if (typeof window !== "undefined" && window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // 3. Immediate synchronous scroll reset
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 4. Reset Lenis momentum scroll instance if active
    const globalLenis = (window as any).lenis;
    if (globalLenis && typeof globalLenis.scrollTo === "function") {
      globalLenis.scrollTo(0, { immediate: true });
    }

    // 5. Secondary frame pass to ensure dynamic components mounted after hydration stay at top
    const rafId = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const l = (window as any).lenis;
      if (l && typeof l.scrollTo === "function") {
        l.scrollTo(0, { immediate: true });
      }

      if (typeof window !== "undefined" && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname]);

  return null;
}
