import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

// قسم المشاريع (Projects) — مكوّن خادم.
// يقرأ المشاريع من projects.js ويعرضها تلقائيًا (أضف عنصرًا فيظهر مباشرة).
export default async function Projects() {
  const t = await getTranslations("projects");

  // المشاريع المميّزة أولًا (فرز مستقر يحافظ على ترتيب البقية)
  const ordered = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <h2
          id="projects-heading"
          className="font-display text-fluid-2xl font-bold tracking-tight"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-fluid-base text-muted">
          {t("description")}
        </p>
      </Reveal>

      {/* شبكة متجاوبة: عمود واحد للجوال، عمودان للتابلت، ثلاثة للشاشات الكبيرة */}
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ordered.map((project, index) => (
          <li key={project.id} className="h-full">
            <Reveal className="h-full" delay={Math.min(index, 5) * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
