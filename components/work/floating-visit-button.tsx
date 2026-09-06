"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Portaled straight to <body> — this must never render as a descendant
 * of #smooth-content: ScrollSmoother applies a `transform` there, and a
 * `transform` on an ancestor redefines the containing block for any
 * `position: fixed` descendant (it stops tracking the true viewport and
 * instead scrolls away with that transformed container). Same fix as
 * the language preloader.
 */
export function FloatingVisitButton({ url }: { url: string }) {
  const [mounted, setMounted] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = wrapperRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      el.style.pointerEvents = "auto";
      return;
    }

    gsap.set(el, { opacity: 0, y: 24 });

    // Appears only once the visitor has scrolled a little way in, then
    // eases back out if they scroll back up past that point — never a
    // hard show/hide, always the same clean tween in both directions.
    const trigger = ScrollTrigger.create({
      start: "400px top",
      onEnter: () =>
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
          onStart: () => {
            el.style.pointerEvents = "auto";
          },
        }),
      onLeaveBack: () =>
        gsap.to(el, {
          opacity: 0,
          y: 24,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
          onStart: () => {
            el.style.pointerEvents = "none";
          },
        }),
    });

    return () => trigger.kill();
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={wrapperRef}
      style={{ opacity: 0, pointerEvents: "none" }}
      className="fixed inset-x-0 bottom-6 z-40 flex justify-center px-6"
    >
      <Magnetic>
        <Button
          render={<a href={url} target="_blank" rel="noopener noreferrer" />}
          nativeButton={false}
          className="h-12 gap-2 rounded-full bg-foreground px-7 text-xs font-semibold tracking-widest text-background uppercase shadow-xl shadow-black/20 hover:bg-foreground/90"
        >
          Visit live project
          <ArrowUpRight className="size-4" />
        </Button>
      </Magnetic>
    </div>,
    document.body
  );
}
