import HeroSection from "../../components/HeroSection";
import GlobalCTA from "../../components/GlobalCTA";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import { getPageData } from "@/services/home.service";

export default async function LogisticsPage({ params }) {
    const { locale } = await params;
    const pageDataRaw = await getPageData("logestics_services", locale);

    const sections = pageDataRaw || [];
    const findSection = (type) => sections.find(s => s[type])?.[type];

    const hero = findSection("hero");
    const bar = findSection("bar");
    const solutions = findSection("solutions");
    const warehouse = findSection("warehouse");
    const fleet = findSection("fleet");
    const cta = findSection("cta");

    const capabilities = bar ? [
        { icon: 'ri-truck-line', label: bar['Element 1']?.value },
        { icon: 'ri-stack-line', label: bar['Element 2']?.value },
        { icon: 'ri-time-line', label: bar['Element 3']?.value },
        { icon: 'ri-shield-check-line', label: bar['Element 4']?.value },
        { icon: 'ri-file-list-3-line', label: bar['Element 5']?.value },
        { icon: 'ri-customer-service-line', label: bar['Element 6']?.value }
    ].filter(c => c.label) : [];

    const features = solutions ? [
        { icon: 'ri-building-4-line', title: solutions['Element 3']?.value, description: solutions['Element 4']?.value },
        { icon: 'ri-temp-cold-line', title: solutions['Element 5']?.value, description: solutions['Element 6']?.value },
        { icon: 'ri-route-line', title: solutions['Element 7']?.value, description: solutions['Element 8']?.value },
        { icon: 'ri-bar-chart-box-line', title: solutions['Element 9']?.value, description: solutions['Element 10']?.value }
    ].filter(f => f.title) : [];

    const fleetItems = fleet ? [
        { icon: 'ri-truck-line', title: fleet['Text Element 3']?.value, desc: fleet['Text Element 4']?.value },
        { icon: 'ri-car-line', title: fleet['Text Element 5']?.value, desc: fleet['Text Element 6']?.value },
        { icon: 'ri-temp-cold-line', title: fleet['Text Element 7']?.value, desc: fleet['Text Element 8']?.value },
        { icon: 'ri-motorbike-line', title: fleet['Text Element 9']?.value, desc: fleet['Text Element 10']?.value }
    ].filter(f => f.title) : [];

    const warehousePoints = warehouse ? [
        warehouse["Text Element 3"]?.value,
        warehouse["Text Element 4"]?.value,
        warehouse["Text Element 5"]?.value,
        warehouse["Text Element 6"]?.value
    ].filter(p => p) : [];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <HeroSection
                data={hero}
                img="/images/logistics/hero-img.webp"
            />

            {/* Capabilities Bar */}
            <ScrollReveal>
                <section className="py-12 bg-brand-yellow">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                            {capabilities.map((cap, index) => (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 flex items-center justify-center bg-brand-jet rounded-2xl mb-3 shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                                        <i className={`${cap.icon} text-2xl text-brand-yellow`}></i>
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-brand-jet uppercase tracking-wider group-hover:text-brand-charcoal transition-colors">
                                        {cap.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <ScrollReveal>
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-4 uppercase tracking-tight">
                                {solutions?.['Element 1']?.value}
                            </h2>
                            <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                                {solutions?.['Element 2']?.value}
                            </p>
                        </div>
                    </ScrollReveal>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {features.map((feature, index) => (
                            <StaggerItem key={index}>
                                <div className="group card-hover h-full bg-brand-paleblue rounded-[32px] p-8 md:p-10 border-s-3 border-gray-200 hover:border-brand-yellow transition-colors duration-500 ease-in-out flex flex-col">
                                    <div className="icon-hover w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-brand-charcoal rounded-2xl mb-6">
                                        <i className={`${feature.icon} text-2xl md:text-3xl text-brand-yellow`}></i>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-brand-jet mb-3 md:mb-4">{feature.title}</h3>
                                    <p className="text-sm md:text-base text-brand-charcoal leading-relaxed font-medium">{feature.description}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Warehouse Section */}
            <section className="py-16 lg:py-24 bg-brand-paleblue">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <ScrollReveal className="relative order-2 lg:order-1 group overflow-hidden rounded-[32px]">
                            <img
                                src={warehouse?.image_url || "/images/logistics/warehouse.webp"}
                                alt="Warehouse Operations"
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center shadow-2xl transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </ScrollReveal>

                        <div className="order-1 lg:order-2">
                            <ScrollReveal>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-6 uppercase tracking-tight">
                                    {warehouse?.["Text Element 1"]?.value}
                                </h2>
                                <p className="text-lg text-brand-charcoal mb-8 leading-relaxed font-medium">
                                    {warehouse?.["Text Element 2"]?.value}
                                </p>
                            </ScrollReveal>

                            <StaggerContainer className="space-y-4">
                                {warehousePoints.map((text, i) => (
                                    <StaggerItem key={i} className="group flex items-center gap-4 p-4 rounded-2xl relative cursor-pointer">
                                        <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="12" fill="none" stroke="black" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
                                        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-brand-yellow rounded-xl flex-shrink-0">
                                            <i className="ri-checkbox-circle-line text-xl md:text-2xl text-brand-jet"></i>
                                        </div>
                                        <span className="text-base md:text-lg text-brand-jet font-bold">{text}</span>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fleet Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-8">
                            <ScrollReveal>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-jet mb-6 uppercase tracking-tight">
                                    {fleet?.["Text Element 1"]?.value}
                                </h2>
                                <p className="text-lg text-brand-charcoal mb-8 leading-relaxed font-medium">
                                    {fleet?.["Text Element 2"]?.value}
                                </p>
                            </ScrollReveal>

                            <StaggerContainer className="grid grid-cols-2 gap-4 md:gap-6">
                                {fleetItems.map((item, i) => (
                                    <StaggerItem key={i} className="group card-hover bg-brand-paleblue p-6 rounded-[24px]  border-s-3 border-gray-200 hover:border-brand-yellow transition-colors duration-500 ease-in-out text-center">
                                        <i className={`${item.icon} text-3xl md:text-4xl text-brand-jet mb-3 block`}></i>
                                        <h4 className="text-base md:text-lg font-bold text-brand-jet">{item.title}</h4>
                                        <p className="text-xs md:text-sm text-brand-charcoal font-medium">{item.desc}</p>
                                    </StaggerItem>
                                ))}
                            </StaggerContainer>
                        </div>

                        <ScrollReveal className="relative group overflow-hidden rounded-[32px] shadow-2xl" delay={0.2}>
                            <img
                                src={fleet?.image_url || "/images/logistics/fleet.webp"}
                                alt="Fleet Management"
                                className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                            />
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ScrollReveal className="py-12 md:py-16">
                <GlobalCTA
                    data={cta}
                    contact={true}
                />
            </ScrollReveal>
        </div>
    );
}
