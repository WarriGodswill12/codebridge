"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";

const LOCATIONS = ["United States", "United Kingdom", "Europe", "Africa"];

export function LocationsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // the track renders two identical copies of LOCATIONS back to back —
      // scrolling exactly one copy's height then resetting is invisible,
      // giving a seamless infinite loop.
      const setHeight = track.scrollHeight / 2;
      gsap.set(track, { y: 0 });
      gsap.to(track, {
        y: -setHeight,
        duration: LOCATIONS.length * 3.2,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-foreground px-6 py-20 text-background sm:py-28 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal y={12}>
          <ScrambleIn
            text="Where we've worked"
            className="text-xs font-medium tracking-[0.14em] text-background/60 uppercase"
          />
        </Reveal>

        <div
          className="relative mx-auto mt-6 h-[300px] overflow-hidden sm:h-[380px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)",
          }}
        >
          <div ref={trackRef} className="flex flex-col items-center">
            {[...LOCATIONS, ...LOCATIONS].map((loc, i) => (
              <span
                key={i}
                className="py-3 font-display text-4xl font-semibold tracking-tight uppercase sm:py-4 sm:text-6xl"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-sm text-background/70 sm:text-base">
            We&apos;ve had the pleasure of working with founders and
            operators across all of these places.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
