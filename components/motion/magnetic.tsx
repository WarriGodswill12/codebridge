"use client";

import { useRef, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { gsap } from "gsap";

/** Pulls its contents gently toward the cursor on hover, springing back on leave. */
export function Magnetic({
  children,
  strength = 0.35,
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const reduceMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: "power3.out" });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
