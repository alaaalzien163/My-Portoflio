"use client";

// شاشة البداية (Splash)
// - تعمل كطبقة علوية فوق المحتوى (المحتوى يُبنى على الخادم تحتها ولا يتأخر).
// - تظهر مرة واحدة لكل جلسة عبر sessionStorage، ويتم تفعيلها قبل الرسم.
// - تدعم اللغتين: الاسم من site.js حسب اللغة، والنصوص من messages/common.
// - العربية تُعرض ككلمة واحدة (تقديم الحروف يكسر اتصالها).

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { m } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { site } from "@/data/site";

// ===== الجدول الزمني (بالثواني) — الإجمالي ≈ 2.25s =====
const LETTER_DELAY = 0.12;
const LETTER_STAGGER = 0.05;
const LETTER_DURATION = 0.35;
const LOGO_DELAY = 0.65;
const LOGO_DURATION = 0.7;
const LOGO_STEP = 0.08;
const LINE_DELAY = 0.15;
const LINE_DURATION = 1.55;
const CURTAIN_DELAY = 1.55;
const CURTAIN_DURATION = 0.7;
const TOTAL_MS = Math.round((CURTAIN_DELAY + CURTAIN_DURATION) * 1000) + 100;
const REDUCED_MS = 650;

const EASE = [0.22, 1, 0.36, 1];

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: LETTER_STAGGER, delayChildren: LETTER_DELAY } },
};

const nameLetter = {
  hidden: { opacity: 0, y: "0.35em" },
  show: { opacity: 1, y: 0, transition: { duration: LETTER_DURATION, ease: EASE } },
};

// مسارات شعار "AA"
const LOGO_PATHS = [
  "M8 78 L33 12",
  "M33 12 L58 78",
  "M19 50 L47 50",
  "M72 78 L97 12",
  "M97 12 L122 78",
  "M83 50 L111 50",
];

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServer() {
  return false;
}

export default function Splash() {
  const locale = useLocale();
  const t = useTranslations("common");
  const isRtl = locale === "ar";
  const displayName = site.name[locale];

  const [visible, setVisible] = useState(true);
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getReducedMotionServer
  );

  const done = useRef(false);
  const skipRef = useRef(null);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("splash_seen", "1");
    } catch {
      /* تجاهل حالات تعطيل التخزين */
    }
    document.documentElement.classList.remove("splash-active", "splash-play");
    setVisible(false);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("splash-play")) {
      done.current = true;
      const id = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(id);
    }

    skipRef.current?.focus({ preventScroll: true });

    const timer = setTimeout(finish, reduce ? REDUCED_MS : TOTAL_MS);
    const onKeyDown = (event) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [finish, reduce]);

  if (!visible) return null;

  // العربية: بدون تفكيك الحروف (حفاظًا على اتصالها)
  const staticName = reduce || isRtl;

  return (
    <m.section
      aria-label="Site intro"
      className="splash fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-6"
      initial={{ y: 0, opacity: 1 }}
      animate={reduce ? { opacity: 0 } : { y: "-100%" }}
      transition={
        reduce
          ? { duration: 0.35, delay: 0.25, ease: "easeInOut" }
          : { duration: CURTAIN_DURATION, delay: CURTAIN_DELAY, ease: EASE }
      }
      onAnimationComplete={finish}
    >
      <p className="sr-only">
        {site.name[locale]} — {site.role[locale]}
      </p>

      <button
        ref={skipRef}
        type="button"
        onClick={finish}
        className="absolute end-4 top-4 rounded-md border border-border px-3 py-1.5 text-fluid-sm text-muted transition-colors hover:text-foreground"
      >
        {t("skipIntro")}
      </button>

      <div className="flex flex-col items-center gap-8" aria-hidden="true">
        {staticName ? (
          <span
            className={`font-display text-fluid-2xl font-bold text-foreground ${
              isRtl ? "" : "uppercase tracking-[0.2em]"
            }`}
          >
            {displayName}
          </span>
        ) : (
          <m.span
            variants={nameContainer}
            initial="hidden"
            animate="show"
            className="flex flex-wrap justify-center font-display text-fluid-2xl font-bold uppercase tracking-[0.2em] text-foreground"
          >
            {displayName.split("").map((char, index) =>
              char === " " ? (
                <span key={`space-${index}`} className="w-[0.4em]" />
              ) : (
                <m.span
                  key={`${char}-${index}`}
                  variants={nameLetter}
                  className="inline-block will-change-transform"
                >
                  {char}
                </m.span>
              )
            )}
          </m.span>
        )}

        <svg
          viewBox="0 0 130 90"
          className="h-14 w-auto text-foreground sm:h-16"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {LOGO_PATHS.map((d, index) =>
            reduce ? (
              <path key={d} d={d} />
            ) : (
              <m.path
                key={d}
                d={d}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: {
                    delay: LOGO_DELAY + index * LOGO_STEP,
                    duration: LOGO_DURATION,
                    ease: "easeInOut",
                  },
                  opacity: { delay: LOGO_DELAY + index * LOGO_STEP, duration: 0.01 },
                }}
              />
            )
          )}
        </svg>

        <div className="h-px w-40 overflow-hidden bg-border sm:w-56">
          {reduce ? (
            <div className="h-full w-full bg-primary" />
          ) : (
            <m.div
              className={`h-full w-full bg-primary ${
                isRtl ? "origin-right" : "origin-left"
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: LINE_DELAY, duration: LINE_DURATION, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </m.section>
  );
}
