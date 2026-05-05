"use client";
import React from 'react';
import { Truck, Store, Award, FastForward, Map, ShoppingCart, Ship, TrendingUp } from 'lucide-react';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';
import ScrollReveal from '../../components/ScrollReveal';

const ServiceCard = ({ icon: Icon, data, isYellow }) => {
    if (!data) return null;

    const title = data["Element 1"]?.value;
    const description = data["Element 2"]?.value;

    // Extract bullets from Element 3 till Element 6
    const bullets = Object.keys(data)
        .filter(key => {
            const index = parseInt(key.split(" ")[1]);
            return key.startsWith("Element") && index >= 3 && index <= 6;
        })
        .map(key => data[key]?.value)
        .filter(Boolean);

    return (
        <ScrollReveal>
            <StaggerItem className="group card-hover flex flex-col gap-5 p-8 md:p-12 rounded-3xl border-s-2  border-gray-200 hover:border-brand-yellow bg-white h-full hover:shadow-lg transition-all duration-500 ease-in-out">
                {/* Icon with dynamic background */}
                <div className={`icon-hover w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm ${isYellow ? 'bg-[#F7E326] text-black' : 'bg-[#4B4B4B] text-white'}`}>
                    <Icon size={30} strokeWidth={2.5} />
                </div>

                <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-black leading-snug tracking-tight">
                        {title}
                    </h3>

                    <p className="text-brand-charcoal text-base leading-relaxed font-normal">
                        {description}
                    </p>
                </div>

                {/* Bullet Points */}
                {bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                        {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-brand-charcoal font-normal tracking-wide">
                                <span className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${isYellow ? 'bg-[#F7E326]' : 'bg-[#4B4B4B]'}`} />
                                {bullet}
                            </li>
                        ))}
                    </ul>
                )}
            </StaggerItem>
        </ScrollReveal>
    );
};

const ServicesGrid = ({ data }) => {
    if (!data) return null;

    const services = [
        { key: 'fmcgDist', icon: Truck, isYellow: false },
        { key: 'retailTrade', icon: Store, isYellow: true },
        { key: 'brandRep', icon: Award, isYellow: false },
        { key: 'salesExec', icon: FastForward, isYellow: true },
        { key: 'marketCov', icon: Map, isYellow: false },
        { key: 'merchVis', icon: ShoppingCart, isYellow: true },
        { key: 'importTrade', icon: Ship, isYellow: false },
        { key: 'marketIntelligence', icon: TrendingUp, isYellow: true },
    ];

    return (
        <section className="relative w-full py-20 lg:py-28 px-6 overflow-hidden" style={{ background: "rgba(247, 227, 38, 0.08)" }}>

            {/* ── Decorative blobs ── */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-[80px] pointer-events-none" />

            {/* ── Dot grid (top-right) ── */}
            <svg className="absolute top-8 right-8 opacity-20 pointer-events-none" width="160" height="160" viewBox="0 0 160 160">
                {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 6 }).map((_, col) => (
                        <circle key={`${row}-${col}`} cx={col * 28 + 8} cy={row * 28 + 8} r="3" fill="#1a1a1a" />
                    ))
                )}
            </svg>


            {/* ── Dot grid (bottom-left) ── */}
            <svg className="absolute bottom-8 left-8 opacity-20 pointer-events-none" width="160" height="160" viewBox="0 0 160 160">
                {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 6 }).map((_, col) => (
                        <circle key={`${row}-${col}`} cx={col * 28 + 8} cy={row * 28 + 8} r="3" fill="#1a1a1a" />
                    ))
                )}
            </svg>

            {/* ── Yellow accent ring (centre-right) ── */}
            <svg className="absolute top-1/2 -right-16 -translate-y-1/2 opacity-15 pointer-events-none" width="260" height="260" viewBox="0 0 260 260">
                <circle cx="130" cy="130" r="120" fill="none" stroke="#F7E326" strokeWidth="20" strokeDasharray="30 15" />
            </svg>

            {/* ── Grid content ── */}
            <StaggerContainer className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        data={data[service.key]}
                        icon={service.icon}
                        isYellow={service.isYellow}
                    />
                ))}
            </StaggerContainer>
        </section>
    );
};

export default ServicesGrid;