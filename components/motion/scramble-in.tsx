"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);
}

/** Scrambles into its real text the first time it scrolls into view. */
export function ScrambleIn({
  text,
  className,
  start = "top 90%",
}: {
  text: string;
  className?: string;
  start?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        duration: 1,
        scrambleText: { text, chars: "upperAndLowerCase", revealDelay: 0.15, speed: 0.5 },
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
    });

    return () => ctx.revert();
  }, [text, start]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text}
    </span>
  );
}
