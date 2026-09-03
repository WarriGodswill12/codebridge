"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const statement =
  "We build the exact system your business needs — not the closest off-the-shelf equivalent. Production-ready, shipped in weeks.";

const builds = [
  {
    title: "Client onboarding portals",
    description: "Replace email chaos with a branded, automated intake system.",
  },
  {
    title: "SaaS MVPs",
    description: "A working product in 6–12 weeks. Secure, scalable, production-ready.",
  },
  {
    title: "Internal tools & dashboards",
    description: "Kill the spreadsheets. Get a tool built around how you actually work.",
  },
  {
    title: "Booking & scheduling systems",
    description: "Custom booking built around your exact pricing, routing, and workflow.",
  },
  {
    title: "AI feature integration",
    description: "Add AI to your existing product — no full rebuild required.",
  },
];

export function WhatWeBuild() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const ctx = gsap.context(() => {
      // the headline words fade in on their own local scroll range —
      // the surrounding page's black/white theme is handled globally
      // by ScrollThemeController, this only controls this text's own
      // reveal (opacity, not color, so it composes correctly on top
      // of whatever color the global theme currently is).
      const words = gsap.utils.toArray<HTMLElement>("[data-reveal-word]");
      gsap.set(words, { opacity: 0.25 });

      gsap.to(words, {
        opacity: 1,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
      });

      const rows = gsap.utils.toArray<HTMLElement>("[data-build-row]");
      gsap.set(rows, { opacity: 0, y: 16 });

      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: rowsRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-build"
      data-theme="dark"
      ref={sectionRef}
      className="px-6 py-24 sm:py-32 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium tracking-[0.14em] text-(--page-muted-foreground) uppercase">
          What we build
        </p>

        <p className="mt-6 max-w-3xl text-2xl leading-[1.35] font-medium sm:text-3xl lg:text-4xl">
          {statement.split(" ").map((word, i) => (
            <span key={i} data-reveal-word className="inline-block">
              {word}&nbsp;
            </span>
          ))}
        </p>

        <div ref={rowsRef} className="mt-16 flex flex-col">
          {builds.map((item) => (
            <div
              key={item.title}
              data-build-row
              className="grid gap-2 border-t border-(--page-foreground)/15 py-7 sm:grid-cols-[1fr_1.4fr] sm:gap-8 sm:py-8"
            >
              <h3 className="text-lg font-medium sm:text-xl">{item.title}</h3>
              <p className="text-sm leading-relaxed text-(--page-muted-foreground) sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
          <div className="border-t border-(--page-foreground)/15" />
        </div>
      </div>
    </section>
  );
}
