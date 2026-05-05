"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";

export default function Contact({ data }) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, subject: "Home Page Contact" }),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) return null;

  const isAr = i18n.language === 'ar';
  const settingsTitle = data.settings?.[isAr ? "1" : "0"]?.value || "";

  const badgeText = data["Contact Element 1"]?.value;
  const headerTitle = data["Contact Element 2"]?.value;
  const headerDesc = data["Contact Element 3"]?.value;

  const contactInfo = [
    {
      icon: "ri-phone-line",
      title: data["Phone Label"]?.value || t("phone"),
      details: data["Phone Value"]?.value || "+963 11 123 4567",
      link: `tel:${(data["Phone Value"]?.value || "").replace(/\s/g, "")}`,
      iconBg: "bg-gradient-to-br from-[#4B4F54] to-[#4B4F54]",
    },
    {
      icon: "ri-mail-line",
      title: data["Email Label"]?.value || t("email"),
      details: data["Email Value"]?.value || "info@topbrandssyria.com",
      link: `mailto:${data["Email Value"]?.value}`,
      iconBg: "bg-gradient-to-br from-[#F7E326] to-[#E5D324]",
    },
    {
      icon: "ri-map-pin-line",
      title: data["Location Label"]?.value || t("location"),
      details: data["Location Value"]?.value || t("damascus_syria"),
      link: "#",
      iconBg: "bg-gradient-to-br from-[#4B4F54] to-[#4B4F54]",
    },
  ];

  const formTitle = data["Form Title"]?.value || t("send_us_message");
  const formDesc = data["Form Desc"]?.value || t("fill_form_desc");
  const submitLabel = data["Form Submit Label"]?.value || t("send_message");

  return (
    <section id="contact" className="py-12 sm:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#F7E326]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-[#F7E326]/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            {badgeText && (
              <div className="inline-block mb-4">
                <span className="px-5 py-2 bg-[#F7E326] text-black rounded-full text-sm font-bold tracking-wider">
                  {badgeText}
                </span>
              </div>
            )}
            <h2 className="text-3xl sm:text-5xl font-bold text-[#000000] mb-4">
              {headerTitle} <span className="text-brand-charcoal">{settingsTitle}</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#4B4F54] max-w-3xl mx-auto font-medium">
              {headerDesc}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {contactInfo.map((info, index) => (
            <StaggerItem
              key={index}
              href={info.link}
              className="group card-hover bg-white p-8 rounded-2xl shadow-md border-2 border-transparent cursor-pointer block relative"
            >
              <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" fill="none" stroke="#F7E326" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
              <div
                className={`icon-hover w-16 h-16 flex items-center justify-center ${info.iconBg} rounded-xl mb-6 shadow-lg mx-auto`}
              >
                <i className={`${info.icon} ${info.title === (data["Email Label"]?.value || t("email")) ? "text-[#000000]" : "text-white"} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-[#000000] mb-2 text-center">
                {info.title}
              </h3>
              <p className="text-[#4B4F54] font-bold text-center">
                {info.details}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2}>
          <div className="bg-gradient-to-br from-[#000000] to-[#1a1a1a] rounded-2xl p-6 sm:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#F7E326] rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F7E326] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {formTitle}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 font-medium">
                  {formDesc}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2">
                    {t("name_required")}
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-[#F7E326] focus:bg-white/20 outline-none transition-all font-medium"
                    placeholder={data["Form Name Placeholder"]?.value || t("your_name_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">
                    {t("email_required")}
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-[#F7E326] focus:bg-white/20 outline-none transition-all font-medium"
                    placeholder={data["Form Email Placeholder"]?.value || t("your_email_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">
                    {t("phone_number")}
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-[#F7E326] focus:bg-white/20 outline-none transition-all font-medium"
                    placeholder={data["Form Phone Placeholder"]?.value || "+963 XX XXX XXXX"}
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">
                    {t("company_name")}
                  </label>
                  <input
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-[#F7E326] focus:bg-white/20 outline-none transition-all font-medium"
                    placeholder={data["Form Company Placeholder"]?.value || t("your_company_placeholder")}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white font-bold mb-2">
                    {t("message_required")}
                  </label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange}
                    required rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-gray-400 focus:border-[#F7E326] focus:bg-white/20 outline-none transition-all resize-none font-medium"
                    placeholder={data["Form Message Placeholder"]?.value || t("tell_us_distribution_placeholder")}
                  ></textarea>
                </div>

                {submitStatus === "success" && (
                  <div className="md:col-span-2 p-4 bg-green-900/40 border border-green-500 rounded-lg text-green-300 text-sm text-center">
                    {t("thank_you_msg")}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="md:col-span-2 p-4 bg-red-900/40 border border-red-500 rounded-lg text-red-300 text-sm text-center">
                    {t("error_msg")}
                  </div>
                )}

                <div className="md:col-span-2 text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mask-btn mask-btn--yellow-white transition-opacity ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <span className="mask-btn__label">
                      {isSubmitting ? t("btn_submitting") : submitLabel}
                      <i className="ri-send-plane-fill rtl:-rotate-90 mx-2"></i>
                    </span>
                    <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                      {isSubmitting ? t("btn_submitting") : submitLabel}
                      <i className="ri-send-plane-fill rtl:-rotate-90 mx-2"></i>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
