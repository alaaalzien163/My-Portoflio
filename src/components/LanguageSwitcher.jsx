"use client";

// زر تبديل اللغة (AR ⇄ EN) — مكوّن عميل خفيف
// - يحفظ اختيار المستخدم في كوكي NEXT_LOCALE (يُقرأ في middleware).
// - ينتقل إلى نفس الصفحة باللغة الأخرى مع الحفاظ على موضع التمرير (scroll:false).
import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("common");
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const next = locale === "ar" ? "en" : "ar";

  function handleSwitch() {
    // حفظ الاختيار في كوكي ليُستخدم عند زيارة الجذر "/" لاحقًا
    try {
      document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    } catch {
      /* تجاهل حالات تعطيل الكوكي */
    }

    startTransition(() => {
      // scroll:false للحفاظ على موضع التمرير الحالي (نفس الصفحة)
      router.replace(pathname, { locale: next, scroll: false });
    });
  }

  return (
    <button
      type="button"
      onClick={handleSwitch}
      disabled={pending}
      aria-label={t("switchLanguage")}
      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-border px-2.5 text-xs font-medium text-muted transition-colors hover:text-foreground disabled:opacity-60"
    >
      <Globe className="size-4" aria-hidden="true" />
      {next === "ar" ? "AR" : "EN"}
    </button>
  );
}
