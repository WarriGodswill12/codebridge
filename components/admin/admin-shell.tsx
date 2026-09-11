"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/admin/sign-out-button";
import mark from "@/public/codebridge-mark-icon.png";

const titles: { prefix: string; title: string }[] = [
  { prefix: "/admin/enquiries", title: "Enquiries" },
  { prefix: "/admin/blog", title: "Blog posts" },
  { prefix: "/admin/case-studies", title: "Case studies" },
  { prefix: "/admin/services", title: "Services" },
  { prefix: "/admin/pricing", title: "Pricing" },
  { prefix: "/admin", title: "Dashboard" },
];

function Brand() {
  return (
    <div className="flex items-center gap-3 px-3 pt-1">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background p-1.5">
        <Image src={mark} alt="Codebridge" className="h-full w-full object-contain" priority />
      </span>
      <div className="min-w-0 leading-none">
        <p className="font-display text-base text-background italic">Codebridge</p>
        <p className="mt-1 text-[10px] font-medium tracking-[0.18em] text-background/45 uppercase">Admin</p>
      </div>
    </div>
  );
}

function SidebarFooter({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="space-y-0.5 border-t border-background/10 px-3 py-3">
      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        onClick={onNavigate}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-background/65 transition-all duration-150 hover:bg-background/10 hover:text-background"
      >
        <ExternalLink className="size-4.5 shrink-0" strokeWidth={1.8} />
        View website
      </Link>
      <SignOutButton />
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  const title = titles.find((t) => pathname.startsWith(t.prefix))?.title ?? "Admin";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col gap-6 bg-foreground py-5 lg:flex">
        <Brand />
        <AdminNav />
        <SidebarFooter />
      </aside>

      <div
        aria-hidden={!mobileOpen}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 max-w-[85vw] flex-col gap-6 bg-foreground py-5 transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-3">
          <Brand />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-background/65 hover:bg-background/10 hover:text-background"
          >
            <X className="size-5" strokeWidth={1.8} />
          </button>
        </div>
        <AdminNav onNavigate={() => setMobileOpen(false)} />
        <SidebarFooter onNavigate={() => setMobileOpen(false)} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between bg-background px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="-ml-1.5 flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground/70 hover:bg-secondary lg:hidden"
            >
              <Menu className="size-5" strokeWidth={1.8} />
            </button>
            <span className="font-display text-lg italic">{title}</span>
          </div>
          <span className="text-xs text-muted-foreground">{today}</span>
        </div>
        <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
