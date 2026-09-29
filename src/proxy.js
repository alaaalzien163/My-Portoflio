import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// هل المسار يبدأ ببادئة لغة مدعومة؟
function hasLocalePrefix(pathname) {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

// البروكسي (proxy) — بديل middleware في Next.js 16
// - الروابط بدون لغة: نعطي الأولوية للكوكي المحفوظة (اختيار المستخدم السابق)،
//   وإلا نترجمها إلى اللغة الافتراضية (العربية) عبر وسيط next-intl.
// - localeDetection مُعطّل، لذا لا نعتمد على ترويسة المتصفح إطلاقًا.
export default function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!hasLocalePrefix(pathname)) {
    const saved = request.cookies.get(routing.localeCookie.name)?.value;
    if (saved && routing.locales.includes(saved)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${saved}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  // استثناء ملفات الـ API والملفات الثابتة (تحتوي نقطة)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
