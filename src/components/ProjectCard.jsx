import Image from "next/image";
// ملاحظة: lucide v1 أزال أيقونة العلامة التجارية Github، لذا نستخدم Code2 للكود المصدري.
import { ExternalLink, Code2, Lock, Star } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

// مقاسات صورة البطاقة حسب نقاط الانكسار (للشبكة 1/2/3 أعمدة)
const IMAGE_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

// بطاقة مشروع — مكوّن خادم (النصوص من messages، وبيانات المشروع حسب اللغة)
export default async function ProjectCard({ project }) {
  const locale = await getLocale();
  const t = await getTranslations("common");

  const hasImage = Boolean(project.image);
  const hasDemo = Boolean(project.demo);
  const hasGithub = Boolean(project.github);
  const hasLinks = hasDemo || hasGithub;
  // عند وجود الزرّين معًا: توزيع متساوٍ للعرض (flex-1) داخل البطاقة
  const bothLinks = hasDemo && hasGithub;
  const equalSize = bothLinks ? "flex-1 basis-0" : "";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-300 hover:-translate-y-1 focus-within:-translate-y-1">
      {/* الصورة (تُعرض فقط إن وُجدت) — تحميل كسول افتراضيًا في next/image */}
      {hasImage && (
        <div className="relative aspect-video w-full overflow-hidden bg-background">
          <Image
            src={project.image}
            alt={project.name[locale]}
            fill
            loading="lazy"
            sizes={IMAGE_SIZES}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-center gap-2 font-display text-fluid-lg font-semibold">
          {project.name[locale]}
          {project.featured && (
            <>
              <Star className="size-4 text-primary" aria-hidden="true" />
              <span className="sr-only">{t("featured")}</span>
            </>
          )}
        </h3>

        <p className="mt-2 text-fluid-sm text-muted">
          {project.description[locale]}
        </p>

        {project.tech?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}

        {/* روابط المشروع: Demo و/أو Code؛ وإلا شارة "مشروع خاص".
            عند وجود الاثنين: بعرض متساوٍ جنبًا إلى جنب ويبقى متجاوبًا. */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-fg transition-opacity hover:opacity-90 ${equalSize}`}
            >
              <ExternalLink className="size-3.5" aria-hidden="true" />
              {t("liveDemo")}
            </a>
          )}

          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-background ${equalSize}`}
            >
              <Code2 className="size-3.5" aria-hidden="true" />
              {t("viewCode")}
            </a>
          )}

          {!hasLinks && (
            <span className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted">
              <Lock className="size-3.5" aria-hidden="true" />
              {t("privateProject")}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
