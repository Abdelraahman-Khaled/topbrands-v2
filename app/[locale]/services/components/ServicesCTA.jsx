"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";

export default function ServicesCTA({ data }) {
  const { t, i18n } = useTranslation();

  if (!data) return null;

  const isAr = i18n.language === "ar";
  const titlePart1 = data["CTA Element 1"]?.value || data["Element 1"]?.value || data["Text Element 1"]?.value;
  const yellowTitle = data.settings?.[isAr ? "1" : "0"]?.value;
  const subtitle = data["CTA Element 2"]?.value || data["Element 2"]?.value || data["Text Element 2"]?.value;
  const btn1 = data["CTA Element 3"]?.value || data["Element 3"]?.value || t("become_a_partner");
  const btn2 = data["CTA Element 4"]?.value || t("contact_us");

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Top border */}
      <div className="w-full h-px" style={{ background: "rgba(0,0,0,0.08)" }} />

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute inset-e-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 14vw, 220px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        {t("partner", "PARTNER")}
      </span>

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

          {/* Left — title block */}
          <div className={isAr ? "max-w-3xl" : "max-w-2xl"}>




            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black text-gray-900 leading-none tracking-tight mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {titlePart1}{yellowTitle && <span className="text-brand-charcoal"> {yellowTitle}</span>}
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
            />
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base lg:text-lg leading-relaxed text-brand-charcoal"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Right — CTAs */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap gap-6 shrink-0 items-center justify-center lg:justify-end"
          >
            <LocalizedLink href="/become-a-partner" className="circle-btn">
              <span className="circle-btn__wave" />
              <div className="circle-btn__content">
                <span className="circle-btn__label">
                  {btn1}
                </span>
                <span className="circle-btn__icon">
                  <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </LocalizedLink>

            <LocalizedLink href="/contact" className="circle-btn">
              <span className="circle-btn__wave" />
              <div className="circle-btn__content">
                <span className="circle-btn__label">
                  {btn2}
                </span>
                <span className="circle-btn__icon">
                  <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </LocalizedLink>
          </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px" style={{ background: "rgba(0,0,0,0.08)" }} />
    </section>
  );
}
