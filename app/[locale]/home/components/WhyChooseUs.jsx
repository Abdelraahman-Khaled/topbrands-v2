"use client";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WhyChooseUs({ data }) {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const id = setTimeout(() => {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".why-card", sectionRef.current);
        const sliding = cards.slice(1);

        gsap.set(sliding, { x: "100vw" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        sliding.forEach((card) => {
          tl.to(card, { x: 0, ease: "none", duration: 1 });
        });
      }, sectionRef);
    }, 250);

    return () => {
      clearTimeout(id);
      ctx?.revert();
    };
  }, []);

  if (!data) return null;

  const headerTitle    = data["Stat Element 1"]?.value;
  const headerSubtitle = data["Stat Element 2"]?.value;

  const cards = [
    {
      title: data["Stat Element 3"]?.value  || "Nationwide Distribution",
      desc:  data["Stat Element 4"]?.value  || "Efficient distribution network covering retail, wholesale, and key accounts across Syria.",
      bg: "#0f0f0f",
      icon: (
        <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
          <path d="M11 24.0626L17.0377 17.7511C18.1459 16.6143 18.8955 15.274 19.2866 13.73C19.6614 12.22 19.6614 10.71 19.2866 9.20001C18.8955 7.65607 18.1499 6.31148 17.0499 5.16625C15.9499 4.02101 14.6585 3.2448 13.1755 2.83761C11.7251 2.44738 10.2748 2.44738 8.82441 2.83761C7.34146 3.2448 6.04998 4.02101 4.94998 5.16625C3.84999 6.31148 3.10443 7.65607 2.71332 9.20001C2.33851 10.71 2.33851 12.22 2.71332 13.73C3.10443 15.274 3.85406 16.6143 4.9622 17.7511L11 24.0626ZM11 27.651L3.22666 19.558C1.80888 18.0989 0.855552 16.3683 0.366665 14.3663C-0.122222 12.4321 -0.122222 10.4979 0.366665 8.56377C0.855552 6.56173 1.80481 4.82692 3.21443 3.35932C4.62406 1.89173 6.29035 0.894954 8.2133 0.368993C10.0711 -0.123031 11.9288 -0.123031 13.7866 0.368993C15.7096 0.894954 17.3759 1.89173 18.7855 3.35932C20.1951 4.82692 21.1444 6.56173 21.6333 8.56377C22.1221 10.4979 22.1221 12.4321 21.6333 14.3663C21.1444 16.3683 20.191 18.0989 18.7733 19.558L11 27.651ZM11 14.01C11.44 14.01 11.8474 13.8955 12.2222 13.6664C12.597 13.4374 12.8944 13.1277 13.1144 12.7375C13.3344 12.3473 13.4444 11.9231 13.4444 11.465C13.4444 11.0069 13.3344 10.5828 13.1144 10.1925C12.8944 9.80232 12.597 9.49268 12.2222 9.26364C11.8474 9.03459 11.44 8.92007 11 8.92007C10.56 8.92007 10.1526 9.03459 9.77774 9.26364C9.40293 9.49268 9.10552 9.80232 8.88552 10.1925C8.66552 10.5828 8.55552 11.0069 8.55552 11.465C8.55552 11.9231 8.66552 12.3473 8.88552 12.7375C9.10552 13.1277 9.40293 13.4374 9.77774 13.6664C10.1526 13.8955 10.56 14.01 11 14.01Z" fill="black" />
        </svg>
      ),
    },
    {
      title: data["Stat Element 5"]?.value  || "Advanced Logistics",
      desc:  data["Stat Element 6"]?.value  || "Reliable warehousing and inventory management with real-time tracking systems.",
      bg: "#161616",
      icon: (
        <svg width="27" height="20" viewBox="0 0 27 20" fill="none">
          <path d="M9.55698 16.25C9.46093 16.95 9.2168 17.5875 8.82459 18.1625C8.43239 18.7375 7.93613 19.1875 7.33582 19.5125C6.73551 19.8375 6.09117 20 5.40281 20C4.71445 20 4.07012 19.8375 3.46981 19.5125C2.86949 19.1875 2.37324 18.7375 1.98103 18.1625C1.58883 17.5875 1.3447 16.95 1.24865 16.25H0V1.25C0 0.9 0.11606 0.604166 0.348181 0.362499C0.580302 0.120832 0.86445 0 1.20063 0H18.0094C18.3456 0 18.6297 0.120832 18.8618 0.362499C19.0939 0.604166 19.21 0.9 19.21 1.25V3.75H22.8119L26.4137 8.825V16.25H23.9645C23.8684 16.95 23.6243 17.5875 23.2321 18.1625C22.8399 18.7375 22.3436 19.1875 21.7433 19.5125C21.143 19.8375 20.4987 20 19.8103 20C19.122 20 18.4776 19.8375 17.8773 19.5125C17.277 19.1875 16.7807 18.7375 16.3885 18.1625C15.9963 17.5875 15.7522 16.95 15.6561 16.25H9.55698ZM16.8088 2.5H2.40125V12.575C2.78545 12.1583 3.23769 11.8333 3.75796 11.6C4.27823 11.3667 4.82651 11.25 5.40281 11.25C6.23525 11.25 6.99164 11.4792 7.67199 11.9375C8.35235 12.3958 8.86061 13 9.19679 13.75H16.0163C16.2084 13.3167 16.4726 12.925 16.8088 12.575V2.5ZM19.21 10H24.0125V9.65L21.6112 6.25H19.21V10ZM19.8103 17.5C20.1945 17.5 20.5427 17.3833 20.8549 17.15C21.167 16.9167 21.3871 16.6167 21.5152 16.25C21.5792 16.05 21.6112 15.8417 21.6112 15.625C21.6112 15.1083 21.4352 14.6667 21.083 14.3C20.7308 13.9333 20.3066 13.75 19.8103 13.75C19.3141 13.75 18.8898 13.9333 18.5377 14.3C18.1855 14.6667 18.0094 15.1083 18.0094 15.625C18.0094 15.8417 18.0414 16.05 18.1054 16.25C18.2335 16.6167 18.4536 16.9167 18.7658 17.15C19.0779 17.3833 19.4261 17.5 19.8103 17.5ZM7.20375 15.625C7.20375 15.1083 7.02766 14.6667 6.67548 14.3C6.32329 13.9333 5.89907 13.75 5.40281 13.75C4.90655 13.75 4.48233 13.9333 4.13015 14.3C3.77797 14.6667 3.60188 15.1083 3.60188 15.625C3.60188 15.8417 3.63389 16.05 3.69793 16.25C3.82599 16.6167 4.04611 16.9167 4.35827 17.15C4.67043 17.3833 5.01861 17.5 5.40281 17.5C5.78701 17.5 6.13519 17.3833 6.44736 17.15C6.75952 16.9167 6.97963 16.6167 7.1077 16.25C7.17173 16.05 7.20375 15.8417 7.20375 15.625Z" fill="black" />
        </svg>
      ),
    },
    {
      title: data["Stat Element 7"]?.value  || "Experienced Sales Force",
      desc:  data["Stat Element 8"]?.value  || "Dedicated sales professionals providing expert market guidance and support.",
      bg: "#0f0f0f",
      icon: (
        <svg width="23" height="23" viewBox="0 0 39 40" fill="none">
          <path d="M19.2 18C20.9408 18 22.5472 18.4467 24.0192 19.34C25.4912 20.2333 26.656 21.4467 27.5136 22.98C28.3712 24.5133 28.8 26.1867 28.8 28V40H24.96V28C24.96 26.96 24.7168 25.9933 24.2304 25.1C23.744 24.2067 23.0912 23.4867 22.272 22.94C21.4528 22.3933 20.544 22.08 19.5456 22H19.2C18.2016 22 17.2736 22.2533 16.416 22.76C15.5584 23.2667 14.8672 23.9467 14.3424 24.8C13.8176 25.6533 13.5168 26.6 13.44 27.64V40H9.6V28C9.6 26.1867 10.0288 24.5133 10.8864 22.98C11.744 21.4467 12.9088 20.2333 14.3808 19.34C15.8528 18.4467 17.4592 18 19.2 18ZM6.72 24C7.2576 24 7.7824 24.0667 8.2944 24.2C7.9616 25.2133 7.7568 26.2533 7.68 27.32V28.16C7.4496 28.08 7.2192 28.0267 6.9888 28H6.72C5.9776 28 5.3312 28.26 4.7808 28.78C4.2304 29.3 3.9168 29.9467 3.84 30.72V31V40H0V31C0 29.72 0.3008 28.5467 0.9024 27.48C1.504 26.4133 2.3168 25.5667 3.3408 24.94C4.3648 24.3133 5.4912 24 6.72 24ZM31.68 24C32.9088 24 34.0352 24.3133 35.0592 24.94C36.0832 25.5667 36.896 26.4133 37.4976 27.48C38.0992 28.5467 38.4 29.72 38.4 31V40H34.56V31C34.56 30.2267 34.3104 29.5533 33.8112 28.98C33.312 28.4067 32.6912 28.08 31.9488 28H31.68C31.3472 28 31.0272 28.0533 30.72 28.16V28C30.72 26.6933 30.528 25.4267 30.144 24.2C30.6304 24.0667 31.1424 24 31.68 24ZM19.2 0C20.5824 0 21.8624 0.360001 23.04 1.08C24.2176 1.8 25.152 2.77333 25.8432 4C26.5344 5.22667 26.88 6.56 26.88 8C26.88 9.44 26.5344 10.7733 25.8432 12C25.152 13.2267 24.2176 14.2 23.04 14.92C21.8624 15.64 20.5824 16 19.2 16C17.8176 16 16.5376 15.64 15.36 14.92C14.1824 14.2 13.248 13.2267 12.5568 12C11.8656 10.7733 11.52 9.44 11.52 8C11.52 6.56 11.8656 5.22667 12.5568 4C13.248 2.77333 14.1824 1.8 15.36 1.08C16.5376 0.360001 17.8176 0 19.2 0ZM19.2 4C18.5088 4 17.8688 4.18 17.28 4.54C16.6912 4.9 16.224 5.38667 15.8784 6C15.5328 6.61333 15.36 7.28 15.36 8C15.36 8.72 15.5328 9.38667 15.8784 10C16.224 10.6133 16.6912 11.1 17.28 11.46C17.8688 11.82 18.5088 12 19.2 12C19.8912 12 20.5312 11.82 21.12 11.46C21.7088 11.1 22.176 10.6133 22.5216 10C22.8672 9.38667 23.04 8.72 23.04 8C23.04 7.28 22.8672 6.61333 22.5216 6C22.176 5.38667 21.7088 4.9 21.12 4.54C20.5312 4.18 19.8912 4 19.2 4Z" fill="black" />
        </svg>
      ),
    },
    {
      title: data["Stat Element 9"]?.value  || "Flexibility & Competitiveness",
      desc:  data["Stat Element 10"]?.value || "Providing tailored solutions and competitive pricing to meet your business needs.",
      bg: "#161616",
      icon: (
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
          <path d="M2.45461 0V20.4444H22.0915V23H0V0H2.45461ZM21.2324 4.21667L22.9752 6.00556L15.955 13.3144L12.2731 9.48111L7.02019 14.95L5.27741 13.1611L12.2731 5.85222L15.955 9.68555L21.2324 4.21667Z" fill="black" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={sectionRef} id="why-choose-us" style={{ height: "500vh" }}>
      <section style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>

        {/* Section header — visible above the cards row */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-end px-10 sm:px-14 lg:px-20 xl:px-28 pb-6 pt-10"
          style={{ background: "#0f0f0f" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold tracking-[4px] uppercase font-mono mr-6"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {t("why_choose_us") || "WHY CHOOSE US"}
          </motion.span>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-6 h-0.75 bg-brand-yellow origin-left rounded-full mr-6"
          />

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: "#ffffff", fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}
            className="font-black leading-tight tracking-tight"
          >
            {headerTitle}
          </motion.h2>
        </div>

        {/* Cards row — each 25% wide, slides in from right */}
        <div
          className="absolute inset-0 flex"
          style={{ paddingTop: "clamp(80px, 10vh, 110px)" }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className={`why-card${i > 0 ? " why-card-offscreen" : ""}`}
              style={{
                width: "25%",
                height: "100%",
                background: card.bg,
                flexShrink: 0,
              }}
            >
              <div className="h-full flex flex-col justify-center px-8 xl:px-10 relative overflow-hidden">

                {/* Faint step number */}
                <span
                  aria-hidden="true"
                  style={{ fontSize: "clamp(80px, 10vw, 130px)", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}
                  className="absolute right-2 bottom-4 font-black select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Left yellow accent */}
                <div className="absolute left-0 top-8 bottom-8 w-0.75 bg-brand-yellow/30 rounded-full" />

                {/* Icon */}
                <div className="w-11 h-11 flex items-center justify-center bg-brand-yellow rounded-xl mb-6 shrink-0 relative z-10">
                  {card.icon}
                </div>

                {/* Step label */}
                <span
                  className="text-xs font-bold tracking-[3px] uppercase font-mono mb-4 relative z-10"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3
                  className="font-bold text-white leading-snug mb-3 relative z-10"
                  style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)" }}
                >
                  {card.title}
                </h3>

                <p
                  className="text-sm leading-relaxed relative z-10"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.75rem, 0.9vw, 0.875rem)" }}
                >
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
