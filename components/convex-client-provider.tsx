"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import type { ReactNode } from "react";

/**
 * Shared client instance — the admin section nests its own
 * ConvexAuthNextjsProvider (see components/admin/admin-convex-provider.tsx)
 * around this SAME client, rather than creating a second one, so there's
 * still only one underlying connection to Convex.
 */
export const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * Plain, unauthenticated provider used app-wide. The marketing site's own
 * Convex calls (project listings, the contact form) are all public
 * functions that never needed auth — wrapping the whole app in the
 * auth-aware provider instead would require every page to sit under
 * ConvexAuthNextjsServerProvider, which reads the auth cookie via a
 * dynamic API and would force the entire marketing site into dynamic
 * rendering for a capability only /admin and /signin use.
 */
export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
