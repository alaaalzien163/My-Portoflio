"use client";

// الشريط العلوي (Navbar)
// - مكوّن عميل: Scroll Spy + قائمة الجوال + زر اللغة + تغيّر المظهر عند التمرير.
// - يستخدم useTranslations للنصوص، وخصائص منطقية (start/end) لدعم RTL/LTR.
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// منحنى حركة ناعم لقائمة الجوال
const EASE = [0.22, 1, 0.36, 1];

export default function Navbar() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const rtl = locale === "ar";

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  const sentinelRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  // ===== تغيّر المظهر عند التمرير عبر Sentinel + IntersectionObserver (بدون مستمع scroll) =====
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // ===== Scroll Spy: يُبرز القسم الأكثر ظهورًا في منتصف الشاشة =====
  useEffect(() => {
    const ids = site.nav.map((item) => item.href.replace("#", "")).filter(Boolean);
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const ratios = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) ratios.set(entry.target.id, entry.intersectionRatio);
        let bestId = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActive(bestId);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // إغلاق القائمة وإعادة التركيز إلى زر القائمة
  const closeMenu = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  // ===== إدارة قائمة الجوال: تركيز، Esc، حصر التركيز، وقفل تمرير الخلفية =====
  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const focusables = menuRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeMenu]);

  // اتجاه انزلاق القائمة حسب اللغة
  const panelOffset = rtl ? "-100%" : "100%";

  return (
    <>
      {/* عنصر مراقبة عند أعلى الصفحة لتحديد حالة "التمرير" */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute inset-x-0 top-0 h-px" />

      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-border bg-background shadow-sm md:bg-background/90 md:backdrop-blur"
            : "border-transparent bg-background"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          {/* رابط تخطي للوصول السريع للمحتوى */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
          >
            {tCommon("skipToContent")}
          </a>

          <Link
            href="#home"
            className="font-display text-fluid-lg font-bold tracking-tight"
            onClick={() => setActive("home")}
          >
            {site.name[locale]}
          </Link>

          {/* روابط سطح المكتب */}
          <ul className="hidden items-center gap-6 md:flex">
            {site.nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative text-fluid-sm transition-colors ${
                      isActive ? "text-primary" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {t(item.id)}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />

            {/* زر قائمة الجوال */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground md:hidden"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* قائمة الجوال المنزلقة */}
      <AnimatePresence>
        {open && (
          // خلفية معتمة: النقر عليها يغلق القائمة
          <m.div
            key="backdrop"
            aria-hidden="true"
            onClick={closeMenu}
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        {open && (
          <m.div
            key="panel"
            id="mobile-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed end-0 top-0 z-50 flex h-dvh w-72 max-w-[85vw] flex-col gap-2 bg-background p-6 shadow-xl md:hidden"
            initial={{ x: panelOffset }}
            animate={{ x: 0 }}
            exit={{ x: panelOffset }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="font-display text-fluid-lg font-bold tracking-tight">
                {site.name[locale]}
              </span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {site.nav.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      onClick={() => {
                        setActive(id);
                        closeMenu();
                      }}
                      className={`block rounded-lg px-3 py-3 text-fluid-base transition-colors ${
                        isActive
                          ? "bg-surface text-primary"
                          : "text-muted hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      {t(item.id)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
