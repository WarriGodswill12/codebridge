"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const steps = [
  {
    index: "01",
    title: "Discovery call",
    description:
      "A focused conversation on your goals, timeline, and what success actually looks like.",
  },
  {
    index: "02",
    title: "Design & scope",
    description:
      "We map the experience, define scope, and align on a plan before writing a line of code.",
  },
  {
    index: "03",
    title: "Build in sprints",
    description:
      "Weekly builds, tight feedback loops, and a product you can see take shape in real time.",
  },
  {
    index: "04",
    title: "Ship & iterate",
    description:
      "We launch, monitor what matters, and keep refining based on real usage.",
    dark: true,
  },
];

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      // the whole row moves as one rigid block, so the gap between
      // cards never changes during the animation.
      gsap.set(gridRef.current, { x: 120 });
      gsap.set(cards, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: true,
        },
      });

      tl.to(gridRef.current, { x: 0 }).to(
        cards,
        { opacity: 1, stagger: 0.12 },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 pt-4 pb-24 sm:pt-8 sm:pb-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal y={16}>
          <ScrambleIn
            text="Our process"
            className="text-xs font-medium tracking-[0.14em] text-muted-foreground uppercase"
          />
        </Reveal>
        <SplitHeading delay={0.1}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl italic sm:text-4xl lg:text-5xl">
            From first call to shipped product.
          </h2>
        </SplitHeading>

        <div ref={rowRef} className="mt-14 overflow-hidden">
          <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Card
                key={step.index}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className={cn(
                  "relative min-h-72 justify-between overflow-hidden rounded-2xl border-none py-8 ring-0",
                  step.dark
                    ? "bg-foreground text-background"
                    : "bg-secondary text-secondary-foreground"
                )}
              >
                {step.dark && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -bottom-16 size-56 rounded-full opacity-60 blur-3xl"
                    style={{
                      background:
                        "radial-gradient(circle, color-mix(in oklch, var(--primary), transparent 20%) 0%, transparent 70%)",
                    }}
                  />
                )}
                <CardHeader className="relative px-8">
                  <span
                    className={cn(
                      "font-mono text-xs",
                      step.dark ? "text-background/50" : "text-muted-foreground"
                    )}
                  >
                    {step.index}
                  </span>
                  <CardTitle className="mt-3 text-xl font-medium">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8">
                  <CardDescription
                    className={cn(
                      "text-sm leading-relaxed",
                      step.dark ? "text-background/70" : "text-muted-foreground"
                    )}
                  >
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-14 flex justify-center">
          <Magnetic>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="h-12 gap-2 rounded-full px-7 text-xs font-semibold tracking-widest uppercase"
            >
              Book a 15-min call
              <ArrowRight className="size-4" />
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
