"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { headlineRevealVariants } from "../../lib/animations";

export default function BrandsHero({ data }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!data) return null;

  const badge = data["Text Element 1"]?.value;
  const title = data["Text Element 2"]?.value;
  const descPart1 = data["Text Element 3"]?.value;
  const descPart2 = data["Text Element 4"]?.value;
  const imageUrl = data.image_url;


  const titleWords = title ? title.trim().split(/\s+/) : [];
  const titleMain = titleWords.slice(0, -1).join(" ");
  const titleLast = titleWords[titleWords.length - 1] ?? "";


  const settingsArr = data.settings ? Object.values(data.settings) : [];
  const subtitle = isAr
    ? settingsArr.find((s) => s.key === "sub title" && /[؀-ۿ]/.test(s.value))?.value
    : settingsArr.find((s) => s.key === "sub title" && !/[؀-ۿ]/.test(s.value))?.value;


  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>

      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt={title || "Brands"} className="w-full h-full object-cover object-center" />
        </div>
      )}

      <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8 "
          >
            <span className="text-xs font-bold text-brand-yellow tracking-[4px] uppercase font-mono">
              {badge}
            </span>
            <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
          </motion.div>
        )}

        <motion.h1
          initial="hidden"
          animate="visible"
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
        >
          <div className="overflow-hidden pt-2 -mt-2">
            <motion.span variants={headlineRevealVariants} className="block">
              {titleMain && <>{titleMain} </>}
              <span className="text-brand-yellow">{titleLast}</span>
            </motion.span>
          </div>
        </motion.h1>

        {(descPart1 || descPart2) && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 text-base lg:text-lg leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,1)" }}
          >
            {descPart1}
            {subtitle && (
              <span className="font-bold text-brand-yellow">{subtitle}  </span>
            )}
            {descPart2}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.65 }}
          className="mt-16 w-full h-px origin-left"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>
    </section>
  );
}
