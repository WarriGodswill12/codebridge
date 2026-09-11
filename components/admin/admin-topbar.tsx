"use client";

import { usePathname } from "next/navigation";

const titles: { prefix: string; title: string }[] = [
  { prefix: "/admin/enquiries", title: "Enquiries" },
  { prefix: "/admin/blog", title: "Blog Posts" },
  { prefix: "/admin/case-studies", title: "Case Studies" },
  { prefix: "/admin/services", title: "Services" },
  { prefix: "/admin/pricing", title: "Pricing" },
  { prefix: "/admin", title: "Dashboard" },
];

export function AdminTopbar() {
  const pathname = usePathname();
  const title = titles.find((t) => pathname.startsWith(t.prefix))?.title ?? "Admin";
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-4 py-3.5 sm:px-6">
      <span className="text-sm font-medium">{title}</span>
      <span className="text-xs text-muted-foreground">{today}</span>
    </div>
  );
}
