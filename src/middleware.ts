import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

// Import setup functions
import getOrCreateDB from './models/server/dbSetup';
import getOrCreateDocumentStorage from './models/server/document_storage';
import getOrCreateWorkSpaceStorage from './models/server/workspace_storage';

// Create route matcher for protected routes
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/workspace/(.*)',
  '/create-workspace',
]);


// Middleware function
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  // Call setup functions
  await Promise.all([
    getOrCreateDB(),
    getOrCreateDocumentStorage(),
    getOrCreateWorkSpaceStorage()
  ]);

  const response = await clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
    return NextResponse.next();
  })(request, event);

  return response;
}

// Middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
