import React from 'react';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../../components/ScrollReveal';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';

const Ledaership = () => {
    const { t } = useTranslation();
    const leadership = [
        {
            name: t("leader_1_name"),
            position: t("leader_1_pos"),
            image:
                "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20business%20executive%20CEO%20in%20formal%20suit%20confident%20leadership%20portrait%20office%20background%20professional%20corporate%20photography&width=400&height=500&seq=leader1&orientation=portrait",
            bio: t("leader_1_bio"),
        },
        {
            name: t("leader_2_name"),
            position: t("leader_2_pos"),
            image:
                "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20businesswoman%20executive%20in%20formal%20business%20attire%20confident%20leadership%20portrait%20modern%20office%20background%20corporate%20photography&width=400&height=500&seq=leader2&orientation=portrait",
            bio: t("leader_2_bio"),
        },
        {
            name: t("leader_3_name"),
            position: t("leader_3_pos"),
            image:
                "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20male%20business%20executive%20in%20navy%20suit%20sales%20director%20confident%20portrait%20modern%20office%20setting%20corporate%20photography&width=400&height=500&seq=leader3&orientation=portrait",
            bio: t("leader_3_bio"),
        },
    ];
    return (
        <section className="py-12 md:py-20 bg-brand-paleblue">
            <div className="max-w-7xl mx-auto px-8 ">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-jet mb-4">
                            {t("leadership_team")}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal max-w-3xl mx-auto font-medium">
                            {t("leadership_team_subtitle")}
                        </p>
                    </div>
                </ScrollReveal>

                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leadership.map((leader, index) => (
                        <StaggerItem
                            key={index}
                            className="group card-hover bg-white rounded-2xl overflow-hidden shadow-md border border-transparent"
                        >
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover object-top"
                                />
                            </div>
                            <div className="p-5 md:p-6">
                                <h3 className="text-2xl font-bold text-brand-jet mb-2">
                                    {leader.name}
                                </h3>
                                <p className="text-brand-yellow font-bold mb-4">
                                    {leader.position}
                                </p>
                                <p className="text-brand-charcoal leading-relaxed font-medium">
                                    {leader.bio}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    )
}

export default Ledaership