"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const PER_PAGE = 9;

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

        {description && (
          <p className="text-sm leading-relaxed line-clamp-3 text-gray-500 transition-colors duration-300">
            {description}
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

  const [page, setPage] = useState(1);
  const sectionRef = useRef(null);
  const didMount = useRef(false);

  // Scroll to the top of the products section AFTER the new page has rendered,
  // so the layout is settled and the scroll isn't cancelled mid-flight by the
  // height change (which broke scrolling on the shorter last pages).
  // The site uses Lenis smooth scroll, so we must scroll through its API —
  // native scrollIntoView/window.scrollTo fight Lenis and land in the wrong spot.
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    const raf = requestAnimationFrame(() => {
      const el = sectionRef.current;
      if (!el) return;
      const lenis = typeof window !== "undefined" ? window.lenis : null;
      if (lenis) {
        // Negative offset leaves room for the fixed navbar (~80px tall).
        lenis.scrollTo(el, { offset: -100, duration: 1 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [page]);

  if (!products?.length) return null;

  const totalPages = Math.max(1, Math.ceil(products.length / PER_PAGE));
  const paginated = products.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const goToPage = (next) => {
    setPage((prev) => {
      const clamped = Math.min(totalPages, Math.max(1, next));
      return clamped === prev ? prev : clamped;
    });
  };

  const paginationPages = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr = [1];
    if (page > 3) arr.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) arr.push(i);
    if (page < totalPages - 2) arr.push("…");
    arr.push(totalPages);
    return arr;
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden scroll-mt-24" style={{ background: "#f7f6f2" }}>

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
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {paginated.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isAr={isAr} />
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-1 mt-16">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              aria-label={isAr ? "الصفحة السابقة" : "Previous page"}
              className="w-10 h-10 flex items-center justify-center border border-black/12 hover:border-black transition-colors disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rtl:rotate-180"><path d="M7.5 2L3.5 6L7.5 10" stroke="black" strokeWidth="1.5" /></svg>
            </button>

            {paginationPages().map((num, i) =>
              num === "…" ? (
                <span key={"e" + i} className="w-10 h-10 flex items-center justify-center text-black/25 text-sm">…</span>
              ) : (
                <button
                  key={num}
                  onClick={() => goToPage(num)}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-black transition-colors duration-200 ${page === num ? "bg-brand-yellow text-black" : "text-black/35 hover:text-black"
                    }`}
                >
                  {num}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              aria-label={isAr ? "الصفحة التالية" : "Next page"}
              className="w-10 h-10 flex items-center justify-center border border-black/12 hover:border-black transition-colors disabled:opacity-20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rtl:rotate-180"><path d="M4.5 2L8.5 6L4.5 10" stroke="black" strokeWidth="1.5" /></svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
