"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface OrbitalBadge {
  label: string;
  color: string;
  /** degrees, 0 = due right, increases clockwise (matches screen y-down) */
  angle: number;
  /** static tilt applied independently of orbital motion, in degrees */
  rotation: number;
  /** multiplier applied to the base orbit radius, defaults to 1 */
  radiusFactor?: number;
}

interface OrbitalMarqueeProps {
  badges: OrbitalBadge[];
  children: React.ReactNode;
  className?: string;
}

const BASE_VELOCITY = 0.035; // deg per 60fps-normalized frame — slow, ambient
const MAX_VELOCITY = 2.4; // clamp on the applied velocity
const MAX_SCROLL_BOOST = 3.4; // clamp on the scroll-derived contribution
const SCROLL_MULTIPLIER = 0.045; // raw scroll delta -> velocity contribution
const SCROLL_DECAY = 0.9; // per-frame decay of the raw scroll signal
const VELOCITY_SMOOTHING = 0.06; // inertia: how fast current chases target

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function OrbitalMarquee({ badges, children, className }: OrbitalMarqueeProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const badgeElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const radiiRef = useRef({ rx: 320, ry: 220 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      radiiRef.current = {
        rx: rect.width * 0.44,
        ry: rect.height * 0.42,
      };
    };
    measure();

    const applyPosition = (angleDeg: number) => {
      const { rx, ry } = radiiRef.current;
      badgeElsRef.current.forEach((el, i) => {
        if (!el) return;
        const badge = badges[i];
        const factor = badge.radiusFactor ?? 1;
        const rad = ((angleDeg + badge.angle) * Math.PI) / 180;
        const x = Math.cos(rad) * rx * factor;
        const y = Math.sin(rad) * ry * factor;
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(
          2
        )}px), calc(-50% + ${y.toFixed(2)}px), 0) rotate(${badge.rotation}deg)`;
      });
    };

    if (reduceMotion) {
      applyPosition(0);
      const ro = new ResizeObserver(() => {
        measure();
        applyPosition(0);
      });
      ro.observe(stage);
      return () => ro.disconnect();
    }

    let angle = 0;
    let currentVelocity = BASE_VELOCITY;
    let targetVelocity = BASE_VELOCITY;
    let rawScrollDelta = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      rawScrollDelta += y - lastScrollY;
      lastScrollY = y;
    };

    const tick = () => {
      const dr = gsap.ticker.deltaRatio(60);

      rawScrollDelta *= SCROLL_DECAY;
      const scrollBoost = clamp(
        rawScrollDelta * SCROLL_MULTIPLIER,
        -MAX_SCROLL_BOOST,
        MAX_SCROLL_BOOST
      );

      targetVelocity = BASE_VELOCITY + scrollBoost;
      currentVelocity += (targetVelocity - currentVelocity) * VELOCITY_SMOOTHING;
      currentVelocity = clamp(currentVelocity, -MAX_VELOCITY, MAX_VELOCITY);

      angle += currentVelocity * dr;

      applyPosition(angle);
    };

    applyPosition(angle);

    window.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      gsap.ticker.remove(tick);
    };
  }, [badges]);

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative mx-auto h-105 w-full max-w-4xl sm:h-120 lg:h-155",
        className
      )}
    >
      <div className="absolute top-1/2 left-1/2 z-10 max-w-45 -translate-x-1/2 -translate-y-1/2 text-center sm:max-w-sm lg:max-w-lg">
        {children}
      </div>

      {badges.map((badge, i) => (
        <div
          key={badge.label}
          ref={(el) => {
            badgeElsRef.current[i] = el;
          }}
          className="absolute top-1/2 left-1/2 will-change-transform"
        >
          <span
            className="inline-block rounded-full px-2 py-1 text-[9px] font-semibold whitespace-nowrap text-black sm:px-3.5 sm:py-1.5 sm:text-[13px]"
            style={{ backgroundColor: badge.color }}
          >
            {badge.label}
          </span>
        </div>
      ))}
    </div>
  );
}
