import type { QueryCtx, MutationCtx } from "./_generated/server";

/**
 * Sign-up is disabled app-wide (see convex/auth.ts) — the only way a `users`
 * row can ever exist is via the one-time bootstrap in convex/adminSetup.ts.
 * So any authenticated identity IS the admin; no separate role field needed.
 */
export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new Error("Not authenticated");
  }
  return identity;
}
