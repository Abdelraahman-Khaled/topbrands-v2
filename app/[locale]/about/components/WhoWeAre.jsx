"use client"
import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import Counter from '../../components/Counter';

const WhoWeAre = ({ data }) => {
    if (!data) return null;

    const desc1 = data["Text Element 1"]?.value;
    const desc2 = data["Text Element 2"]?.value;
    const heritageLabel = data["Text Element 3"]?.value;
    const heritageValue = data["Text Element 4"]?.value;
    const coverageLabel = data["Text Element 5"]?.value;
    const coverageValue = data["Text Element 6"]?.value;
    const imageUrl = data.image_url;

    return (
        <section className="py-12 md:py-20 bg-white">
            <ScrollReveal className="max-w-7xl mx-auto px-8 ">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="group relative h-[350px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl cursor-pointer">
                        <img
                            src={imageUrl || "/images/about/about section in about page.webp"}
                            alt={desc1 || "About Us"}
                            className="w-full h-full object-cover object-right transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                    </div>

                    <div className="space-y-8">
                        {desc1 && (
                            <p className="text-lg md:text-xl text-brand-charcoal leading-relaxed font-medium">
                                {desc1}
                            </p>
                        )}
                        {desc2 && (
                            <p className="text-lg md:text-xl text-brand-charcoal leading-relaxed font-medium">
                                {desc2}
                            </p>
                        )}

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 pt-8">
                            <div className="group bg-brand-yellow rounded-2xl p-6 transition-all duration-500 hover:bg-brand-jet cursor-pointer hover:shadow-xl hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center bg-brand-jet rounded-xl mb-4 transition-all duration-500 group-hover:bg-brand-yellow">
                                    <i className="ri-building-line text-2xl text-brand-yellow transition-colors duration-500 group-hover:text-brand-jet"></i>
                                </div>
                                <p className="text-sm text-brand-charcoal font-bold mb-1 transition-colors duration-500 group-hover:text-gray-300">
                                    {heritageLabel}
                                </p>
                                <p className="text-2xl font-bold text-brand-jet transition-colors duration-500 group-hover:text-white">
                                    <Counter value={heritageValue} />
                                </p>
                            </div>

                            <div className="group bg-brand-paleblue rounded-2xl p-6 transition-all duration-500 hover:bg-brand-yellow cursor-pointer hover:shadow-xl hover:-translate-y-1">
                                <div className="w-12 h-12 flex items-center justify-center bg-brand-charcoal rounded-xl mb-4 transition-all duration-500 group-hover:bg-brand-jet">
                                    <i className="ri-map-pin-line text-2xl text-brand-yellow transition-colors duration-500 group-hover:text-brand-yellow"></i>
                                </div>
                                <p className="text-sm text-brand-charcoal font-bold mb-1 transition-colors duration-500 group-hover:text-brand-charcoal">
                                    {coverageLabel}
                                </p>
                                <p className="text-2xl font-bold text-brand-jet transition-colors duration-500 group-hover:text-brand-jet">
                                    {coverageValue}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}

export default WhoWeAre;
