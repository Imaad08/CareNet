import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/onboarding(.*)", "/profile(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
  publicRoutes:["/api/uploadthing"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/"],
};