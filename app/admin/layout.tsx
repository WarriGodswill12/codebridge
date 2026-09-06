import type { ReactNode } from "react";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { AdminConvexProvider } from "@/components/admin/admin-convex-provider";
import { AdminNav } from "@/components/admin/admin-nav";
import { SignOutButton } from "@/components/admin/sign-out-button";

// Scoped here rather than the root layout: it reads the auth cookie via a
// dynamic API on every request, which would otherwise force every marketing
// page in the app (none of which care about auth) into dynamic rendering.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>
        <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground lg:flex-row">
          <aside className="flex flex-col gap-4 border-b border-border p-4 sm:p-6 lg:sticky lg:top-0 lg:h-screen lg:w-60 lg:shrink-0 lg:gap-0 lg:border-r lg:border-b-0 lg:p-6">
            <div className="flex items-center justify-between lg:block">
              <div>
                <span className="font-display text-xl italic">Codebridge</span>
                <span className="mt-1 block text-xs font-medium tracking-widest text-muted-foreground uppercase">
                  Admin
                </span>
              </div>
              <div className="lg:hidden">
                <SignOutButton />
              </div>
            </div>

            <div className="lg:mt-10">
              <AdminNav />
            </div>

            <div className="mt-auto hidden pt-6 lg:block">
              <SignOutButton />
            </div>
          </aside>

          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
        </div>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
