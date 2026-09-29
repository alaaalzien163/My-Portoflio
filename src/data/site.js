// بيانات الموقع العامة (i18n)
// ملاحظة: كل حقل نصي يُخزّن ككائن { ar, en }، ويتم اختيار اللغة في المكوّنات
// حسب اللغة الحالية (getLocale على الخادم أو useLocale على العميل).
export const site = {
  name: { ar: "علاء الزين", en: "Alaa Al-Zein" },
  jobTitle: { ar: "مهندس برمجيات", en: "Software Engineer" },
  role: { ar: "مهندس برمجيات", en: "Software Engineer" },

  // نبذة موجزة (Bio)
  bio: {
    ar: "مهندس برمجيات متخصص في بناء تطبيقات ويب وموبايل سريعة وسهلة الوصول ومتعددة اللغات. لديّ خبرة في تطوير لوحات التحكم والأنظمة المتكاملة باستخدام React وNext.js وFlutter، مع تركيز على البنية النظيفة والأداء وتجربة المستخدم.",
    en: "Software Engineer specializing in building fast, accessible, and multilingual web and mobile applications. Experienced in crafting admin dashboards and end-to-end systems with React, Next.js, and Flutter, with a strong focus on clean architecture, performance, and thoughtful user experience.",
  },

  // سطر وصفي قصير لقسم البطل (Hero)
  tagline: {
    ar: "أبني تجارب ويب وموبايل سريعة وسهلة الوصول ومتعددة اللغات .",
    en: "I build fast , accessible , and multilingual web and mobile experiences .",
  },

  // وصف مختصر للـ SEO
  description: {
    ar: "الموقع الشخصي لعلاء الزين، مهندس برمجيات يبني تطبيقات ويب وموبايل سريعة وسهلة الوصول ومتعددة اللغات باستخدام React و Next.js و Flutter .",
    en: "Portfolio of Alaa Al-Zein , a Software Engineer building fast , accessible , and multilingual web and mobile applications with React , Next.js , and Flutter .",
  },

  // عدّل الرابط لاحقًا إلى الدومين الحقيقي
  url: "https://alaa-alzein.com",
  email: "alaaalzien163@gmail.com",

  // رقم واتساب بالصيغة الدولية الكاملة (يُستخدم في التواصل والتذييل لاحقًا)
  // ملاحظة: في رابط wa.me نحذف "+" وأي أصفار بادئة → 963988395769
  whatsapp: "+963988395769",

  // روابط التواصل
  socials: {
    github: "https://github.com/alaaalzien163",
    linkedin: "https://www.linkedin.com/in/alaa-alzien-8860a0225",
  },

  // أقسام التنقل: المفتاح (id) يُترجم من messages/nav، والـ href ثابت
  nav: [
    { id: "home", href: "#home" },
    { id: "about", href: "#about" },
    { id: "projects", href: "#projects" },
    { id: "contact", href: "#contact" },
  ],

  // المهارات مصنّفة حسب المجال (اسم المجال قابل للترجمة، وأسماء التقنيات ثابتة)
  skills: [
    {
      category: { ar: "الواجهة الأمامية", en: "Frontend" },
      items: ["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
    },
    {
      category: { ar: "الواجهة الخلفية", en: "Backend" },
      items: ["Laravel", "Node.js", "REST APIs"],
    },
    {
      category: { ar: "الموبايل", en: "Mobile" },
      items: ["Flutter", "Dart"],
    },
    {
      category: { ar: "قواعد البيانات", en: "Databases" },
      items: ["Supabase", "PostgreSQL", "SQL Server"],
    },
    {
      category: { ar: "الأدوات", en: "Tools" },
      items: ["Git", "GitHub", "Adobe XD", "VS Code"],
    },
  ],

  // التعليم
  education: [
    {
      degree: {
        ar: "بكالوريوس في هندسة البرمجيات",
        en: "B.Sc. in Software Engineering",
      },
      institution: { ar: "جامعة دمشق", en: "Damascus University" },
    },
  ],
};

export default site;
