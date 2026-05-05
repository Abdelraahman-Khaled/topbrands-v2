"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQAccordion = ({ faqs, locale }) => {
    const isAr = locale === 'ar';
    const [openId, setOpenId] = useState(null);

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    if (!faqs || faqs.length === 0) return null;

    return (
        <div className="space-y-4">
            <AnimatePresence mode="popLayout">
                {faqs.map((faq) => {
                    // Handle both flattened and multi-language formats
                    const question = faq.question || (isAr ? faq.question_ar : faq.question_en);
                    const answer = faq.answer || (isAr ? faq.answer_ar : faq.answer_en);
                    const isOpen = openId === faq.id;

                    return (
                        <motion.div
                            key={faq.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`bg-white border-2 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#F7E326] shadow-xl' : 'border-gray-100 hover:border-gray-200 shadow-sm'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className="w-full px-6 py-6 flex items-center justify-between text-left rtl:text-right gap-4 cursor-pointer"
                            >
                                <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-black' : 'text-gray-800'}`}>
                                    {question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${isOpen ? 'bg-black text-white' : 'bg-gray-50 text-brand-yellow'}`}
                                >
                                    <i className={`ri-${isOpen ? 'subtract' : 'add'}-line text-xl`}></i>
                                </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-8 text-gray-600 text-lg leading-relaxed border-t border-gray-50 pt-6">
                                            {answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default FAQAccordion;
