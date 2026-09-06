import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/signin"]);
const isProtectedRoute = createRouteMatcher(["/admin(.*)"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/admin");
  }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/signin");
  }
});

// Scoped to just the admin section, its sign-in page, and the auth API
// route those two pages call — the marketing pages never read auth state,
// so running this on every route (the library's default matcher) would
// force them all into dynamic rendering for no benefit, losing static
// generation across the whole site. /api/auth must stay included: it's
// how signIn()/signOut() reach Convex, not just a protected page.
export const config = {
  matcher: ["/admin/:path*", "/signin", "/api/auth/:path*"],
};
