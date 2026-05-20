"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Counter from "../../components/Counter";

/*
  Editorial split section — image one side, content the other
  props:
    badge, title, description
    items: [{ title, desc }]  — shown as numbered strips or checkmark rows
    checkmarks: bool  — if true, show yellow checkmark circle instead of number
    imageUrl
    imageLeft: bool  — default false (image right)
    dark: bool  — default true
    stats: [{ value, label }]
*/
export default function SvcSplit({ badge, title, description, items = [], checkmarks = false, imageUrl, imageLeft = false, dark = true, stats = [] }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const isNumber = (v) => v && !isNaN(parseFloat(v.replace(/[^0-9.]/g, "")));
  const bg = dark ? "#4b4f54" : "#f7f6f2";
  const textMain = dark ? "#ffffff" : "#1a1a1a";
  const textMuted = dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.6)";
  const textDesc = dark ? "rgba(255,255,255,1)" : "rgba(0,0,0,1)";
  const border = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";

  const textContent = (
    <div className="flex flex-col justify-center flex-1 px-10 sm:px-14 lg:px-16 xl:px-20 py-20 lg:py-28 border-b lg:border-b-0" style={{ borderColor: border, ...(imageLeft ? { borderLeft: `1px solid ${border}` } : { borderRight: `1px solid ${border}` }) }}>



      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-black leading-none tracking-tight mb-7"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", color: textMain }}
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

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xl leading-relaxed mb-10"
          style={{ color: textDesc }}
        >
          {description}
        </motion.p>
      )}

      {items.length > 0 && (
        <div className="flex flex-col border-t" style={{ borderColor: border }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="flex items-start gap-5 py-6 border-b"
              style={{ borderColor: border }}
            >
              {checkmarks && (
                <span className="w-7 h-7 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 mt-0.5">
                  <svg width="8" height="7" viewBox="0 0 11 9" fill="none">
                    <path d="M1 4.5L4 7.5L10 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
              <div>
                {item.title && (
                  <h4 className="font-black text-lg mb-1" style={{ color: textMain }}>{item.title}</h4>
                )}
                {item.desc && (
                  <p className="text-base leading-relaxed" style={{ color: textDesc }}>{item.desc}</p>
                )}
                {/* plain text (no title/desc split) */}
                {!item.title && !item.desc && item.text && (
                  <p className="text-base font-bold" style={{ color: textMain }}>{item.text}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {stats.length > 0 && (
        <div className="grid grid-cols-2 gap-8 mt-6 pt-8 border-t" style={{ borderColor: border }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="flex flex-col"
            >
              <div
                className="font-black leading-none mb-3"
                style={{ fontSize: "clamp(2rem, 3.5vw, 3.5rem)", color: textMain, letterSpacing: "-0.03em" }}
              >
                {isNumber(stat.value) ? <Counter value={stat.value} /> : stat.value}
              </div>
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-3" />
              <p className="text-sm  font-bold tracking-[3px] uppercase font-mono" style={{ color: textMuted }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  const imageContent = imageUrl ? (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative min-h-72 lg:min-h-0 flex-1 overflow-hidden group"
    >
      <motion.div
        className="absolute inset-x-0 w-full"
        style={{ y: imageY, top: "-15%", height: "130%" }}
      >
        <img src={imageUrl} alt={title || ""} className="w-full h-full object-cover transition-transform duration-1000 ease-out" />
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: imageLeft
            ? "linear-gradient(to left, transparent 50%, rgba(15,15,15,0.3) 100%)"
            : "linear-gradient(to right, transparent 50%, rgba(15,15,15,0.3) 100%)"
        }}
      />
    </motion.div>
  ) : null;

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: bg }}>
      <div className="flex flex-col lg:flex-row w-full">
        {imageLeft ? (
          <>
            {imageUrl && <div className="lg:w-1/2 flex flex-col">{imageContent}</div>}
            <div className="lg:w-1/2 flex flex-col">{textContent}</div>
          </>
        ) : (
          <>
            <div className={imageUrl ? "lg:w-1/2 flex flex-col" : "w-full flex flex-col"}>{textContent}</div>
            {imageUrl && <div className="lg:w-1/2 flex flex-col">{imageContent}</div>}
          </>
        )}
      </div>
    </section>
  );
}
