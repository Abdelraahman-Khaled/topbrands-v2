"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function BrandProducts({ products, brandTitle }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!products?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute right-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        PRODUCTS
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              {isAr ? "المنتجات" : "PRODUCTS"}
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
              className="font-black leading-[0.88] tracking-tight text-brand-jet"
              style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
            >
              {isAr ? `منتجات ${brandTitle}` : `${brandTitle} Products`}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="font-mono text-sm"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            {products.length} {isAr ? "منتج" : "products"}
          </motion.p>
        </div>
      </div>

      {/* Products grid */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: "rgba(0,0,0,0.08)" }}
          >
            {/* Yellow sweep */}
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 flex flex-col h-full">

              {/* Image area */}
              <div className="w-full h-52 flex items-center justify-center p-10 border-b border-black/[0.06] group-hover:border-black/10 transition-colors duration-300">
                <img
                  src={product.image_url || "/images/placeholder-product.png"}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {product.size && (
                  <span className="absolute top-4 right-4 font-mono text-xs font-bold text-black/30 group-hover:text-black/50 transition-colors duration-300">
                    {product.size}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4 p-8 lg:p-10 flex-1">
                <span className="font-mono font-bold text-xs tracking-[3px] text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="h-px w-full bg-black/[0.07] group-hover:bg-black/15 transition-colors duration-300" />

                <h3
                  className="font-black leading-tight tracking-tight text-brand-jet group-hover:text-black transition-colors duration-300"
                  style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}
                >
                  {product.title}
                </h3>

                {product.description ? (
                  <p className="text-sm leading-relaxed line-clamp-2 text-black/45 group-hover:text-black/65 transition-colors duration-300">
                    {product.description}
                  </p>
                ) : (
                  <p className="text-sm text-black/25 group-hover:text-black/40 transition-colors duration-300">
                    {isAr ? "وصف المنتج سيتوفر قريباً..." : "Description coming soon..."}
                  </p>
                )}

                {product.size && (
                  <p className="mt-auto text-xs font-mono font-bold uppercase tracking-widest text-black/35 group-hover:text-black/55 transition-colors duration-300">
                    {isAr ? "الحجم:" : "Size:"} {product.size}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
