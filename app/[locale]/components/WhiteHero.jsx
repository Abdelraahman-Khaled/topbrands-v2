import React from 'react'

const WhiteHero = ({ title, description, img }) => {
    return (
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden">
            {/* Background Image Layer */}
            {img && (
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url('${img}')` }}
                />
            )}

            {/* Gradient Overlay — heavier when no image, lighter with image */}
            <div className={`absolute inset-0 pointer-events-none ${img
                ? 'bg-linear-to-br from-brand-paleblue/60 via-white/70 to-white/90'
                : 'bg-linear-to-r from-[#DEE3EB] to-[#FFFFFF]'
            }`} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-start">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4 md:mb-6 leading-tight">
                    {title}
                </h1>
                <p className="text-base md:text-lg text-brand-charcoal font-medium max-w-3xl leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    )
}

export default WhiteHero