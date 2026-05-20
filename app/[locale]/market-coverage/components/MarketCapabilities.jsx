"use client";
import { motion } from "framer-motion";
import Counter from "../../components/Counter";

export default function MarketCapabilities({ capabilitiesData, capabilities, isAr }) {
  if (!capabilities?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(0,0,0,1)" }}
            >
              {isAr ? "قدراتنا" : "OUR CAPABILITIES"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-brand-jet"
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
              style={{ color: "rgba(0,0,0,1)" }}
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
                style={{ fontSize: "clamp(1.75rem, 3vw, 3rem)", letterSpacing: "-0.04em" }}
              >
                {isNumber ? <Counter value={cap.val1} /> : cap.val1}
              </div>

              {/* Yellow rule */}
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-4" />

              {/* Label */}
              <p className="text-base font-bold tracking-[3px] uppercase font-mono" style={{ color: "rgba(0,0,0,1)" }}>
                {cap.val0}
              </p>
              {cap.val2 && (
                <p className="text-sm mt-1 text-brand-charcoal">{cap.val2}</p>
              )}
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
