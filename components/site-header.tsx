"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/public/codebridge-logo.png";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Insights" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[#f6f5ef] text-foreground">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 items-center gap-4 px-6 py-4 sm:py-5 md:grid-cols-3 lg:px-10">
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
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
          <Button
            render={<Link href="/contact" />}
            nativeButton={false}
            className="hidden h-10 gap-2 rounded-full px-5 text-xs font-semibold tracking-widest uppercase sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowRight className="size-3.5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="size-10 rounded-full md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl"
              >
                {link.label}
              </Link>
            ))}
            <Button
              render={<Link href="/contact" onClick={() => setOpen(false)} />}
              nativeButton={false}
              className="mt-2 h-11 w-fit gap-2 rounded-full px-6 text-xs font-semibold tracking-widest uppercase"
            >
              Let&apos;s talk
              <ArrowRight className="size-3.5" />
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
