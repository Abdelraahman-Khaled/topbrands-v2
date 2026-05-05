"use client"
import React from 'react';
import { MapPin, Users, Zap, Tag } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';

const FeatureCard = ({ icon: Icon, title, description, isYellow }) => {
    return (
        <StaggerItem className={`group cursor-pointer rounded-2xl p-8 flex flex-col items-center text-center shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] h-full bg-white border-s-2 border-gray-200 transition-all duration-500 ease-in-out ${isYellow ? 'hover:bg-brand-yellow hover:border-brand-yellow' : 'hover:bg-brand-jet'}`}>
            {/* Icon Container */}
            <div className={`w-20 h-20 flex items-center justify-center rounded-2xl mb-6 transition-colors duration-500 ${isYellow ? 'bg-[#F7E326] text-black group-hover:bg-black group-hover:text-brand-yellow' : 'bg-brand-charcoal text-white group-hover:bg-brand-yellow group-hover:text-brand-jet'}`}>
                <Icon size={28} strokeWidth={2} />
            </div>

            {/* Text Content */}
            <h4 className={`text-2xl font-bold mb-3 tracking-tight text-black transition-colors duration-500 ${isYellow ? "group-hover:text-black" : "group-hover:text-white"} `}>
                {title}
            </h4>

            <p className={`text-base leading-relaxed max-w-[200px] text-brand-charcoal transition-colors duration-500 ${isYellow ? "group-hover:text-black" : "group-hover:text-white"} `}>
                {description}
            </p>
        </StaggerItem>
    );
};

const ExcellenceSection = ({ data }) => {
    if (!data) return null;

    const title = data["Element 1"]?.value;
    const subtitle = data["Element 2"]?.value;

    const features = [
        {
            title: data["Element 3"]?.value,
            description: data["Element 4"]?.value,
            icon: MapPin,
            isYellow: false
        },
        {
            title: data["Element 5"]?.value,
            description: data["Element 6"]?.value,
            icon: Users,
            isYellow: true
        },
        {
            title: data["Element 7"]?.value,
            description: data["Element 8"]?.value,
            icon: Zap,
            isYellow: false
        },
        {
            title: data["Element 9"]?.value,
            description: data["Element 10"]?.value,
            icon: Tag,
            isYellow: true
        },
    ];

    return (
        <section className="w-full bg-[#DEE3EB] py-24 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-black tracking-tight">
                            {title}
                        </h2>
                        <p className="text-brand-charcoal text-xl font-normal">
                            {subtitle}
                        </p>
                    </div>
                </ScrollReveal>

                {/* Grid */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <FeatureCard
                            key={idx}
                            {...feature}
                        />
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
};

export default ExcellenceSection;