"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const testimonials = [
  {
    quote:
      "They didn't just build what we asked for. They told us what we actually needed. The platform shipped in 10 weeks and it was exactly right.",
    name: "James T.",
    role: "Founder",
    company: "Sports Tech, Texas",
  },
  {
    quote:
      "Our onboarding went from a 5-day nightmare to same-day completion. The portal is slicker than anything an off-the-shelf tool could have given us.",
    name: "Sarah K.",
    role: "CEO",
    company: "Relocation Services, London",
  },
  {
    quote:
      "I've worked with dev shops that charged more and delivered less. This team communicates clearly, ships on time, and the code is solid.",
    name: "Michael R.",
    role: "CTO",
    company: "SaaS Platform, New York",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function metaLine(t: (typeof testimonials)[number]) {
  return `${t.name}, ${t.role} at ${t.company}`;
}

const AUTOPLAY_INTERVAL = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const avatarRef = useRef<HTMLSpanElement>(null);
  const animating = useRef(false);
  const goToRef = useRef<(next: number) => void>(() => {});
  const restartAutoplayRef = useRef<() => void>(() => {});

  goToRef.current = (nextIndex: number) => {
    if (animating.current || nextIndex === indexRef.current) return;
    animating.current = true;

    const quote = quoteRef.current;
    const meta = metaRef.current;
    const avatar = avatarRef.current;
    const next = testimonials[nextIndex];

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false;
      },
    });

    tl.to([quote, meta, avatar], { opacity: 0, y: -10, duration: 0.25, ease: "power2.in" })
      .call(() => {
        if (quote) quote.textContent = `"${next.quote}"`;
        if (meta) meta.textContent = metaLine(next);
        if (avatar) avatar.textContent = initials(next.name);
        indexRef.current = nextIndex;
        setIndex(nextIndex);
      })
      .fromTo(
        [quote, meta, avatar],
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let id: ReturnType<typeof setInterval>;
    const start = () => {
      id = setInterval(() => {
        goToRef.current((indexRef.current + 1) % testimonials.length);
      }, AUTOPLAY_INTERVAL);
    };
    restartAutoplayRef.current = () => {
      clearInterval(id);
      start();
    };
    start();

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // lets visitors swipe (touch) or click-drag (pointer) through
    // testimonials without waiting for autoplay — left advances, right
    // goes back, same convention as a horizontal carousel. Deliberately
    // NOT "wheel": most visitors' wheel/trackpad input here is vertical
    // page-scroll, and hijacking that for carousel navigation would
    // break normal scrolling through the section.
    const observer = Observer.create({
      target: section,
      type: "touch,pointer",
      tolerance: 12,
      preventDefault: false,
      onLeft: () => {
        goToRef.current((indexRef.current + 1) % testimonials.length);
        restartAutoplayRef.current();
      },
      onRight: () => {
        goToRef.current((indexRef.current - 1 + testimonials.length) % testimonials.length);
        restartAutoplayRef.current();
      },
    });

    return () => observer.kill();
  }, []);

  const handleDotClick = (i: number) => {
    goToRef.current(i);
    restartAutoplayRef.current();
  };

  const first = testimonials[0];

  return (
    <section ref={sectionRef} className="touch-pan-y px-6 py-20 sm:py-28 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <blockquote
          ref={quoteRef}
          className="font-display text-2xl leading-relaxed italic text-balance sm:text-3xl"
        >
          &quot;{first.quote}&quot;
        </blockquote>

        <div className="mt-8 flex flex-col items-center gap-3">
          
          <p
            ref={metaRef}
            className="text-xs font-medium tracking-[0.1em] text-muted-foreground uppercase"
          >
            {metaLine(first)}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => handleDotClick(i)}
              aria-label={`Show testimonial from ${t.name}`}
              aria-current={i === index}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-6 bg-foreground" : "w-2 bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
