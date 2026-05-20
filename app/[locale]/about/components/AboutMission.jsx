"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutMission({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const visionTitle = data["Element 1"]?.value;
  const visionDesc = data["Element 2"]?.value;
  const missionTitle = data["Element 3"]?.value;
  const missionDesc = data["Element 4"]?.value;

  const panels = [
    { title: visionTitle, desc: visionDesc, label: t("vision", "VISION") },
    { title: missionTitle, desc: missionDesc, label: t("mission", "MISSION") },
  ].filter((p) => p.title);

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        className="absolute inset-e-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        {t("vision", "VISION")}
      </span>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-black leading-none tracking-tight text-brand-charcoal mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
        >
          {t("vision_and_mission", "VISION & MISSION")}
        </motion.h2>


        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="w-10 h-[3px] bg-brand-yellow origin-left rounded-full"
        />

      </div>

      {/* Panels */}
      <div className="relative z-10 border-t" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {panels.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="flex flex-col lg:flex-row border-b "
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            {/* Left — number + label */}
            <div
              className="flex items-center gap-6 px-10 sm:px-14 lg:px-20 xl:px-28 py-12 lg:py-20 lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r"
              style={{ borderColor: "rgba(0,0,0,0.07)" }}
            >
              <div>
                <h3 className="flex items-center gap-3 font-black text-gray-900 leading-tight tracking-tight" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
                  <span className="inline-block w-6 h-0.75 bg-brand-yellow rounded-full shrink-0" />
                  {p.title}
                </h3>
              </div>
            </div>

            {/* Right — description */}
            <div className="flex items-center px-10 sm:px-14 lg:px-20 xl:px-28 py-12 lg:py-20 flex-1">
              <div className="relative w-full">
                <p className="relative text-base lg:text-lg leading-relaxed max-w-2xl text-brand-charcoal" >
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
