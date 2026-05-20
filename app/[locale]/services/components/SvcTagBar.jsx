"use client";
import { motion } from "framer-motion";

/* Horizontal editorial tag strip — dark #0f0f0f */
export default function SvcTagBar({ items }) {
  if (!items?.length) return null;

  return (
    <section className="relative overflow-hidden border-t border-b" style={{ background: "#4b4f54", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="px-10 sm:px-14 lg:px-20 xl:px-28 py-8 flex flex-wrap gap-3">
        {items.map((label, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="inline-flex items-center gap-2 px-4 py-2 border text-xs font-bold font-mono tracking-[2px] uppercase cursor-pointer transition-colors duration-200"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,1)" }}
            whileHover={{ backgroundColor: "white", color: "black", borderColor: "#F5C518" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow shrink-0" />
            {label}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
