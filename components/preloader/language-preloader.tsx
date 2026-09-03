"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { PRELOADER_DONE_EVENT } from "@/lib/preloader-state";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
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

    gsap.set(panel, { transformOrigin: "50% 0%" });

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
    tl.to(panel, {
      borderRadius: "0% 0% 58% 42% / 0% 0% 92% 100%",
      duration: 0.3,
      ease: "power2.inOut",
    }).to(panel, {
      scaleY: 0,
      borderRadius: "0% 0% 50% 50% / 0% 0% 45% 45%",
      duration: 0.65,
      ease: "power3.in",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-100 overflow-hidden">
      <div
        ref={panelRef}
        className="absolute inset-0 flex items-center justify-center bg-background"
      >
        <span
          ref={wordRef}
          className="font-display text-4xl text-black italic opacity-0 sm:text-6xl"
        />
      </div>
    </div>
  );
}
