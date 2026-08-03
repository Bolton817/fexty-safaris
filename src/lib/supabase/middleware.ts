import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  const url = request.nextUrl.clone()
  // Ensure we strip the locale from the path to check if it's an admin route
  // e.g. /en/admin/dashboard -> /admin/dashboard
  const pathWithoutLocale = url.pathname.replace(/^\/(en|sw)/, '')
  
  const isAdminRoute = pathWithoutLocale.startsWith('/admin')
  const isLoginRoute = pathWithoutLocale === '/admin/login'
  const isBareAdminRoute = pathWithoutLocale === '/admin' || pathWithoutLocale === '/admin/'

  if (isAdminRoute && !isLoginRoute && !user) {
    url.pathname = url.pathname.replace(pathWithoutLocale, '/admin/login')
    return NextResponse.redirect(url)
  }

  // If user is logged in and visits the bare /admin route, take them to the dashboard
  if (isBareAdminRoute && user) {
    url.pathname = url.pathname.replace(pathWithoutLocale, '/admin/dashboard')
    return NextResponse.redirect(url)
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (isLoginRoute && user) {
    url.pathname = url.pathname.replace(pathWithoutLocale, '/admin/dashboard')
    return NextResponse.redirect(url)
  }

  // Return the original response (which we'll pass to next-intl) along with the user object if needed, 
  // but for next-intl we just need the cookies updated in the request. 
  // Next-intl expects to create its own response based on the request.
  // We can attach the cookies to the request so next-intl sees them.
  return { supabaseResponse, user, supabaseRequest: request }
}
