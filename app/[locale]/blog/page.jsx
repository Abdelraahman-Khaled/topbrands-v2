import HeroSection from "../components/HeroSection";
import GlobalCTA from "../components/GlobalCTA";
import Subscribe from "../components/Subscribe";
import BlogFilterGrid from "./components/BlogFilterGrid";
import { getPageData } from "@/services/home.service";
import enCommon from "../i18n/local/en/common.js";
import arCommon from "../i18n/local/ar/common.js";

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("blogs", locale);

  if (!data || !data.blogs) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-jet mb-4">Error loading insights</h1>
          <p className="text-brand-charcoal">Please try again later.</p>
        </div>
      </div>
    );
  }

  const { blogs, sections } = data;
  const findSection = (key) => sections.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const ctaData = findSection("cta");

  return (
    <div className="min-h-screen bg-white">
      {/* Restored Original Blog Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-br from-[#000000] to-[#1a1a1a] overflow-hidden">
        {heroData?.image_url && (
          <div className="absolute inset-0 opacity-40">
            <img 
              src={heroData.image_url} 
              className="w-full h-full object-cover" 
              alt="Hero Background"
            />
            <div className="absolute inset-0 bg-black/60"></div>
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <span className="inline-block px-6 py-2 bg-brand-yellow text-black rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            {heroData?.["Text Element 1"]?.value}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            {heroData?.["Text Element 2"]?.value}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {heroData?.["Text Element 3"]?.value}
          </p>
        </div>
      </section>

      {/* Interactive Blog Grid with Filtering */}
      <BlogFilterGrid 
        blogs={blogs} 
        locale={locale} 
        translations={locale === 'ar' ? arCommon : enCommon}
      />

      {/* Newsletter Subscription / CTA */}
      {ctaData ? (
        <GlobalCTA data={ctaData} />
      ) : (
        <Subscribe />
      )}
    </div>
  );
}
