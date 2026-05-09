import AboutHero from "./components/AboutHero";
import WhoWeAre from "./components/WhoWeAre";
import AboutMission from "./components/AboutMission";
import CoreValues from "./components/CoreValues";
import OurEdgeSection from "./components/OurEdgeSection";
import ServicesCTA from "../services/components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("about_us", locale);

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

  const heroData       = findSection("hero");
  const whoWeAreData   = findSection("who-we-are");
  const missionData    = findSection("vision-mission");
  const coreValuesData = findSection("core-values");
  const edgeData       = findSection("comp-edge");
  const ctaData        = findSection("about-cta");

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {heroData       && <AboutHero      data={heroData} />}
      {whoWeAreData   && <WhoWeAre       data={whoWeAreData} />}
      {missionData    && <AboutMission   data={missionData} />}
      {coreValuesData && <CoreValues     data={coreValuesData} />}
      {edgeData       && <OurEdgeSection data={edgeData} />}
      {ctaData        && <ServicesCTA    data={ctaData} />}
    </div>
  );
}
