"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = ({ faqs, locale }) => {
    const isAr = locale === 'ar';
    const [activeIndex, setActiveIndex] = useState(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-20 bg-brand-paleblue/30 mt-20 rounded-[40px] border border-[#DEE3EB]/50">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-12">
                    <span className="text-brand-yellow font-bold uppercase tracking-wider text-sm">/ FAQ</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-4 text-[#000000]">
                        {isAr ? "الأسئلة الشائعة" : "Common Questions"}
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const question = faq.question || (isAr ? faq.question_ar : faq.question_en);
                        const answer = faq.answer || (isAr ? faq.answer_ar : faq.answer_en);
                        
                        return (
                            <div key={faq.id} className="bg-white rounded-2xl overflow-hidden border border-[#DEE3EB] shadow-sm transition-all hover:border-brand-yellow">
                                <button
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    className="w-full px-6 py-6 text-left rtl:text-right flex items-center justify-between gap-4 cursor-pointer group"
                                >
                                    <span className={`text-lg md:text-xl font-bold transition-colors ${activeIndex === index ? 'text-brand-yellow' : 'text-brand-charcoal group-hover:text-black'}`}>
                                        {question}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeIndex === index ? 'bg-brand-yellow text-black rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                                        <i className="ri-arrow-down-s-line text-xl"></i>
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {activeIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-[#4B4F54] text-lg leading-relaxed border-t border-[#DEE3EB]/50 pt-6">
                                                {answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
