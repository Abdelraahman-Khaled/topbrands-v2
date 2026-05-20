"use client";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import LocalizedLink from "../../components/LocalizedLink";
import { Handshake, Globe, Store, Package } from "lucide-react";

export default function About({ data }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-18%", "18%"]);
  // imageY kept for parallax on the inline image panel

  if (!data) return null;

  const title = data["Text Element 1"]?.value;
  const badgeText = data["Text Element 2"]?.value;
  const description1 = data["Text Element 3"]?.value;
  const description2 = data["Text Element 4"]?.value;

  const feature1Title = data["Text Element 5"]?.value;
  const feature1Desc = data["Text Element 6"]?.value;
  const feature2Title = data["Text Element 7"]?.value;
  const feature2Desc = data["Text Element 8"]?.value;
  const feature3Title = data["Text Element 9"]?.value;
  const feature3Desc = data["Text Element 10"]?.value;
  const feature4Title = data["Text Element 11"]?.value;
  const feature4Desc = data["Text Element 12"]?.value;

  const buttonText = data["Text Element 13"]?.value;
  const imageUrl = data.image_url;

  const cards = [
    {
      title: feature1Title,
      desc: feature1Desc,
      iconColor: "text-white",
      icon: <Handshake size={22} strokeWidth={1.6} />,
    },
    {
      title: feature2Title,
      desc: feature2Desc,
      iconColor: "text-brand-yellow",
      icon: <Globe size={22} strokeWidth={1.6} />,
    },
    {
      title: feature3Title,
      desc: feature3Desc,
      iconColor: "text-brand-yellow",
      icon: <Store size={22} strokeWidth={1.6} />,
    },
    {
      title: feature4Title,
      desc: feature4Desc,
      iconColor: "text-white",
      icon: <Package size={22} strokeWidth={1.6} />,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen relative overflow-hidden py-20 lg:py-16"
    >
      {/* === Background: parallax image covering full section === */}
      {imageUrl && (
        <motion.div
          className="absolute inset-x-0 w-full"
          style={{ y: imageY, top: "-18%", height: "136%", zIndex: 0 }}
        >
          <img
            src={imageUrl}
            alt={title || "About Image"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* === Faint background label for depth === */}
      <div
        aria-hidden="true"
        className="absolute bottom-4 ltr:right-2 rtl:left-2 select-none pointer-events-none z-20"
      >
        <span
          className="font-black leading-none tracking-tighter uppercase"
          style={{ fontSize: "clamp(80px, 12vw, 160px)", color: "rgba(255,255,255,0.2)" }}
        >
          {t("about", "ABOUT")}
        </span>
      </div>

      {/* === Content === */}
      <div className="relative z-20 h-full w-full flex items-center">
        <div className="flex items-center flex-1 px-6 sm:px-12 lg:px-16 xl:px-24 py-12">
          <div className="w-full max-w-135">

            {/* Section label */}
            {badgeText && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-6"
              >
                <span className="text-xs sm:text-sm font-black tracking-[2px] inline-block px-4 py-1.5 rounded-full bg-brand-yellow text-black shadow-lg">
                  {badgeText}
                </span>
              </motion.div>
            )}

            {/* Animated yellow rule */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="w-10 h-0.75 bg-brand-yellow origin-left mb-7 rounded-full"
            />

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight mb-5"
            >
              {title}
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="space-y-2.5 mb-6"
            >
              <p className="text-base text-white leading-relaxed">{description1}</p>
              <p className="text-base text-white leading-relaxed">{description2}</p>
            </motion.div>

            {/* Feature cards — 2×2 */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-7">
              {cards.map((card, i) => (
                <StaggerItem
                  key={i}
                  className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white/10 border border-white/15 hover:border-brand-yellow hover:bg-white/15 hover:shadow-[0_4px_20px_rgba(247,227,38,0.15)] transition-all duration-300 cursor-default"
                >
                  <div className={`shrink-0 transition-transform duration-300 group-hover:scale-110 ${card.iconColor}`}>
                    {card.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-ms leading-tight">{card.title}</h3>
                    <p className="text-sm text-white/70 mt-0.5 leading-relaxed">{card.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {buttonText && (
                <LocalizedLink href="/become-a-partner" className="mask-btn mask-btn--gray-black">
                  <span className="mask-btn__label">
                    {buttonText}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" xmlns="http://www.w3.org/2000/svg" className="mx-1.5 rtl:rotate-180">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="white" />
                    </svg>
                  </span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {buttonText}
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="white" xmlns="http://www.w3.org/2000/svg" className="mx-1.5 rtl:rotate-180">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="white" />
                    </svg>
                  </span>
                </LocalizedLink>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
