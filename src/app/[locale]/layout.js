import { Inter, Sora, Cairo } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
} from "next-intl/server";
import { routing } from "@/i18n/routing";
import { site } from "@/data/site";
import Providers from "@/app/providers";
import Splash from "@/components/Splash";

// ===== الخطوط =====
// اللاتينية: Inter للنصوص + Sora للعناوين
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-display",
});
// العربية: Cairo (يدعم العربية واللاتينية) — يُستخدم عند lang="ar"
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-arabic",
});

// توليد الصفحات الثابتة لكل لغة
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ميتاداتا خاصة بكل لغة (SEO) + روابط hreflang
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const name = site.name[locale];
  const role = site.role[locale];
  const description = site.description[locale];
  const title = `${name} — ${role}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${name}` },
    description,
    applicationName: name,
    authors: [{ name }],
    creator: name,
    keywords: [
      "Alaa Al-Zein",
      "Software Engineer",
      "Portfolio",
      "Next.js",
      "Web Developer",
      "علاء الزين",
      "مهندس برمجيات",
    ],
    alternates: {
      canonical: `/${locale}`,
      // hreflang بين النسختين (الإنجليزية هي x-default)
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      url: `${site.url}/${locale}`,
      title,
      description,
      siteName: name,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: `${name} — ${role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
    robots: { index: true, follow: true },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

// سكربت ما قبل الرسم لشاشة البداية
const splashInitScript = `
(function () {
  try {
    var root = document.documentElement;
    var forced = location.search.indexOf("splash") !== -1;
    var seen = false;
    try { seen = sessionStorage.getItem("splash_seen") === "1"; } catch (e) {}
    if (forced || !seen) {
      root.classList.add("splash-play", "splash-active");
    }
    window.__splashReset = function () {
      try { sessionStorage.removeItem("splash_seen"); } catch (e) {}
      location.reload();
    };
  } catch (e) {}
})();
`;

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();

  // تمكين العرض الثابت (SSG) لهذه اللغة
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  // نحمّل خط اللغة الحالية فقط (توفيرًا للشبكة): Cairo للعربية، Inter+Sora للإنجليزية
  const fontVariables =
    locale === "ar" ? cairo.variable : `${inter.variable} ${sora.variable}`;

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={fontVariables}
    >
      <body
        id="top"
        className="min-h-dvh bg-background font-sans text-foreground antialiased"
      >
        {/* يُنفَّذ قبل التفاعل لتفادي وميض السبلاش (next/script يدير الترتيب) */}
        <Script
          id="splash-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: splashInitScript }}
        />

        {/* بديل عند تعطيل JavaScript: إظهار عناصر الحركة مباشرة */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>

        {/* مزوّد اللغة للعميل + الثيم + LazyMotion */}
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {/* طبقة علوية فوق المحتوى؛ المحتوى يُبنى على الخادم تحتها */}
            <Splash />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
