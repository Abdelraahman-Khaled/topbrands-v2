import React from 'react'

const HeroCounter = ({ stats }) => {
    return (
        <div className="bg-[#F7E326] py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                {stats.map((item, i) => (
                    <div key={i} className="text-center border-r last:border-none border-black/10">
                        <h2 className="text-4xl lg:text-6xl font-black text-black mb-1">
                            {item.title}
                        </h2>
                        <p className="text-base font-medium text-gray-700  tracking-tight">
                            {item.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HeroCounter