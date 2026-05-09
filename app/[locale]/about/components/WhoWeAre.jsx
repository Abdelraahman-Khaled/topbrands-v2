"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Counter from "../../components/Counter";

export default function WhoWeAre({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const desc1          = data["Text Element 1"]?.value;
  const desc2          = data["Text Element 2"]?.value;
  const heritageLabel  = data["Text Element 3"]?.value;
  const heritageValue  = data["Text Element 4"]?.value;
  const coverageLabel  = data["Text Element 5"]?.value;
  const coverageValue  = data["Text Element 6"]?.value;
  const imageUrl       = data.image_url;

  return (
    <section className="relative overflow-hidden" style={{ background: "#f7f6f2" }}>
      <div className="flex flex-col lg:flex-row min-h-[70vh]">

        {/* Left — image panel */}
        {imageUrl && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden"
          >
            <img
              src={imageUrl}
              alt={desc1 || "Who We Are"}
              className="w-full h-full object-cover"
            />
            {/* Subtle right-edge fade on desktop */}
            <div
              className="absolute inset-y-0 right-0 w-24 hidden lg:block"
              style={{ background: "linear-gradient(to right, transparent, #f7f6f2)" }}
            />
          </motion.div>
        )}

        {/* Right — text panel */}
        <div className="lg:w-1/2 flex flex-col justify-center px-10 sm:px-14 lg:px-16 xl:px-20 py-20 lg:py-28">

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
            style={{ color: "rgba(0,0,0,0.3)" }}
          >
            {t("who_we_are", "WHO WE ARE")}
          </motion.span>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-8"
          />

          <div className="space-y-5 mb-12">
            {desc1 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base lg:text-lg leading-relaxed"
                style={{ color: "rgba(0,0,0,0.6)" }}
              >
                {desc1}
              </motion.p>
            )}
            {desc2 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base lg:text-lg leading-relaxed"
                style={{ color: "rgba(0,0,0,0.6)" }}
              >
                {desc2}
              </motion.p>
            )}
          </div>

          {/* Stat strips */}
          <div className="flex flex-col border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            {heritageLabel && heritageValue && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center justify-between py-6 border-b"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <span className="text-sm font-bold tracking-widest uppercase font-mono" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {heritageLabel}
                </span>
                <span className="font-black text-brand-jet" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}>
                  <Counter value={heritageValue} />
                </span>
              </motion.div>
            )}
            {coverageLabel && coverageValue && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.27 }}
                className="flex items-center justify-between py-6 border-b"
                style={{ borderColor: "rgba(0,0,0,0.08)" }}
              >
                <span className="text-sm font-bold tracking-widest uppercase font-mono" style={{ color: "rgba(0,0,0,0.4)" }}>
                  {coverageLabel}
                </span>
                <span className="font-black text-brand-jet" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}>
                  {coverageValue}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
