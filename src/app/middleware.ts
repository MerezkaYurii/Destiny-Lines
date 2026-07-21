import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '../i18n-config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Проверяем, есть ли уже локаль в URL
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // Если локаль уже есть в пути, ничего не делаем, пропускаем запрос дальше
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 2. Если локали нет — делаем ЯВНЫЙ РЕДИРЕКТ на дефолтный язык
  const defaultLocale = i18n.defaultLocale || 'ru';

  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }
  // Формируем чистый новый URL (например, /about превратится в /ua/about)
  const targetPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const redirectUrl = new URL(`/${defaultLocale}${targetPath}`, request.url);

  return NextResponse.redirect(redirectUrl);
}
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
