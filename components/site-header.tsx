"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { MenuIcon } from "@/components/motion/menu-icon";
import logo from "@/public/codebridge-logo.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
];

function handleNavScramble(e: MouseEvent<HTMLAnchorElement>) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const el = e.currentTarget;
  gsap.to(el, {
    duration: 0.5,
    scrambleText: { text: el.textContent ?? "", chars: "upperAndLowerCase", speed: 0.6 },
    overwrite: true,
  });
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const items = panel.querySelectorAll("[data-menu-item]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(panel, { autoAlpha: open ? 1 : 0 });
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(items, { opacity: 0, y: 28 });
        const tl = gsap.timeline();
        tl.to(panel, { autoAlpha: 1, duration: 0.45, ease: "power3.out" }).to(
          items,
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.55, ease: "power3.out" },
          "-=0.25"
        );
      } else {
        gsap.to(panel, { autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      }
    });

    return () => ctx.revert();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-[#f6f5ef] text-foreground">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-4 px-6 py-4 sm:py-5 md:grid-cols-3 lg:px-10">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={handleNavScramble}
              className="text-xs font-medium tracking-[0.14em] uppercase text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="justify-self-start md:justify-self-center">
          <Image
            src={logo}
            alt="Codebridge"
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <div className="flex items-center justify-self-end gap-3">
          <Magnetic className="hidden sm:inline-block" strength={0.25}>
            <Button
              render={<Link href="/contact" />}
              nativeButton={false}
              className="h-10 gap-2 rounded-full px-5 text-xs font-semibold tracking-widest uppercase"
            >
              Let&apos;s talk
              <ArrowRight className="size-3.5" />
            </Button>
          </Magnetic>

          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 size-10 rounded-full md:hidden"
          >
            <MenuIcon open={open} />
          </Button>
        </div>
      </div>

      <div
        ref={panelRef}
        className="fixed inset-0 z-40 flex flex-col bg-background px-6 pt-28 pb-10 md:hidden"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        <nav className="flex flex-1 flex-col justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-menu-item
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-border py-5 font-display text-4xl italic"
            >
              {link.label}
              <ArrowUpRight className="size-6 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </Link>
          ))}
        </nav>
        <div data-menu-item>
          <Button
            render={<Link href="/contact" onClick={() => setOpen(false)} />}
            nativeButton={false}
            className="h-12 w-full justify-center gap-2 rounded-full text-xs font-semibold tracking-widest uppercase"
          >
            Let&apos;s talk
            <ArrowRight className="size-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
