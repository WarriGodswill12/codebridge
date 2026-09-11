"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
}

/**
 * Wraps the scrollable page body in ScrollSmoother's required
 * #smooth-wrapper/#smooth-content pair. The header and the fixed
 * page-background layer live OUTSIDE this tree (siblings, in
 * layout.tsx) — GSAP's own docs call this out explicitly: ScrollSmoother
 * drives its effect via a `transform` on #smooth-content, and a
 * `transform` on an ancestor creates a new containing block for any
 * `position: fixed` descendant, which would silently break their fixed
 * positioning (they'd scroll with the transform instead of staying put).
 *
 * Every existing ScrollTrigger in the app (the theme-color boundary, the
 * Process scrub, every scroll-reveal) keeps working unmodified — none of
 * them reference the scroller directly, so ScrollSmoother's proxying is
 * a drop-in underneath them.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    const header = document.querySelector("header");
    const setHeaderHeight = () => {
      if (!header) return;
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.getBoundingClientRect().height}px`
      );
    };
    setHeaderHeight();

    const ro = header ? new ResizeObserver(setHeaderHeight) : undefined;
    if (header && ro) ro.observe(header);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => ro?.disconnect();
    }

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });
    smootherRef.current = smoother;

    return () => {
      ro?.disconnect();
      smoother.kill();
      smootherRef.current = null;
    };
  }, []);

  // App Router route changes swap #smooth-content's children (and
  // therefore its height) without a native page load or a `resize`
  // event — the two things ScrollSmoother/ScrollTrigger normally rely
  // on to notice content changed. Left alone, every ScrollTrigger on
  // the new page (every scroll-reveal, the theme boundary, etc.) keeps
  // using the previous page's stale scroll-height measurements, so
  // triggers that should already be "in view" on a short new page
  // never fire. Scrolling to top and refreshing after the new content
  // paints fixes both.
  useEffect(() => {
    smootherRef.current?.scrollTop(0);
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());
    // a second, delayed refresh catches content that settles after the
    // first paint (webfonts swapping in, images finishing layout).
    const timeoutId = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  const isAdmin = pathname.startsWith("/admin");

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className={isAdmin ? undefined : "pt-(--header-height)"}>
        {children}
      </div>
    </div>
  );
}
