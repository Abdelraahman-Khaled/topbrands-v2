"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LocalizedLink from "../../components/LocalizedLink";

export default function WhyPartener({ data, cta }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  if (!data) return null;

  const settings      = data.settings || {};
  const settingsTitle = settings[isAr ? "1" : "0"]?.value || "";

  const headerSubtitle = data["Text Element 1"]?.value;
  const headerTitle    = data["Text Element 2"]?.value;
  const headerDesc     = data["Text Element 3"]?.value;

  const ctaTitle       = cta?.["CTA Element 1"]?.value || t("ready_to_transform", "Ready to Transform Your Distribution?");
  const ctaDesc        = cta?.["CTA Element 2"]?.value;
  const ctaButton1Text = cta?.["CTA Element 3"]?.value || t("become_a_partner", "Become a Partner");
  const ctaButton2Text = cta?.["CTA Element 4"]?.value || t("contact_us", "Contact Us");

  const features = [
    { title: data["Text Element 4"]?.value,  desc: data["Text Element 5"]?.value  },
    { title: data["Text Element 6"]?.value,  desc: data["Text Element 7"]?.value  },
    { title: data["Text Element 8"]?.value,  desc: data["Text Element 9"]?.value  },
    { title: data["Text Element 10"]?.value, desc: data["Text Element 11"]?.value },
    { title: data["Text Element 12"]?.value, desc: data["Text Element 13"]?.value },
    { title: data["Text Element 14"]?.value, desc: data["Text Element 15"]?.value },
  ].filter(f => f.title);

  return (
    <section id="why-partner" style={{ background: "#f7f6f2" }} className="relative overflow-hidden">

      {/* Faint watermark */}
      <span
        aria-hidden="true"
        style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(0,0,0,0.03)", lineHeight: 1 }}
        className="absolute right-0 top-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
      >
        PARTNER
      </span>

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-0">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
              style={{ color: "rgba(0,0,0,0.35)" }}
            >
              {headerSubtitle || t("why_partner", "WHY PARTNER WITH US")}
            </motion.span>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
            />

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", color: "#0f0f0f" }}
              className="font-black leading-[0.88] tracking-tight"
            >
              {headerTitle}{settingsTitle && ` ${settingsTitle}`}
            </motion.h2>
          </div>

          {headerDesc && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed lg:max-w-xs"
              style={{ color: "rgba(0,0,0,0.45)" }}
            >
              {headerDesc}
            </motion.p>
          )}
        </div>

      </div>

      {/* ── Feature strips — full bleed ── */}
      <div className="relative z-10">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group relative border-t overflow-hidden"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            {/* Yellow sweep background on hover */}
            <div
              className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out pointer-events-none"
              style={{ background: "#F7E326" }}
            />

            <div className="relative flex items-center justify-between gap-8 px-10 sm:px-14 lg:px-20 xl:px-28 py-8 lg:py-10">
              {/* Left: title + desc */}
              <div className="flex items-start gap-8 lg:gap-16 flex-1 min-w-0">
                <h3
                  className="font-black leading-tight shrink-0 transition-colors duration-300 group-hover:text-black"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: "#0f0f0f", minWidth: "clamp(180px, 25vw, 320px)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed hidden sm:block transition-colors duration-300 group-hover:text-black/60"
                  style={{ color: "rgba(0,0,0,0.45)" }}
                >
                  {feature.desc}
                </p>
              </div>

              {/* Right: number */}
              <span
                className="font-black leading-none shrink-0 transition-all duration-300"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 3rem)",
                  color: "rgba(0,0,0,0.12)",
                  letterSpacing: "-0.04em",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(0,0,0,0.4)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(0,0,0,0.12)"}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        ))}
        {/* closing line */}
        <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
      </div>

      {/* ── CTA band ── */}
      <div
        className="relative overflow-hidden px-10 sm:px-14 lg:px-20 xl:px-28 py-20 mt-0"
        style={{ background: "#0f0f0f" }}
      >
        <span
          aria-hidden="true"
          style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(255,255,255,0.025)", lineHeight: 1 }}
          className="absolute right-0 bottom-0 font-black leading-none tracking-tighter uppercase select-none pointer-events-none"
        >
          PARTNER
        </span>

        <div className="max-w-3xl relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6 block"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t("get_started", "GET STARTED")}
          </motion.span>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-10 h-0.75 bg-brand-yellow origin-left rounded-full mb-7"
          />

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#ffffff" }}
            className="font-black leading-[0.9] tracking-tight mb-6"
          >
            {ctaTitle}
          </motion.h2>

          {ctaDesc && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base lg:text-lg leading-relaxed max-w-xl mb-10"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {ctaDesc}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap items-center gap-6"
          >
            {ctaButton1Text && (
              <LocalizedLink href="/become-a-partner" className="inline-flex items-center gap-3 group w-fit">
                <span className="text-sm font-bold tracking-widest uppercase text-white">
                  {ctaButton1Text}
                </span>
                <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                  </svg>
                </span>
              </LocalizedLink>
            )}

            {ctaButton2Text && (
              <LocalizedLink href="/contact" className="inline-flex items-center gap-3 group w-fit">
                <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {ctaButton2Text}
                </span>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180"
                  style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="rgba(255,255,255,0.4)" />
                  </svg>
                </span>
              </LocalizedLink>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
