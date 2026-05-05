import HeroSection from "../../components/HeroSection";
import GlobalCTA from "../../components/GlobalCTA";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import Counter from "../../components/Counter";
import AnimatedCard from "../../components/AnimatedCard";
import { getPageData } from "@/services/home.service";

export default async function MarketingPage({ params }) {
    const { locale } = await params;
    const pageDataRaw = await getPageData("marketing_services", locale);

    const sections = pageDataRaw || [];
    const findSection = (type) => sections.find(s => s[type])?.[type];

    const hero = findSection("hero");
    const statsData = findSection("stats");
    const servicesData = findSection("services");
    const whyMarketing = findSection("why-marketing");
    const approach = findSection("approach");
    const cta = findSection("cta");

    const stats = statsData ? [
        { value: statsData["Element 1"]?.value, label: statsData["Element 2"]?.value },
        { value: statsData["Element 3"]?.value, label: statsData["Element 4"]?.value },
        { value: statsData["Element 5"]?.value, label: statsData["Element 6"]?.value },
        { value: statsData["Element 7"]?.value, label: statsData["Element 8"]?.value }
    ].filter(s => s.value) : [];

    const serviceCards = servicesData ? [
        { icon: 'ri-bar-chart-box-line', title: servicesData['Element 3']?.value, description: servicesData['Element 4']?.value },
        { icon: 'ri-megaphone-line', title: servicesData['Element 5']?.value, description: servicesData['Element 6']?.value },
        { icon: 'ri-smartphone-line', title: servicesData['Element 7']?.value, description: servicesData['Element 8']?.value },
        { icon: 'ri-store-3-line', title: servicesData['Element 9']?.value, description: servicesData['Element 10']?.value },
        { icon: 'ri-team-line', title: servicesData['Element 11']?.value, description: servicesData['Element 12']?.value },
        { icon: 'ri-pie-chart-line', title: servicesData['Element 13']?.value, description: servicesData['Element 14']?.value }
    ].filter(s => s.title) : [];

    const capabilities = whyMarketing ? [
        { icon: 'ri-lightbulb-line', title: whyMarketing['Element 3']?.value, description: whyMarketing['Element 4']?.value },
        { icon: 'ri-focus-3-line', title: whyMarketing['Element 5']?.value, description: whyMarketing['Element 6']?.value },
        { icon: 'ri-rocket-line', title: whyMarketing['Element 7']?.value, description: whyMarketing['Element 8']?.value },
        { icon: 'ri-line-chart-line', title: whyMarketing['Element 9']?.value, description: whyMarketing['Element 10']?.value }
    ].filter(c => c.title) : [];

    const steps = approach ? [
        { id: 1, title: approach['Element 3']?.value, desc: approach['Element 4']?.value },
        { id: 2, title: approach['Element 5']?.value, desc: approach['Element 6']?.value },
        { id: 3, title: approach['Element 7']?.value, desc: approach['Element 8']?.value },
        { id: 4, title: approach['Element 9']?.value, desc: approach['Element 10']?.value }
    ].filter(s => s.title) : [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection
                data={hero}
                img="/images/markting/hero-img.webp"
            />

            {/* Stats Section */}
            <section className="py-12 lg:py-16 bg-brand-yellow">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <StaggerItem key={index} className="text-center">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-1 md:mb-2">
                                    {!isNaN(parseFloat(stat.value?.replace(/[^0-9.]/g, ""))) ? (
                                        <Counter value={stat.value} />
                                    ) : (
                                        stat.value
                                    )}
                                </div>
                                <div className="text-xs md:text-base text-brand-charcoal font-bold uppercase tracking-wider">{stat.label}</div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <ScrollReveal>
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-4 uppercase tracking-tight">
                                {servicesData?.['Element 1']?.value}
                            </h2>
                            <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                                {servicesData?.['Element 2']?.value}
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {serviceCards.map((service, index) => (
                            <StaggerItem key={index}>
                                <AnimatedCard className="group card-hover h-full bg-brand-paleblue rounded-[32px] p-8 md:p-10 border-s-3 border-gray-200 hover:border-brand-yellow transition-colors duration-500 ease-in-out block">
                                    <div className="icon-hover w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-brand-yellow rounded-2xl mb-6">
                                        <i className={`${service.icon} text-2xl md:text-3xl text-brand-jet`}></i>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-brand-jet mb-3 md:mb-4">{service.title}</h3>
                                    <p className="text-sm md:text-base text-brand-charcoal leading-relaxed font-medium">{service.description}</p>
                                </AnimatedCard>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Capabilities Section */}
            <section className="py-16 lg:py-24 bg-brand-paleblue">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <ScrollReveal>
                            <div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-6">
                                    {whyMarketing?.['Element 1']?.value}
                                </h2>
                                <p className="text-lg text-brand-charcoal mb-8 leading-relaxed font-medium">
                                    {whyMarketing?.['Element 2']?.value}
                                </p>

                                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {capabilities.map((cap, index) => (
                                        <StaggerItem key={index} className="flex items-start gap-4">
                                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-yellow rounded-xl flex-shrink-0">
                                                <i className={`${cap.icon} text-xl md:text-2xl text-brand-jet`}></i>
                                            </div>
                                            <div>
                                                <h4 className="text-base md:text-lg font-bold text-brand-jet mb-1">{cap.title}</h4>
                                                <p className="text-xs md:text-sm text-brand-charcoal font-medium leading-relaxed">{cap.description}</p>
                                            </div>
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.2} className="relative group overflow-hidden rounded-[32px]">
                            <img
                                src={whyMarketing?.image_url || "/images/markting/marketing solutions.webp"}
                                alt="Marketing Capabilities"
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <ScrollReveal>
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-4">
                                {approach?.['Element 1']?.value}
                            </h2>
                            <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                                {approach?.['Element 2']?.value}
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {steps.map((step) => (
                            <StaggerItem key={step.id} className="text-center group card-hover bg-brand-paleblue hover:bg-brand-yellow p-8 rounded-[32px] border border-transparent transition-colors duration-500 ease-in-out">
                                <div className="w-16 h-16 flex items-center justify-center bg-brand-jet  text-brand-yellow  rounded-full mx-auto mb-6 transition-colors duration-500">
                                    <span className="text-2xl font-bold">{step.id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-brand-jet mb-3">{step.title}</h3>
                                <p className="text-sm text-brand-charcoal group-hover:text-brand-jet font-medium leading-relaxed transition-colors duration-500">{step.desc}</p>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* CTA Section */}
            <div className="py-12 md:py-16">
                <GlobalCTA
                    data={cta}
                    contact={true}
                />
            </div>
        </div>
    );
}
