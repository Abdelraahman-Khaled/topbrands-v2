import React from 'react';
import { UserCheck, MapPinned, Handshake } from 'lucide-react';
import HeroSection from '../../components/HeroSection';
import ScrollReveal from '../../components/ScrollReveal';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';
import GlobalCTA from '../../components/GlobalCTA';
import { getPageData } from "@/services/home.service";

const MerchCard = ({ title, description, id }) => {
    const icons = [
        '/images/icons/window.png',
        '/images/icons/store.png',
        '/images/icons/ticket.png',
        '/images/icons/tracking.png'
    ];
    return (
        <StaggerItem className="h-full">
            <div className="group card-hover bg-[#DEE3EB] p-8 md:p-10 rounded-[32px] flex flex-col gap-5 h-full shadow-sm border-s-3 border-gray-200 hover:border-brand-yellow transition-all duration-500 ease-in-out">
                <div className="icon-hover bg-brand-yellow w-14 h-14 flex items-center justify-center rounded-2xl">
                    <img src={icons[id % 4]} alt="icon" className="w-8 h-8 object-contain" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">{title}</h3>
                <p className="text-brand-charcoal text-sm md:text-base font-medium leading-relaxed">{description}</p>
            </div>
        </StaggerItem>
    );
};

export default async function SalesMerchandisingPage({ params }) {
    const { locale } = await params;
    const pageDataRaw = await getPageData("merchandising_services", locale);

    const sections = pageDataRaw || [];
    const findSection = (type) => sections.find(s => s[type])?.[type];

    const hero = findSection("hero");
    const bar = findSection("bar");
    const list = findSection("list");
    const expertTeam = findSection("expert-team");
    const results = findSection("results");
    const cta = findSection("cta");

    // Helper to get Elements 1-8 from bar
    const barPills = bar ? Object.keys(bar)
        .filter(k => k.startsWith("Element"))
        .sort((a, b) => parseInt(a.replace("Element ", "")) - parseInt(b.replace("Element ", "")))
        .map(k => bar[k]?.value) : [];

    // Helper for List pairs (3/4, 5/6, 7/8, 9/10)
    const merchItems = list ? [
        { title: list["Element 3"]?.value, desc: list["Element 4"]?.value },
        { title: list["Element 5"]?.value, desc: list["Element 6"]?.value },
        { title: list["Element 7"]?.value, desc: list["Element 8"]?.value },
        { title: list["Element 9"]?.value, desc: list["Element 10"]?.value },
    ].filter(i => i.title) : [];


    // Expert Team Features
    const expertFeatures = expertTeam ? [
        { t: expertTeam["Text Element 3"]?.value, d: expertTeam["Text Element 4"]?.value, icon: UserCheck },
        { t: expertTeam["Text Element 5"]?.value, d: expertTeam["Text Element 6"]?.value, icon: MapPinned },
        { t: expertTeam["Text Element 7"]?.value, d: expertTeam["Text Element 8"]?.value, icon: Handshake },
    ].filter(f => f.t) : [];

    // Results stats
    const stats = results ? [
        { v: results["Text Element 3"]?.value, l: results["Text Element 4"]?.value },
        { v: results["Text Element 5"]?.value, l: results["Text Element 6"]?.value },
        { v: results["Text Element 7"]?.value, l: results["Text Element 8"]?.value },
        { v: results["Text Element 9"]?.value, l: results["Text Element 10"]?.value },
    ].filter(s => s.v) : [];

    return (
        <main className="w-full bg-white">
            {/* 1. Hero Section */}
            <HeroSection
                data={hero}
                img="/images/professional-sales/hero-img.webp"
            />

            {/* 2. Black & Yellow Pill Ribbon */}
            <section className="bg-brand-yellow py-8 md:py-12 px-6">
                <StaggerContainer className="max-w-7xl mx-auto flex flex-wrap justify-center gap-3 md:gap-4">
                    {barPills.map((val, idx) => (
                        <StaggerItem key={idx}>
                            <div className="bg-black text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full flex items-center gap-2 md:gap-3 text-xs md:text-sm font-bold shadow-md transition-transform duration-300">
                                <span className="w-3.5 h-3.5 md:w-4 md:h-4 bg-brand-yellow rounded-full flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-2.5 h-2.5 text-black" strokeWidth="4">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </span>
                                {val}
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </section>

            {/* 3. Merchandising Services */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-12 md:mb-16 space-y-3 lg:space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight uppercase">
                            {list?.["Element 1"]?.value}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal font-medium max-w-3xl mx-auto">
                            {list?.["Element 2"]?.value}
                        </p>
                    </div>
                </ScrollReveal>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {merchItems.map((item, idx) => (
                        <MerchCard key={idx} id={idx} title={item.title} description={item.desc} />
                    ))}
                </StaggerContainer>
            </section>

            {/* 4. Expert Sales Team */}
            <section className="py-16 md:py-24 bg-brand-paleblue px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <div className="space-y-8 md:space-y-10">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight uppercase">
                                {expertTeam?.["Text Element 1"]?.value}
                            </h2>
                            <p className='text-lg md:text-xl text-brand-charcoal font-medium mt-4 lg:mt-6'>
                                {expertTeam?.["Text Element 2"]?.value}
                            </p>
                        </ScrollReveal>
                        <StaggerContainer className="space-y-6 md:space-y-8">
                            {expertFeatures.map((item, idx) => (
                                <StaggerItem key={idx} className="flex gap-4 md:gap-5 items-start group relative p-4 cursor-pointer">
                                    <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                                    <div className="bg-brand-yellow p-3 rounded-xl transition-transform duration-300">
                                        <item.icon size={24} className="text-black" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg md:text-xl font-bold text-black">{item.t}</h4>
                                        <p className="text-brand-charcoal text-sm md:text-base font-medium mt-1">{item.d}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                    <ScrollReveal delay={0.2} className="group overflow-hidden rounded-3xl">
                        <img
                            src={expertTeam?.image_url || "/images/professional-sales/sales team.webp"}
                            className="w-full h-full object-cover shadow-2xl transition-transform "
                            alt="Sales Team"
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* 5. Results Section */}
            <section className="py-16 md:py-24 bg-white px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <ScrollReveal className="order-2 lg:order-1 group overflow-hidden rounded-[2.5rem]">
                        <img
                            src={results?.image_url || "/images/professional-sales/results.webp"}
                            className="w-full object-cover shadow-2xl transition-transform "
                            alt="Retail Shelf"
                        />
                    </ScrollReveal>
                    <div className="order-1 lg:order-2 space-y-8 md:space-y-10">
                        <ScrollReveal>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black tracking-tight uppercase">
                                {results?.["Text Element 1"]?.value}
                            </h2>
                            <p className='text-lg md:text-xl text-brand-charcoal font-medium mt-4 lg:mt-6'>
                                {results?.["Text Element 2"]?.value}
                            </p>
                        </ScrollReveal>
                        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {stats.map((stat, i) => (
                                <StaggerItem key={i}>
                                    <div className="card-hover bg-brand-paleblue p-6 md:p-8 rounded-[32px] text-center border-s-2 border-gray-200 hover:border-brand-yellow transition-all duration-500 ease-in-out">
                                        <h3 className="text-3xl md:text-4xl font-black text-brand-jet mb-1">{stat.v}</h3>
                                        <p className="text-xs md:text-sm text-brand-charcoal font-bold uppercase tracking-wider">{stat.l}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* 6. CTA */}
            <GlobalCTA
                data={cta}
                contact={true}
            />
        </main>
    );
}