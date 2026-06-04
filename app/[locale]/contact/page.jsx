"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { getPageData } from "@/services/home.service";
import { useCompany } from "../components/CompanyProvider";
import ServicesCTA from "../services/components/ServicesCTA";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const chunkElements = (secData, start, size, prefix = "Element") => {
  if (!secData) return [];
  const results = [];
  let i = start;
  while (secData[`${prefix} ${i}`]) {
    const item = {};
    for (let j = 0; j < size; j++) {
      item[`val${j}`] = secData[`${prefix} ${i + j}`]?.value;
    }
    results.push(item);
    i += size;
  }
  return results;
};

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const { companyData } = useCompany();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      const res = await getPageData("contact_page", i18n.language);
      if (res) setPageData(res);
    }
    fetchPage();
  }, [i18n.language]);

  const isAr = i18n.language === "ar";

  const findSection = (key) => pageData?.find((s) => s[key])?.[key];

  const heroSection = findSection("hero");
  const statsData = findSection("stats");
  const channelsData = findSection("channels");
  const howWeDistData = findSection("how-we-dist");
  const ctaData = findSection("cta");

  const heroImg = heroSection?.image_url || "/images/contact/hero-img.webp";
  const heroTitle = heroSection?.["Text Element 2"]?.value;
  const heroYellowTitle = isAr
    ? heroSection?.settings?.["2"]?.value
    : heroSection?.settings?.["0"]?.value;
  const heroSubtitle = heroSection?.["Text Element 1"]?.value || t("contact_nav");
  const heroDescPart1 = heroSection?.["Text Element 3"]?.value;
  const heroDescYellow = isAr
    ? heroSection?.settings?.["3"]?.value
    : heroSection?.settings?.["1"]?.value;
  const heroDescPart2 = heroSection?.["Text Element 4"]?.value;

  const stats = statsData
    ? [
      { value: statsData["Stat 1 Value"]?.value, label: statsData["Stat 1 Label"]?.value },
      { value: statsData["Stat 2 Value"]?.value, label: statsData["Stat 2 Label"]?.value },
      { value: statsData["Stat 3 Value"]?.value, label: statsData["Stat 3 Label"]?.value },
      { value: statsData["Stat 4 Value"]?.value, label: statsData["Stat 4 Label"]?.value },
    ].filter((s) => s.label)
    : [];

  const channels = chunkElements(channelsData, 3, 3);
  const howWeDistSteps =
    chunkElements(howWeDistData, 2, 2, "Text Element").length > 0
      ? chunkElements(howWeDistData, 2, 2, "Text Element")
      : chunkElements(howWeDistData, 1, 2);

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
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setSubmitStatus("recaptcha");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
        recaptchaRef.current?.reset();
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    setSubmitStatus("idle");
  };

  const infoCards = [
    {
      label: t("contact_phone"),
      value: companyData?.phone_number_1 || "+963 11 6022",
      href: `tel:${(companyData?.phone_number_1 || "+963116022").replace(/\s/g, "")}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.82 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      label: t("email_us"),
      value: companyData?.email || "info@topbrands-sy.com",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${companyData?.email || "info@topbrands-sy.com"}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="2,4 12,13 22,4" />
        </svg>
      ),
    },
    {
      label: t("contact_location"),
      value:
        (isAr ? companyData?.address_ar : companyData?.address_en) ||
        t("contact_damascus_syria"),
      href: companyData?.google_maps_url || "#",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0f0f0f", minHeight: "60vh" }}
      >
        {heroImg && (
          <div className="absolute inset-0">
            <img src={heroImg} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" />
          </div>
        )}
        <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 py-32 lg:py-44 max-w-6xl">
          <p className="text-xs text-brand-yellow font-bold tracking-[4px] uppercase font-mono mb-6">
            {heroSubtitle}
          </p>
          <div className="w-10 h-0.5 bg-brand-yellow origin-left rounded-full mb-8" />
          <h1
            className="font-black leading-none tracking-tight text-white mb-8"
            style={{ fontSize: "clamp(48px,8vw,110px)" }}
          >
            {heroTitle && <>{heroTitle}<br /></>}
            {heroYellowTitle && (
              <span className="text-brand-yellow">{heroYellowTitle}</span>
            )}
          </h1>
          {(heroDescPart1 || heroDescYellow || heroDescPart2) && (
            <p className="text-white text-lg leading-relaxed max-w-xl">
              {heroDescPart1}
              {heroDescYellow && (
                <span className="text-brand-yellow font-semibold"> {heroDescYellow} </span>
              )}
              {heroDescPart2}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
      </section>

      {/* ── CONTACT INFO STRIPS ── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="border-t border-l" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            {infoCards.map((card, i) => (
              <a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative overflow-hidden block"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 bg-brand-yellow origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                <div className="relative z-10 px-10 py-14">
                  <div className="text-brand-yellow group-hover:text-black transition-colors duration-300 mb-8">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-black transition-colors duration-300 mb-4">
                    {card.label}
                  </h3>
                  <p className="text-white group-hover:text-black/70 transition-colors duration-300 text-base leading-relaxed">
                    {i === 0 ? <span dir="ltr">{card.value}</span> : card.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      {stats.length > 0 && (
        <section
          className="relative grid grid-cols-2 lg:grid-cols-4 border-t"
          style={{ background: "#161616", borderColor: "rgba(255,255,255,0.07)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-end px-10 sm:px-14 lg:px-16 py-12 border-r border-b lg:border-b-0"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="font-black text-white leading-none mb-3"
                style={{ fontSize: "clamp(2rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
              >
                {stat.value}
              </div>
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-3" />
              <p className="text-white/50 text-sm font-medium leading-snug">{stat.label}</p>
            </motion.div>
          ))}
        </section>
      )}

      {/* ── FORM SECTION ── */}
      <section style={{ background: "#f7f6f2" }}>
        <div className="px-10 sm:px-14 lg:px-20 xl:px-28 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 lg:gap-32">

            {/* left: header */}
            <div className="lg:pt-2">
              <p className="text-sm font-bold tracking-[4px] uppercase font-mono text-brand-jet mb-6">
                {isAr ? "تواصل معنا" : "GET IN TOUCH"}
              </p>
              <div className="w-10 h-0.5 bg-brand-yellow origin-left rounded-full mb-8" />
              <h2
                className="font-black leading-none tracking-tight text-black mb-8"
                style={{ fontSize: "clamp(36px,5vw,72px)" }}
              >
                {t("contact_send_message_title")}
              </h2>
              <p className="text-black/90 text-base leading-relaxed">
                {t("contact_fill_form_desc")}
              </p>
            </div>

            {/* right: form */}
            {submitStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-start lg:pt-2"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="w-20 h-20 rounded-full bg-brand-yellow flex items-center justify-center mb-8"
                >
                  <motion.svg
                    width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </motion.svg>
                </motion.div>
                <h3
                  className="font-black leading-none tracking-tight text-black mb-5"
                  style={{ fontSize: "clamp(28px,3.5vw,48px)" }}
                >
                  {t("contact_success_title")}
                </h3>
                <p className="text-black/70 text-base leading-relaxed max-w-md mb-10">
                  {t("contact_success_desc")}
                </p>
                <button
                  type="button"
                  onClick={handleSendAnother}
                  className="inline-flex items-center gap-6 group"
                >
                  <span className="text-base font-black uppercase tracking-[2px] text-black group-hover:text-brand-charcoal cursor-pointer transition-colors duration-300">
                    {t("contact_send_another")}
                  </span>
                  <span className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="rtl:rotate-180">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                    {t("contact_full_name")}
                  </label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    dir={isAr ? "rtl" : undefined}
                    placeholder={t("your_full_name")}
                    className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                    {t("contact_email_address")}
                  </label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange} required
                    dir={isAr ? "rtl" : undefined}
                    placeholder={t("your_email")}
                    className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                    {t("contact_phone_number")}
                  </label>
                  <input
                    type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    dir="ltr"
                    placeholder={t("your_phone_placeholder")}
                    className={`bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base${isAr ? " text-right" : ""}`}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                    {t("contact_company_name")}
                  </label>
                  <input
                    type="text" name="company" value={formData.company} onChange={handleChange}
                    dir={isAr ? "rtl" : undefined}
                    placeholder={t("your_company")}
                    className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                  {t("subject")}
                </label>
                <select
                  name="subject" value={formData.subject} onChange={handleChange} required
                  dir={isAr ? "rtl" : undefined}
                  className="bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-black transition-colors text-base appearance-none cursor-pointer"
                >
                  <option value="">{t("select_subject")}</option>
                  <option value="Partnership">{t("dist_partnership")}</option>
                  <option value="General">{t("general_inquiry")}</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                  {t("contact_message")}
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required
                  rows={4} maxLength={500}
                  dir={isAr ? "rtl" : undefined}
                  placeholder={t("message_placeholder")}
                  className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base resize-none"
                />
                <p className="text-xs font-mono text-black/30 text-right">{formData.message.length}/500</p>
              </div>

              <div className="mb-10">
                {RECAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />}
              </div>

              {submitStatus === "error" && (
                <div className="mb-8 border-l-2 border-red-400 pl-4 text-red-700 text-sm">
                  {t("error_msg") || "Something went wrong. Please try again."}
                </div>
              )}
              {submitStatus === "recaptcha" && (
                <div className="mb-8 border-l-2 border-red-400 pl-4 text-red-700 text-sm">
                  {isAr ? "يرجى إكمال التحقق من reCAPTCHA" : "Please complete the reCAPTCHA verification."}
                </div>
              )}

              <button
                type="submit" disabled={isSubmitting}
                className={`inline-flex items-center gap-6 group ${isSubmitting ? "opacity-50 pointer-events-none" : ""}`}
              >
                <span className="text-base font-black uppercase tracking-[2px] text-black group-hover:text-brand-charcoal cursor-pointer transition-colors duration-300">
                  {isSubmitting ? t("btn_submitting") : t("btn_submit")}
                </span>
                <span className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="rtl:rotate-180">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* ── MAP ── */}
      <section className="border-t" style={{ background: "#0f0f0f", borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="px-10 sm:px-14 lg:px-20 xl:px-28 py-20 lg:py-28">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[4px] uppercase font-mono text-brand-yellow mb-4">
              {isAr ? "موقعنا" : "OUR LOCATION"}
            </p>
            <div className="w-10 h-0.5 bg-brand-yellow origin-left rounded-full mb-6" />
            <p className="text-white text-base">
              {(isAr ? companyData?.address_ar : companyData?.address_en) || t("contact_damascus_syria")}
            </p>
          </div>
          <div className="group w-full overflow-hidden rounded-sm h-72 sm:h-96 lg:h-[480px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.4!2d36.489023297392414!3d33.6193071287417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDM3JzA5LjUiTiAzNsKwMjknMjAuNSJF!5e0!3m2!1sen!2s!4v1"
              width="100%"
              height="100%"
              className="grayscale invert transition-all duration-500 group-hover:grayscale-0 group-hover:invert-0"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Top Brands Location"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
