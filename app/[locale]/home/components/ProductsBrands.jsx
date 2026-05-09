"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LocalizedLink from "../../components/LocalizedLink";

export default function ProductsBrands({ data, brands = [] }) {
  const { t } = useTranslation();

  if (!data) return null;

  const title = data["Intro Text"]?.value || data["Title"]?.value;
  const buttonLabel = data["btn Text"]?.value || t("see_all_brands") || "See All Brands";

  return (
    <section
      id="brands"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-10 sm:px-14 lg:px-20 xl:px-28 py-24"
      style={{ background: "#f7f6f2" }}
    >
      {/* Faint background label */}
      <span
        aria-hidden="true"
        style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(0,0,0,0.035)", lineHeight: 1 }}
        className="absolute right-0 bottom-4 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
      >
        BRANDS
      </span>

      {/* Header */}
      <div className="mb-14">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
          style={{ color: "#0f0f0f", opacity: 0.35 }}
        >
          {t("our_brands") || "OUR BRANDS"}
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
          {title}
        </motion.h2>
      </div>

      {/* Brand logos grid */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex flex-wrap items-center gap-x-8 gap-y-10 mb-14"
      >
        {brands.map((brand, index) => (
          <LocalizedLink
            key={brand.id || index}
            href={`/brands/${brand.id}`}
            className="relative flex items-center justify-center group"
            style={{ width: "clamp(80px, 10vw, 140px)", height: "clamp(48px, 6vw, 80px)" }}
          >
            {brand.is_highlighted && (
              <div className="absolute -top-2 -right-2 z-10 w-5 h-5 bg-brand-yellow rounded-full flex items-center justify-center text-[9px] text-black shadow-sm ring-2 ring-white">
                <i className="ri-star-fill" />
              </div>
            )}
            <img
              src={brand.image_url}
              alt={brand.title || brand.alt_text}
              className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
            />
          </LocalizedLink>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <LocalizedLink href="/brands" className="inline-flex items-center gap-3 group w-fit">
          <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#0f0f0f" }}>
            {buttonLabel}
          </span>
          <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
              <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
            </svg>
          </span>
        </LocalizedLink>
      </motion.div>
    </section>
  );
}
