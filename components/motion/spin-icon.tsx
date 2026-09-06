"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

/** Continuous slow rotation for decorative icons — idle "alive" motion, not a hover state. */
export function SpinIcon({
  children,
  duration = 9,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.to(el, { rotate: 360, duration, ease: "none", repeat: -1 });
    return () => {
      tween.kill();
    };
  }, [duration]);

  return (
    <span ref={ref} className={className} style={{ display: "inline-flex" }}>
      {children}
    </span>
  );
}
