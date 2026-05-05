"use client";
import { useTranslation } from "react-i18next";
import WhiteHero from "../components/WhiteHero";
import ScrollReveal from "../components/ScrollReveal";

export default function TermsConditions() {
  const { t } = useTranslation();

  const listSections = [
    { titleKey: 'requirements_title', descKey: 'requirements_desc', itemPrefix: 'req_item', count: 6 },
    { titleKey: 'orders_title',       descKey: 'orders_desc',       itemPrefix: 'ord_item', count: 6 },
    { titleKey: 'pricing_title',      descKey: 'pricing_desc',      itemPrefix: 'prc_item', count: 6 },
    { titleKey: 'quality_title',      descKey: 'quality_desc',      itemPrefix: 'qlt_item', count: 6 },
  ];

  const textSections = [
    'ip', 'confidentiality', 'liability', 'termination', 'law', 'changes'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <WhiteHero title={t('terms_conditions')} description={t('last_updated')} img="/images/blogs%20banner.webp" />

      <section className="py-12 md:py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 relative">
          <div className="space-y-12 md:space-y-16">

            {/* Section 1 — Agreement */}
            <ScrollReveal>
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('agreement_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                  {t('agreement_desc')}
                </p>
              </div>
            </ScrollReveal>

            {/* Sections 2–5: List-based */}
            {listSections.map(({ titleKey, descKey, itemPrefix, count }) => (
              <ScrollReveal key={titleKey}>
                <div className="space-y-4 md:space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {t(titleKey)}
                  </h2>
                  <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                    {t(descKey)}
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    {Array.from({ length: count }, (_, i) => i + 1).map((i) => (
                      <li key={i} className="flex items-start gap-3 text-[#4B4F54] font-medium">
                        <div className="w-6 h-6 flex items-center justify-center bg-brand-yellow rounded-full shrink-0 mt-0.5">
                          <i className="ri-check-line text-black text-sm"></i>
                        </div>
                        <span className="text-sm md:text-base">{t(`${itemPrefix}${i}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}

            {/* Sections 6–11: Text-only */}
            {textSections.map((key) => (
              <ScrollReveal key={key}>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {t(`${key}_title`)}
                  </h2>
                  <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Section 12 — Contact */}
            <ScrollReveal>
              <div className="pt-4 border-t border-gray-100 space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('contact_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                  {t('contact_desc')}
                </p>
                <div className="bg-[#DEE3EB] p-6 md:p-8 rounded-2xl border border-gray-200 space-y-4">
                  <p className="text-black font-bold text-lg md:text-xl">{t('company_name')}</p>
                  <div className="space-y-3">
                    <p className="text-brand-charcoal font-medium flex items-center gap-3 text-sm md:text-base flex-wrap">
                      <i className="ri-mail-line text-black text-xl shrink-0"></i>
                      {t('company_email')}
                    </p>
                    <p className="text-brand-charcoal font-medium flex items-center gap-3 text-sm md:text-base flex-wrap">
                      <i className="ri-phone-line text-black text-xl shrink-0"></i>
                      {t('company_phone')}
                    </p>
                    <p className="text-brand-charcoal font-medium flex items-center gap-3 text-sm md:text-base flex-wrap">
                      <i className="ri-map-pin-line text-black text-xl shrink-0"></i>
                      {t('company_address')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>
    </div>
  );
}