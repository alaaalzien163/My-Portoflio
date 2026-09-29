import { site } from "@/data/site";

// قواعد الزحف — تُولّد تلقائيًا على /robots.txt
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
