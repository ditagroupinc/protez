import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from '@/lib/i18n'

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/' && !request.cookies.get('NEXT_LOCALE')) {
    const country = request.headers.get('x-vercel-ip-country')

    if (country === 'UA') {
      const url = request.nextUrl.clone()
      url.pathname = '/ua'

      return NextResponse.redirect(url, 307)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
