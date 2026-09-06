"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe } from "lucide-react";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
import { AsciiParticleText } from "@/components/motion/ascii-particle-text";
import { ScrambleIn } from "@/components/motion/scramble-in";
import { SpinIcon } from "@/components/motion/spin-icon";

const sitemap = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
  { href: "/careers", label: "Careers" },
];

const featuredWork = [
  { href: "/work/wytha-sports-marketplace-texas", label: "Wytha" },
  { href: "/work/epump-forecourt-automation", label: "Epump" },
  { href: "/work/zapyt-ai-saas", label: "Zapyt" },
  { href: "/work/pancify-community-monetization-saas", label: "Pancify" },
];

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin") || pathname === "/signin") return null;

  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-8 lg:px-10">
        <div className="flex flex-col gap-6 border-b border-primary-foreground/20 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary-foreground/30">
              <SpinIcon duration={14}>
                <Globe className="size-5" />
              </SpinIcon>
            </span>
            <div className="text-sm">
              <p className="font-semibold">Worldwide</p>
              <p className="text-primary-foreground/70">
                Remote-first, across every timezone
              </p>
            </div>
          </div>

          <a
            href="mailto:hello@codebridgeagency.com"
            className="text-sm font-medium text-primary-foreground/90 underline underline-offset-4 transition-colors hover:text-primary-foreground"
          >
            hello@codebridgeagency.com
          </a>
        </div>

        <RevealGroup
          className="grid grid-cols-2 gap-10 border-b border-primary-foreground/20 py-10 text-sm sm:gap-16"
          y={16}
          stagger={0.04}
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
              <ScrambleIn text="Menu" />
            </span>
            {sitemap.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-reveal-item
                className="link-underline w-fit text-primary-foreground/90 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
              <ScrambleIn text="Selected work" />
            </span>
            {featuredWork.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-reveal-item
                className="link-underline w-fit text-primary-foreground/90 transition-colors hover:text-primary-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </RevealGroup>

        <div className="border-b border-primary-foreground/20 py-14">
          <p className="text-xs font-medium tracking-[0.14em] uppercase text-primary-foreground/70">
            Have a project in mind?
          </p>
          <Magnetic className="mt-4 inline-block" strength={0.2}>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-display text-4xl italic sm:text-6xl"
            >
              Let&apos;s talk
              <ArrowUpRight className="size-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:size-12" />
            </Link>
          </Magnetic>
        </div>

        <div className="flex flex-col gap-2 pt-8 text-xs text-primary-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Codebridge. All rights reserved.</span>
          <span>Designed &amp; built by Codebridge</span>
        </div>
      </div>

      <Reveal y={40} duration={1.1} start="top 95%" className="w-full select-none">
        <AsciiParticleText
          text="codebridge"
          color="rgba(255,255,255,0.45)"
          className="w-full"
          style={{ height: "clamp(4rem, 18vw, 13rem)" }}
        />
      </Reveal>
    </footer>
  );
}
