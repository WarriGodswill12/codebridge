"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/** Three-bar hamburger that morphs into an X — animated, not swapped icons. */
export function MenuIcon({ open, className }: { open: boolean; className?: string }) {
  const topRef = useRef<HTMLSpanElement>(null);
  const midRef = useRef<HTMLSpanElement>(null);
  const botRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 0.35;
    const ease = "power3.inOut";

    gsap.to(topRef.current, { y: open ? 6.5 : 0, rotate: open ? 45 : 0, duration, ease });
    gsap.to(midRef.current, { opacity: open ? 0 : 1, duration: duration * 0.6, ease });
    gsap.to(botRef.current, { y: open ? -6.5 : 0, rotate: open ? -45 : 0, duration, ease });
  }, [open]);

  return (
    <span className={cn("relative flex h-4 w-5 flex-col items-center", className)}>
      <span
        ref={topRef}
        className="absolute h-[1.5px] w-5 rounded-full bg-current"
        style={{ top: 0, transformOrigin: "50% 50%" }}
      />
      <span
        ref={midRef}
        className="absolute h-[1.5px] w-5 rounded-full bg-current"
        style={{ top: 6.5 }}
      />
      <span
        ref={botRef}
        className="absolute h-[1.5px] w-5 rounded-full bg-current"
        style={{ top: 13, transformOrigin: "50% 50%" }}
      />
    </span>
  );
}
