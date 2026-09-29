"use client";

// مزوّد الثيم (Dark/Light) عبر next-themes
// + LazyMotion من Motion: نحمّل مجموعة ميزات domAnimation فقط (بدون drag/layout)
//   مع استخدام مكوّنات m بدل motion، ما يقلّل حجم الحزمة بشكل ملموس.
// - attribute="class" يضيف class="dark"/"light" على <html> (يتوافق مع متغيرات CSS لدينا)
// - الوضع الداكن هو الافتراضي؛ enableSystem=false حتى لا يتبع تفضيل النظام
//   (يستطيع المستخدم التبديل يدويًا عبر زر الثيم)
// - disableTransitionOnChange يمنع "وميض" الانتقالات عند التبديل
import { ThemeProvider } from "next-themes";
import { LazyMotion, domAnimation } from "motion/react";

export default function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ThemeProvider>
  );
}
