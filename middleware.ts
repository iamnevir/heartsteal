import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { createUser } from "./actions/createUser";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/", "/api/:path*", "/icon"],
  afterAuth(auth, req, evt) {
    const url = process.env.NEXT_PUBLIC_APP_URL;
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: `${url}/sign-in`,
      });
    }
    createUser(auth.userId!);
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)", "/icon"],
};
