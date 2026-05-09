"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function OurEdgeSection({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const headerTitle    = data["Element 1"]?.value;
  const headerSubtitle = data["Element 2"]?.value;

  const edges = [
    { title: data["Element 3"]?.value,  desc: data["Element 4"]?.value },
    { title: data["Element 5"]?.value,  desc: data["Element 6"]?.value },
    { title: data["Element 7"]?.value,  desc: data["Element 8"]?.value },
    { title: data["Element 9"]?.value,  desc: data["Element 10"]?.value },
  ].filter((e) => e.title);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        EDGE
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("our_edge", "OUR EDGE")}
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
              {headerTitle}
            </motion.h2>
          </div>

          {headerSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {headerSubtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Edge grid — full bleed, 2×2 */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {edges.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Yellow sweep */}
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-6">
              {/* Number row */}
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-xs tracking-[3px] text-brand-yellow group-hover:text-black/50 transition-colors duration-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-white/10 group-hover:bg-black/15 transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3
                className="font-black leading-tight tracking-tight text-white group-hover:text-black transition-colors duration-300"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {e.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/45 group-hover:text-black/70 transition-colors duration-300">
                {e.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
