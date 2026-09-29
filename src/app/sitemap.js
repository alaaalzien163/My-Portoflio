import { routing } from "@/i18n/routing";
import { site } from "@/data/site";

// خريطة الموقع — تشمل اللغتين مع روابط hreflang المتبادلة
export default function sitemap() {
  const lastModified = new Date();

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${site.url}/${locale}`])
  );

  return routing.locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
