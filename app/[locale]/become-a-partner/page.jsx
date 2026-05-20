"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { getPageData } from "@/services/home.service";
import { useCompany } from "../components/CompanyProvider";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function BecomePartnerPage() {
  const { t, i18n } = useTranslation();
  const { companyData } = useCompany();
  const isAr = i18n.language === "ar";
  const recaptchaRef = useRef(null);

  const [pageData, setPageData] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "", contactPerson: "", email: "",
    phone: "", brandName: "", productCategory: "", message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  useEffect(() => {
    async function fetchPage() {
      const res = await getPageData("became_partner", i18n.language);
      if (res) setPageData(res);
    }
    fetchPage();
  }, [i18n.language]);

  const findSection = (key) => pageData?.find((s) => s[key])?.[key];

  const heroData       = findSection("hero");
  const benefitsData   = findSection("benefits");
  const partnershipData = findSection("partnership");
  const contactUsData  = findSection("contact_us");

  // ── Hero ─────────────────────────────────────────────────────────────
  const heroImg      = heroData?.image_url || "/images/become a partner banner.webp";
  const heroBadge    = heroData?.["Text Element 1"]?.value || t("partnership_nav");
  const heroTitle    = heroData?.["Text Element 2"]?.value || t("expand_brand");
  const heroYellow   = isAr ? heroData?.settings?.["1"]?.value : heroData?.settings?.["0"]?.value || t("presence_syria");
  const heroDescPart1 = heroData?.["Text Element 3"]?.value;
  const heroYellowSub = isAr ? heroData?.settings?.["3"]?.value : heroData?.settings?.["2"]?.value;
  const heroDescPart2 = heroData?.["Text Element 4"]?.value;

  // ── Benefits ─────────────────────────────────────────────────────────
  const benefitsLabel    = benefitsData?.["Element 1"]?.value || t("benefits_title");
  const benefitsSubtitle = benefitsData?.["Element 2"]?.value || t("benefits_subtitle");
  const benefits = [
    {
      title: benefitsData?.["Element 3"]?.value  || t("benefit1_title"),
      desc:  benefitsData?.["Element 4"]?.value  || t("benefit1_desc"),
    },
    {
      title: benefitsData?.["Element 5"]?.value  || t("benefit2_title"),
      desc:  benefitsData?.["Element 6"]?.value  || t("benefit2_desc"),
    },
    {
      title: benefitsData?.["Element 7"]?.value  || t("benefit3_title"),
      desc:  benefitsData?.["Element 8"]?.value  || t("benefit3_desc"),
    },
    {
      title: benefitsData?.["Element 9"]?.value  || t("benefit4_title"),
      desc:  benefitsData?.["Element 10"]?.value || t("benefit4_desc"),
    },
  ];

  // ── Form ─────────────────────────────────────────────────────────────
  const formTitle    = partnershipData?.["Element 1"]?.value || t("form_title");
  const formSubtitle = partnershipData?.["Element 2"]?.value || t("form_subtitle");

  // ── Contact strip ─────────────────────────────────────────────────────
  const directTitle = contactUsData?.["Element 1"]?.value || t("direct_contact_title");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) { setSubmitStatus("recaptcha"); return; }
    setIsSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setFormData({ companyName: "", contactPerson: "", email: "", phone: "", brandName: "", productCategory: "", message: "" });
        recaptchaRef.current?.reset();
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base w-full";

  const infoCards = [
    {
      label: t("contact_phone"),
      value: companyData?.phone_number_1 || "+963 11 6022",
      href: `tel:${(companyData?.phone_number_1 || "+963116022").replace(/\s/g, "")}`,
      isPhone: true,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.82 2 2 0 012.11 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
    },
    {
      label: t("email_us"),
      value: companyData?.email || "info@topbrands-sy.com",
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${companyData?.email || "info@topbrands-sy.com"}`,
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>,
    },
    {
      label: t("contact_location"),
      value: (isAr ? companyData?.address_ar : companyData?.address_en) || t("contact_damascus_syria"),
      href: companyData?.google_maps_url || "#",
      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>
        {heroImg && (
          <div className="absolute inset-0 z-0">
            <img src={heroImg} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        )}
        <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">
          {heroBadge && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-xs text-brand-yellow font-bold tracking-[4px] uppercase font-mono">
                {heroBadge}
              </span>
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-black text-white leading-none tracking-tight mb-10"
            style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
          >
            {heroTitle}
            {heroYellow && <span className="text-brand-yellow"> {heroYellow}</span>}
          </motion.h1>
          {(heroDescPart1 || heroYellowSub || heroDescPart2) && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base lg:text-lg leading-relaxed max-w-lg"
            >
              {heroDescPart1 && <span className="text-white/80">{heroDescPart1} </span>}
              {heroYellowSub && <span className="font-bold text-brand-yellow">{heroYellowSub} </span>}
              {heroDescPart2 && <span className="text-white/80">{heroDescPart2}</span>}
            </motion.p>
          )}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="mt-16 w-full h-px origin-left"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />
        </div>
      </section>

      {/* ── BENEFITS GRID ── */}
      <section className="relative overflow-hidden" style={{ background: "#4b4f54" }}>

        {/* Watermark */}
        <span
          aria-hidden="true"
          className="absolute inset-e-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
          style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
        >
          {isAr ? "الشراكة" : "PARTNER"}
        </span>

        {/* Header */}
        <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-sm text-brand-yellow font-bold tracking-[4px] uppercase font-mono mb-6"
              >
                {benefitsLabel}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
              />
            </div>
            {benefitsSubtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base lg:text-lg leading-relaxed lg:max-w-xs text-brand-yellow"
              >
                {benefitsSubtitle}
              </motion.p>
            )}
          </div>
        </div>

        {/* Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 border-t border-l" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="group relative flex flex-col border-b border-r"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />
              <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-6 h-full">
                <h3
                  className="font-black leading-tight tracking-tight text-white group-hover:text-black transition-colors duration-300"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
                >
                  {b.title}
                </h3>
                <p className="text-base leading-relaxed text-white/70 group-hover:text-black/70 transition-colors duration-300 mt-auto pt-4 border-t border-white/[0.07] group-hover:border-black/10">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FORM ── */}
      <section style={{ background: "#f7f6f2" }}>
        <div className="px-10 sm:px-14 lg:px-20 xl:px-28 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 lg:gap-32">

            {/* Left */}
            <div className="lg:pt-2">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-sm font-bold tracking-[4px] uppercase font-mono text-black/80 mb-6"
              >
                {isAr ? "ابدأ شراكتك" : "START YOUR PARTNERSHIP"}
              </motion.p>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-8"
              />
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-black leading-none tracking-tight text-black mb-8"
                style={{ fontSize: "clamp(36px,5vw,72px)" }}
              >
                {formTitle}
              </motion.h2>
              {formSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-black/90 text-base leading-relaxed"
                >
                  {formSubtitle}
                </motion.p>
              )}
            </div>

            {/* Right: form */}
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
                {[
                  { label: t("label_company"),  name: "companyName",   type: "text",  placeholder: t("placeholder_company"),  required: true },
                  { label: t("label_contact"),  name: "contactPerson", type: "text",  placeholder: t("placeholder_contact"),  required: true },
                  { label: t("label_email"),    name: "email",         type: "email", placeholder: t("placeholder_email"),    required: true },
                  { label: t("label_phone"),    name: "phone",         type: "tel",   placeholder: t("placeholder_phone"),    required: true, phone: true },
                  { label: t("label_brand"),    name: "brandName",     type: "text",  placeholder: t("placeholder_brand"),    required: true },
                ].map((f) => (
                  <div key={f.name} className="flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                      {f.label}
                    </label>
                    <input
                      type={f.type} name={f.name} value={formData[f.name]}
                      onChange={handleChange} required={f.required}
                      dir={f.phone ? "ltr" : (isAr ? "rtl" : undefined)}
                      placeholder={f.placeholder}
                      className={`${inputClass}${f.phone && isAr ? " text-right" : ""}`}
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black/40">
                    {t("label_category")}
                  </label>
                  <select
                    name="productCategory" value={formData.productCategory}
                    onChange={handleChange} required
                    dir={isAr ? "rtl" : undefined}
                    className="bg-transparent border-b border-black/20 pb-3 text-black focus:outline-none focus:border-black transition-colors text-base appearance-none cursor-pointer w-full"
                  >
                    <option value="">{t("select_category")}</option>
                    <option value="Food & Beverages">Food &amp; Beverages</option>
                    <option value="Snacks & Confectionery">Snacks &amp; Confectionery</option>
                    <option value="Dairy Products">Dairy Products</option>
                    <option value="Non-Food FMCG">Non-Food FMCG</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-10">
                <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black/40">
                  {t("label_message")}
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange}
                  rows={4} maxLength={500}
                  dir={isAr ? "rtl" : undefined}
                  placeholder={t("placeholder_message")}
                  className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base resize-none w-full"
                />
                <p className="text-xs font-mono text-black/30 text-right">{formData.message.length}/500</p>
              </div>

              <div className="mb-10">
                {RECAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />}
              </div>

              {submitStatus === "success" && (
                <div className="mb-8 border-l-2 border-brand-yellow pl-4 text-black/70 text-sm">
                  {t("msg_success")}
                </div>
              )}
              {submitStatus === "error" && (
                <div className="mb-8 border-l-2 border-red-400 pl-4 text-red-700 text-sm">
                  {t("msg_error")}
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
                <span className="text-base font-black uppercase tracking-[2px] text-black group-hover:text-brand-jet transition-colors duration-300">
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
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO STRIPS ── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="px-10 sm:px-14 lg:px-20 xl:px-28 pt-16 pb-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-bold tracking-[4px] uppercase font-mono text-brand-yellow mb-4"
          >
            {directTitle}
          </motion.p>
          <div className="w-10 h-0.5 bg-brand-yellow origin-left rounded-full" />
        </div>
        <div className="border-t border-l" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {infoCards.map((card, i) => (
              <a
                key={i}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative overflow-hidden block"
              >
                <div className="absolute inset-0 bg-brand-yellow origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                <div className="relative z-10 px-10 py-14 border-b border-r" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  <div className="text-brand-yellow group-hover:text-black/40 transition-colors duration-300 mb-8">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-black transition-colors duration-300 mb-4">
                    {card.label}
                  </h3>
                  <p className="text-white group-hover:text-black/90 transition-colors duration-300 text-base leading-relaxed">
                    {card.isPhone ? <span dir="ltr">{card.value}</span> : card.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
