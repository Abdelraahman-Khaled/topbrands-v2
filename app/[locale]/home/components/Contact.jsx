"use client";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function Contact({ data }) {
  const { t, i18n } = useTranslation();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
        body: JSON.stringify({ ...formData, subject: "Home Page Contact", recaptchaToken }),
      });
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) {
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
        recaptchaRef.current?.reset();
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) return null;

  const isAr = i18n.language === "ar";
  const settingsTitle = data.settings?.[isAr ? "1" : "0"]?.value || "";

  const badgeText = data["Contact Element 1"]?.value;
  const headerTitle = data["Contact Element 2"]?.value;
  const headerDesc = data["Contact Element 3"]?.value;

  const contactInfo = [
    {
      icon: "ri-phone-line",
      title: data["Phone Label"]?.value || t("phone"),
      details: "+963 11 6022",
      link: "tel:+963116022",
    },
    {
      icon: "ri-mail-line",
      title: data["Email Label"]?.value || t("email"),
      details: "info@topbrands-sy.com",
      link: "https://mail.google.com/mail/?view=cm&fs=1&to=info@topbrands-sy.com",
    },
    {
      icon: "ri-map-pin-line",
      title: data["Location Label"]?.value || t("location"),
      details: data["Location Value"]?.value || t("damascus_syria"),
      link: "https://maps.google.com/?q=33.6193071287417,36.489023297392414",
    },
  ];

  const formTitle = data["Form Title"]?.value || t("send_us_message");
  const formDesc = data["Form Desc"]?.value || t("fill_form_desc");
  const submitLabel = data["Form Submit Label"]?.value || t("send_message");

  return (
    <div id="contact" className="relative overflow-hidden">
      {/* ── CONTACT INFO STRIPS ── */}
      <section style={{ background: "#0f0f0f" }}>
        <div className="border-t border-l" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {contactInfo.map((card, i) => (
              <a
                key={i}
                href={card.link}
                target={card.link.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group relative overflow-hidden block border-r border-b"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                <div className="absolute inset-0 bg-brand-yellow origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                <div className="relative z-10 px-10 py-14">
                  <div className="text-brand-yellow group-hover:text-black transition-colors duration-300 mb-8">
                    <i className={`${card.icon} text-3xl`} />
                  </div>
                  <h3 className="text-xl font-black text-white group-hover:text-black transition-colors duration-300 mb-4">
                    {card.title}
                  </h3>
                  <p className="text-white group-hover:text-black/70 transition-colors duration-300 text-base leading-relaxed">
                    {i === 0 ? <span dir="ltr">{card.details}</span> : card.details}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section style={{ background: "#f7f6f2" }} className="relative overflow-hidden">
        <div className="px-10 sm:px-14 lg:px-20 xl:px-28 py-24 lg:py-32">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20 lg:gap-32">

          {/* left: header */}
          <div className="lg:pt-2">
            <p className="text-sm font-bold tracking-[4px] uppercase font-mono text-brand-jet mb-6">
              {badgeText || (isAr ? "تواصل معنا" : "GET IN TOUCH")}
            </p>
            <div className="w-10 h-0.5 bg-brand-yellow origin-left rounded-full mb-8" />
            <h2
              className="font-black leading-none tracking-tight text-black mb-8"
              style={{ fontSize: "clamp(36px,5vw,72px)" }}
            >
              {headerTitle || t("contact_send_message_title")}
            </h2>
            <p className="text-black/90 text-base leading-relaxed">
              {headerDesc || t("contact_fill_form_desc")}
            </p>
          </div>

          {/* right: form */}
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-10 mb-10">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                  {t("contact_full_name")}
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  dir={isAr ? "rtl" : undefined}
                  placeholder={data["Form Name Placeholder"]?.value || t("your_full_name")}
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
                  placeholder={data["Form Email Placeholder"]?.value || t("your_email")}
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
                  placeholder={data["Form Phone Placeholder"]?.value || "+96 XX XXX XXXX"}
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
                  placeholder={data["Form Company Placeholder"]?.value || t("your_company")}
                  className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-10">
              <label className="text-xs font-bold tracking-[3px] uppercase font-mono text-black">
                {t("contact_message")}
              </label>
              <textarea
                name="message" value={formData.message} onChange={handleChange} required
                rows={4} maxLength={500}
                dir={isAr ? "rtl" : undefined}
                placeholder={data["Form Message Placeholder"]?.value || t("message_placeholder")}
                className="bg-transparent border-b border-black/20 pb-3 text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors text-base resize-none"
              />
              <p className="text-xs font-mono text-black/30 text-right">{formData.message.length}/500</p>
            </div>

            <div className="mb-10">
              {RECAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />}
            </div>

            {submitStatus === "success" && (
              <div className="mb-8 border-l-2 border-brand-yellow pl-4 text-black/70 text-sm">
                {t("thank_you_msg")}
              </div>
            )}
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
                {isSubmitting ? t("btn_submitting") : submitLabel}
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
    </div>
  );
}
