"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { PRELOADER_DONE_EVENT } from "@/lib/preloader-state";
import { blobRevealOut } from "@/lib/blob-wipe";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Hallo",
  "Olá",
  "Merhaba",
  "Xin chào",
  "Codebridge",
];

export function LanguagePreloader() {
  const [visible, setVisible] = useState(true);
  // Rendered via a portal straight to <body> (see below) — gate the
  // first client render on this so the portal never runs during SSR
  // (no `document` there) and the client's first render matches the
  // server's (both render nothing) before hydration swaps it in.
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // wait for the mounted render so panelRef/wordRef are actually
    // attached — this effect re-fires once `mounted` flips true.
    if (!mounted) return;

    const finish = () => {
      window.dispatchEvent(new Event(PRELOADER_DONE_EVENT));
      document.body.style.overflow = "";
      setVisible(false);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      // deferred so sibling components (e.g. Hero) have registered
      // their PRELOADER_DONE_EVENT listener before it fires — this
      // effect can otherwise run before theirs in the same commit.
      const id = setTimeout(finish, 0);
      return () => clearTimeout(id);
    }

    document.body.style.overflow = "hidden";
    const word = wordRef.current;
    const panel = panelRef.current;
    if (!word || !panel) return;

    const tl = gsap.timeline({ onComplete: finish });

    greetings.forEach((greeting, i) => {
      const isLast = i === greetings.length - 1;
      tl.call(() => {
        word.textContent = greeting;
      })
        .fromTo(
          word,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" }
        )
        .to(word, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in",
          delay: isLast ? 0.35 : 0.16,
        });
    });

    // exit: the panel stays anchored to the top edge and its bottom
    // edge — shaped into an organic blob rather than a straight line —
    // rises up to meet it, so the whole thing reads as being pulled
    // out through the top rather than shrinking away in the center.
    // Shared with the in-app page-transition wipe, see lib/blob-wipe.ts.
    tl.add(blobRevealOut(panel));

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [mounted]);

  if (!visible || !mounted) return null;

  // Portaled straight to <body> — this must never render as a
  // descendant of #smooth-content: ScrollSmoother applies a `transform`
  // there, and a `transform` on an ancestor redefines the containing
  // block for any `position: fixed` descendant (it stops being fixed to
  // the true viewport and becomes "fixed" to that transformed ancestor
  // instead), which silently breaks full-viewport overlays like this.
  return createPortal(
    <div className="fixed inset-0 z-100 overflow-hidden">
      <div
        ref={panelRef}
        className="absolute inset-0 flex items-center justify-center border border-black bg-background"
      >
        <span
          ref={wordRef}
          className="font-display text-4xl text-black italic opacity-0 sm:text-6xl"
        />
      </div>
    </div>,
    document.body
  );
}
