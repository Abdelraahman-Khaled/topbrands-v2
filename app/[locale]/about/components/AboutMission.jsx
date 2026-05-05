"use client"
import React from 'react';
import StaggerContainer from '../../components/StaggerContainer';
import StaggerItem from '../../components/StaggerItem';

const AboutMission = ({ data }) => {
    if (!data) return null;

    const visionTitle = data["Element 1"]?.value;
    const visionDesc = data["Element 2"]?.value;
    const missionTitle = data["Element 3"]?.value;
    const missionDesc = data["Element 4"]?.value;

    return (
        <section className="py-12 md:py-20 bg-brand-paleblue">
            <div className="max-w-7xl mx-auto px-8 ">
                <StaggerContainer className="grid lg:grid-cols-2 gap-12">
                    <StaggerItem className="group bg-white hover:bg-brand-jet rounded-3xl p-6 md:p-10 lg:p-12 ease-in-out shadow-xl transition-colors duration-500">
                        <div className="w-16 h-16 flex items-center justify-center bg-brand-yellow group-hover:bg-brand-yellow rounded-2xl mb-6">
                            <i className="ri-eye-line text-3xl text-brand-jet"></i>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-jet group-hover:text-white mb-6">
                            {visionTitle}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal group-hover:text-gray-300 leading-relaxed font-medium">
                            {visionDesc}
                        </p>
                    </StaggerItem>

                    <StaggerItem className="group bg-white hover:bg-brand-charcoal rounded-3xl p-6 md:p-10 lg:p-12 shadow-xl ease-in-out transition-colors duration-500">
                        <div className="w-16 h-16 flex items-center justify-center bg-brand-charcoal group-hover:bg-brand-yellow rounded-2xl mb-6">
                            <i className="ri-compass-3-line text-3xl text-brand-yellow group-hover:text-brand-jet"></i>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-brand-jet group-hover:text-white mb-6">
                            {missionTitle}
                        </h2>
                        <p className="text-lg md:text-xl text-brand-charcoal group-hover:text-gray-300 leading-relaxed font-medium">
                            {missionDesc}
                        </p>
                    </StaggerItem>
                </StaggerContainer>
            </div>
        </section>
    )
}

export default AboutMission;
