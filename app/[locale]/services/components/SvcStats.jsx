"use client";
import { motion } from "framer-motion";
import Counter from "../../components/Counter";

/* dark stats band — mirrors home Stats section layout */
export default function   SvcStats({ items }) {
  if (!items?.length) return null;

  const isNumber = (v) => v && !isNaN(parseFloat(v.replace(/[^0-9.]/g, "")));

  return (
    <section className="relative overflow-hidden" style={{ background: "#000" }}>
      <div
        className="grid border-t"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        {items.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col justify-end px-8 sm:px-10 lg:px-14 pt-10 pb-14 border-r"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="font-black text-white leading-none mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
            >
              {isNumber(stat.value) ? <Counter value={stat.value} /> : stat.value}
            </div>
            <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-3" />
            <p className="text-sm font-bold tracking-[3px] uppercase font-mono" style={{ color: "rgba(255,255,255,0.8)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
