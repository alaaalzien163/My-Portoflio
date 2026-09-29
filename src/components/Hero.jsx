import HeroText from "@/components/HeroText";
import HeroPhoto from "@/components/HeroPhoto";

// قسم البطل (Hero) — مكوّن خادم.
// النص (بحركة متتابعة) في HeroText، والصورة (LCP) في HeroPhoto؛ كلاهما مفصول.
export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-content px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      {/* عمودان على الشاشات الكبيرة، عمود واحد على الجوال */}
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* عمود النص (حركة متتابعة) */}
        <HeroText />

        {/* عمود الصورة (تفاعلي، ولا يتأثر بتأخير حركة النص) */}
        <HeroPhoto />
      </div>
    </section>
  );
}
