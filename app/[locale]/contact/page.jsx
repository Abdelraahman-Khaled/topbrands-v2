"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"; // Added
import HeroSection from "../components/HeroSection";
import ScrollReveal from "../components/ScrollReveal";
import StaggerContainer from "../components/StaggerContainer";
import StaggerItem from "../components/StaggerItem";
import AnimatedCard from "../components/AnimatedCard";
import { getPageData } from "@/services/home.service";
import { useCompany } from "../components/CompanyProvider";

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const { companyData } = useCompany();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      const res = await getPageData("contact_page", i18n.language);
      if (res) {
        setPageData(res);
      }
    }
    fetchPage();
  }, [i18n.language]);

  const isAr = i18n.language === 'ar';

  // Find sections
  const heroSection = pageData?.find(s => s.hero)?.hero;

  // Hero mapping
  const heroImg = heroSection?.image_url || "/images/contact/hero-img.webp";
  const heroTitle = heroSection?.["Text Element 2"]?.value || t("contact_us_title");
  const heroYellowTitle = (isAr ? heroSection?.settings?.["2"]?.value : heroSection?.settings?.["0"]?.value) || t("growing_together");
  const heroSubtitle = heroSection?.["Text Element 1"]?.value || t("contact_nav");
  const heroDesc1 = heroSection?.["Text Element 3"]?.value || t("contact_hero_desc_1");
  const heroYellowText = (isAr ? heroSection?.settings?.["3"]?.value : heroSection?.settings?.["1"]?.value) || t("contact_hero_desc_2");
  const heroDesc2 = heroSection?.["Text Element 4"]?.value || t("contact_hero_desc_3");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Fixed: Added 'e' parameter
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        img={heroImg}
        title={heroTitle}
        yellowTitle={heroYellowTitle}
        subtitle={heroSubtitle}
        description1={heroDesc1}
        yellowText={heroYellowText}
        description2={heroDesc2}
      />

      <ScrollReveal delay={0.1}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Phone Card */}
              <StaggerItem>

                <AnimatedCard className="group bg-brand-paleblue rounded-3xl p-10 h-full relative">
                  <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="24" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                  <div className="w-16 h-16 flex items-center justify-center bg-brand-charcoal rounded-2xl mb-6">
                    <i className="ri-phone-line text-3xl text-white"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">{t("contact_phone")}</h3>
                  <a href={`tel:${(companyData?.phone_number_1 || "+963116022").replace(/\s/g, "")}`} className="text-lg text-brand-charcoal" dir="ltr">
                    {companyData?.phone_number_1 || "+963 11 6022"}
                  </a>
                </AnimatedCard>
              </StaggerItem>

              {/* Email Card */}
              <StaggerItem>
                <AnimatedCard className="group bg-brand-paleblue rounded-3xl p-10 h-full relative">
                  <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="24" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                  <div className="w-16 h-16 flex items-center justify-center bg-brand-yellow rounded-2xl mb-6">
                    <i className="ri-mail-line text-3xl text-black"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">{t("email_us")}</h3>
                  <a href={`mailto:${companyData?.email || "info@topbrands-sy.com"}`} className="text-lg text-brand-charcoal break-all">
                    {companyData?.email || "info@topbrands-sy.com"}
                  </a>
                </AnimatedCard>
              </StaggerItem>

              {/* Location Card */}
              <StaggerItem>
                <AnimatedCard className="group bg-brand-paleblue rounded-3xl p-10 h-full relative">
                  <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="24" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                  <a href={companyData?.google_maps_url || "#"} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="w-16 h-16 flex items-center justify-center bg-brand-charcoal rounded-2xl mb-6">
                      <i className="ri-map-pin-line text-3xl text-white"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">{t("contact_location")}</h3>
                    <p className="text-lg text-brand-charcoal">
                      {(isAr ? companyData?.address_ar : companyData?.address_en) || t("contact_damascus_syria")}
                    </p>
                  </a>
                </AnimatedCard>
              </StaggerItem>
            </StaggerContainer>

            {/* Form Section */}
            <div className="max-w-4xl mx-auto bg-brand-paleblue p-8 lg:p-12 rounded-[40px] shadow-sm">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_full_name")}</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                      placeholder={t("your_full_name")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_email_address")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                      placeholder={t("your_email")}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_phone_number")}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                      placeholder={t("your_phone_placeholder")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_company_name")}</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                      placeholder={t("your_company")}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("subject")}</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                  >
                    <option value="">{t("select_subject")}</option>
                    <option value="Partnership">{t("dist_partnership")}</option>
                    <option value="General">{t("general_inquiry")}</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_message")}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black resize-none"
                    placeholder={t("message_placeholder")}
                  ></textarea>
                  <p className="text-xs text-right mt-1">{formData.message.length}/500</p>
                </div>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200">
                    {t("thank_you_msg")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={` mask-btn mask-btn--yellow-black rounded-xl w-full transition-opacity ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <span className="mask-btn__label b">
                    {isSubmitting ? t('btn_submitting') : t('btn_submit')}
                  </span>
                  <span className="mask-btn__fill ">
                    {isSubmitting ? t('btn_submitting') : t('btn_submit')}
                  </span>
                </button>
              </motion.form>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}