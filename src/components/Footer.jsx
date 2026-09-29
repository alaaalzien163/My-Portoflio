import Link from "next/link";
import { Code2, Briefcase, Mail, ArrowUp } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/data/site";

// التذييل (Footer) — مكوّن خادم.
export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-content px-4 py-12 sm:px-6 lg:px-8">
        {/* شبكة متجاوبة: عمود واحد للجوال، 2–3 أعمدة للشاشات الأكبر */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* الاسم */}
          <div>
            <p className="font-display text-fluid-lg font-bold tracking-tight">
              {site.name[locale]}
            </p>
            <p className="mt-1 text-fluid-sm text-primary">{site.role[locale]}</p>
          </div>

          {/* روابط سريعة للأقسام */}
          <nav aria-label={t("quickLinks")}>
            <h2 className="font-display text-fluid-base font-semibold">
              {t("quickLinks")}
            </h2>
            <ul className="mt-3 space-y-2">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-fluid-sm text-muted transition-colors hover:text-foreground"
                  >
                    {tNav(item.id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* التواصل الاجتماعي */}
          <div>
            <h2 className="font-display text-fluid-base font-semibold">
              {t("connect")}
            </h2>
            <ul className="mt-3 flex items-center gap-3">
              <li>
                <a
                  href={site.socials.github}
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Code2 className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.socials.linkedin}
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Briefcase className="size-5" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  aria-label="Email"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Mail className="size-5" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* الشريط السفلي: عبارة التطوير + العودة للأعلى */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          {/* عبارة "مطوّر من قبل Ether Tech" — نص عادي حاليًا.
              إن زوّدتني برابط (مثل حساب إنستغرام) سأحوّلها إلى <a>. */}
          <p className="text-fluid-sm text-muted">{t("developedBy")}</p>

          {/* زر "العودة للأعلى" كرابط مرساة (بدون مكتبات) */}
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-fluid-sm text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowUp className="size-4" aria-hidden="true" />
            {t("backToTop")}
          </a>
        </div>
      </div>
    </footer>
  );
}
