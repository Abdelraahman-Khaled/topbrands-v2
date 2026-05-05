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
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden min-h-[60vh] flex items-center">
            <div className="absolute inset-0">
                <motion.img
                    key={finalImg}
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={finalImg}
                    alt={finalTitle || "Hero Image"}
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent rtl:bg-gradient-to-l rtl:from-black/80 rtl:via-black/40 rtl:to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 w-full">
                {finalSubtitle && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center space-x-4 mb-6 lg:mb-8"
                    >
                        <span className="text-xs md:text-sm font-semibold text-brand-yellow tracking-widest uppercase">
                            / {finalSubtitle}
                        </span>
                        <div className="h-px w-10 md:w-16 bg-brand-yellow"></div>
                    </motion.div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold w-full text-white mb-6 lg:mb-8 leading-[1.1] overflow-hidden py-2">
                    <motion.div
                        variants={headlineRevealVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {finalTitle}
                        {finalYellowTitle && (
                            <span className="text-brand-yellow"> {finalYellowTitle} </span>
                        )}
                    </motion.div>
                </h1>

                {(finalDescription1 || finalDescription2 || finalYellowText) && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl font-light"
                    >
                        {finalDescription1}
                        {finalYellowText && (
                            <span className="text-brand-yellow font-bold"> {finalYellowText} </span>
                        )}
                        {finalDescription2}
                    </motion.p>
                )}
            </div>
        </section>
    )
}

export default HeroSection;
