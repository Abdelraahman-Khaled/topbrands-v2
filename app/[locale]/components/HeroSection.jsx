"use client";

import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { headlineRevealVariants } from '../lib/animations';

const HeroSection = ({ subtitle, title, description1, yellowText, description2, img, yellowTitle, data }) => {
    const { t, i18n } = useTranslation();
    const isAr = i18n.language === 'ar';

    // Map from data if provided, otherwise use individual props
    const finalSubtitle = data ? data["Text Element 1"]?.value : subtitle;
    const finalTitle = data ? data["Text Element 2"]?.value : title;
    const finalDescription1 = data ? data["Text Element 3"]?.value : description1;
    const finalDescription2 = data ? data["Text Element 4"]?.value : description2;
    const finalImg = data ? data.image_url : img;

    // Helper to find setting by key and language
    const getSettingValue = (key) => {
        if (!data?.settings) return null;
        const matches = Object.values(data.settings).filter(s => s.key === key);
        if (matches.length >= 2) return matches[isAr ? 1 : 0]?.value;
        if (matches.length === 1) return matches[0]?.value;
        return null;
    }

    const finalYellowTitle = getSettingValue("title") || yellowTitle;
    const finalYellowText = getSettingValue("sub title") || (data ? null : yellowText);

    return (
        <section className="relative min-h-[65vh] flex items-end overflow-hidden" style={{ background: "#0f0f0f" }}>
            {finalImg && (
                <div className="absolute inset-0 z-0">
                    <motion.img
                        key={finalImg}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        src={finalImg}
                        alt={finalTitle || "Hero Image"}
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            )}

            <div className="relative z-20 w-full px-10 sm:px-14 lg:px-20 xl:px-28 pt-44 pb-24 max-w-7xl mx-auto">
                {finalSubtitle && (
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs text-brand-yellow font-bold tracking-[4px] uppercase font-mono">
                            {finalSubtitle}
                        </span>
                        <div className="w-8 h-0.75 bg-brand-yellow rounded-full" />
                    </div>
                )}

                <h1
                    className="font-black text-white leading-none tracking-tight"
                    style={{ fontSize: "clamp(2.8rem, 8vw, 5rem)" }}
                >
                    <motion.div
                        variants={headlineRevealVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {finalTitle}
                        {finalYellowTitle && (
                            <span className="text-brand-yellow"> {finalYellowTitle}</span>
                        )}
                    </motion.div>
                </h1>

                {(finalDescription1 || finalDescription2 || finalYellowText) && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-10 text-base lg:text-lg leading-relaxed max-w-2xl"
                    >
                        {finalDescription1 && <span className="text-white/90">{finalDescription1} </span>}
                        {finalYellowText && <span className="font-bold text-brand-yellow">{finalYellowText} </span>}
                        {finalDescription2 && <span style={{ color: "rgba(255,255,255,0.6)" }}>{finalDescription2}</span>}
                    </motion.p>
                )}

                {/* Bottom rule */}
                <div
                    className="mt-16 w-full h-px origin-left"
                />
            </div>
        </section>
    )
}

export default HeroSection;
