"use client";

// زر تبديل الثيم (فاتح/داكن)
// - الأيقونتان تُعرضان عبر CSS (dark:) لتفادي عدم تطابق الـ hydration بدون حالة إضافية
// - التبديل يستخدم next-themes فقط عند النقر (لا يعمل على الخادم)
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}
