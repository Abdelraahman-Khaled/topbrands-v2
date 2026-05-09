"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";
import Counter from "../../components/Counter";

const BrandCard = ({ brand, index }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col border-b border-r border-white/[0.07] overflow-hidden"
    >
      {/* Yellow sweep */}
      <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

      <LocalizedLink href={`/brands/${brand.id}`} className="relative z-10 flex flex-col h-full">

        {/* Logo area */}
        <div className="relative w-full h-48 flex items-center justify-center p-10 border-b border-white/[0.07] group-hover:border-black/10 transition-colors duration-300 bg-white/[0.03] group-hover:bg-black/5">
          <img
            src={brand.image_url}
            alt={brand.alt_text || brand.title}
            className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {brand.is_highlighted && (
            <span className="absolute top-4 right-4 text-xs font-bold font-mono tracking-[3px] uppercase text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
              ★ {isAr ? "مميز" : "FEATURED"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 p-8 lg:p-10 flex-1">
          {/* Number */}
          <span className="font-mono font-bold text-xs tracking-[3px] text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="h-px w-full bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />

          {/* Title */}
          <h3
            className="font-black leading-tight tracking-tight text-white group-hover:text-black transition-colors duration-300"
            style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}
          >
            {brand.title}
          </h3>

          {brand.description && (
            <p className="text-sm leading-relaxed line-clamp-3 text-white/40 group-hover:text-black/65 transition-colors duration-300">
              {brand.description}
            </p>
          )}

          {/* Arrow link */}
          <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.07] group-hover:border-black/15 transition-colors duration-300">
            <span className="text-xs font-bold tracking-widest uppercase text-white/50 group-hover:text-black/60 transition-colors duration-300">
              {isAr ? "عرض المنتجات" : "View Products"}
            </span>
            <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-black/15 flex items-center justify-center transition-colors duration-300 rtl:rotate-180">
              <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" className="fill-white group-hover:fill-black transition-colors duration-300" />
              </svg>
            </span>
          </div>
        </div>
      </LocalizedLink>
    </motion.div>
  );
};

export default function BrandsGrid({ brands, locale }) {
  const { t } = useTranslation();
  const isAr = locale === "ar";

  if (!brands?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        OUR BRANDS
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {isAr ? "علاماتنا التجارية" : "OUR PORTFOLIO"}
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
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {isAr ? "جميع العلامات التجارية" : "All Brands"}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-sm"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <Counter value={brands.length} />
            {" "}{isAr ? "علامة تجارية موثوقة" : "trusted brands"}
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {brands.map((brand, i) => (
          <BrandCard key={brand.id} brand={brand} index={i} />
        ))}
      </div>

    </section>
  );
}
