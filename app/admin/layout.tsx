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
        <div className="flex min-h-screen flex-1 bg-background text-foreground">
          <aside className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-border p-6">
            <span className="font-display text-xl italic">Codebridge</span>
            <span className="mt-1 text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Admin
            </span>

            <AdminNav />

            <div className="mt-auto pt-6">
              <SignOutButton />
            </div>
          </aside>

          <main className="min-w-0 flex-1 p-8 lg:p-10">{children}</main>
        </div>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
