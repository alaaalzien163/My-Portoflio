import { Mail, Code2, Briefcase, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/data/site";
import Reveal from "@/components/Reveal";

// رابط واتساب: نحذف "+" وأي أصفار بادئة من الرقم الدولي
const whatsappHref = `https://wa.me/${site.whatsapp.replace(/[^\d]/g, "")}`;

// قسم "تواصل معي" (Contact) — مكوّن خادم.
export default async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <Reveal>
        <h2
          id="contact-heading"
          className="font-display text-fluid-2xl font-bold tracking-tight"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-fluid-base text-muted">
          {t("description")}
        </p>
      </Reveal>

      {/* عمودان على الشاشات الكبيرة، عمود واحد على الجوال */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* معلومات التواصل */}
        <Reveal>
          <div className="space-y-8">
            <div>
              <h3 className="font-display text-fluid-lg font-semibold">
                {t("email")}
              </h3>
              <a
                href={`mailto:${site.email}`}
                dir="ltr"
                className="mt-2 inline-flex items-center gap-2 text-fluid-base text-muted transition-colors hover:text-foreground"
              >
                <Mail className="size-5" aria-hidden="true" />
                {site.email}
              </a>
            </div>

            <div>
              <h3 className="font-display text-fluid-lg font-semibold">
                {t("findMeOn")}
              </h3>
              <ul className="mt-3 flex items-center gap-4">
                <li>
                  <a
                    href={site.socials.github}
                    aria-label="GitHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Code2 className="size-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={site.socials.linkedin}
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                  >
                    <Briefcase className="size-5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* بطاقة واتساب (بديل النموذج) */}
        <Reveal delay={0.05}>
          <div className="flex h-full flex-col justify-center rounded-xl border border-border bg-surface p-8 text-center">
            <MessageCircle
              className="mx-auto size-10 text-primary"
              aria-hidden="true"
            />
            <p className="mt-4 text-fluid-base text-muted">
              {t("whatsappHint")}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 self-center rounded-lg bg-primary px-6 py-3 text-fluid-sm font-medium text-primary-fg transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              {t("whatsapp")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
