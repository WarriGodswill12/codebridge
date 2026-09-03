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
 * with a trigger id and its own color-stop curve.
 */

// 9 evenly-spaced stops (progress 0.0 -> 1.0). cream and black are both
// hueless, so any smooth blend between them is mathematically gray —
// there's no way to interpolate #f6f5ef -> #000000 without passing
// through gray. What we can control is how long that's visible: the
// ramp is confined to a single 1/8th-wide segment at each end (rather
// than spread across ~30% of the range like before), so it reads as a
// quick snap into place instead of a lingering gray "stage" — cream and
// black each hold for the other 6/8ths.
const whatWeBuildBoundary = {
  triggerId: "what-we-build",
  start: "top bottom",
  end: "bottom top",
  background: [
    themes.light.background,
    themes.dark.background,
    themes.dark.background,
    themes.dark.background,
    themes.dark.background,
    themes.dark.background,
    themes.dark.background,
    themes.dark.background,
    themes.light.background,
  ],
  foreground: [
    themes.light.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.dark.foreground,
    themes.light.foreground,
  ],
  muted: [
    themes.light.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.dark.muted,
    themes.light.muted,
  ],
};

const boundaries = [whatWeBuildBoundary];

function applyTheme(boundary: (typeof boundaries)[number], progress: number) {
  const root = document.documentElement.style;
  root.setProperty("--page-background", gsap.utils.interpolate(boundary.background, progress));
  root.setProperty("--page-foreground", gsap.utils.interpolate(boundary.foreground, progress));
  root.setProperty(
    "--page-muted-foreground",
    gsap.utils.interpolate(boundary.muted, progress)
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
