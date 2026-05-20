import BrandsHero from "./components/BrandsHero";
import BrandsGrid from "./components/BrandsGrid";
import ServicesCTA from "../services/components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function BrandsPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("brands", locale);

  if (!data || !data.brands) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#4b4f54" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {locale === "ar" ? "خطأ في تحميل العلامات التجارية" : "Error loading brands"}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            {locale === "ar" ? "يرجى المحاولة مرة أخرى في وقت لاحق." : "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const { brands, sections } = data;
  const findSection = (key) => sections.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const ctaData  = findSection("categories");

  return (
    <div className="min-h-screen" style={{ background: "#f7f6f2" }}>
      {heroData && <BrandsHero data={heroData} />}
      <BrandsGrid brands={brands} locale={locale} />
      {ctaData && <ServicesCTA data={ctaData} />}
    </div>
  );
}
