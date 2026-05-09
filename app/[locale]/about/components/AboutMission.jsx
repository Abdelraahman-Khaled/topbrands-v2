"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutMission({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const visionTitle  = data["Element 1"]?.value;
  const visionDesc   = data["Element 2"]?.value;
  const missionTitle = data["Element 3"]?.value;
  const missionDesc  = data["Element 4"]?.value;

  const panels = [
    { num: "01", title: visionTitle, desc: visionDesc, label: t("vision", "VISION") },
    { num: "02", title: missionTitle, desc: missionDesc, label: t("mission", "MISSION") },
  ].filter((p) => p.title);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        VISION
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          {t("vision_and_mission", "VISION & MISSION")}
        </motion.span>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full"
        />
      </div>

      {/* Panels */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {panels.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="flex flex-col lg:flex-row border-b"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {/* Left — number + label */}
            <div
              className="flex items-start lg:items-end gap-6 px-10 sm:px-14 lg:px-20 xl:px-28 py-12 lg:py-20 lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div>
                <span className="font-mono font-bold text-xs tracking-[3px] block mb-3" style={{ color: "#F7E326" }}>
                  {p.num}
                </span>
                <div className="w-6 h-0.75 bg-brand-yellow rounded-full mb-4" />
                <h3 className="font-black text-white leading-tight tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  {p.title}
                </h3>
              </div>
            </div>

            {/* Right — description */}
            <div className="flex items-center px-10 sm:px-14 lg:px-20 xl:px-28 py-12 lg:py-20 flex-1">
              {/* Giant faint number */}
              <div className="relative w-full">
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 -translate-y-1/2 font-black leading-none select-none pointer-events-none"
                  style={{ fontSize: "clamp(6rem, 14vw, 14rem)", color: "rgba(255,255,255,0.03)", letterSpacing: "-0.05em" }}
                >
                  {p.num}
                </span>
                <p className="relative text-base lg:text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {p.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
