"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { headlineRevealVariants, tapButtonVariants } from "../../lib/animations";
import LocalizedLink from "../../components/LocalizedLink";

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
  const imageUrl = data.image_url;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-jet">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 flex h-full w-full ">
        <div className={`relative w-full lg:w-[60%] h-full ${isRtl ? 'mr-auto' : ''}`}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title1 || "Hero Image"}
              className="w-full h-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-transparent via-black/30 to-black/40"></div>
        </div>
      </div>

      {/* Decorative Gradient overlays */}
      <div
        className="absolute top-0 right-0 w-[40%] h-full z-0"
        style={{
          background: "linear-gradient(120deg, #4B4F54 0%, #000000 70%, #F7E326 100%)",
        }}
      ></div>
      <div
        className="absolute top-0 right-[25%] z-0 w-[4px] h-full"
        style={{
          background: "linear-gradient(135deg, #F7E32600 0%, #F7E32699 60%, #F7E32600 100%)",
          transform: "translateX(-50%) rotate(15deg)",
        }}
      ></div>

      {/* Content */}
      <div className="relative flex z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 sm:py-32 text-start w-full md:mt-0 mt-4 mb-12">
        <div className="space-y-6 sm:space-y-8 flex flex-col items-start w-full">
          {/* Badge */}
          {badgeText && (
            <div className="inline-flex animate-fade-in mb-2 sm:mb-4">
              <span className="px-[14px] sm:px-[18px] py-[6px] sm:py-[8px] text-white rounded-full text-[12px] sm:text-sm font-bold uppercase tracking-wider border border-2 border-[#F7E326]">
                {badgeText}
              </span>
            </div>
          )}

          {/* Main Heading */}
          <motion.h1
            initial="hidden"
            animate="visible"
            className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[72px] font-bold text-white leading-tight"
          >
            <div className="overflow-hidden">
              <motion.span variants={headlineRevealVariants} className="block">
                {title1}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                variants={headlineRevealVariants}
                transition={{ delay: 0.2 }}
                className="text-[#E5E7EB] text-[24px] sm:text-[36px] md:text-[48px] font-semibold block"
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
              className="text-base sm:text-[18px] md:text-[20px] text-[#F3F4F6] max-w-4xl leading-relaxed font-normal mt-6 sm:mt-8"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-start items-start sm:items-center pt-6 sm:pt-8"
          >
            {button1Text && (
              <motion.div whileTap={tapButtonVariants} className="w-full">
                <LocalizedLink
                  href="/become-a-partner"
                  className="mask-btn mask-btn--yellow-black w-full"
                >
                  <span className="mask-btn__label">{button1Text}</span>
                  <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                    {button1Text}
                  </span>
                </LocalizedLink>
              </motion.div>
            )}

            {button2Text && (
              <motion.div whileTap={tapButtonVariants} className="w-full">
                <LocalizedLink
                  href="/contact"
                  className="mask-btn mask-btn--none-white w-full border-2 border-brand-yellow!"
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
