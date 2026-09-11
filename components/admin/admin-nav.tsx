"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navGroups = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Overview" }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/case-studies", label: "Case studies" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/pricing", label: "Pricing" },
      { href: "/admin/blog", label: "Blog" },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:flex-col lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
      {navGroups.map((group) => (
        <div key={group.label} className="flex shrink-0 gap-1 lg:flex-col lg:gap-0.5">
          <span className="hidden self-center pr-2 text-[10px] font-semibold tracking-[0.14em] text-muted-foreground/70 uppercase lg:mb-1.5 lg:block lg:self-auto lg:pr-0">
            {group.label}
          </span>
          {group.links.map((link) => {
            const active =
              link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "shrink-0 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors lg:rounded-r-lg lg:rounded-l-none lg:px-3",
                  active
                    ? "border-primary bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
