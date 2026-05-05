import Hero from "./home/components/Hero";
import About from "./home/components/About";
import Services from "./home/components/Services";
import ProductsBrands from "./home/components/ProductsBrands";
import Contact from "./home/components/Contact";
import Stats from "./home/components/Stats";
import WhyPartener from "./home/components/WhyPartener";
import WhyChooseUs from "./home/components/WhyChooseUs";
import GlobalCTA from "./components/GlobalCTA"; // For the "looking_for" section
import { getPageData } from "@/services/home.service";

export default async function HomePage({ params }) {
  const { locale } = await params;
  const data = await getPageData("home", locale);

  if (!data) {
    return <div>Error loading page content</div>;
  }

  const findSection = (type) => data.sections.find(s => s[type])?.[type];

  // Mapping exactly according to the provided JSON
  const heroData = findSection("hero_section");
  const statsData = findSection("our_impact");
  const aboutData = findSection("leading_fmcg");
  const servicesData = findSection("comprehensive_distribution");
  const customDistData = findSection("custom_distribution"); // CTA after services
  const brandsData = findSection("our_brands");
  const whyChooseData = findSection("why_choose");
  const whyPartnerData = findSection("your_trusted");
  const lookingForData = findSection("looking_for"); // CTA before contact
  const contactData = findSection("contact_section_home");

  return (
    <div className="min-h-screen bg-white">
      {heroData && <Hero data={heroData} />}

      {statsData && <Stats data={statsData} />}

      {aboutData && <About data={aboutData} />}

      {servicesData && <Services data={servicesData} cta={customDistData} />}

      {brandsData && (
        <ProductsBrands
          brands={data.brands}
          data={brandsData}
        />
      )}

      {whyChooseData && <WhyChooseUs data={whyChooseData} />}

      {whyPartnerData && <WhyPartener data={whyPartnerData} cta={lookingForData} />}

      {/* {lookingForData && (
        <div className="py-12 md:py-16">
          <GlobalCTA data={lookingForData} contact={true} />
        </div>
      )} */}

      {contactData && <Contact data={contactData} ctaData={lookingForData} />}
    </div>
  );
}
