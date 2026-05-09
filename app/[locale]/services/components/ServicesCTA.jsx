"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";

export default function ServicesCTA({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const title   = data["CTA Element 1"]?.value || data["Element 1"]?.value || data["Text Element 1"]?.value;
  const subtitle = data["CTA Element 2"]?.value || data["Element 2"]?.value || data["Text Element 2"]?.value;
  const btn1    = data["CTA Element 3"]?.value || data["Element 3"]?.value || t("become_a_partner");
  const btn2    = data["CTA Element 4"]?.value || t("contact_us");

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Top border */}
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 14vw, 220px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        PARTNER
      </span>

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">

          {/* Left — title block */}
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("ready_to_start", "READY TO START")}
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
              className="font-black text-white leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {title}
            </motion.h2>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-base lg:text-lg leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Right — CTAs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0"
          >
            <LocalizedLink
              href="/become-a-partner"
              className="inline-flex items-center justify-between gap-6 group"
            >
              <span className="text-sm font-bold tracking-widest uppercase text-white">
                {btn1}
              </span>
              <span className="w-12 h-12 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                  <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                </svg>
              </span>
            </LocalizedLink>

            <div className="w-full h-px sm:hidden lg:block" style={{ background: "rgba(255,255,255,0.08)" }} />

            <LocalizedLink
              href="/contact"
              className="inline-flex items-center justify-between gap-6 group"
            >
              <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                {btn2}
              </span>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:border-white/40 rtl:rotate-180"
                style={{ border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none">
                  <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="rgba(255,255,255,0.4)" />
                </svg>
              </span>
            </LocalizedLink>
          </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
    </section>
  );
}
