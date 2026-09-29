/** @type {import('tailwindcss').Config} */
module.exports = {
  // تفعيل الوضع الداكن عبر كلاس .dark (يدعم التبديل اليدوي لاحقًا)
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/data/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // ربط ألوان Tailwind بمتغيرات CSS لدعم Dark/Light
      colors: {
        background: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        foreground: "rgb(var(--color-fg) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--color-primary) / <alpha-value>)",
          fg: "rgb(var(--color-primary-fg) / <alpha-value>)",
        },
        accent: "rgb(var(--color-accent) / <alpha-value>)",
      },
      // خطوط ديناميكية: تتبدّل بين اللاتينية والعربية حسب لغة الصفحة (globals.css)
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      // أحجام خط انسيابية باستخدام clamp()
      fontSize: {
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.3vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.6vw, 1.5rem)",
        "fluid-xl": "clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 1.4rem + 2.4vw, 3.5rem)",
        "fluid-3xl": "clamp(2.5rem, 1.6rem + 3.6vw, 5rem)",
      },
      // حاوية بعرض أقصى مريح على الشاشات الكبيرة
      maxWidth: {
        content: "80rem",
      },
    },
  },
  plugins: [],
};
