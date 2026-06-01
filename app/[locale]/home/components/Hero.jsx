"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { headlineRevealVariants, tapButtonVariants } from "../../lib/animations";
import LocalizedLink from "../../components/LocalizedLink";
import SyriaMap from "./SyriaMap";

export default function Hero({ data }) {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  if (!data) return null;

  // Map API fields
  const badgeText = data["Badge Text"]?.value;
  const title1 = data["Title Line 1"]?.value;
  const title2 = data["Title Line 2"]?.value;
  const subtitle = data["Subtitle"]?.value;
  const button1Text = data["Button 1 Text"]?.value;
  const button2Text = data["Button 2 Text"]?.value;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Base gray background with subtle depth */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(130% 130% at 25% 15%, #565a60 0%, #45484d 55%, #303338 100%)",
        }}
      ></div>

      {/* Diagonal light streaks */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none hidden md:block">
        {[
          { pos: "18%", w: "260px", o: 0.05 },
          { pos: "34%", w: "150px", o: 0.06 },
          { pos: "48%", w: "320px", o: 0.04 },
          { pos: "64%", w: "120px", o: 0.05 },
        ].map((s, i) => (
          <div
            key={i}
            className={`absolute -top-[20%] ${isRtl ? 'left-0' : 'right-0'} h-[140%]`}
            style={{
              width: s.w,
              [isRtl ? 'left' : 'right']: s.pos,
              background: `linear-gradient(to right, transparent, rgba(255,255,255,${s.o}), transparent)`,
              transform: `rotate(${isRtl ? '-15deg' : '15deg'})`,
            }}
          ></div>
        ))}
        {/* yellow accent line */}
        <div
          className={`absolute -top-[20%] ${isRtl ? 'left-[28%]' : 'right-[28%]'} w-1 h-[140%]`}
          style={{
            background:
              "linear-gradient(180deg, #F7E32600 0%, #F7E32666 55%, #F7E32600 100%)",
            transform: `rotate(${isRtl ? '-15deg' : '15deg'})`,
          }}
        ></div>
      </div>

      {/* Animated Syria map with governorate dots */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute top-[14%] ${isRtl ? 'left-[2%]' : 'right-[2%]'} w-[42%] max-w-[600px] z-0 hidden lg:block`}
      >
        <SyriaMap className="w-full h-auto drop-shadow-[0_0_40px_rgba(247,227,38,0.18)]" />
      </motion.div>

      {/* Big "tb" brand logo */}
      <motion.img
        src="/images/tb-mark.png"
        alt="Top Brands"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`absolute bottom-[8%] ${isRtl ? 'left-[6%]' : 'right-[6%]'} w-[34%] max-w-[440px] z-0 hidden lg:block drop-shadow-[0_0_60px_rgba(247,227,38,0.35)]`}
      />

      {/* Content */}
      <div className="relative flex z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 text-start w-full md:mt-0 mt-4 mb-12">
        <div className="space-y-6 sm:space-y-8 flex flex-col items-start w-full">
          {/* Badge */}
          {badgeText && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-2 sm:mb-4"
            >
              <span className="text-xs font-bold tracking-[4px] uppercase font-mono text-brand-yellow" >
                {badgeText}
              </span>
              <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
            </motion.div>
          )}

          {/* Main Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-black text-white leading-tight"
          >
            <div className="overflow-hidden pt-2 -mt-2">
              <motion.span variants={headlineRevealVariants} className="block">
                {title1}
              </motion.span>
            </div>
            <div className="overflow-hidden pt-2 -mt-2">
              <motion.span
                variants={headlineRevealVariants}
                transition={{ delay: 0.2 }}
                className="text-brand-yellow text-[24px] sm:text-[36px] md:text-[48px] font-semibold block"
              >
                {title2}
              </motion.span>
            </div>
          </motion.h1>

          {/* Subheading */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-[18px] md:text-[20px] text-[#f0f0f0] max-w-4xl leading-relaxed font-normal mt-6 sm:mt-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-start items-start sm:items-center pt-6 sm:pt-8 w-full sm:w-auto"
          >
            {button1Text && (
              <motion.div whileTap={tapButtonVariants} className="w-full sm:w-auto">
                <LocalizedLink
                  href="/become-a-partner"
                  className="mask-btn mask-btn--yellow-black w-full sm:w-auto"
                >
                  <span className="mask-btn__label">{button1Text}</span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {button1Text}
                  </span>
                </LocalizedLink>
              </motion.div>
            )}

            {button2Text && (
              <motion.div whileTap={tapButtonVariants} className="w-full sm:w-auto">
                <LocalizedLink
                  href="/contact"
                  className="mask-btn mask-btn--none-white w-full sm:w-auto border-2 border-brand-yellow!"
                >
                  <span className="mask-btn__label">{button2Text}</span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {button2Text}
                  </span>
                </LocalizedLink>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center animate-bounce gap-2 pb-2 ">
        <span className="text-white text-base font-medium tracking-wide">
          {t("scroll_down")}
        </span>
        <a href="#about" className="cursor-pointer p-2 hover:opacity-80 transition-opacity">
          <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.4288 12.18L13.5744 6.8L14.9376 8.22L7.4688 16L0 8.22L1.3632 6.8L6.5088 12.18V0H8.4288V12.18Z" fill="white" />
          </svg>
        </a>
      </div>
    </section>
  );
}
