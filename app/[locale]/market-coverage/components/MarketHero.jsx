"use client";
import { motion } from "framer-motion";
import { headlineRevealVariants } from "../../lib/animations";

export default function MarketHero({ heroData, isAr }) {
  if (!heroData) return null;

  const badge       = heroData["Text Element 1"]?.value;
  const title       = heroData["Text Element 2"]?.value;
  const yellowText  = heroData.settings?.[isAr ? "1" : "0"]?.value;
  const description = heroData["Text Element 3"]?.value;
  const imageUrl    = heroData.image_url;

  return (
    <section className="relative min-h-[85vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>

      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt={title || "Market Coverage"} className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.88) 35%, rgba(0,0,0,0.4) 100%)" }}
          />
        </div>
      )}

      <span
        aria-hidden="true"
        className="absolute right-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none z-10"
        style={{ fontSize: "clamp(60px, 11vw, 180px)", color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
      >
        COVERAGE
      </span>

      <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-bold tracking-[4px] uppercase font-mono" style={{ color: "rgba(255,255,255,0.45)" }}>
              {badge}
            </span>
            <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
          </motion.div>
        )}

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-8"
        />

        <motion.h1
          initial="hidden"
          animate="visible"
          className="font-black text-white leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
        >
          <div className="overflow-hidden">
            <motion.span variants={headlineRevealVariants} className="block">
              {title}{yellowText && <span className="text-brand-yellow"> {yellowText}</span>}
            </motion.span>
          </div>
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-base lg:text-lg leading-relaxed max-w-lg"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {description}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-16 w-full h-px origin-left"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
      </div>
    </section>
  );
}
