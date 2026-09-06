import type { ReactNode } from "react";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { AdminConvexProvider } from "@/components/admin/admin-convex-provider";

export default function SignInLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <AdminConvexProvider>{children}</AdminConvexProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
