"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Phase = "idle" | "scatter" | "falling" | "settled" | "reassembling";

type Particle = {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  char: string;
  baseChar: string;
  mass: number;
};

// low -> high density, per the brief: characters vary by sampled brightness
// rather than every particle looking identical.
const RAMP = [".", ":", "'", "+", "*", "x", "X", "#", "%"];

function charForBrightness(brightness: number) {
  const idx = Math.min(RAMP.length - 1, Math.floor((brightness / 255) * RAMP.length));
  return RAMP[idx];
}

function randomChar() {
  return RAMP[(Math.random() * RAMP.length) | 0];
}

const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/**
 * Renders `text` as a field of small ASCII glyphs sampled from the text's
 * own silhouette, simulated as a real particle system (not CSS/DOM
 * animation): every particle carries a permanent homeX/homeY plus its own
 * velocity, and a click-driven state machine takes the whole field through
 * idle -> scatter -> falling -> settled -> reassembling -> idle. Canvas 2D,
 * not WebGL/Three — this is a 2D per-character physics sim, and the
 * existing cursor-repulsion version of this component already proved
 * Canvas 2D handles ~1,400 particles at 30fps comfortably; GSAP is
 * deliberately not driving the particles themselves (1,400+ individual
 * tweens would cost far more than one rAF loop mutating plain objects).
 */
