"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const ServiceCard = ({ data, index }) => {
  if (!data) return null;

  const title       = data["Element 1"]?.value;
  const description = data["Element 2"]?.value;

  const bullets = Object.keys(data)
    .filter((k) => {
      const n = parseInt(k.split(" ")[1]);
      return k.startsWith("Element") && n >= 3 && n <= 6;
    })
    .map((k) => data[k]?.value)
    .filter(Boolean);

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="group relative flex flex-col border-b border-r border-white/[0.07]"
    >
      {/* Yellow sweep on hover */}
      <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

      <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-6 h-full">

        {/* Number + rule row */}
        <div className="flex items-center gap-4">
          <span className="font-mono font-bold text-xs tracking-[3px] transition-colors duration-300 text-brand-yellow group-hover:text-black/50">
            {num}
          </span>
          <div className="h-px flex-1 transition-colors duration-300 bg-white/10 group-hover:bg-black/15" />
        </div>

        {/* Title */}
        <h3
          className="font-black leading-tight tracking-tight transition-colors duration-300 text-white group-hover:text-black"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed transition-colors duration-300 text-white/45 group-hover:text-black/70">
          {description}
        </p>

        {/* Bullets */}
        {bullets.length > 0 && (
          <ul className="flex flex-col gap-2.5 mt-auto pt-4 border-t transition-colors duration-300 border-white/[0.07] group-hover:border-black/15">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-xs leading-relaxed font-medium transition-colors duration-300 text-white/40 group-hover:text-black/65">
                <span className="w-1 h-1 rounded-full shrink-0 mt-1.5 transition-colors duration-300 bg-brand-yellow group-hover:bg-black/40" />
                {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

const SERVICES_ORDER = [
  "fmcgDist",
  "retailTrade",
  "brandRep",
  "salesExec",
  "marketCov",
  "merchVis",
  "importTrade",
  "marketIntelligence",
];

export default function ServicesGrid({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        WHAT WE DO
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("our_services", "OUR SERVICES")}
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
              className="font-black leading-[0.88] tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {t("what_we_offer", "What We Offer")}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {t("services_grid_subtitle", "End-to-end solutions tailored to your market.")}
          </motion.p>
        </div>
      </div>

      {/* Grid */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {SERVICES_ORDER.map((key, i) => (
          <ServiceCard key={key} data={data[key]} index={i} />
        ))}
      </div>

    </section>
  );
}
