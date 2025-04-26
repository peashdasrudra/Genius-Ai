import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl.clone();

  console.log("Request URL:", req.url);

  // Redirect '/' to '/dashboard'
  if (url.pathname === '/') {
    console.log("Redirecting to /dashboard");
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Protect routes
  if (isProtectedRoute(req)) {
    console.log("Protecting route:", req.url);
    await auth.protect();
  }
});

const isProtectedRoute = createRouteMatcher(['/protected-route']); // Only protect /dashboard

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
