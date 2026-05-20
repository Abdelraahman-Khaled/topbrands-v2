"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const FeatureCol = ({ title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="flex flex-col justify-end px-10 sm:px-12 lg:px-14 pt-12 pb-16 border-r"
  >

    {/* Title */}
    <h3
      className="font-black text-brand-jet leading-tight tracking-tight mb-4"
      style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)" }}
    >
      {title}
    </h3>

    {/* Yellow rule */}
    <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-5" />

    {/* Description */}
    <p className="text-base leading-relaxed text-brand-charcoal" >
      {description}
    </p>
  </motion.div>
);

export default function ExcellenceSection({ data }) {
  const { t } = useTranslation();

  if (!data) return null;

  const title = data["Element 1"]?.value;
  const subtitle = data["Element 2"]?.value;

  const features = [
    { title: data["Element 3"]?.value, description: data["Element 4"]?.value },
    { title: data["Element 5"]?.value, description: data["Element 6"]?.value },
    { title: data["Element 7"]?.value, description: data["Element 8"]?.value },
    { title: data["Element 9"]?.value, description: data["Element 10"]?.value },
  ].filter((f) => f.title);

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
              className="font-black leading-none tracking-tight text-brand-jet mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {title}
            </motion.h2>


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
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs text-brand-charcoal"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Feature columns — full bleed */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        {features.map((f, i) => (
          <FeatureCol
            key={i}
            title={f.title}
            description={f.description}
            index={i}
          />
        ))}
      </div>

    </section>
  );
}
