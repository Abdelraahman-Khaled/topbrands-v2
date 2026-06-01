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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-20 xl:px-28 py-16 sm:py-24"
      style={{ background: "#f7f6f2" }}
    >


      {/* Header */}
      <div className="mb-14">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)", color: "#0f0f0f" }}
          className="font-black leading-none tracking-tight mb-6"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full "
        />

      </div>



      {/* Brand logos grid (Exactly 4 per row on desktop/tablet) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-14"
      >
        {brands.map((brand, index) => (
          <LocalizedLink
            key={brand.id || index}
            href={`/brands/${brand.id}`}
            className="relative flex items-center justify-center h-20 sm:h-28 p-2"
          >
            {brand.is_highlighted && (
              <div className="absolute -top-2 -right-2 z-10 w-5 h-5 bg-brand-yellow rounded-full flex items-center justify-center text-[9px] text-black shadow-sm ring-2 ring-white">
                <i className="ri-star-fill" />
              </div>
            )}
            <img
              src={brand.image_url}
              alt={brand.title || brand.alt_text}
              className="max-w-full max-h-full object-contain"
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
        className="w-full flex justify-center mt-6"
      >
        <LocalizedLink href="/brands" className="circle-btn">
          <span className="circle-btn__wave" />
          <div className="circle-btn__content">
            <span className="circle-btn__label">
              {buttonLabel}
            </span>
            <span className="circle-btn__icon">
              <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
              </svg>
            </span>
          </div>
        </LocalizedLink>
      </motion.div>
    </section>
  );
}
