"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Counter from "../../components/Counter";

export default function Stats({ data }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!data) return null;

  const title = data["Title"]?.value;
  const subtitle = data["Subtitle"]?.value;

  const stats = [
    { value: data["Stat 1 Value"]?.value + "+", label: data["Stat 1 Label"]?.value },
    { value: data["Stat 2 Value"]?.value + "+", label: data["Stat 2 Label"]?.value },
    { value: data["Stat 3 Value"]?.value, label: data["Stat 3 Label"]?.value },
    { value: data["Stat 4 Value"]?.value + "+", label: data["Stat 4 Label"]?.value },
  ].filter(s => s.label);

  return (
    <section className="relative overflow-hidden" style={{ background: "#4B4F54" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
        className={`absolute top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none ${isAr ? "left-0" : "right-0"}`}
      >
        {t("numbers", "NUMBERS")}
      </span>

      <div className="relative z-10 px-6 sm:px-12 lg:px-20 xl:px-28 pt-16 sm:pt-24 pb-0">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 sm:mb-20">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#ffffff" }}
              className="font-black leading-none tracking-tight mb-5"
            >
              {title}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
              className="w-16 h-1 bg-brand-yellow origin-left rounded-full"
            />
          </div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-brand-yellow lg:text-lg leading-relaxed lg:max-w-xs"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

      </div>

      {/* ── Stats grid — full bleed ── */}
      <div
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col justify-end pl-6 sm:pl-12 lg:pl-20 xl:pl-28 pr-4 sm:pr-6 lg:pr-8 xl:pr-10 pt-8 sm:pt-12 pb-12 sm:pb-16 border-r border-b lg:border-b-0"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Counter */}
            <div
              className="font-black text-white leading-none mb-4 truncate"
              style={{ fontSize: "clamp(1.8rem, 4vw, 4.5rem)", letterSpacing: "-0.04em" }}
            >
              <Counter value={stat.value} />
            </div>

            {/* Yellow rule */}
            <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-4" />

            {/* Label */}
            <p
              className=" sm:text-normal font-medium leading-snug text-white"
            >
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
