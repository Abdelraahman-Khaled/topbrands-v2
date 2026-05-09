"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Contact({ data }) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData]     = useState({ name: "", email: "", phone: "", company: "", message: "" });
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
      setSubmitStatus(res.ok ? "success" : "error");
      if (res.ok) setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!data) return null;

  const isAr         = i18n.language === "ar";
  const settingsTitle = data.settings?.[isAr ? "1" : "0"]?.value || "";

  const badgeText   = data["Contact Element 1"]?.value;
  const headerTitle = data["Contact Element 2"]?.value;
  const headerDesc  = data["Contact Element 3"]?.value;

  const contactInfo = [
    {
      icon: "ri-phone-line",
      title:   data["Phone Label"]?.value    || t("phone"),
      details: data["Phone Value"]?.value    || "+963 11 123 4567",
      link:    `tel:${(data["Phone Value"]?.value || "").replace(/\s/g, "")}`,
    },
    {
      icon: "ri-mail-line",
      title:   data["Email Label"]?.value    || t("email"),
      details: data["Email Value"]?.value    || "info@topbrandssyria.com",
      link:    `mailto:${data["Email Value"]?.value || ""}`,
    },
    {
      icon: "ri-map-pin-line",
      title:   data["Location Label"]?.value || t("location"),
      details: data["Location Value"]?.value || t("damascus_syria"),
      link:    "#",
    },
  ];

  const formTitle   = data["Form Title"]?.value        || t("send_us_message");
  const formDesc    = data["Form Desc"]?.value         || t("fill_form_desc");
  const submitLabel = data["Form Submit Label"]?.value || t("send_message");

  const inputClass =
    "w-full bg-transparent border-b pb-3 text-sm font-medium outline-none placeholder-shown:placeholder-opacity-100";

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#f7f6f2" }}
    >
      {/* Faint watermark */}
      <span
        aria-hidden="true"
        style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
        className="absolute right-0 bottom-6 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
      >
        CONTACT
      </span>

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-28">

        {/* ── Header ── */}
        <div className="mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
            style={{ color: "rgba(0,0,0,0.35)" }}
          >
            {badgeText || t("contact_us", "CONTACT US")}
          </motion.span>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#0f0f0f" }}
            className="font-black leading-[0.88] tracking-tight"
          >
            {headerTitle}
            {settingsTitle && <span style={{ color: "#0f0f0f" }}> {settingsTitle}</span>}
          </motion.h2>

          {headerDesc && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base lg:text-lg leading-relaxed"
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              {headerDesc}
            </motion.p>
          )}
        </div>

        {/* ── Two columns ── */}
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-28">

          {/* Left: contact info */}
          <div className="lg:w-2/5">
            {contactInfo.map((info, i) => (
              <motion.a
                key={i}
                href={info.link}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex items-center gap-5 border-t py-8 group block"
                style={{ borderColor: "rgba(0,0,0,0.1)" }}
              >
                <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <i className={`${info.icon} text-black text-lg`} />
                </div>
                <div>
                  <span
                    className="text-xs font-mono tracking-[3px] uppercase mb-1 block"
                    style={{ color: "rgba(0,0,0,0.35)" }}
                  >
                    {info.title}
                  </span>
                  <p className="font-bold text-sm" style={{ color: "#0f0f0f" }}>
                    {info.details}
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
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              {formTitle}
            </p>
            {formDesc && (
              <p className="text-sm mb-10 leading-relaxed" style={{ color: "rgba(0,0,0,0.45)" }}>
                {formDesc}
              </p>
            )}

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-x-10 gap-y-8">

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
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
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
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
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
                  {t("phone_number")}
                </label>
                <input
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className={inputClass}
                  style={{ borderColor: "rgba(0,0,0,0.15)", color: "#0f0f0f" }}
                  placeholder={data["Form Phone Placeholder"]?.value || "+963 XX XXX XXXX"}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
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
                <label className="text-xs font-mono tracking-[2px] uppercase" style={{ color: "rgba(0,0,0,0.35)" }}>
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

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-3 group transition-opacity ${isSubmitting ? "opacity-40 pointer-events-none" : ""}`}
                >
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#0f0f0f" }}>
                    {isSubmitting ? t("btn_submitting") : submitLabel}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                    </svg>
                  </span>
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
