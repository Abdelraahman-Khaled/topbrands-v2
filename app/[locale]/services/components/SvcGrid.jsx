"use client";
import { motion } from "framer-motion";

/*
  Numbered editorial grid — reused by all service sub-pages
  props:
    badge, title, subtitle  — section header
    items: [{ title, desc, extra? }]
    cols: 2 | 3 | 4  (default 2)
    dark: bool  (default true → #0f0f0f, false → #f7f6f2)
*/
export default function SvcGrid({ badge, title, subtitle, items, cols = 2, dark = true }) {
  if (!items?.length) return null;

  const bg = dark ? "#4b4f54" : "#f7f6f2";
  const textMain = dark ? "#ffffff" : "#1a1a1a";
  const textMuted = dark ? "rgba(255,255,255,1)" : "rgba(0,0,0,0.35)";
  const textDesc = dark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)";
  const descClass = dark ? "text-white/85 group-hover:text-black" : "text-black/45 group-hover:text-black/70";
  const titleClass = dark ? "text-white group-hover:text-black" : "text-brand-jet group-hover:text-black";
  const extraClass = dark ? "text-brand-yellow group-hover:text-black/50 border-white/[0.07] group-hover:border-black/10" : "text-brand-yellow group-hover:text-black/50 border-black/[0.07] group-hover:border-black/10";

  const colClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols] ?? "sm:grid-cols-2";

  return (
    <section className="relative overflow-hidden" style={{ background: bg }}>
      {/* Header */}
      {(badge || title) && (
        <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-20">
            <div>

              {title && (
                <motion.h2
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-black leading-none tracking-tight mb-6"
                  style={{ fontSize: "clamp(2rem, 4vw, 4.5rem)", color: textMain }}
                >
                  {title}
                </motion.h2>
              )}


              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
              />
            </div>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
                style={{ color: textDesc }}
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div
        className={`relative z-10 grid grid-cols-1 ${colClass} border-t border-l`}
        style={{ borderColor: border }}
      >
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % cols) * 0.08 }}
            className="group relative flex flex-col border-b border-r overflow-hidden"
            style={{ borderColor: border }}
          >
            <div className="absolute inset-0 origin-left transition-transform duration-500 ease-in-out scale-x-0 group-hover:scale-x-100 pointer-events-none z-0 bg-brand-yellow" />

            <div className="relative z-10 p-10 sm:p-12 lg:p-14 flex flex-col gap-5">
              <h3
                className={`font-black leading-tight tracking-tight transition-colors duration-300 ${titleClass}`}
                style={{ fontSize: "clamp(1.2rem, 2vw, 1.7rem)" }}
              >
                {item.title}
              </h3>
              <p className={`text-base text-brand-charcoal leading-relaxed transition-colors duration-300 ${descClass}`}>
                {item.desc}
              </p>
              {item.extra && (
                <span className={`mt-auto text-xs font-mono font-bold tracking-[3px] uppercase transition-colors duration-300 border-t pt-4 ${extraClass}`}>
                  ✓ {item.extra}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
