"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import Counter from "../../components/Counter";

const featureIcons = [
  <svg key={0} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>,
  <svg key={1} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key={2} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>,
  <svg key={3} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>,
];

export default function WhoWeAre({ data }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  if (!data) return null;

  const desc1 = data["Text Element 1"]?.value;
  const desc2 = data["Text Element 2"]?.value;
  const heritageLabel = data["Text Element 3"]?.value;
  const heritageValue = data["Text Element 4"]?.value;
  const coverageLabel = data["Text Element 5"]?.value;
  const coverageValue = data["Text Element 6"]?.value;
  const heritageDesc = data["Text Element 7"]?.value || t("heritage_desc", "Decades of proven success and strong market relationships.");
  const coverageDesc = data["Text Element 8"]?.value || t("coverage_desc", "Extensive distribution network across all major regions.");
  const imageUrl = data.image_url;

  const features = [
    { icon: featureIcons[0], title: t("global_partnerships", "Global Partnerships"), desc: t("global_partnerships_desc", "Connecting international brands to local markets with expertise.") },
    { icon: featureIcons[1], title: t("market_expertise", "Market Expertise"), desc: t("market_expertise_desc", "30+ years of deep-rooted experience in the Syrian consumer market.") },
    { icon: featureIcons[2], title: t("end_to_end_solutions", "End-to-End Solutions"), desc: t("end_to_end_solutions_desc", "From distribution to sales execution and logistics support.") },
    { icon: featureIcons[3], title: t("quality_and_trust", "Quality & Trust"), desc: t("quality_and_trust_desc", "Delivering premium products with reliability and commitment.") },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ background: "#4b4f54" }}>

      <div className="grid lg:grid-cols-[1.5fr_0.9fr] min-h-[85vh]">

        {/* ── LEFT ── */}
        <div className="relative flex flex-col px-10 sm:px-14 lg:px-20 xl:px-28 py-20 lg:py-24 overflow-hidden">

          {/* faint watermark */}
          <span
            aria-hidden="true"
            className="absolute inset-e-0 top-1/2 -translate-y-1/2 font-black uppercase leading-none select-none pointer-events-none"
            style={{ fontSize: "clamp(120px,20vw,300px)", color: "rgba(255,255,255,0.025)", letterSpacing: "-0.06em", whiteSpace: "nowrap" }}
          >
            {t("who", "WHO")}
          </span>

          {/* Title + descriptions */}
          <div className="relative z-10 mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-black text-white leading-none tracking-tight mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 5rem)" }}
            >
              {t("about")}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-[3px] bg-brand-yellow origin-left rounded-full mb-8"
            />

            {desc1 && (
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-xl lg:text-2xl font-medium leading-relaxed text-white/80 mb-5 max-w-lg"
              >
                {desc1}
              </motion.p>
            )}
            {desc2 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm leading-relaxed text-white max-w-md"
              >
                {desc2}
              </motion.p>
            )}
          </div>

          {/* Feature cards */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex flex-col gap-3 p-4 rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-brand-yellow shrink-0"
                  style={{ background: "rgba(247,227,38,0.12)" }}
                >
                  {f.icon}
                </div>
                <h4 className="font-black text-white text-sm leading-tight">{f.title}</h4>
                <p className="text-[13px] leading-relaxed text-white/90">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          {(heritageLabel || coverageLabel) && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 grid grid-cols-2 gap-6 border-t pt-8 mt-auto"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              {heritageLabel && heritageValue && (
                <div className="flex items-start gap-4">

                  <div>
                    <span
                      className="block font-black text-brand-yellow leading-none tracking-tight mb-1"
                      style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)" }}
                    >
                      <Counter value={heritageValue} />
                    </span>
                    <span className="text-xs font-bold tracking-[3px] uppercase font-mono text-white block mb-2">
                      {heritageLabel}
                    </span>
                    <p className="text-[13px] leading-relaxed text-white/90 max-w-45">{heritageDesc}</p>
                  </div>
                </div>
              )}
              {coverageLabel && coverageValue && (
                <div className="flex items-start gap-4">

                  <div>
                    <span
                      className="block font-black text-brand-yellow leading-none tracking-tight mb-1"
                      style={{ fontSize: "clamp(1.6rem,3.5vw,2.8rem)" }}
                    >
                      {coverageValue}
                    </span>
                    <span className="text-xs font-bold tracking-[3px] uppercase font-mono text-white block mb-2">
                      {coverageLabel}
                    </span>
                    <p className="text-[13px] leading-relaxed text-white/90 max-w-45">{coverageDesc}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* ── RIGHT: full-bleed image ── */}
        {imageUrl && (
          <div className="relative hidden lg:block overflow-hidden z-0">
            <motion.div
              className="absolute inset-x-0 w-full"
              style={{ y: imageY, top: "-15%", height: "130%" }}
            >
              <img
                src={imageUrl}
                alt="Who We Are"
                className="w-full h-full object-left object-cover"
              />
            </motion.div>
            <div
              className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #484f54, transparent)" }}
            />
          </div>
        )}

      </div>
    </section>
  );
}
