"use client";
import { useTranslation } from "react-i18next";
import ScrollReveal from "../../components/ScrollReveal";
import LocalizedLink from "../../components/LocalizedLink";

export default function ProductsBrands({ data, brands = [] }) {
  const { t } = useTranslation();

  if (!data) return null;
  console.log(data);

  const title = data["Intro Text"]?.value || data["Title"]?.value;
  const buttonLabel = data["btn Text"]?.value || t("see_all_brands") || "See All Brands";

  return (
    <section id="brands" className="py-16 sm:py-24 bg-[#DEE3EB] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center flex flex-col items-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-charcoal tracking-wider mb-10 md:mb-16">
              {title}
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col items-center gap-12 max-w-7xl mx-auto shadow-sm">
            {/* Centered Responsive Flex Grid */}
            <div className="w-full flex flex-wrap justify-center items-center gap-x-6 gap-y-12 sm:gap-x-12">
              {brands.map((brand, index) => (
                <LocalizedLink
                  key={brand.id || index}
                  href={`/brands/${brand.id}`}
                  className={`card-hover w-[calc(50%-1.5rem)] md:w-[calc(33.33%-3rem)] lg:w-[calc(20%-3rem)] aspect-[4/3] flex items-center justify-center group relative rounded-2xl border border-transparent ${brand.is_highlighted ? "before:absolute before:inset-0 before:bg-[#F7E326]/5 before:rounded-3xl before:blur-2xl" : ""}`}
                >
                  {brand.is_highlighted && (
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10 w-6 h-6 bg-[#F7E326] rounded-full flex items-center justify-center text-[10px] text-black shadow-sm ring-4 ring-white">
                      <i className="ri-star-fill"></i>
                    </div>
                  )}
                  <img
                    src={brand.image_url}
                    alt={brand.title || brand.alt_text}
                    className="max-w-[110px] sm:max-w-[130px] md:max-w-full max-h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)] group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-[filter] duration-300"
                  />
                </LocalizedLink>
              ))}
            </div>

            {/* Centered Button Row */}
            <div className="pt-4 sm:pt-8 w-full flex justify-center">
              <LocalizedLink href="/brands">
                <div className="mask-btn mask-btn--yellow-black">
                  <span className="mask-btn__label">
                    {buttonLabel}
                    <i className="ri-arrow-right-line rtl:rotate-180 mx-2"></i>
                  </span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {buttonLabel}
                    <i className="ri-arrow-right-line rtl:rotate-180 mx-2"></i>
                  </span>
                </div>
              </LocalizedLink>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
