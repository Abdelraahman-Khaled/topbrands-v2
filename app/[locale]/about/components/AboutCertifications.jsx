import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../components/ScrollReveal';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';

const AboutCertifications = () => {
    const { t } = useTranslation();
    const certifications = [
        {
            icon: "ri-shield-check-line",
            title: t("iso_cert"),
            description: t("iso_cert_desc"),
        },
        {
            icon: "ri-restaurant-line",
            title: t("food_safety"),
            description: t("food_safety_desc"),
        },
        {
            icon: "ri-truck-line",
            title: t("cold_chain"),
            description: t("cold_chain_desc"),
        },
        {
            icon: "ri-file-list-3-line",
            title: t("reg_compliance"),
            description: t("reg_compliance_desc"),
        },
    ];
    return (
        <section className="py-12 md:py-20 bg-brand-paleblue">
            <div className="max-w-7xl mx-auto px-8 ">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-4">
                            {t("certs_standards")}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                            {t("certs_standards_subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {certifications.map((cert, index) => (
                        <StaggerItem
                            key={index}
                            className="group card-hover bg-white rounded-2xl p-5 md:p-6 text-center border border-transparent"
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-brand-yellow rounded-xl mb-4 mx-auto">
                                <i className={`${cert.icon} text-3xl text-brand-jet`}></i>
                            </div>
                            <h3 className="text-lg font-bold text-brand-jet mb-3">
                                {cert.title}
                            </h3>
                            <p className="text-sm text-brand-charcoal leading-relaxed font-medium">
                                {cert.description}
                            </p>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

export default AboutCertifications