import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const I18Middleware = createI18nMiddleware({
  locales: ['es', 'en', 'pt', 'fr', 'gl'],
  defaultLocale: 'es',
})

export function middleware(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  
  if (
    request.nextUrl.pathname.startsWith('/admin') ||
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/emailverify')
  ) {
    return
  }
  return I18Middleware(request)
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
