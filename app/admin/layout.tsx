import type { ReactNode } from "react";
import {
  ConvexAuthNextjsServerProvider,
  convexAuthNextjsToken,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { AdminConvexProvider } from "@/components/admin/admin-convex-provider";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/admin/sign-out-button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Scoped here rather than the root layout: it reads the auth cookie via a
// dynamic API on every request, which would otherwise force every marketing
// page in the app (none of which care about auth) into dynamic rendering.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = await convexAuthNextjsToken();
  const email = token ? await fetchQuery(api.authHelpers.whoAmI, {}, { token }) : null;

  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>
        <SidebarProvider className="bg-background text-foreground">
          <Sidebar>
            <SidebarHeader className="border-b border-sidebar-border px-3 py-3">
              <div className="flex items-center gap-2.5 px-1">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary font-display text-sm text-primary-foreground italic">
                  C
                </span>
                <div>
                  <span className="block font-display text-base leading-none font-medium">
                    Codebridge
                  </span>
                  <span className="mt-1 block text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    Command centre
                  </span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent className="px-1 py-2">
              <AdminNav />
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                  {email ? email[0]?.toUpperCase() : "?"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{email ?? "Admin"}</p>
                </div>
                <SignOutButton />
              </div>
            </SidebarFooter>

            <SidebarRail />
          </Sidebar>

          <SidebarInset>
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 lg:px-6">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-5" />
              <span className="font-display text-sm italic">Codebridge admin</span>
            </div>
            <div className="flex-1 p-4 sm:p-6 lg:p-10">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
