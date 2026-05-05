"use client"
import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';

const GrowthDirection = ({ data }) => {
    if (!data) return null;

    const title = data["Element 1"]?.value;
    const desc1 = data["Element 2"]?.value;
    const desc2 = data["Element 3"]?.value;

    return (
        <section className="py-12 md:py-24 bg-brand-paleblue relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 md:w-96 h-72 md:h-96 bg-brand-yellow rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-72 md:w-96 h-72 md:h-96 bg-brand-charcoal rounded-full blur-3xl opacity-10"></div>

            <div className="relative max-w-7xl mx-auto px-8 ">
                <ScrollReveal className="max-w-4xl mx-auto text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-brand-yellow rounded-2xl mb-8 mx-auto">
                        <i className="ri-rocket-line text-3xl md:text-4xl text-brand-jet"></i>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-8">
                        {title}
                    </h2>
                    <p className="text-xl md:text-2xl text-brand-charcoal leading-relaxed mb-6 font-medium">
                        {desc1}
                    </p>
                    <p className="text-lg md:text-xl text-brand-charcoal leading-relaxed font-medium">
                        {desc2}
                    </p>
                </ScrollReveal>
            </div>
        </section>
    )
}

export default GrowthDirection