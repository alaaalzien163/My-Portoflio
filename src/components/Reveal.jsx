"use client";

// Reveal: غلاف عميل صغير لإضافة حركة ظهور عند التمرير (whileInView مرة واحدة).
// - المحتوى يبقى مكوّن خادم ويُمرّر كأبناء (children) فيُبنى على الخادم.
// - عند تفعيل تقليل الحركة يُعرض المحتوى كما هو بدون أي حركة.
// - يستخدم مكوّنات m ضمن LazyMotion (domAnimation) لتقليل حجم الحزمة.
import { m } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}) {
  const reduce = usePrefersReducedMotion();

  if (reduce) {
    return (
      <Tag className={className} data-reveal>
        {children}
      </Tag>
    );
  }

  const MotionTag = m[Tag] ?? m.div;

  return (
    <MotionTag
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}
