import { v } from "convex/values";
import { createAccount, modifyAccountCredentials } from "@convex-dev/auth/server";
import { internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

/**
 * One-time bootstrap for the single admin account. There is no public
 * sign-up flow (see convex/auth.ts), so this is the only way a `users` row
 * is ever created — run once via:
 *   npx convex run adminSetup:createAdmin '{"email":"you@example.com","password":"..."}'
 * Refuses to run again once an admin already exists; use resetAdminPassword
 * to change credentials instead of re-running this.
 */
export const createAdmin = internalAction({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, { email, password }) => {
    const existing = await ctx.runQuery(internal.adminSetup.hasAdmin, {});
    if (existing) {
      throw new Error(
        "An admin account already exists. Use resetAdminPassword to change credentials instead."
      );
    }
    await createAccount(ctx, {
      provider: "password",
      account: { id: email.toLowerCase().trim(), secret: password },
      profile: { email: email.toLowerCase().trim() },
    });
    return { created: true };
  },
});

/**
 * Changes the existing admin's password without creating a second account.
 *   npx convex run adminSetup:resetAdminPassword '{"email":"you@example.com","password":"new-password"}'
 */
export const resetAdminPassword = internalAction({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, { email, password }) => {
    await modifyAccountCredentials(ctx, {
      provider: "password",
      account: { id: email.toLowerCase().trim(), secret: password },
    });
    return { updated: true };
  },
});

export const hasAdmin = internalQuery({
  args: {},
  handler: async (ctx) => {
    const first = await ctx.db.query("users").first();
    return first !== null;
  },
});
