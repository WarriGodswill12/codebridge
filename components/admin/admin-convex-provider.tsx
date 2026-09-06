"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import type { ReactNode } from "react";
import { convex } from "@/components/convex-client-provider";

/**
 * Nested inside the root layout's plain ConvexProvider, scoped to just
 * /admin and /signin — reuses the same ConvexReactClient instance, just
 * with the auth-aware provider layered on top for this subtree only.
 * Must be a descendant of ConvexAuthNextjsServerProvider (see
 * app/admin/layout.tsx and app/signin/layout.tsx): that server provider is
 * what actually seeds the auth context this depends on, not just an
 * alternative way to get the same effect.
 */
export function AdminConvexProvider({ children }: { children: ReactNode }) {
  return <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>;
}
