import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import AnimatedCard from "../../components/AnimatedCard";
import HeroSection from "../../components/HeroSection";
import Counter from "../../components/Counter";
import GlobalCTA from "../../components/GlobalCTA";
import { getPageData } from "@/services/home.service";

export default async function DistributionPage({ params }) {
    const { locale } = await params;
    const pageDataRaw = await getPageData("distribution_services", locale);

    const sections = pageDataRaw || [];
    const findSection = (type) => sections.find(s => s[type])?.[type];

    const hero = findSection("hero");
    const statsData = findSection("stats");
    const channels = findSection("channels");
    const howWeDist = findSection("how-we-dist");
    const cta = findSection("cta");

    const stats = statsData ? [
        { value: statsData["Element 1"]?.value, label: statsData["Element 2"]?.value },
        { value: statsData["Element 3"]?.value, label: statsData["Element 4"]?.value },
        { value: statsData["Element 5"]?.value, label: statsData["Element 6"]?.value },
        { value: statsData["Element 7"]?.value, label: statsData["Element 8"]?.value }
    ].filter(s => s.value) : [];

    const features = channels ? [
        { icon: 'ri-store-3-line', title: channels['Element 3']?.value, description: channels['Element 4']?.value },
        { icon: 'ri-building-2-line', title: channels['Element 5']?.value, description: channels['Element 6']?.value },
        { icon: 'ri-archive-line', title: channels['Element 7']?.value, description: channels['Element 8']?.value },
        { icon: 'ri-map-pin-line', title: channels['Element 9']?.value, description: channels['Element 10']?.value }
    ].filter(f => f.title) : [];

    const steps = howWeDist ? [
        { t: howWeDist["Text Element 3"]?.value, d: howWeDist["Text Element 4"]?.value },
        { t: howWeDist["Text Element 5"]?.value, d: howWeDist["Text Element 6"]?.value },
        { t: howWeDist["Text Element 7"]?.value, d: howWeDist["Text Element 8"]?.value },
        { t: howWeDist["Text Element 9"]?.value, d: howWeDist["Text Element 10"]?.value },
    ].filter(s => s.t) : [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection
                data={hero}
                img="/images/national-distribution/nationwide distribution.webp"
            />

            {/* Stats Section */}
            <ScrollReveal>
                <section className="py-12 lg:py-16 bg-brand-yellow">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-1 md:mb-2">
                                        {!isNaN(parseFloat(stat.value?.replace(/[^0-9.]/g, ""))) ? (
                                            <Counter value={stat.value} />
                                        ) : (
                                            stat.value
                                        )}
                                    </div>
                                    <div className="text-xs md:text-base text-brand-charcoal font-bold tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Features Section */}
            <ScrollReveal>
                <section className="py-16 lg:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-4">
                                {channels?.['Element 1']?.value}
                            </h2>
                            <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                                {channels?.['Element 2']?.value}
                            </p>
                        </div>

                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {features.map((feature, index) => (
                                <StaggerItem key={index}>
                                    <AnimatedCard className="group card-hover h-full bg-brand-paleblue rounded-[32px] p-8 md:p-10 border-s-3 border-gray-200 hover:border-brand-yellow transition-colors duration-500 ease-in-out">
                                        <div className="icon-hover w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-brand-yellow rounded-2xl mb-6">
                                            <i className={`${feature.icon} text-2xl md:text-3xl text-brand-jet`}></i>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-brand-jet mb-3 md:mb-4">{feature.title}</h3>
                                        <p className="text-sm md:text-base text-brand-charcoal leading-relaxed font-medium">{feature.description}</p>
                                    </AnimatedCard>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </section>
            </ScrollReveal>

            {/* Process Section */}
            <section className="py-16 lg:py-24 bg-brand-paleblue">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-6">
                                {howWeDist?.['Text Element 1']?.value}
                            </h2>
                            <p className="text-lg text-brand-charcoal mb-8 leading-relaxed font-medium">
                                {howWeDist?.['Text Element 2']?.value}
                            </p>

                            <StaggerContainer className="space-y-6">
                                {steps.map((step, i) => (
                                    <StaggerItem key={i} className="group flex items-start gap-4 relative p-3 cursor-pointer">
                                        <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                                        <div className="w-10 h-10 flex items-center justify-center bg-brand-yellow rounded-full text-brand-jet font-bold flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-brand-jet mb-1 tracking-tight">
                                                {step.t}
                                            </h4>
                                            <p className="text-sm md:text-base text-brand-charcoal font-medium">
                                                {step.d}
                                            </p>
                                        </div>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                        <div className="w-full h-full overflow-hidden rounded-[24px] shadow-2xl ">
                            <img
                                src={howWeDist?.image_url || "/images/national-distribution/distribute.webp"}
                                alt="Distribution Process"
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <GlobalCTA
                data={cta}
                contact={true}
            />
        </div>
    );
}
