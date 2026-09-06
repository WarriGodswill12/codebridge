"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

/** Fades + rises a single block into view once, the first time it crosses `start`. */
export function Reveal({
  children,
  className,
  y = 28,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, [y, duration, delay, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
};

/** Staggers every direct-or-nested `[data-reveal-item]` descendant into view once. */
export function RevealGroup({
  children,
  className,
  y = 24,
  stagger = 0.08,
  duration = 0.7,
  start = "top 85%",
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = el.querySelectorAll("[data-reveal-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, { opacity: 0, y });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        stagger,
        duration,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, [y, stagger, duration, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
