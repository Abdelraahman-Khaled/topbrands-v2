import HeroSection from "../components/HeroSection";
import GlobalCTA from "../components/GlobalCTA";
import StaggerContainer from "../components/StaggerContainer";
import StaggerItem from "../components/StaggerItem";
import LocalizedLink from "../components/LocalizedLink";
import ScrollReveal from "../components/ScrollReveal";
import Counter from "../components/Counter";
import { getPageData } from "@/services/home.service";

export default async function BrandsPage({ params }) {

  const { locale } = await params;
  const data = await getPageData("brands", locale);
  console.log(locale);

  if (!data || !data.brands) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-jet mb-4">
            {locale === "ar" ? "خطأ في تحميل العلامات التجارية" : "Error loading brands"}
          </h1>
          <p className="text-brand-charcoal">
            {locale === "ar" ? "يرجى المحاولة مرة أخرى في وقت لاحق." : "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  const { brands, sections } = data;

  const findSection = (key) => sections.find((s) => s[key])?.[key];

  const heroData = findSection("hero");
  const ctaData = findSection("categories");

  return (
    <div className="min-h-screen bg-[#DEE3EB]">
      {/* Hero Section */}
      {heroData && <HeroSection data={heroData} />}

      {/* Brands Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 ">
          <ScrollReveal delay={0.2}>
            <div className="flex items-center justify-between mb-12">
              <p className="text-lg text-brand-charcoal font-medium">
                {locale === "ar" ? (
                  <>
                    إظهار <strong className="text-brand-jet"><Counter value={brands.length} /></strong> علامة تجارية موثوقة
                  </>
                ) : (
                  <>
                    Showing <strong className="text-brand-jet"><Counter value={brands.length} /></strong> trusted brands
                  </>
                )}
              </p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <StaggerItem key={brand.id}>
                <LocalizedLink
                  href={`/brands/${brand.id}`}
                  className="block h-full group card-hover bg-white rounded-3xl overflow-hidden border-2 border-transparent shadow-sm cursor-pointer"
                >
                  <div className="flex flex-col h-full">
                    {/* Brand Logo Container */}
                    <div className="w-full h-56 flex items-center justify-center bg-white p-10 border-b border-gray-100 relative">
                      <img
                        src={brand.image_url}
                        alt={brand.alt_text || brand.title}
                        className="max-w-full max-h-full object-contain"
                      />
                      {brand.is_highlighted && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#F7E326] text-black text-xs font-bold rounded-full shadow-lg">
                            <i className="ri-star-fill text-[10px]"></i>
                            {locale === "ar" ? "مميز" : "FEATURED"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Brand Info */}
                    <div className="p-8 flex-grow flex flex-col">
                      <h3 className="text-2xl font-bold text-brand-jet mb-3 group-hover:text-black transition-colors">
                        {brand.title}
                      </h3>
                      <p className="text-brand-charcoal text-base leading-relaxed line-clamp-3">
                        {brand.description || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate veniam quam facilis officiis necessitatibus praesentium iste! Nulla corrupti odit ab laborum dolor? A, velit doloribus? Unde, consequatur. Incidunt, eaque repellat!"}
                      </p>

                      <div className="mt-auto pt-6 flex items-center text-brand-jet font-bold gap-2 group-hover:gap-3 transition-all">
                        {locale === "ar" ? "عرض المنتجات" : "View Products"}
                        <i className="ri-arrow-right-line rtl:rotate-180"></i>
                      </div>
                    </div>
                  </div>
                </LocalizedLink>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section >

      {/* CTA Section */}
      {ctaData && <GlobalCTA data={ctaData} />}
    </div >
  );
}
