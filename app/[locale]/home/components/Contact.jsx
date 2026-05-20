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

  const inputClass =
    "w-full bg-transparent text-brand-charcoal border-b pb-3 text-sm font-medium outline-none placeholder-shown:placeholder-opacity-100";

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#f7f6f2" }}
    >


      <div className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pt-16 sm:pt-24 pb-20 sm:pb-28">

        {/* ── Header ── */}
        <div className="mb-12 sm:mb-16 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", color: "#0f0f0f" }}
            className="font-black leading-none tracking-tight mb-4"
          >
            {headerTitle}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
          />
          {headerDesc && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base text-brand-charcoal lg:text-lg leading-relaxed"
            >
              {headerDesc}
            </motion.p>
          )}
        </div>

        {/* ── Two columns ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-28">

          {/* Left: contact info */}
          <div className="lg:w-2/5">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ x: isAr ? -4 : 4 }}
                whileTap={{ scale: 0.97 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-5 border-t py-8 group block cursor-pointer"
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 ">
                  <i className={`${info.icon} text-black text-lg`} />
                </div>
                <div>
                  <span
                    className="text-xs font-mono tracking-[3px] text-brand-charcoal uppercase mb-1 block"
                  >
                    {info.title}
                  </span>
                  <p className="font-bold text-sm transition-colors duration-200 group-hover:text-brand-yellow" style={{ color: "#0f0f0f" }}>
                    {i === 0 ? <span dir="ltr">{info.details}</span> : info.details}
                  </p>
                </div>
              </motion.a>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
          </div>

          {/* Right: form */}
          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <p
              className="text-xs font-mono tracking-[3px] uppercase mb-2"
              style={{ color: "rgba(0,0,0,1)" }}
            >
              {formTitle}
            </p>
            {formDesc && (
              <p className="text-sm mb-10 leading-relaxed" style={{ color: "rgba(0,0,0,1)" }}>
                {formDesc}
              </p>
            )}

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-10 gap-y-6 sm:gap-y-8">

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                  {t("name_required")}
                </label>
                <input
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className={inputClass}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Name Placeholder"]?.value || t("your_name_placeholder")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                  {t("email_required")}
                </label>
                <input
                  type="email" name="email" value={formData.email} onChange={handleChange} required
                  className={inputClass}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Email Placeholder"]?.value || t("your_email_placeholder")}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                  {t("phone_number")}
                </label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  dir="ltr"
                  className={`${inputClass}${isAr ? " text-right" : ""}`}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Phone Placeholder"]?.value || "+96 XX XXX XXXX"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                  {t("company_name")}
                </label>
                <input
                  type="text" name="company" value={formData.company} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Company Placeholder"]?.value || t("your_company_placeholder")}
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,1)" }}>
                  {t("message_required")}
                </label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={4}
                  className={`${inputClass} resize-none`}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Message Placeholder"]?.value || t("tell_us_distribution_placeholder")}
                />
              </div>

              {submitStatus === "success" && (
                <div
                  className="md:col-span-2 px-5 py-4 text-sm font-medium rounded-lg"
                  style={{ background: "rgba(0,180,80,0.08)", border: "1px solid rgba(0,180,80,0.3)", color: "rgb(0,140,60)" }}
                >
                  {t("thank_you_msg")}
                </div>
              )}
              {submitStatus === "error" && (
                <div
                  className="md:col-span-2 px-5 py-4 text-sm font-medium rounded-lg"
                  style={{ background: "rgba(200,0,0,0.06)", border: "1px solid rgba(200,0,0,0.25)", color: "rgb(180,0,0)" }}
                >
                  {t("error_msg")}
                </div>
              )}
              {submitStatus === "recaptcha" && (
                <div
                  className="md:col-span-2 px-5 py-4 text-sm font-medium rounded-lg"
                  style={{ background: "rgba(200,0,0,0.06)", border: "1px solid rgba(200,0,0,0.25)", color: "rgb(180,0,0)" }}
                >
                  Please complete the reCAPTCHA verification.
                </div>
              )}

              <div className="md:col-span-2">
                {RECAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />}
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`circle-btn transition-opacity ${isSubmitting ? "opacity-40 pointer-events-none" : ""}`}
                >
                  <span className="circle-btn__wave" />
                  <div className="circle-btn__content">
                    <span className="circle-btn__label">
                      {isSubmitting ? t("btn_submitting") : submitLabel}
                    </span>
                    <span className="circle-btn__icon">
                      <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                        <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
                      </svg>
                    </span>
                  </div>
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
