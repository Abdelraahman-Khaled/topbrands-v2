"use client";
import WhiteHero from "../components/WhiteHero";
import { useTranslation } from "react-i18next";
import ScrollReveal from "../components/ScrollReveal";

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <WhiteHero
        title={t('privacy_policy')}
        description={t('last_updated')}
        img="/images/blogs%20banner.webp"
      />

      <section className="py-12 md:py-20 bg-white relative">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 relative">
          <div className="space-y-12 md:space-y-16">

            {/* Section 1 - List */}
            <ScrollReveal>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('privacy_s1_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed">
                  {t('privacy_s1_desc')}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B4F54] font-medium">
                      <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-check-line text-black text-sm"></i>
                      </div>
                      <span className="text-sm md:text-base">{t(`pri_s1_item${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Section 2 - List */}
            <ScrollReveal>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('privacy_s2_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed">
                  {t('privacy_s2_desc')}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B4F54] font-medium">
                      <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-check-line text-black text-sm"></i>
                      </div>
                      <span className="text-sm md:text-base">{t(`pri_s2_item${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Section 3 - List */}
            <ScrollReveal>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('privacy_s3_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed">
                  {t('privacy_s3_desc')}
                </p>
                <ul className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B4F54] font-medium">
                      <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-check-line text-black text-sm"></i>
                      </div>
                      <span className="text-sm md:text-base">{t(`pri_s3_item${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Sections 4 & 5 - Text */}
            {[4, 5].map((n) => (
              <ScrollReveal key={n}>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {t(`privacy_s${n}_title`)}
                  </h2>
                  <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                    {t(`privacy_s${n}_desc`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Section 6 - List */}
            <ScrollReveal>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('privacy_s6_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium leading-relaxed">
                  {t('privacy_s6_desc')}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4B4F54] font-medium">
                      <div className="w-6 h-6 bg-brand-yellow rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <i className="ri-check-line text-black text-sm"></i>
                      </div>
                      <span className="text-sm md:text-base">{t(`pri_s6_item${i}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Sections 7 & 8 - Text */}
            {[7, 8].map((n) => (
              <ScrollReveal key={n}>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-black">
                    {t(`privacy_s${n}_title`)}
                  </h2>
                  <p className="text-[#4B4F54] font-medium leading-relaxed text-sm md:text-base">
                    {t(`privacy_s${n}_desc`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}

            {/* Section 9 - Contact Card */}
            <ScrollReveal>
              <div className="space-y-6 pt-10 border-t border-gray-100">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                  {t('privacy_s9_title')}
                </h2>
                <p className="text-[#4B4F54] font-medium text-sm md:text-base">
                  {t('privacy_s9_desc')}
                </p>
                <div className="bg-[#DEE3EB] p-6 md:p-8 rounded-2xl border border-gray-200 space-y-4 md:space-y-5">
                  <p className="text-black font-bold text-lg md:text-xl">
                    {t('privacy_company_name')}
                  </p>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3 text-gray-700 font-semibold text-sm md:text-base flex-wrap">
                      <i className="ri-mail-line text-black text-xl shrink-0"></i>
                      privacy@b2bdistribution.sy
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 font-semibold text-sm md:text-base flex-wrap">
                      <i className="ri-phone-line text-black text-xl shrink-0"></i>
                      +963 11 123 4567
                    </p>
                    <p className="flex items-center gap-3 text-gray-700 font-semibold text-sm md:text-base flex-wrap">
                      <i className="ri-map-pin-line text-black text-xl shrink-0"></i>
                      {t('privacy_location')}
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