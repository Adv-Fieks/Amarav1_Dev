import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Middleware for session management and route protection
 * 
 * Only runs on routes that need authentication checking:
 * - /dashboard/* (protected routes)
 * 
 * Explicitly excluded:
 * - /login (public auth page)
 * - /auth/* (auth callbacks and API routes)
 * - /api/* (API routes - handle auth internally)
 * - Static assets (_next/static, _next/image, images, favicon)
 * - Public routes (/, /blog, /company, etc.)
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match only protected routes:
     * - /dashboard and all sub-routes
     * 
     * Explicitly exclude:
     * - /login
     * - /auth/*
     * - /api/*
     * - /_next/* (Next.js internals)
     * - Static assets (images, favicon, etc.)
     * - Public routes (/, /blog, /company, etc.)
     */
    '/dashboard/:path*',
  ],
}


