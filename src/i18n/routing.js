import { defineRouting } from "next-intl/routing";

// إعداد التوجيه (routing) للـ i18n
// - اللغتان: الإنجليزية (افتراضية) والعربية
// - localePrefix: "always" → الروابط دائمًا تبدأ باللغة (/en و /ar)
// - localeDetection: false → لا نعتمد على ترويسة المتصفح، بل على الكوكي
//   (انظر proxy.js الذي يقرأ NEXT_LOCALE قبل اللجوء إلى الافتراضية)
export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});

export default routing;
