import MarketHero from "./components/MarketHero";
import MarketMap from "./components/MarketMap";
import MarketChannels from "./components/MarketChannels";
import MarketCapabilities from "./components/MarketCapabilities";
import MarketLogistics from "./components/MarketLogistics";
import ServicesCTA from "../services/components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function MarketCoveragePage({ params }) {
  const { locale } = await params;
  const data = await getPageData("market_coverage", locale);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0f0f0f" }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Error loading market coverage</h1>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>Please try again later.</p>
        </div>
      </div>
    );
  }

  const findSection = (key) => data.find((s) => s[key])?.[key];

  const heroData         = findSection("hero");
  const mapData          = findSection("map");
  const areasData        = findSection("areas");
  const channelsData     = findSection("channels");
  const capabilitiesData = findSection("capabilities");
  const logisticsData    = findSection("logistics-infra");
  const ctaData          = findSection("market-cta");

  const chunkElements = (secData, start, size) => {
    if (!secData) return [];
    const results = [];
    let i = start;
    while (secData[`Element ${i}`]) {
      const item = {};
      for (let j = 0; j < size; j++) {
        item[`val${j}`] = secData[`Element ${i + j}`]?.value;
      }
      results.push(item);
      i += size;
    }
    return results;
  };

  const areas        = chunkElements(areasData, 1, 3);
  const channels     = chunkElements(channelsData, 3, 3);
  const capabilities = chunkElements(capabilitiesData, 3, 3);

  const logisticsPoints = [
    { title: logisticsData?.["Text Element 3"]?.value, desc: logisticsData?.["Text Element 4"]?.value },
    { title: logisticsData?.["Text Element 5"]?.value, desc: logisticsData?.["Text Element 6"]?.value },
    { title: logisticsData?.["Text Element 7"]?.value, desc: logisticsData?.["Text Element 8"]?.value },
  ].filter((p) => p.title);

  const isAr = locale === "ar";

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {heroData && <MarketHero heroData={heroData} isAr={isAr} />}

      <MarketMap mapData={mapData} areas={areas} locale={locale} />

      <MarketChannels channelsData={channelsData} channels={channels} isAr={isAr} />

      <MarketCapabilities capabilitiesData={capabilitiesData} capabilities={capabilities} isAr={isAr} />

      {logisticsData && (
        <MarketLogistics logisticsData={logisticsData} logisticsPoints={logisticsPoints} isAr={isAr} />
      )}

      {ctaData && <ServicesCTA data={ctaData} />}
    </div>
  );
}
