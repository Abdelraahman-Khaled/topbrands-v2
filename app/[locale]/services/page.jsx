import HeroSection from "../components/HeroSection";
import ServicesGrid from "./components/ServicesCards";
import ExcellenceSection from "./components/ServiceExellence";
import GlobalCTA from "../components/GlobalCTA";
import { getPageData } from "@/services/home.service";

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("services", locale);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-jet mb-4">Error loading content</h1>
          <p className="text-brand-charcoal">Please try again later.</p>
        </div>
      </div>
    );
  }

  const findSection = (key) => data.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const excellenceData = findSection("service-exc");
  const ctaData = findSection("services-cta");

  // Group all service-specific sections for the grid
  const gridSections = {
    fmcgDist: findSection("fmcg-dist"),
    retailTrade: findSection("retail-trade"),
    brandRep: findSection("brand-rep"),
    salesExec: findSection("sales-exec"),
    marketCov: findSection("market-cov"),
    merchVis: findSection("merch-vis"),
    importTrade: findSection("import-trade"),
    marketIntelligence: findSection("market_intelligence"),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroData && <HeroSection data={heroData} />}

      {/* Services Grid (Distribution, Retail, etc.) */}
      <ServicesGrid data={gridSections} />

      {/* Service Excellence Section */}
      {excellenceData && <ExcellenceSection data={excellenceData} />}

      {/* Global CTA Section */}
      {ctaData && (
        <GlobalCTA
          data={ctaData}
          contact={true}
        />
      )}
    </div>
  );
}
