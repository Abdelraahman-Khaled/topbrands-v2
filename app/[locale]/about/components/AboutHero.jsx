"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { headlineRevealVariants } from "../../lib/animations";

export default function AboutHero({ data }) {
  const { t, i18n } = useTranslation();

  if (!data) return null;

  const isAr = i18n.language === "ar";
  const badge = data["Text Element 1"]?.value;
  const titleRaw = data["Text Element 2"]?.value;
  const titleWords = titleRaw ? titleRaw.trim().split(/\s+/) : [];
  const titleMain = titleWords.slice(0, -1).join(" ");
  const titleLast = titleWords[titleWords.length - 1] ?? "";
  const yellowText = data.settings?.[isAr ? "1" : "0"]?.value;
  const desc1 = data["Text Element 3"]?.value;
  const desc2 = data["Text Element 4"]?.value;
  const imageUrl = data.image_url;

  return (
    <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Background image */}
      {imageUrl && (
        <div className="absolute inset-0 z-0">
          <img src={imageUrl} alt={titleRaw || "About Us"} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}


      {/* Content */}
      <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24">

        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-4 mb-8"
          >
            <span className="text-xs font-bold tracking-[4px] uppercase font-mono text-brand-yellow" >
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

        {(desc1 || yellowText || desc2) && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 text-base lg:text-lg leading-relaxed max-w-lg"
          >
            {desc1 && <span className="text-white/90">{desc1} </span>}
            {yellowText && <span className="font-bold text-brand-yellow">{yellowText} </span>}
            {desc2 && <span className="text-white/90">{desc2}</span>}
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
