"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { headlineRevealVariants } from "../../../lib/animations";
import LocalizedLink from "../../../components/LocalizedLink";

export default function BrandDetailHero({ brandData }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!brandData) return null;

  const title = brandData.title;
  const description = brandData.description;
  const altText = brandData.alt_text;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Top border */}

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-32 pb-24">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: isAr ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <LocalizedLink
            href="/brands"
            className="inline-flex group items-center gap-3 group"
          >
            <span
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors duration-300 group-hover:border-brand-yellow group-hover:text-brand-yellow rtl:rotate-180"
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,1)" }}
            >
              <svg width="8" height="8" viewBox="0 0 11 11" fill="none" className="rotate-180">
                <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
              </svg>
            </span>
            <span className="text-xs font-bold tracking-[3px] group-hover:text-brand-yellow uppercase font-mono transition-colors duration-300" style={{ color: "rgba(255,255,255,1)" }}>
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
              className="font-black text-white  tracking-tight mb-10"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
            >
              <div className="overflow-hidden pt-2 -mt-2">
                <motion.span variants={headlineRevealVariants} className="block">
                  {title}
                </motion.span>
              </div>
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-base lg:text-lg leading-relaxed max-w-xl mb-12 text-white/90"
              >
                {description}
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
                <span className="text-sm font-bold tracking-widest uppercase text-white transition-colors duration-300 group-hover:text-brand-yellow">
                  {isAr ? "تواصل للطلب" : "Contact for Orders"}
                </span>
                <span className="w-10 h-10 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                  </svg>
                </span>
              </LocalizedLink>

              <LocalizedLink href="/become-a-partner" className="inline-flex items-center justify-between gap-6 group">
                <span className="text-sm font-bold tracking-widest uppercase text-brand-yellow transition-colors duration-300 group-hover:text-white">
                  {isAr ? "كن شريكاً" : "Become a Partner"}
                </span>
                <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 border border-transparent transition-all duration-300 group-hover:bg-brand-yellow group-hover:translate-x-1 rtl:rotate-180">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
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
              className="w-full aspect-square flex items-center justify-center p-12 border bg-white rounded-lg"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <img
                src={brandData.image_url}
                alt={altText || title}
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
