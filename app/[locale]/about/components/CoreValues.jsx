"use client"
import React from 'react';
import ScrollReveal from '../../components/ScrollReveal';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';

const CoreValues = ({ data }) => {
    if (!data) return null;

    const headerTitle = data["Element 1"]?.value;
    const headerSubtitle = data["Element 2"]?.value;

    const values = [
        {
            icon: "ri-eye-line",
            title: data["Element 3"]?.value,
            description: data["Element 4"]?.value,
        },
        {
            icon: "ri-customer-service-2-line",
            title: data["Element 5"]?.value,
            description: data["Element 6"]?.value,
        },
        {
            icon: "ri-shield-check-line",
            title: data["Element 7"]?.value,
            description: data["Element 8"]?.value,
        },
        {
            icon: "ri-team-line",
            title: data["Element 9"]?.value,
            description: data["Element 10"]?.value,
        },
        {
            icon: "ri-line-chart-line",
            title: data["Element 11"]?.value,
            description: data["Element 12"]?.value,
        },
        {
            icon: "ri-lightbulb-line",
            title: data["Element 13"]?.value,
            description: data["Element 14"]?.value,
        },
    ].filter(v => v.title); // Only show if title exists

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-8 ">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-4">
                            {headerTitle}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                            {headerSubtitle}
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <StaggerItem
                            key={index}
                            className="group border-s-3 border-gray-200 hover:border-brand-yellow card-hover bg-brand-paleblue hover:bg-white hover:shadow-lg rounded-2xl p-6 md:p-8 transition-all duration-500 ease-in-out"
                        >
                            <div className="icon-hover w-14 h-14 flex items-center justify-center bg-brand-yellow rounded-xl mb-6">
                                <i className={`${value.icon} text-2xl text-black`}></i>
                            </div>
                            <h3 className="text-2xl font-bold text-brand-jet mb-4">
                                {value.title}
                            </h3>
                            <p className="text-base text-brand-charcoal leading-relaxed font-medium">
                                {value.description}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

export default CoreValues;
