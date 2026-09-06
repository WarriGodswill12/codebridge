import { gsap } from "gsap";

/**
 * The organic "blob" wipe from the language preloader: a full-bleed panel
 * pinned to one edge while its opposite edge bulges into an asymmetric
 * curve, then collapses back toward the pinned edge. Shared so in-app page
 * transitions read as the same signature motion as the very first load,
 * instead of a second, slightly-different-looking copy of it.
 */

/** Grows the panel up from the bottom edge to fully cover the viewport. */
export function blobCoverIn(panel: HTMLElement, onComplete?: () => void) {
  gsap.set(panel, {
    transformOrigin: "50% 100%",
    scaleY: 0,
    borderRadius: "58% 42% 0% 0% / 92% 100% 0% 0%",
  });

  return gsap
    .timeline({ onComplete })
    .to(panel, { scaleY: 1, duration: 0.35, ease: "power3.out" })
    .to(
      panel,
      { borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0%", duration: 0.2, ease: "power2.out" },
      "-=0.1"
    );
}

/** Bulges the panel's bottom edge into a blob, then pulls it up and out through the top. */
export function blobRevealOut(panel: HTMLElement, onComplete?: () => void) {
  gsap.set(panel, { transformOrigin: "50% 0%" });

  return gsap
    .timeline({ onComplete })
    .to(panel, {
      borderRadius: "0% 0% 58% 42% / 0% 0% 92% 100%",
      duration: 0.3,
      ease: "power2.inOut",
    })
    .to(panel, {
      scaleY: 0,
      borderRadius: "0% 0% 50% 50% / 0% 0% 45% 45%",
      duration: 0.65,
      ease: "power3.in",
    });
}
