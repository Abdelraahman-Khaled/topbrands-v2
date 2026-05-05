"use client"
import React, { useState, useMemo } from 'react';
import LocalizedLink from "../../components/LocalizedLink";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import ScrollReveal from "../../components/ScrollReveal";

const ALL_CATEGORIES = [
    "all",
    "Market_Insights",
    "Consumer_Behavior",
    "Retail_Trends",
    "Distribution",
    "Product_Categories",
    "Logistics",
    "Partnerships",
    "Digital_Trends",
    "Quality_Safety"
];

import { motion, AnimatePresence } from "framer-motion";

const BlogFilterGrid = ({ blogs, locale, translations = {} }) => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const isAr = locale === 'ar';

    const filteredPosts = useMemo(() => {
        return selectedCategory === "all"
            ? blogs
            : blogs.filter(post => post.category === selectedCategory);
    }, [selectedCategory, blogs]);

    const featuredPost = blogs[0];
    const restPosts = useMemo(() => {
        if (selectedCategory === "all") {
            return blogs.slice(1);
        }
        return filteredPosts;
    }, [selectedCategory, blogs, filteredPosts]);

    return (
        <>
            {/* Category Filter */}
            <ScrollReveal>
                <section className="py-8 bg-white border-b border-[#DEE3EB]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-wrap gap-3 justify-center">
                            {ALL_CATEGORIES.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition-all whitespace-nowrap cursor-pointer capitalize ${selectedCategory === category
                                        ? "bg-gradient-to-r from-[#F7E326] to-[#E5D324] text-[#000000] shadow-lg transform scale-105"
                                        : "bg-white text-[#4B4F54] hover:bg-[#F7E326]/20 border-2 border-[#DEE3EB] hover:border-[#F7E326]"
                                        }`}
                                >
                                    {translations[category] || category.replace(/_/g, ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Featured Post (Only show on 'all') */}
            <AnimatePresence mode="wait">
                {selectedCategory === "all" && featuredPost && (
                    <motion.section
                        key="featured"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="py-16 bg-white"
                    >
                        <div className="max-w-7xl mx-auto px-6">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-[#000000] flex items-center gap-3">
                                    <i className="ri-fire-fill text-brand-yellow text-4xl"></i>
                                    {isAr ? "المقالات المميزة" : "Featured Article"}
                                </h2>
                            </div>
                            <LocalizedLink
                                href={`/blog/${featuredPost.id}`}
                                className="group card-hover-dark block bg-gradient-to-br from-[#000000] to-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl cursor-pointer border border-white/5"
                            >
                                <div className="grid md:grid-cols-2 gap-0">
                                    <div className="relative h-64 sm:h-80 md:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.photo}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover  transition-transform duration-500"
                                        />
                                        <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6">
                                            <span className="bg-[#F7E326] text-[#000000] px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                                <i className="ri-star-fill"></i>
                                                {translations[featuredPost.category] || featuredPost.category.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#F7E326] duration-300 transition-colors">
                                            {featuredPost.title}
                                        </h3>
                                        <p className="text-gray-300 mb-6 text-base sm:text-lg font-medium leading-relaxed line-clamp-3">
                                            {featuredPost.description}
                                        </p>
                                        <div className="mask-btn mask-btn--yellow-white !rounded-lg !min-w-[160px] !h-[48px] sm:!h-[56px] shadow-xl w-fit">
                                            <span className="mask-btn__label gap-2 flex items-center">
                                                {isAr ? "اقرأ المقال" : "Read Article"}
                                                <i className={`ri-arrow-${isAr ? 'left' : 'right'}-line`}></i>
                                            </span>
                                            <span className="mask-btn__fill gap-2 flex items-center">
                                                {isAr ? "اقرأ المقال" : "Read Article"}
                                                <i className={`ri-arrow-${isAr ? 'left' : 'right'}-line`}></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </LocalizedLink>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Blog Posts Grid */}
            <section className="py-12 md:py-20 bg-linear-to-br from-white via-[#DEE3EB]/30 to-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#000000]">
                            {selectedCategory === "all" ? (isAr ? "أحدث المقالات" : "Latest Articles") : (translations[selectedCategory] || selectedCategory.replace(/_/g, ' '))}
                        </h2>
                    </div>

                    <div className="relative">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {restPosts.length === 0 && selectedCategory !== "all" ? (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="py-20 text-center"
                                >
                                    <i className="ri-article-line text-6xl text-gray-300 mb-4 block"></i>
                                    <p className="text-xl text-gray-500 font-medium">
                                        {isAr ? "لا توجد مقالات في هذا التصنيف حالياً" : "No articles found in this category yet"}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid"
                                    layout
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {restPosts.map((post) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            key={post.id}
                                        >
                                            <LocalizedLink
                                                href={`/blog/${post.id}`}
                                                className="group card-hover h-full bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-transparent block"
                                            >
                                                <div className="relative h-56 overflow-hidden">
                                                    <img
                                                        src={post.photo}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                                                        <span className="bg-[#F7E326] text-[#000000] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                            {translations[post.category] || post.category.replace(/_/g, ' ')}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-[#000000] mb-3 group-hover:text-black transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-[#4B4F54] mb-4 font-medium leading-relaxed line-clamp-3">
                                                        {post.description}
                                                    </p>
                                                    <div className="flex items-center justify-between pt-4 border-t border-[#DEE3EB]">
                                                        <span className="text-brand-charcoal font-bold flex items-center gap-2 group-hover:gap-3 transition-all whitespace-nowrap">
                                                            {isAr ? "اقرأ المزيد" : "Read More"}
                                                            <i className={`ri-arrow-${isAr ? 'left' : 'right'}-line`}></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </LocalizedLink>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </>
    );
};

export default BlogFilterGrid;
