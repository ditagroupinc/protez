import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'

import { LOCALE_COOKIE_NAME, routing } from '@/lib/i18n'

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const saved = request.cookies.get(LOCALE_COOKIE_NAME)?.value
  const { pathname } = request.nextUrl

  if (saved === 'uk' && !pathname.startsWith('/ua')) {
    const url = request.nextUrl.clone()

    url.pathname = pathname === '/' ? '/ua' : `/ua${pathname}`

    return NextResponse.redirect(url, 307)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
