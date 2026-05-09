"use client";
import { motion } from "framer-motion";
import Counter from "../../components/Counter";

export default function MarketCapabilities({ capabilitiesData, capabilities, isAr }) {
  if (!capabilities?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      <span
        aria-hidden="true"
        className="absolute left-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        style={{ fontSize: "clamp(80px, 12vw, 180px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
      >
        NUMBERS
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
              style={{ color: "rgba(0,0,0,0.3)" }}
            >
              {isAr ? "قدراتنا" : "OUR CAPABILITIES"}
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
              className="font-black leading-[0.88] tracking-tight text-brand-jet"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {capabilitiesData?.["Element 1"]?.value}
            </motion.h2>
          </div>

          {capabilitiesData?.["Element 2"]?.value && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              {capabilitiesData["Element 2"].value}
            </motion.p>
          )}
        </div>
      </div>

      {/* Stats grid — full bleed */}
      <div
        className="relative z-10 grid grid-cols-2 lg:grid-cols-4 border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        {capabilities.map((cap, i) => {
          const isNumber = cap.val1 && !isNaN(parseFloat(cap.val1.replace(/[^0-9.]/g, "")));
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col justify-end px-10 sm:px-12 lg:px-14 pt-12 pb-16 border-r border-b"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            >
              {/* Value */}
              <div
                className="font-black text-brand-jet leading-none mb-4"
                style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
              >
                {isNumber ? <Counter value={cap.val1} /> : cap.val1}
              </div>

              {/* Yellow rule */}
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-4" />

              {/* Label */}
              <p className="text-xs font-bold tracking-[3px] uppercase font-mono" style={{ color: "rgba(0,0,0,0.4)" }}>
                {cap.val0}
              </p>
              {cap.val2 && (
                <p className="text-xs mt-1" style={{ color: "rgba(0,0,0,0.3)" }}>{cap.val2}</p>
              )}
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
