"use client";
import { motion } from "framer-motion";

export default function MarketChannels({ channelsData, channels, isAr }) {
  if (!channels?.length) return null;

  return (
    <section className="relative overflow-hidden" style={{ background: "#4b4f54" }}>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase text-brand-yellow font-mono mb-6 block"
            >
              {isAr ? "قنوات التوزيع" : "DISTRIBUTION CHANNELS"}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {channelsData?.["Element 1"]?.value}
            </motion.h2>
          </div>

          {channelsData?.["Element 2"]?.value && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs text-white/80"
            >
              {channelsData["Element 2"].value}
            </motion.p>
          )}
        </div>
      </div>

      {/* Channels grid */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-3 border-t border-l"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        {channels.map((ch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-5">
              <h3
                className="font-black leading-tight tracking-tight text-white group-hover:text-black transition-colors duration-300"
                style={{ fontSize: "clamp(1.3rem, 2vw, 1.7rem)" }}
              >
                {ch.val0}
              </h3>
              <p className="text-base leading-relaxed text-white group-hover:text-black/65 transition-colors duration-300">
                {ch.val1}
              </p>
              {ch.val2 && (
                <span className="mt-auto text-sm font-mono font-bold tracking-[3px] uppercase text-brand-yellow group-hover:text-black/50 transition-colors duration-300 border-t border-white/[0.07] group-hover:border-black/10 pt-4">
                  ✓ {ch.val2}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
