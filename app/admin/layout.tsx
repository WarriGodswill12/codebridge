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

// Scoped here rather than the root layout: it reads the auth cookie via a
// dynamic API on every request, which would otherwise force every marketing
// page in the app (none of which care about auth) into dynamic rendering.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = await convexAuthNextjsToken();
  const email = token ? await fetchQuery(api.authHelpers.whoAmI, {}, { token }) : null;

  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>
        <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground lg:flex-row">
          <aside className="flex flex-col gap-4 border-b border-border p-4 sm:p-6 lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:gap-0 lg:border-r lg:border-b-0 lg:p-6">
            <div className="flex items-center justify-between lg:block lg:border-b lg:border-border lg:pb-6">
              <div className="flex items-center gap-2.5">
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
              <div className="lg:hidden">
                <SignOutButton />
              </div>
            </div>

            <div className="lg:mt-6 lg:flex-1">
              <AdminNav />
            </div>

            <div className="mt-auto hidden items-center gap-2.5 border-t border-border pt-4 lg:flex">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-[11px] font-semibold text-secondary-foreground">
                {email ? email[0]?.toUpperCase() : "?"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium">{email ?? "Admin"}</p>
              </div>
              <SignOutButton />
            </div>
          </aside>

          <main className="min-w-0 flex-1 bg-background p-4 sm:p-6 lg:p-10">{children}</main>
        </div>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
