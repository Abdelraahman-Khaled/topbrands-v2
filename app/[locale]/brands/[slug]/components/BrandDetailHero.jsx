"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { headlineRevealVariants } from "../../../lib/animations";
import LocalizedLink from "../../../components/LocalizedLink";

export default function BrandDetailHero({ brandData }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!brandData) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none z-0"
        style={{ fontSize: "clamp(80px, 14vw, 220px)", color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
      >
        BRAND
      </span>

      {/* Top border */}
      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-32 pb-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <LocalizedLink
            href="/brands"
            className="inline-flex items-center gap-3 group"
          >
            <span
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:border-brand-yellow rtl:rotate-180"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              <svg width="8" height="8" viewBox="0 0 11 11" fill="none" className="rotate-180">
                <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="rgba(255,255,255,0.5)" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-[3px] uppercase font-mono transition-colors duration-300 group-hover:text-brand-yellow" style={{ color: "rgba(255,255,255,0.4)" }}>
              {isAr ? "العودة إلى العلامات التجارية" : "ALL BRANDS"}
            </span>
          </LocalizedLink>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">

          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-8"
            />

            <motion.h1
              initial="hidden"
              animate="visible"
              className="font-black text-white leading-[0.88] tracking-tight mb-10"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)" }}
            >
              <div className="overflow-hidden">
                <motion.span variants={headlineRevealVariants} className="block">
                  {brandData.title}
                </motion.span>
              </div>
            </motion.h1>

            {brandData.description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base lg:text-lg leading-relaxed max-w-xl mb-12"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {brandData.description}
              </motion.p>
            )}

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 border-t pt-8"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <LocalizedLink href="/contact" className="inline-flex items-center justify-between gap-6 group">
                <span className="text-sm font-bold tracking-widest uppercase text-white">
                  {isAr ? "تواصل للطلب" : "Contact for Orders"}
                </span>
                <span className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                  </svg>
                </span>
              </LocalizedLink>

              <LocalizedLink href="/become-a-partner" className="inline-flex items-center justify-between gap-6 group">
                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {isAr ? "كن شريكاً" : "Become a Partner"}
                </span>
                <span
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 group-hover:border-white/40 rtl:rotate-180"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="rgba(255,255,255,0.4)" />
                  </svg>
                </span>
              </LocalizedLink>
            </motion.div>
          </div>

          {/* Right — logo display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:w-80 xl:w-96 shrink-0"
          >
            <div
              className="w-full aspect-square flex items-center justify-center p-12 border"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
            >
              <img
                src={brandData.image_url}
                alt={brandData.alt_text || brandData.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>

        </div>
      </div>

      <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
    </section>
  );
}
