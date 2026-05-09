"use client";
import { motion } from "framer-motion";

export default function MarketLogistics({ logisticsData, logisticsPoints, isAr }) {
  if (!logisticsData) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#0f0f0f" }}>

      <span
        aria-hidden="true"
        className="absolute right-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
      >
        LOGISTICS
      </span>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-[60vh]">

        {/* Left — text */}
        <div className="lg:w-1/2 flex flex-col justify-center px-10 sm:px-14 lg:px-20 xl:px-28 py-24 lg:py-32 border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {isAr ? "البنية اللوجستية" : "LOGISTICS INFRASTRUCTURE"}
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
            className="font-black text-white leading-[0.88] tracking-tight mb-8"
            style={{ fontSize: "clamp(2rem, 4vw, 4rem)" }}
          >
            {logisticsData["Text Element 1"]?.value}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="text-base leading-relaxed mb-12"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            {logisticsData["Text Element 2"]?.value}
          </motion.p>

          {/* Logistics points */}
          <div className="flex flex-col border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            {logisticsPoints.map((pt, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-5 py-6 border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <span className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="8" height="7" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5L4 7.5L10 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h4 className="font-black text-white text-sm mb-1">{pt.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{pt.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — image */}
        {logisticsData.image_url && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 relative min-h-72 lg:min-h-0 overflow-hidden"
          >
            <img
              src={logisticsData.image_url}
              alt="Logistics Infrastructure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to left, transparent 50%, rgba(15,15,15,0.3) 100%)" }} />
          </motion.div>
        )}
      </div>

    </section>
  );
}
