"use client";
import { motion } from "framer-motion";
import LocalizedLink from "../../components/LocalizedLink";
import Counter from "../../components/Counter";

const BrandCard = ({ brand, index, isAr }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm  transition-shadow duration-300"
    >
      <LocalizedLink href={`/brands/${brand.id}`} className="relative flex flex-col h-full">

        {/* Logo area */}
        <div className="relative w-full h-48 flex items-center justify-center p-10 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 z-10">
          <img
            src={brand.image_url}
            alt={brand.alt_text || brand.title}
            className="max-w-full max-h-full object-contain transition-transform duration-500"
          />
          {brand.is_highlighted && (
            <span className="absolute top-4 right-4 text-xs font-bold font-mono tracking-[3px] uppercase text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
              ★ {isAr ? "مميز" : "FEATURED"}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="relative flex flex-col gap-3 p-6 flex-1 overflow-hidden">
          {/* Yellow sweep on hover */}

          <div className="relative z-10 flex flex-col flex-1 gap-3">
            <h3
              className="font-black leading-tight tracking-tight text-gray-900 group-hover:text-black transition-colors duration-300"
              style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
            >
              {brand.title}
            </h3>

            {brand.description && (
              <p className="text-sm leading-relaxed line-clamp-3 text-gray-500 group-hover:text-black/65 transition-colors duration-300">
                {brand.description}
              </p>
            )}

            {/* Arrow link */}
            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100 group-hover:border-black/15 transition-colors duration-300">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400 group-hover:text-black/60 transition-colors duration-300">
                {isAr ? "عرض المنتجات" : "View Products"}
              </span>
              <span className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-black/15 flex items-center justify-center transition-colors duration-300 rtl:rotate-180">
                <svg width="9" height="9" viewBox="0 0 11 11" fill="none">
                  <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="#374151" className="group-hover:fill-black transition-colors duration-300" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </LocalizedLink>
    </motion.div>
  );
};

export default function BrandsGrid({ brands, locale }) {
  const isAr = locale === "ar";

  if (!brands?.length) return null;

  return (
    <section className="relative" style={{ background: "#f7f6f2" }}>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-4"
            />
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-black"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {isAr ? "جميع العلامات التجارية" : "All Brands"}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono  text-black"
          >
            {brands.length}
            {" "}{isAr ? "علامة تجارية موثوقة" : "trusted brands"}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand, i) => (
            <BrandCard key={brand.id} brand={brand} index={i} isAr={isAr} />
          ))}
        </div>

      </div>
    </section>
  );
}
