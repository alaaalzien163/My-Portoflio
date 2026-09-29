"use client";

import { useSyncExternalStore } from "react";

// هوك لقراءة تفضيل "تقليل الحركة" بدون setState داخل effect
// - يُعيد false على الخادم وفي أول رسم (تفادي اختلاف الـ hydration) ثم القيمة الحقيقية.
const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default usePrefersReducedMotion;
