"use client";

// صورة البطل (HeroPhoto) — المكوّن العميل الوحيد في قسم البطل
// السبب: تفاعل بسيط (ميل خفيف يتبع المؤشر) لا يمكن تحقيقه بـ CSS وحده.
// - يعدّل transform مباشرة عبر ref بدون أي إعادة رندر أو حالة React.
// - يُعطَّل على الأجهزة اللمسية وعند تفعيل تقليل الحركة.
// - يبقى transform/opacity فقط، والصورة نفسها تُبنى على الخادم (لا تتأخر LCP).

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { profileImage } from "@/data/profile";

const MAX_TILT = 8; // أقصى زاوية ميل بالدرجات
const HOVER_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

export default function HeroPhoto() {
  const t = useTranslations("hero");
  const frameRef = useRef(null);
  const enabledRef = useRef(false);

  // نحدّد الأهلية مرة واحدة (بدون إعادة رندر)
  useEffect(() => {
    enabledRef.current =
      window.matchMedia(HOVER_QUERY).matches &&
      !window.matchMedia(REDUCED_QUERY).matches;
  }, []);

  const handlePointerMove = (event) => {
    if (!enabledRef.current) return;
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `perspective(900px) rotateY(${
      x * MAX_TILT
    }deg) rotateX(${-y * MAX_TILT}deg)`;
  };

  const handlePointerLeave = () => {
    const frame = frameRef.current;
    if (frame) frame.style.transform = "";
  };

  return (
    // الغلاف الخارجي يحمل حركة الدخول (transform) لتفادي التعارض مع الميل
    // أحجام متجاوبة: ~300px جوال، ~420px تابلت، ~560px شاشات كبيرة
    <div className="hero-enter-rise relative isolate mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:mx-0 lg:max-w-[560px]">
      {/* توهّج زخرفي خلف الصورة — إزاحة بنسبة مئوية لتتناسب مع حجم الصورة */}
      <div
        aria-hidden="true"
        className="absolute -inset-[7%] -z-10 rounded-full bg-gradient-to-br from-primary/25 to-accent/25 blur-2xl"
      />

      {/* إطار عضوي (شكل غير منتظم) بـ border-radius فقط */}
      <div
        ref={frameRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          borderRadius: "62% 38% 46% 54% / 55% 48% 52% 45%",
          aspectRatio: "1 / 1",
        }}
        className="relative overflow-hidden border border-border/60 bg-surface shadow-xl transition-transform duration-200 ease-out will-change-transform"
      >
        <Image
          src={profileImage.src}
          alt={t("portraitAlt")}
          width={profileImage.width}
          height={profileImage.height}
          priority
          placeholder="blur"
          blurDataURL={profileImage.blurDataURL}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 420px, 560px"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
