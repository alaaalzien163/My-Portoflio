"use client";

// نص قسم البطل (HeroText) — مكوّن عميل صغير للحركة المتتابعة.
// ملاحظة مهمة عن المكتبة:
// - المشروع يستخدم "motion" (motion.dev) وليس "framer-motion"؛ وواجهتهما شبه متطابقة.
//   لذا نستورد من "motion/react" بدل تثبيت مكتبة مكرّرة، ونستخدم مكوّنات m
//   لأن Providers يلفّ التطبيق بـ LazyMotion strict (تقليل حجم الحزمة).
// - يحترم prefers-reduced-motion: عند تفعيله تظهر النصوص فورًا دون حركة.
// - الحركة على transform/opacity فقط (لا CLS)، والصورة (LCP) في مكوّن منفصل لا تتأثر.

import Link from "next/link";
import { ArrowRight, Mail, Code2, Briefcase } from "lucide-react";
import { m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

// حاوية: تتابع ظهور الأبناء
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

// عنصر: صعود خفيف مع تلاشٍ (transform/opacity فقط)
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroText() {
  const locale = useLocale();
  const t = useTranslations("hero");
  const reduce = usePrefersReducedMotion();

  // محتوى النص (مشترك بين وضعي الحركة/السكون)
  const content = (
    <>
      {/* 1) التحية */}
      <m.p data-reveal variants={item} className="text-fluid-base font-medium text-primary">
        {t("greeting")}
      </m.p>

      {/* 2) الاسم + 3) المسمى الوظيفي */}
      <m.h1
        data-reveal variants={item}
        id="hero-heading"
        className="mt-3 font-display text-fluid-3xl font-bold leading-[1.1] tracking-tight"
      >
        {site.name[locale]}
      </m.h1>
      <m.p data-reveal variants={item} className="mt-2 text-fluid-xl text-muted">
        {site.role[locale]}
      </m.p>

      {/* 4) سطر الوصف */}
      <m.p data-reveal variants={item} className="mt-5 max-w-xl text-fluid-lg text-muted">
        {site.tagline[locale]}
      </m.p>

      {/* 5) الأزرار (كوحدة واحدة) */}
      <m.div
        data-reveal variants={item}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-fluid-sm font-medium text-primary-fg transition-opacity hover:opacity-90"
        >
          {t("viewProjects")}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>

        <Link
          href="#contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-fluid-sm font-medium text-foreground transition-colors hover:bg-surface"
        >
          {t("contactMe")}
        </Link>
      </m.div>

      {/* روابط التواصل */}
      <m.ul data-reveal variants={item} className="mt-8 flex items-center gap-4">
        <li>
          <a
            href={site.socials.github}
            aria-label={t("socials.github")}
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
            aria-label={t("socials.linkedin")}
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
            aria-label={t("socials.email")}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="size-5" aria-hidden="true" />
          </a>
        </li>
      </m.ul>
    </>
  );

  // احترام تقليل الحركة: عرض فوري بلا حركة (opacity ثابتة)
  if (reduce) {
    return <div>{content}</div>;
  }

  return (
    // الحركة تلقائيًا عند التحميل (initial/animate) — لا whileInView
    <m.div variants={container} initial="hidden" animate="visible">
      {content}
    </m.div>
  );
}
