import type { ReactNode } from "react";
import Image from "next/image";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { AdminConvexProvider } from "@/components/admin/admin-convex-provider";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { SignOutButton } from "@/components/admin/sign-out-button";
import mark from "@/public/codebridge-mark-icon.png";

// Scoped here rather than the root layout: it reads the auth cookie via a
// dynamic API on every request, which would otherwise force every marketing
// page in the app (none of which care about auth) into dynamic rendering.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>
        <div className="flex min-h-screen bg-background text-foreground">
          <aside className="flex w-16 shrink-0 flex-col items-center border-r border-background/10 bg-foreground py-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-background p-1.5">
              <Image src={mark} alt="Codebridge" className="h-full w-full object-contain" priority />
            </span>

            <AdminNav />

            <SignOutButton iconOnly />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col">
            <AdminTopbar />
            <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
          </div>
        </div>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
