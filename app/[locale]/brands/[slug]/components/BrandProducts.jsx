"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product, index, isAr }) => {
  const title = product.title;
  const description = product.description;
  const altText = product.alt_text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow duration-300"
    >
      {/* Image area */}
      <div className="relative w-full h-48 flex items-center justify-center p-10 bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
        <img
          src={product.image_url || "/images/placeholder-product.png"}
          alt={altText || title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {product.size && (
          <span className="absolute top-4 right-4 text-xs font-bold font-mono tracking-[3px] uppercase text-black/40 group-hover:text-black/60 transition-colors duration-300">
            {product.size}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-6 flex-1">
        <h3
          className="font-black leading-tight tracking-tight text-gray-900 group-hover:text-black transition-colors duration-300"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
        >
          {title}
        </h3>

        {description ? (
          <p className="text-sm leading-relaxed line-clamp-3 text-gray-500 transition-colors duration-300">
            {description}
          </p>
        ) : (
          <p className="text-sm text-gray-400 transition-colors duration-300">
            {isAr ? "وصف المنتج سيتوفر قريباً..." : "Description coming soon..."}
          </p>
        )}

        {product.size && (
          <div className="mt-auto pt-4 flex items-center border-t border-gray-100 transition-colors duration-300">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400 transition-colors duration-300">
              {isAr ? "الحجم:" : "Size:"} {product.size}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function BrandProducts({ products, brandTitle }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!products?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute inset-e-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        PRODUCTS
      </span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">

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
              {isAr ? `منتجات ${brandTitle}` : `${brandTitle} Products`}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-black"
          >
            {products.length} {isAr ? "منتج" : "products"}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isAr={isAr} />
          ))}
        </div>

      </div>
    </section>
  );
}
