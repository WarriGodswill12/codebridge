"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { themes } from "./theme-config";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Global scroll-driven theme transition, applied to the whole landing
 * page via the fixed background layer + CSS vars in layout.tsx — NOT
 * to the trigger section itself. Each boundary's ScrollTrigger spans
 * that section's entire transit through the viewport ("top bottom" to
 * "bottom top", which is inherently responsive — no separate mobile
 * tuning needed), so the page darkens as the section arrives, holds
 * while it's in view, and lightens back as it leaves — in both scroll
 * directions, since it's driven by scroll position, not a one-shot
 * trigger.
 *
 * To add another global transition later, give it its own entry below
 * with a trigger id and its own from/to theme pair.
 */
const whatWeBuildBoundary = {
  triggerId: "what-we-build",
  start: "top bottom",
  end: "bottom top",
  from: themes.light,
  to: themes.dark,
};

const boundaries = [whatWeBuildBoundary];

// cream and black are both hueless, so any blend between them is
// mathematically gray — there's no way to interpolate #f6f5ef ->
// #000000 without passing through it. A snap only *looks* instant if
// that gray is on screen for as little scroll distance as possible, so
// rather than crossfading across the whole boundary transit (which
// reads as a slow fade through mud), the swap is compressed into a
// short ramp right at each edge — the rest of the transit just holds
// at a flat color. `power2.in`/`.out` inside that short ramp keeps the
// snap itself from reading as a jarring hard cut.
const RAMP = 0.035; // fraction of the boundary's scroll transit per edge
const easeIn = gsap.parseEase("power2.in");
const easeOut = gsap.parseEase("power2.out");

function snap(progress: number) {
  if (progress <= RAMP) return easeIn(progress / RAMP);
  if (progress >= 1 - RAMP) return 1 - easeOut((progress - (1 - RAMP)) / RAMP);
  return 1;
}

function applyTheme(boundary: (typeof boundaries)[number], rawProgress: number) {
  const t = snap(rawProgress);
  const root = document.documentElement.style;
  root.setProperty(
    "--page-background",
    gsap.utils.interpolate(boundary.from.background, boundary.to.background, t)
  );
  root.setProperty(
    "--page-foreground",
    gsap.utils.interpolate(boundary.from.foreground, boundary.to.foreground, t)
  );
  root.setProperty(
    "--page-muted-foreground",
    gsap.utils.interpolate(boundary.from.muted, boundary.to.muted, t)
  );
}

export function ScrollThemeController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      boundaries.forEach((boundary) => {
        const target = document.getElementById(boundary.triggerId);
        if (!target) return;

        const trigger = ScrollTrigger.create({
          trigger: target,
          start: boundary.start,
          end: boundary.end,
          onUpdate: (self) => applyTheme(boundary, self.progress),
        });

        applyTheme(boundary, trigger.progress);
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
