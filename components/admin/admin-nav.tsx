"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Sparkles,
  Tag,
  Newspaper,
  type LucideIcon,
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type NavLink = { href: string; label: string; icon: LucideIcon };

const navGroups: { label: string; links: NavLink[] }[] = [
  {
    label: "Overview",
    links: [{ href: "/admin", label: "Overview", icon: LayoutDashboard }],
  },
  {
    label: "Leads",
    links: [{ href: "/admin/enquiries", label: "Enquiries", icon: Inbox }],
  },
  {
    label: "Content",
    links: [
      { href: "/admin/case-studies", label: "Case studies", icon: Briefcase },
      { href: "/admin/services", label: "Services", icon: Sparkles },
      { href: "/admin/pricing", label: "Pricing", icon: Tag },
      { href: "/admin/blog", label: "Blog", icon: Newspaper },
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
                const Icon = link.icon;
                return (
                  <SidebarMenuItem key={link.href}>
                    <SidebarMenuButton isActive={active} render={<Link href={link.href} />}>
                      <Icon />
                      <span>{link.label}</span>
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
