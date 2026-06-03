"use client";
import { motion } from "framer-motion";
import { headlineRevealVariants } from "../../lib/animations";

export default function MarketHero({ heroData, isAr }) {
  if (!heroData) return null;

  const badge = heroData["Text Element 1"]?.value;
  const title = heroData["Text Element 2"]?.value;
  const yellowText = heroData.settings?.[isAr ? "1" : "0"]?.value;
  const descPart1 = heroData["Text Element 3"]?.value;
  const yellowSub = heroData.settings?.[isAr ? "3" : "2"]?.value;
  const descPart2 = heroData["Text Element 4"]?.value;
  const imageUrl = heroData.image_url;

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>

      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt={title || "Market Coverage"} className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-bold  text-brand-yellow tracking-[4px] uppercase font-mono" >
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
              {title}{yellowText && <span className="text-brand-yellow"> {yellowText}</span>}
            </motion.span>
          </div>
        </motion.h1>

        {(descPart1 || yellowSub || descPart2) && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-base lg:text-lg leading-relaxed max-w-lg"
          >
            {descPart1 && <span className="text-white/90">{descPart1} </span>}
            {yellowSub && <span className="font-bold text-brand-yellow">{yellowSub} </span>}
            {descPart2 && <span > {descPart2}</span>}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="mt-16 w-full h-px origin-left"
        />
      </div>
    </section>
  );
}
