"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Newspaper, Image as ImageIcon, Wrench, Tag, ExternalLink, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string; icon: LucideIcon };

const links: NavLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
  { href: "/admin/blog", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/case-studies", label: "Case Studies", icon: ImageIcon },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/pricing", label: "Pricing", icon: Tag },
];

function NavIcon({
  href,
  label,
  icon: Icon,
  active,
}: NavLink & { active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative mx-auto flex size-10 items-center justify-center rounded-lg transition-all duration-150",
        active ? "bg-background/10 text-background" : "text-background/65 hover:bg-background/10 hover:text-background"
      )}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.8} />
      <span className="pointer-events-none absolute top-1/2 left-full z-60 ml-3 -translate-x-1 -translate-y-1/2 rounded-md border border-background/10 bg-foreground px-2.5 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-lg transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
        {label}
      </span>
    </Link>
  );
}

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-0.5 overflow-visible py-3">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return <NavIcon key={link.href} {...link} active={active} />;
      })}

      <div className="mx-2 my-2 border-t border-background/10" />

      <Link
        href="/"
        target="_blank"
        rel="noreferrer"
        className="group relative mx-auto flex size-10 items-center justify-center rounded-lg text-background/65 transition-all duration-150 hover:bg-background/10 hover:text-background"
      >
        <ExternalLink className="size-[18px] shrink-0" strokeWidth={1.8} />
        <span className="pointer-events-none absolute top-1/2 left-full z-60 ml-3 -translate-x-1 -translate-y-1/2 rounded-md border border-background/10 bg-foreground px-2.5 py-1 text-xs font-medium whitespace-nowrap text-background opacity-0 shadow-lg transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
          View website
        </span>
      </Link>
    </nav>
  );
}
