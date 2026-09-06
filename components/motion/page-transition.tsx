"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { blobCoverIn, blobRevealOut } from "@/lib/blob-wipe";

/**
 * Reuses the language preloader's blob wipe as an in-app page transition:
 * intercept a same-origin link click, cover the viewport with the blob
 * before navigating, then peel it away once the new route has rendered
 * underneath. A pathname change we didn't cause ourselves (back/forward)
 * skips straight to the reveal instead of covering after the fact, since
 * by then the new page is already painted.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const transitioningRef = useRef(false);
  const prevPathnameRef = useRef(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;

      const destination = new URL(href, window.location.origin);
      if (destination.pathname === window.location.pathname) return;

      const panel = panelRef.current;
      if (!panel || transitioningRef.current) return;

      event.preventDefault();
      transitioningRef.current = true;
      blobCoverIn(panel, () => router.push(href));
    }

    // Capture phase: Next's own <Link> click handler lives on the anchor
    // itself and calls preventDefault() there before a bubble-phase
    // listener on document would ever see the event, so intercepting on
    // the way down is the only way to get in front of it.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [mounted, router]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathnameRef.current = pathname;
      return;
    }
    if (pathname === prevPathnameRef.current) return;
    prevPathnameRef.current = pathname;

    const panel = panelRef.current;
    if (!panel) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      transitioningRef.current = false;
      return;
    }

    // Navigation we didn't intercept (browser back/forward): the new
    // page is already rendered, so snap to fully covered and just play
    // the reveal rather than covering over content that's already there.
    if (!transitioningRef.current) {
      gsap.set(panel, { scaleY: 1, borderRadius: "0% 0% 0% 0%" });
    }

    blobRevealOut(panel, () => {
      transitioningRef.current = false;
    });
  }, [pathname]);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-90 overflow-hidden">
      <div
        ref={panelRef}
        className="absolute inset-0 origin-bottom scale-y-0 border border-black bg-background"
      />
    </div>,
    document.body
  );
}
