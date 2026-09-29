import { GraduationCap } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";

// قسم "نبذة عني" (About) — مكوّن خادم.
// النصوص من messages، والمحتوى (النبذة/التعليم/المهارات) من site.js حسب اللغة.
export default async function About() {
  const locale = await getLocale();
  const t = await getTranslations("about");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <h2
          id="about-heading"
          className="font-display text-fluid-2xl font-bold tracking-tight"
        >
          {t("title")}
        </h2>
      </Reveal>

      {/* عمودان على الشاشات الكبيرة: النبذة + بطاقة التعليم */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <Reveal delay={0.05}>
          <p className="text-fluid-base leading-relaxed text-muted">
            {site.bio[locale]}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-xl border border-border bg-surface p-6">
            <h3 className="flex items-center gap-2 font-display text-fluid-lg font-semibold">
              <GraduationCap className="size-5 text-primary" aria-hidden="true" />
              {t("education")}
            </h3>

            <ul className="mt-4 space-y-4">
              {site.education.map((item) => (
                <li key={item.degree.en}>
                  <p className="font-medium">{item.degree[locale]}</p>
                  <p className="text-fluid-sm text-muted">
                    {item.institution[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* المهارات مصنّفة كشارات */}
      <div className="mt-14">
        <Reveal>
          <h3 className="font-display text-fluid-xl font-semibold tracking-tight">
            {t("skills")}
          </h3>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.skills.map((group, index) => (
            <Reveal key={group.category.en} delay={index * 0.05}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <h4 className="font-display text-fluid-base font-semibold">
                  {group.category[locale]}
                </h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
