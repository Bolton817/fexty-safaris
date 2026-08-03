import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { updateSession } from './lib/supabase/middleware';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // First, check and update Supabase session
  const sessionResult = await updateSession(request);

  // If updateSession returned a redirect response directly
  if (sessionResult instanceof Response && sessionResult.status >= 300 && sessionResult.status < 400) {
    return sessionResult;
  }

  // Otherwise, it returned our custom object
  const { supabaseResponse, user, supabaseRequest } = sessionResult as any;

  // If updateSession returned a redirect response in the custom object
  if (supabaseResponse.headers.get('location')) {
    return supabaseResponse;
  }

  // Otherwise, pass the request to next-intl middleware
  const response = intlMiddleware(supabaseRequest);

  // Copy any auth cookies set by Supabase into the final next-intl response
  const supabaseCookies = supabaseResponse.cookies.getAll();
  supabaseCookies.forEach((cookie: any) => {
    const { name, value, ...options } = cookie;
    response.cookies.set(name, value, options);
  });

  return response;
}

export const config = {
  matcher: ['/', '/(en|sw|fr|es|de|zh|ar)/:path*', '/admin/:path*']
};
