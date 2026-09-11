"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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
    <>
      {navGroups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.links.map((link) => {
                const active =
                  link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton isActive={active} render={<Link href={link.href} />}>
                      {link.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
