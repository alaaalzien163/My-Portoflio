// إعداد ESLint (Flat Config) لمشروع Next.js 16
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  // تجاهل مخرجات البناء والاعتماديات
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  ...nextCoreWebVitals,
];

export default config;
