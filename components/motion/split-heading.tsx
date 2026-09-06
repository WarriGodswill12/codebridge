"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

type SplitHeadingProps = {
  children: ReactNode;
  className?: string;
  type?: "lines" | "words";
  start?: string;
  stagger?: number;
  delay?: number;
};

/**
 * Splits the wrapped heading into lines/words (via SplitText, masked so
 * each rises out from behind an overflow-hidden clip) and staggers them
 * in the first time the heading crosses `start` — a step up from a plain
 * whole-block fade for the page's big display headlines.
 */
export function SplitHeading({
  children,
  className,
  type = "words",
  start = "top 85%",
  stagger = 0.05,
  delay = 0,
}: SplitHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | undefined;
    const ctx = gsap.context(() => {
      split = SplitText.create(el, {
        type,
        mask: type,
        autoSplit: true,
        onSplit(instance) {
          // onSplit can fire synchronously (fonts already ready) — that's
          // still within gsap.context()'s own tracked window below, so
          // these get captured for cleanup automatically. It can also
          // re-fire later, asynchronously, on resize/font-load; those
          // later tweens fall outside the original context's tracking,
          // which is an acceptable trade-off (referencing the outer
          // `ctx` here instead would throw — it isn't assigned yet the
          // first, synchronous time this runs).
          const targets = type === "lines" ? instance.lines : instance.words;
          gsap.set(targets, { yPercent: 115, opacity: 0 });
          gsap.to(targets, {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            stagger,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
          });
        },
      });
    });

    return () => {
      ctx.revert();
      split?.revert();
    };
  }, [type, start, stagger, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
