"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mail, Newspaper, Image as ImageIcon, Wrench, Tag, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavLink = { href: string; label: string; icon: LucideIcon };

const groups: { label: string; links: NavLink[] }[] = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/enquiries", label: "Enquiries", icon: Mail },
      { href: "/admin/blog", label: "Blog posts", icon: Newspaper },
      { href: "/admin/case-studies", label: "Case studies", icon: ImageIcon },
    ],
  },
  {
    label: "Catalog",
    links: [
      { href: "/admin/services", label: "Services", icon: Wrench },
      { href: "/admin/pricing", label: "Pricing", icon: Tag },
    ],
  },
];

export function AdminNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="min-h-0 flex-1 space-y-6 overflow-y-auto px-3 py-2">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="px-3 text-[10px] font-medium tracking-[0.18em] text-background/40 uppercase">
            {group.label}
          </p>
          <div className="mt-2 space-y-0.5">
            {group.links.map((link) => {
              const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                      : "text-background/65 hover:bg-background/10 hover:text-background"
                  )}
                >
                  <link.icon className="size-4.5 shrink-0" strokeWidth={1.8} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
