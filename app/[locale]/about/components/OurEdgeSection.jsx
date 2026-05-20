"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function OurEdgeSection({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const headerTitle = data["Element 1"]?.value;
  const headerSubtitle = data["Element 2"]?.value;

  const symbols = [
    // Network / Distribution — globe/network
    <svg key={0} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polygon points="2 17 12 22 22 17" /><polygon points="2 12 12 17 22 12" /></svg>,
    // Inventory / Management — box/layers
    <svg key={1} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
    // Sales Force / Team — users
    <svg key={2} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    // Market Intelligence — bar chart / trending
    <svg key={3} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /><line x1="3" y1="20" x2="21" y2="20" /></svg>,
  ];

  const edges = [
    { title: data["Element 3"]?.value, desc: data["Element 4"]?.value, symbol: symbols[0] },
    { title: data["Element 5"]?.value, desc: data["Element 6"]?.value, symbol: symbols[1] },
    { title: data["Element 7"]?.value, desc: data["Element 8"]?.value, symbol: symbols[2] },
    { title: data["Element 9"]?.value, desc: data["Element 10"]?.value, symbol: symbols[3] },
  ].filter((e) => e.title);

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>

      {/* Header */}
      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
          <div>




            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black leading-none tracking-tight text-gray-900 mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {headerTitle}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
            />
          </div>

          {headerSubtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
              style={{ color: "rgba(0,0,0,1)" }}
            >
              {headerSubtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Edge grid — full bleed, 2×2 */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 border-t border-l"
        style={{ borderColor: "rgba(0,0,0,0.07)" }}
      >
        {edges.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: "rgba(0,0,0,0.07)" }}
          >
            {/* Yellow sweep */}
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-6">
              {/* Symbol row */}
              <div className="flex items-center gap-4">
                <span className="text-brand-charcoal group-hover:text-black/70 transition-colors duration-300">
                  {e.symbol}
                </span>
                <div className="h-px flex-1 bg-black/10 group-hover:bg-black/15 transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3
                className="font-black leading-tight tracking-tight text-gray-900 group-hover:text-black transition-colors duration-300"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                {e.title}
              </h3>

              {/* Description */}
              <p className="text-base leading-relaxed text-brand-charcoal group-hover:text-black/70 transition-colors duration-300">
                {e.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
