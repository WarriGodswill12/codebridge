"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { PRELOADER_DONE_EVENT } from "@/lib/preloader-state";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const heading = headingRef.current;
    if (!heading) return;

    let split: SplitText | undefined;
    let playCtx: gsap.Context | undefined;
    let playFn: (() => void) | undefined;

    // explicit set + to (not `.from()`) — `.from()` captures the
    // element's *current* value as its target, which under React
    // StrictMode's dev-only double-effect-invoke can race: the first
    // run zeroes opacity, gets reverted, and the second run's
    // `.from()` then captures that already-zeroed value as its own
    // target, animating 0 -> 0 and leaving everything invisible.
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-cta]", { opacity: 0, y: 12 });

      split = SplitText.create(heading, {
        type: "words,chars",
        mask: "chars",
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
          gsap.set(instance.chars, { yPercent: 120, opacity: 0 });

          playFn = () => {
            playCtx = gsap.context(() => {
              const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
              tl.to(instance.chars, {
                yPercent: 0,
                opacity: 1,
                stagger: 0.012,
                duration: 0.8,
              }).to(
                "[data-hero-cta]",
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 },
                "-=0.4"
              );
            }, rootRef);
          };

          // hold the reveal until the preloader finishes instead of
          // animating in underneath it.
          window.addEventListener(PRELOADER_DONE_EVENT, playFn, { once: true });
        },
      });
    }, rootRef);

    return () => {
      if (playFn) window.removeEventListener(PRELOADER_DONE_EVENT, playFn);
      ctx.revert();
      playCtx?.revert();
      split?.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex flex-col items-center justify-center gap-6 overflow-hidden px-6 h-screen pb-20 text-center sm:gap-8 sm:pt-24 sm:pb-28"
    >
      <h1
        ref={headingRef}
        className="relative max-w-4xl font-display text-3xl leading-[1.15] font-medium text-balance sm:text-5xl lg:text-7xl"
      >
        Codebridge is a <em className="font-display italic">design</em> and{" "}
        <em className="font-display italic">engineering</em> studio that builds
        fast, beautiful products{" "}
        <em className="font-display italic">for the modern web</em>.
      </h1>

      <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-5">
        <Magnetic data-hero-cta>
          <Button
            variant="outline"
            render={<Link href="/work" />}
            nativeButton={false}
            className="h-11 rounded-full border-foreground/70 bg-transparent px-6 text-xs font-semibold tracking-widest text-foreground uppercase hover:bg-foreground hover:text-background sm:h-12 sm:px-7"
          >
            Our Work
          </Button>
        </Magnetic>
        <Magnetic data-hero-cta>
          <Button
            variant="ghost"
            render={<Link href="/services" />}
            nativeButton={false}
            className="group h-11 gap-2 rounded-full px-4 text-xs font-semibold tracking-widest text-foreground uppercase sm:h-12"
          >
            Our Services
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Magnetic>
      </div>
    </div>
  );
}
