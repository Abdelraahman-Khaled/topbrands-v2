import BlogGrid from "./components/BlogGrid";
import ServicesCTA from "../services/components/ServicesCTA";
import { getPageData } from "@/services/home.service";
import enCommon from "../i18n/local/en/common.js";
import arCommon from "../i18n/local/ar/common.js";

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("blogs", locale);

  if (!data || !data.blogs) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#4B4F54" }}>
        <p className="text-white/40 font-mono text-sm tracking-widest uppercase">No posts found</p>
      </div>
    );
  }

  const { blogs, sections } = data;
  const findSection = (key) => sections.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const ctaData = findSection("cta");

  const isAr = locale === "ar";
  const heroImg = heroData?.image_url || null;
  const heroLabel = heroData?.["Text Element 1"]?.value || (isAr ? "مدونتنا" : "OUR BLOG");
  const heroTitle = heroData?.["Text Element 2"]?.value || (isAr ? "رؤى الصناعة" : "Industry Insights");
  const yellowText = heroData?.settings?.[isAr ? "1" : "0"]?.value;
  const heroDesc = heroData?.["Text Element 3"]?.value || "";
  const yellowSub = heroData?.settings?.[isAr ? "3" : "2"]?.value;
  const descPart2 = heroData?.["Text Element 4"]?.value;

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>
        {heroImg && (
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt={heroTitle} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">
          {heroLabel && (
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold tracking-[4px] uppercase font-mono text-brand-yellow" >
                {heroLabel}
              </span>
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
            </div>
          )}

          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
          >
            {heroTitle}{yellowText && <span className="text-brand-yellow"> {yellowText}</span>}
          </h1>

          {(heroDesc || yellowSub || descPart2) && (
            <p className="mt-10 text-base lg:text-lg leading-relaxed max-w-lg">
              {heroDesc && <span className="text-white/90">{heroDesc} </span>}
              {yellowSub && <span className="font-bold text-brand-yellow">{yellowSub} </span>}
              {descPart2 && <span style={{ color: "rgba(255,255,255,0.6)" }}>{descPart2}</span>}
            </p>
          )}

          {/* Bottom rule */}
          <div
            className="mt-16 w-full h-px origin-left"
          />
        </div>
      </section>

      {/* ── BLOG GRID (client) ── */}
      <BlogGrid
        blogs={blogs}
        locale={locale}
        translations={locale === "ar" ? arCommon : enCommon}
      />

      {ctaData && <ServicesCTA data={ctaData} />}
    </div>
  );
}
