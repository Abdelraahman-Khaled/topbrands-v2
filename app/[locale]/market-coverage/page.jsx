import GlobalCTA from "../components/GlobalCTA";
import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import StaggerContainer from "../components/StaggerContainer";
import StaggerItem from "../components/StaggerItem";
import { getPageData } from "@/services/home.service";
import Counter from "../components/Counter";
import MarketMap from "./components/MarketMap";

export default async function MarketCoveragePage({ params }) {
  const { locale } = await params;
  // Note: page slug is market_coverage as per API
  const data = await getPageData("market_coverage", locale);

  if (!data || !Array.isArray(data)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-jet mb-4">Error loading market coverage</h1>
          <p className="text-brand-charcoal">Please try again later.</p>
        </div>
      </div>
    );
  }

  const findSection = (key) => data.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const mapData = findSection("map");
  const areasData = findSection("areas");
  const channelsData = findSection("channels");
  const capabilitiesData = findSection("capabilities");
  const logisticsData = findSection("logistics-infra");
  const ctaData = findSection("market-cta");

  // Helper to chunk elements (like areas)
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

  const areas = chunkElements(areasData, 1, 3);
  const channels = chunkElements(channelsData, 3, 3);
  const capabilities = chunkElements(capabilitiesData, 3, 3);

  const logisticsPoints = [
    { title: logisticsData?.["Text Element 3"]?.value, desc: logisticsData?.["Text Element 4"]?.value },
    { title: logisticsData?.["Text Element 5"]?.value, desc: logisticsData?.["Text Element 6"]?.value },
    { title: logisticsData?.["Text Element 7"]?.value, desc: logisticsData?.["Text Element 8"]?.value },
  ].filter(p => p.title);

  const isAr = locale === 'ar';

  // Custom mapping for Market Coverage Hero
  const heroSubtitle = heroData?.["Text Element 1"]?.value;
  const heroTitle = heroData?.["Text Element 2"]?.value;
  const heroYellowText = heroData ? heroData.settings?.[isAr ? "1" : "0"]?.value : null;
  const heroDesc1 = heroData?.["Text Element 3"]?.value;
  const heroDesc2 = heroData?.["Text Element 4"]?.value;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroData && (
        <HeroSection
          subtitle={heroSubtitle}
          title={heroTitle}
          yellowText={heroYellowText}
          description1={heroDesc1}
          description2={heroDesc2}
          img={heroData.image_url}
        />
      )}

      {/* Coverage Map & Areas Section */}
      <MarketMap
        mapData={mapData}
        areas={areas}
        locale={locale}
      />

      {/* Distribution Channels */}
      <ScrollReveal delay={0.2}>
        <section className="py-16 md:py-24 lg:py-32 bg-linear-to-b from-white to-brand-paleblue/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
                {channelsData?.["Element 1"]?.value}
              </h2>
              <p className="text-base md:text-lg text-brand-charcoal max-w-3xl mx-auto font-medium leading-relaxed">
                {channelsData?.["Element 2"]?.value}
              </p>
            </div>

            <StaggerContainer className="grid lg:grid-cols-3 gap-6 lg:gap-10">
              {channels.map((channel, index) => {
                const channelIcons = ["ri-store-2-line", "ri-shopping-cart-2-line", "ri-store-3-line"];
                return (
                  <StaggerItem key={index}>
                    <div className={`group card-hover bg-white rounded-[32px] p-6 md:p-8 lg:p-12 border-s-3 border-gray-200 hover:border-brand-yellow transition-colors duration-500 ease-in-out h-full flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
                      <div className="icon-hover w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-brand-charcoal rounded-2xl mb-6 md:mb-8">
                        <i className={`${channelIcons[index % channelIcons.length]} text-3xl md:text-4xl text-white`}></i>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
                        {channel.val0}
                      </h3>
                      <p className="text-base text-brand-charcoal leading-relaxed mb-8 flex-1">
                        {channel.val1}
                      </p>
                      <div className="inline-flex items-center space-x-3 rtl:space-x-reverse px-5 py-2.5 bg-brand-paleblue rounded-full w-fit">
                        <i className="ri-check-line text-brand-charcoal font-bold"></i>
                        <span className="text-sm font-bold text-black">
                          {channel.val2}
                        </span>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Capabilities Section */}
      <ScrollReveal delay={0.1}>
        <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden relative">
          {/* Background Decorative Blurs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-brand-yellow/10 rounded-full blur-[100px]  pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-yellow/15 rounded-full blur-[120px]  pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 md:mb-6">
                {capabilitiesData?.["Element 1"]?.value}
              </h2>
              <p className="text-base md:text-lg text-brand-charcoal max-w-3xl mx-auto font-medium leading-relaxed">
                {capabilitiesData?.["Element 2"]?.value}
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {capabilities.map((capability, index) => {
                const capabilityIcons = ["ri-truck-line", "ri-building-line", "ri-team-line", "ri-map-pin-line"];
                return (
                  <StaggerItem key={index}>
                    <div className={`group card-hover rounded-2xl p-8 text-center border border-transparent h-full flex flex-col justify-center transition-colors duration-500 ease-in-out ${index % 2 === 0 ? "bg-brand-paleblue hover:bg-brand-jet" : "bg-brand-paleblue hover:bg-brand-yellow"}`}>
                      <div className={`icon-hover w-16 h-16 flex items-center justify-center rounded-xl mb-6 mx-auto transition-colors duration-500 ${index % 2 === 0 ? "bg-brand-charcoal group-hover:bg-brand-yellow" : "bg-brand-yellow group-hover:bg-brand-jet"}`}>
                        <i className={`${capabilityIcons[index % capabilityIcons.length]} text-3xl transition-colors duration-500 ${index % 2 === 0 ? "text-brand-yellow group-hover:text-brand-jet" : "text-black group-hover:text-brand-yellow"}`}></i>
                      </div>
                      <p className={`text-sm font-medium mb-2 uppercase tracking-widest transition-colors duration-500 ${index % 2 === 0 ? "text-brand-charcoal group-hover:text-white/70" : "text-brand-charcoal group-hover:text-brand-jet"}`}>
                        {capability.val0}
                      </p>
                      <p className={`${!isNaN(parseFloat(capability.val1?.replace(/[^0-9.]/g, ""))) ? "text-3xl" : "text-xl"} font-bold mb-2 transition-colors duration-500 ${index % 2 === 0 ? "text-black group-hover:text-white" : "text-black group-hover:text-brand-jet"}`}>
                        {!isNaN(parseFloat(capability.val1?.replace(/[^0-9.]/g, ""))) ? (
                          <Counter value={capability.val1} />
                        ) : (
                          capability.val1
                        )}
                      </p>
                      <p className={`text-sm transition-colors duration-500 ${index % 2 === 0 ? "text-brand-charcoal group-hover:text-white/60" : "text-brand-charcoal group-hover:text-brand-jet"}`}>
                        {capability.val2}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Logistics Excellence */}
      {logisticsData && (
        <section className="py-16 md:py-24 lg:py-32 bg-linear-to-t from-white to-brand-paleblue/30 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 items-center">
              <div className={`space-y-6 md:space-y-8 ${isAr ? 'text-right' : 'text-left'}`}>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                  {logisticsData["Text Element 1"]?.value}
                </h2>
                <p className="text-base md:text-lg text-brand-charcoal leading-relaxed font-medium">
                  {logisticsData["Text Element 2"]?.value}
                </p>

                <StaggerContainer className="space-y-4">
                  {logisticsPoints.map((point, idx) => (
                    <StaggerItem key={idx} className={`group flex items-start space-x-4 rtl:space-x-reverse relative p-4 cursor-pointer ${isAr ? 'flex-row-reverse' : ''}`}>
                      <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                      <div className="w-8 h-8 flex items-center justify-center bg-brand-yellow rounded-lg mt-1 shrink-0">
                        <i className="ri-check-line text-black"></i>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-black mb-2">{point.title}</h4>
                        <p className="text-base text-brand-charcoal">{point.desc}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              <div className="relative h-[350px] md:h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={logisticsData.image_url}
                  alt="Logistics Infrastructure"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {ctaData && (
        <GlobalCTA
          data={ctaData}
          btnLink="/become-a-partner"
        />
      )}
    </div>
  );
}
