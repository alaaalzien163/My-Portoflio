import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

// محلّل الحزمة يُفعّل عند تشغيل: ANALYZE=true npm run build
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

// إضافة next-intl إلى إعداد Next
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // تحسين الصور: صيغ حديثة أخف حجمًا
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
