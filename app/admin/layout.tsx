import type { ReactNode } from "react";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { AdminConvexProvider } from "@/components/admin/admin-convex-provider";
import { AdminShell } from "@/components/admin/admin-shell";

// Scoped here rather than the root layout: it reads the auth cookie via a
// dynamic API on every request, which would otherwise force every marketing
// page in the app (none of which care about auth) into dynamic rendering.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>
        <AdminShell>{children}</AdminShell>
      </AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
