/**
 * قائمة المشاريع (Projects)
 *
 * كيفية إضافة مشروع جديد في 3 خطوات:
 * 1) انسخ أحد الكائنات في المصفوفة أدناه كقالب.
 * 2) عدّل الحقول: id (فريد)، name، description، tech، وحدّد featured (true/false).
 * 3) املأ الحقول الاختيارية:
 *    - demo: رابط المعاينة الحية (Live Demo).
 *    - github: رابط الكود المصدري (View Code).
 *    اتركها "" إن لم تتوفر (تظهر شارة "مشروع خاص" عند غياب الاثنين).
 *
 * الترجمة (i18n):
 * - الحقول النصية (name و description) كائن بالشكل { ar: "...", en: "..." }.
 *   أضف ترجمة كل لغة عند إضافة مشروع جديد، ولا تضعها في ملفات messages.
 * - حقول tech مصفوفة أسماء تقنيات وتبقى ثابتة (غير مترجمة).
 *
 * ملاحظة: ضع الصور داخل public/images واكتب المسار هكذا: "/images/your-file.webp".
 *
 * @typedef {Object} LocalizedString
 * @property {string} ar
 * @property {string} en
 *
 * @typedef {Object} Project
 * @property {number}                id
 * @property {LocalizedString}       name
 * @property {LocalizedString}       description
 * @property {string}                demo
 * @property {string}                github
 * @property {string[]}              tech
 * @property {string}                image
 * @property {boolean}               featured
 */

/** @type {Project[]} */
export const projects = [
  {
    id: 1,
    name: {
      ar: "لوحة سجل قسم التخدير",
      en: "Anesthesia Department Logbook Dashboard",
    },
    description: {
      ar: "لوحة تحكم إدارية لرئيس قسم التخدير في مستشفى المواساة لإدارة سجلات العمليات والتقارير، مع دعم العربية والإنجليزية وتخطيط RTL وتوليد تقارير PDF.",
      en: "An admin dashboard for Mouwasat Hospital's Head of Anesthesia to manage surgery logbooks and reports. Supports Arabic/English with a full RTL layout and on-demand PDF report generation.",
    },
    demo: "https://anesthesia-control-panel.vercel.app/",
    github: "https://github.com/alaaalzien163/Control-panel-for-the-head-of-the-anesthesia-department-at-Al-Mowasat-Hospital",
    tech: ["React", "i18n", "RTL", "PDF"],
    image: "",
    featured: true,
  },
  {
    id: 2,
    name: { ar: "مكتبة تيلو", en: "Tello Library" },
    description: {
      ar: "نظام إدارة مكتبات يجمع بين تطبيق Flutter ولوحة تحكم ويب لإدارة طلبات الطباعة ومتابعتها من البداية للنهاية.",
      en: "A library management system combining a Flutter mobile app with a web dashboard to handle and track printing requests end to end.",
    },
    demo: "https://apptelloprintingcenter.com/login",
    github: "https://github.com/alaaalzien163/Tello-Library-Dashboard",
    tech: ["Flutter", "React.js"],
    image: "",
    featured: true,
  },
  {
    id: 3,
    name: { ar: "منصة القوائم الرقمية", en: "Digital Menu Platform" },
    description: {
      ar: "حل قوائم رقمية لمطاعم ليوان وسويت بوكس ولا دولتشي فيتا، مع لوحة تحكم لإدارة عناصر القائمة فوريًا.",
      en: "A digital menu solution for Liwan, Sweet Box, and La Dolce Vita restaurants, paired with a dashboard for managing menu items in real time.",
    },
    demo: "https://la-dolce-vita-aleppo.vercel.app/",
    github: "https://github.com/alaaalzien163/la-dolce-vita-aleppo",
    tech: ["Next.js", "Supabase"],
    image: "",
    featured: true,
  },
  {
    id: 4,
    name: { ar: "إيزي للتجارة الإلكترونية", en: "Easy E-Commerce" },
    description: {
      ar: "موقع تجارة إلكترونية متكامل مع نظام إشعارات لإبقاء المستخدمين على اطلاع بالطلبات والتحديثات.",
      en: "A full-featured e-commerce website with an integrated notifications system to keep users informed about orders and updates.",
    },
    demo: "",
    github: "https://github.com/alaaalzien163/Easy-Web",
    tech: ["React", "E-Commerce", "Notifications"],
    image: "",
    featured: false,
  },
  {
    id: 5,
    name: { ar: "إيفينتو", en: "Evento" },
    description: {
      ar: "لوحة تحكم لإدارة الفعاليات وتنظيمها وجدولتها ومتابعتها بواجهة نظيفة ومتجاوبة.",
      en: "An event management dashboard for organizing, scheduling, and tracking events through a clean, responsive interface.",
    },
    demo: "",
    github: "",
    tech: ["React", "Tailwind CSS"],
    image: "",
    featured: false,
  },
  {
    id: 6,
    name: { ar: "نظام إدارة الشكاوى", en: "Complaints Management System" },
    description: {
      ar: "لوحة تحكم لتسجيل الشكاوى وتصنيفها ومعالجتها مع متابعة فعّالة للحالة.",
      en: "A CMS dashboard for logging, categorizing, and resolving customer complaints with efficient status tracking.",
    },
    demo: "",
    github: "https://github.com/alaaalzien163/CMS-Project",
    tech: ["React", "Tailwind CSS"],
    image: "",
    featured: false,
  },
  {
    id: 7,
    name: { ar: "صفحات هبوط", en: "Landing Pages" },
    description: {
      ar: "مجموعة صفحات هبوط تسويقية، منها لعيادة أسنان وأخرى لعطور داون، مع التركيز على الوضوح والتحويل.",
      en: "A set of marketing landing pages, including one for a dental clinic and another for Dawn Perfumes, focused on clarity and conversion.",
    },
    demo: "https://msa-online.vercel.app/",
    github: "https://github.com/alaaalzien163/MSA-Online",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "",
    featured: false,
  },
];

export default projects;
