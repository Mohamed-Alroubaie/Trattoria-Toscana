// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['de', 'en'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip check if the path already starts with a valid locale
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (hasLocale) return;

  // 2. Detect visitor browser preference
  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLocale = acceptLanguage.toLowerCase().includes('en')
    ? 'en'
    : 'de';

  // 3. Rewrite/Redirect target path cleanly
  request.nextUrl.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Exclude assets, public files, and inner NextJS data paths
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|assets).*)'],
};
