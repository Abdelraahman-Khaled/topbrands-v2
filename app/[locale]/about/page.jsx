import HeroSection from "../components/HeroSection";
import WhoWeAre from "./components/WhoWeAre";
import AboutMission from "./components/AboutMission";
import CoreValues from "./components/CoreValues";
import OurEdgeSection from "./components/OurEdgeSection";
import GrowthDirection from "./components/GrowthDirection";
import GlobalCTA from "../components/GlobalCTA";
import { getPageData } from "@/services/home.service";

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const data = await getPageData("about_us", locale);

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

  const findSection = (key) => data.find(s => s[key])?.[key];

  const heroData = findSection("hero");
  const whoWeAreData = findSection("who-we-are");
  const missionData = findSection("vision-mission");
  const coreValuesData = findSection("core-values");
  const edgeData = findSection("comp-edge");
  const growthData = findSection("growth-direction") || findSection("al-barengi");
  const ctaData = findSection("about-cta");

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroData && <HeroSection data={heroData} />}

      {/* Who We Are Section */}
      {whoWeAreData && <WhoWeAre data={whoWeAreData} />}

      {/* Vision & Mission Section */}
      {missionData && <AboutMission data={missionData} />}

      {/* Core Values Section */}
      {coreValuesData && <CoreValues data={coreValuesData} />}

      {/* Our Edge Section */}
      {edgeData && <OurEdgeSection data={edgeData} />}

      {/* Growth Direction Section */}
      {/* {growthData && <GrowthDirection data={growthData} />} */}

      {/* CTA Section */}
      {ctaData && (
        <GlobalCTA 
          data={ctaData} 
          contact={false} 
        />
      )}
    </div>
  );
}
