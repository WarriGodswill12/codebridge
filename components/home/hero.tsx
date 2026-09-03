"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PRELOADER_DONE_EVENT } from "@/lib/preloader-state";

const headline: { text: string; emphasis?: boolean }[] = [
  { text: "Codebridge is a " },
  { text: "design", emphasis: true },
  { text: " and " },
  { text: "engineering", emphasis: true },
  { text: " studio that builds fast, beautiful products " },
  { text: "for the modern web", emphasis: true },
  { text: "." },
];

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    // explicit set + to (not `.from()`) — `.from()` captures the
    // element's *current* value as its target, which under React
    // StrictMode's dev-only double-effect-invoke can race: the first
    // run zeroes opacity, gets reverted, and the second run's
    // `.from()` then captures that already-zeroed value as its own
    // target, animating 0 -> 0 and leaving everything invisible.
    const setupCtx = gsap.context(() => {
      gsap.set("[data-hero-word]", { opacity: 0, y: 24 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 12 });
    }, rootRef);

    let playCtx: gsap.Context | undefined;
    const play = () => {
      playCtx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.to("[data-hero-word]", { opacity: 1, y: 0, stagger: 0.035, duration: 0.6 })
          .to(
            "[data-hero-cta]",
            { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
            "-=0.3"
          );
      }, rootRef);
    };

    // hold the reveal until the preloader finishes instead of
    // animating in underneath it.
    window.addEventListener(PRELOADER_DONE_EVENT, play, { once: true });

    return () => {
      setupCtx.revert();
      playCtx?.revert();
      window.removeEventListener(PRELOADER_DONE_EVENT, play);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex flex-col items-center justify-center gap-6 px-6 h-screen pt-16 pb-20 text-center sm:gap-8 sm:pt-24 sm:pb-28"
    >
      <h1 className="max-w-4xl font-display text-3xl leading-[1.15] font-medium text-balance sm:text-5xl lg:text-7xl">
        {headline.map((segment, i) => (
          <span
            key={i}
            data-hero-word
            className={cn("inline", segment.emphasis && "font-display italic")}
          >
            {segment.text}
          </span>
        ))}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        <Button
          data-hero-cta
          variant="outline"
          render={<Link href="/work" />}
          nativeButton={false}
          className="h-11 rounded-full border-foreground/70 bg-transparent px-6 text-xs font-semibold tracking-widest text-foreground uppercase hover:bg-foreground hover:text-background sm:h-12 sm:px-7"
        >
          Our Work
        </Button>
        <Button
          data-hero-cta
          variant="ghost"
          render={<Link href="/services" />}
          nativeButton={false}
          className="group h-11 gap-2 rounded-full px-4 text-xs font-semibold tracking-widest text-foreground uppercase sm:h-12"
        >
          Our Services
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}
