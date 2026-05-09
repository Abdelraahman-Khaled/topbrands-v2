import ServicesHero from "./components/ServicesHero";
import ServicesGrid from "./components/ServicesCards";
import ExcellenceSection from "./components/ServiceExellence";
import ServicesCTA from "./components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("services", locale);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error loading content</h1>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Please try again later.</p>
        </div>
      </div>
    );
  }

  const findSection = (key) => data.find((s) => s[key])?.[key];

  const heroData        = findSection("hero");
  const excellenceData  = findSection("service-exc");
  const ctaData         = findSection("services-cta");

  const gridSections = {
    fmcgDist:           findSection("fmcg-dist"),
    retailTrade:        findSection("retail-trade"),
    brandRep:           findSection("brand-rep"),
    salesExec:          findSection("sales-exec"),
    marketCov:          findSection("market-cov"),
    merchVis:           findSection("merch-vis"),
    importTrade:        findSection("import-trade"),
    marketIntelligence: findSection("market_intelligence"),
  };

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {heroData && <ServicesHero data={heroData} />}
      <ServicesGrid data={gridSections} />
      {excellenceData && <ExcellenceSection data={excellenceData} />}
      {ctaData && <ServicesCTA data={ctaData} />}
    </div>
  );
}