export function AsciiParticleText({
  text,
  className,
  color = "rgba(255,255,255,0.45)",
  style,
  interactionRadius = 90,
  interactionStrength = 2600,
  settleDelayMs = 3000,
}: {
  text: string;
  className?: string;
  color?: string;
  style?: CSSProperties;
  /** cursor force-field radius in CSS px */
  interactionRadius?: number;
  /** cursor repulsion strength */
  interactionStrength?: number;
  /** how long particles rest at the bottom before reassembling (2000-4000ms) */
  settleDelayMs?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const phaseRef = useRef<Phase>("idle");
  const fallingStartRef = useRef(0);
  const settledAtRef = useRef(0);
  const reassembleStartRef = useRef(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    let widthPx = 0;
    let heightPx = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function build() {
      const rect = container!.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      widthPx = width * dpr;
      heightPx = height * dpr;

      canvas!.width = widthPx;
      canvas!.height = heightPx;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;

      const sample = document.createElement("canvas");
      sample.width = widthPx;
      sample.height = heightPx;
      const sctx = sample.getContext("2d");
      if (!sctx) return;

      let fontSize = heightPx * 0.8;
      sctx.font = `800 ${fontSize}px ${MONO_STACK}`;
      const targetWidth = widthPx * 0.94;
      const measured = sctx.measureText(text).width;
      if (measured > 0) fontSize *= targetWidth / measured;
      sctx.font = `800 ${fontSize}px ${MONO_STACK}`;

      sctx.fillStyle = "#fff";
      sctx.textAlign = "center";
      sctx.textBaseline = "middle";
      sctx.fillText(text, sample.width / 2, sample.height / 2);

      const img = sctx.getImageData(0, 0, sample.width, sample.height).data;
      const step = Math.max(4, Math.round(fontSize / 20));

      const points: { x: number; y: number; brightness: number }[] = [];
      for (let y = 0; y < sample.height; y += step) {
        for (let x = 0; x < sample.width; x += step) {
          const alpha = img[(y * sample.width + x) * 4 + 3];
          if (alpha > 60) points.push({ x, y, brightness: alpha });
        }
      }

      // fewer particles on small screens — same silhouette, lighter load.
      const maxParticles = widthPx < 480 * dpr ? 700 : widthPx < 900 * dpr ? 1000 : 1400;
      const selected =
        points.length > maxParticles
          ? Array.from(
              { length: maxParticles },
              (_, i) => points[Math.floor((i * points.length) / maxParticles)]
            )
          : points;

      particlesRef.current = selected.map((p) => {
        const baseChar = charForBrightness(p.brightness);
        return {
          homeX: p.x,
          homeY: p.y,
          x: p.x,
          y: p.y,
          vx: 0,
          vy: 0,
          char: baseChar,
          baseChar,
          mass: 0.75 + Math.random() * 0.5,
        };
      });

      // a resize mid-sequence would strand particles against stale
      // bounds — simplest correct behavior is to reset to idle at the
      // new home layout rather than trying to re-map an in-flight state.
      phaseRef.current = "idle";
    }

    build();

    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointerRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
      setHintVisible(false);
    };
    const onPointerLeave = () => {
      pointerRef.current = null;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) * dpr;
      const clickY = (e.clientY - rect.top) * dpr;
      const particles = particlesRef.current;

      if (phaseRef.current === "idle") {
        setHintVisible(false);
        phaseRef.current = "scatter";
        for (const p of particles) {
          const dx = p.x - clickX;
          const dy = p.y - clickY;
          const dist = Math.hypot(dx, dy) || 1;
          const speed = (6 + Math.random() * 10) * dpr * p.mass;
          p.vx = (dx / dist) * speed + (Math.random() - 0.5) * 2 * dpr;
          p.vy = (dy / dist) * speed + (Math.random() - 0.5) * 2 * dpr;
          p.char = randomChar();
        }
      } else if (phaseRef.current === "scatter") {
        phaseRef.current = "falling";
        fallingStartRef.current = performance.now();
      }
      // clicks during falling/settled/reassembling are ignored — the
      // sequence runs to completion once started.
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onClick);

    const radius = interactionRadius * dpr;
    const repel = interactionStrength * dpr;
    const idleSpring = 0.06;
    const idleDamping = 0.82;
    const maxSpeed = 40 * dpr;
    const fontPx = Math.max(9, Math.round(11 * dpr));

    function applyCursorForce(p: Particle, strengthMul = 1) {
      const pointer = pointerRef.current;
      if (!pointer) return;
      const dx = p.x - pointer.x;
      const dy = p.y - pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq >= radius * radius) return;
      const dist = Math.sqrt(distSq) || 1;
      const force = (repel / (distSq + 2000)) * strengthMul;
      p.vx += (dx / dist) * force;
      p.vy += (dy / dist) * force;
      if (Math.random() < 0.06) p.char = randomChar();
    }

    function drawFrame() {
      const c = canvas!;
      const cctx = ctx!;
      cctx.clearRect(0, 0, c.width, c.height);
      cctx.font = `700 ${fontPx}px ${MONO_STACK}`;
      cctx.fillStyle = color;
      cctx.textAlign = "center";
      cctx.textBaseline = "middle";
      for (const p of particlesRef.current) cctx.fillText(p.char, p.x, p.y);
    }

    if (reduceMotion) {
      drawFrame();
      return () => {
        io.disconnect();
        window.removeEventListener("resize", onResize);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerleave", onPointerLeave);
        canvas.removeEventListener("click", onClick);
        clearTimeout(resizeTimeout);
      };
    }

    let frame = 0;
    let rafId = requestAnimationFrame(tick);

    function tick() {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      frame++;
      if (frame % 2 !== 0) return; // ~30fps, plenty for this effect

      const particles = particlesRef.current;
      const phase = phaseRef.current;
      const floorY = heightPx - fontPx * 0.7;

      if (phase === "idle") {
        for (const p of particles) {
          applyCursorForce(p);
          p.vx += (p.homeX - p.x) * idleSpring;
          p.vy += (p.homeY - p.y) * idleSpring;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > maxSpeed) {
            p.vx = (p.vx / speed) * maxSpeed;
            p.vy = (p.vy / speed) * maxSpeed;
          }
          p.vx *= idleDamping;
          p.vy *= idleDamping;
          p.x += p.vx;
          p.y += p.vy;
        }
      } else if (phase === "scatter") {
        for (const p of particles) {
          applyCursorForce(p);
          p.vx *= 0.965;
          p.vy *= 0.965;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -20) {
            p.x = -20;
            p.vx *= -0.4;
          } else if (p.x > widthPx + 20) {
            p.x = widthPx + 20;
            p.vx *= -0.4;
          }
          if (p.y < -20) {
            p.y = -20;
            p.vy *= -0.4;
          } else if (p.y > heightPx + 20) {
            p.y = heightPx + 20;
            p.vy *= -0.4;
          }
        }
      } else if (phase === "falling") {
        let landed = 0;
        for (const p of particles) {
          applyCursorForce(p, 0.5);
          p.vy += 0.9 * dpr * p.mass;
          p.vx *= 0.995;
          if (Math.random() < 0.02) p.vx += (Math.random() - 0.5) * 0.6 * dpr;
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) {
            p.x = 0;
            p.vx *= -0.3;
          } else if (p.x > widthPx) {
            p.x = widthPx;
            p.vx *= -0.3;
          }

          if (p.y >= floorY) {
            p.y = floorY;
            p.vy = Math.abs(p.vy) > 0.6 * dpr ? -p.vy * 0.28 : 0;
          }

          if (p.y >= floorY - 1 && Math.abs(p.vy) < 0.15 * dpr) landed++;
        }

        const elapsed = performance.now() - fallingStartRef.current;
        if (landed / particles.length > 0.92 || elapsed > 4000) {
          phaseRef.current = "settled";
          settledAtRef.current = performance.now();
        }
      } else if (phase === "settled") {
        for (const p of particles) {
          applyCursorForce(p, 0.4);
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.x += p.vx;
          p.y += p.vy;
          if (p.y > floorY) p.y = floorY;
        }
        if (performance.now() - settledAtRef.current > settleDelayMs) {
          phaseRef.current = "reassembling";
          reassembleStartRef.current = performance.now();
        }
      } else if (phase === "reassembling") {
        let totalDist = 0;
        for (const p of particles) {
          p.vx += (p.homeX - p.x) * 0.05;
          p.vy += (p.homeY - p.y) * 0.05;
          p.vx *= 0.86;
          p.vy *= 0.86;
          p.x += p.vx;
          p.y += p.vy;
          totalDist += Math.hypot(p.homeX - p.x, p.homeY - p.y);
        }
        const avgDist = totalDist / particles.length;
        const elapsed = performance.now() - reassembleStartRef.current;
        if (avgDist < 1.5 * dpr || elapsed > 4000) {
          for (const p of particles) {
            p.x = p.homeX;
            p.y = p.homeY;
            p.vx = 0;
            p.vy = 0;
            p.char = p.baseChar;
          }
          phaseRef.current = "idle";
        }
      }

      drawFrame();
    }

    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
    };
  }, [text, color, reduceMotion, interactionRadius, interactionStrength, settleDelayMs]);

  return (
    <div ref={containerRef} className={cn("relative", className)} style={style}>
      <canvas ref={canvasRef} className="block h-full w-full cursor-pointer" />
      {!reduceMotion && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium whitespace-nowrap text-white transition-opacity duration-500",
            hintVisible ? "opacity-100" : "opacity-0"
          )}
        >
          Click to interact
        </span>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
}
