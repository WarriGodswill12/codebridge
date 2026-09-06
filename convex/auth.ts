import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { convexAuth, retrieveAccount } from "@convex-dev/auth/server";
import { Scrypt } from "lucia";

/**
 * A sign-in-only credentials provider modeled on the built-in `Password`
 * provider, but deliberately without its "signUp"/"reset" flows: this app
 * has exactly one trusted admin account, created once via
 * `convex/adminSetup.ts`, and never through a public-facing form. Exposing
 * the stock `Password` provider would leave its "signUp" flow reachable by
 * anyone who calls the Convex `auth:signIn` action directly (the Convex URL
 * is public, embedded in the client bundle), regardless of whether the
 * Next.js app ever renders a sign-up page.
 */
const AdminPassword = ConvexCredentials({
  id: "password",
  authorize: async (params, ctx) => {
    const email = params.email as string | undefined;
    const secret = params.password as string | undefined;
    if (!email || !secret) {
      throw new Error("Missing credentials");
    }
    // `retrieveAccount` throws (rather than returning null) on any failure
    // — bad email, wrong password, or rate-limited — so every case is
    // normalized to one generic message here to avoid leaking which.
    try {
      const { user } = await retrieveAccount(ctx, {
        provider: "password",
        account: { id: email.toLowerCase().trim(), secret },
      });
      return { userId: user._id };
    } catch {
      throw new Error("Invalid credentials");
    }
  },
  crypto: {
    async hashSecret(password: string) {
      return await new Scrypt().hash(password);
    },
    async verifySecret(password: string, hash: string) {
      return await new Scrypt().verify(hash, password);
    },
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [AdminPassword],
});
