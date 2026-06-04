"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Eye, Heart, Clock, Handshake, Trophy, Lightbulb } from "lucide-react";

export default function CoreValues({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const headerTitle = data["Element 1"]?.value;
  const headerSubtitle = data["Element 2"]?.value;

  const symbols = [
    <Eye key={0} size={24} strokeWidth={1.6} />,
    <Heart key={1} size={24} strokeWidth={1.6} />,
    <Clock key={2} size={24} strokeWidth={1.6} />,
    <Handshake key={3} size={24} strokeWidth={1.6} />,
    <Trophy key={4} size={24} strokeWidth={1.6} />,
    <Lightbulb key={5} size={24} strokeWidth={1.6} />,
  ];

  const values = [
    { title: data["Element 3"]?.value, desc: data["Element 4"]?.value, symbol: symbols[0] },
    { title: data["Element 5"]?.value, desc: data["Element 6"]?.value, symbol: symbols[1] },
    { title: data["Element 7"]?.value, desc: data["Element 8"]?.value, symbol: symbols[2] },
    { title: data["Element 9"]?.value, desc: data["Element 10"]?.value, symbol: symbols[3] },
    { title: data["Element 11"]?.value, desc: data["Element 12"]?.value, symbol: symbols[4] },
    { title: data["Element 13"]?.value, desc: data["Element 14"]?.value, symbol: symbols[5] },
  ].filter((v) => v.title);

  return (
    <section className="relative overflow-hidden" style={{ background: "#4b4f54" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute inset-e-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.03)", lineHeight: 1 }}
      >
        {t("values", "VALUES")}
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-white mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {headerTitle}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-[3px] bg-brand-yellow origin-left rounded-full"
            />
          </div>

          {headerSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs text-white/80"
            >
              {headerSubtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Values grid — full bleed */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        {values.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {/* Yellow sweep */}
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 p-10 sm:p-12 flex flex-col gap-5">
              {/* Symbol */}
              <span className="text-brand-yellow group-hover:text-black/70 transition-colors duration-300">
                {v.symbol}
              </span>

              <div className="h-px w-full bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />

              {/* Title */}
              <h3
                className="font-black leading-tight tracking-tight text-white group-hover:text-black transition-colors duration-300"
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
              >
                {v.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-white/90 group-hover:text-black/70 transition-colors duration-300">
                {v.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
