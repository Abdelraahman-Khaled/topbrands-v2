"use client";
import React, { useState } from 'react';

const SocialShare = ({ title, horizontal = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [showCopyMsg, setShowCopyMsg] = useState(false);

    const handleShare = (platform) => {
        const url = typeof window !== 'undefined' ? window.location.href : '';
        const shareUrls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
        };

        if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
        setShowMenu(false);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowCopyMsg(true);
        setTimeout(() => setShowCopyMsg(false), 2000);
        setShowMenu(false);
    };

    const platforms = [
        { id: 'facebook', icon: 'ri-facebook-fill', color: 'bg-[#1877F2]' },
        { id: 'twitter', icon: 'ri-twitter-fill', color: 'bg-[#1DA1F2]' },
        { id: 'linkedin', icon: 'ri-linkedin-fill', color: 'bg-[#0A66C2]' },
        { id: 'whatsapp', icon: 'ri-whatsapp-fill', color: 'bg-[#25D366]' }
    ];

    if (horizontal) {
        return (
            <div className="flex gap-4">
                {platforms.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => handleShare(p.id)}
                        className={`w-10 h-10 flex items-center justify-center ${p.color} text-white rounded-full transition-all`}
                    >
                        <i className={`${p.icon}`}></i>
                    </button>
                ))}
                <button onClick={copyLink} className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-full transition-all">
                    <i className="ri-link"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-12 h-12 flex items-center justify-center bg-brand-yellow text-black rounded-full hover:bg-black hover:text-white duration-300 transition-all shadow-lg cursor-pointer"
            >
                <i className="ri-share-line text-xl"></i>
            </button>
            
            {showMenu && (
                <div className="absolute left-16 top-0 bg-white rounded-xl shadow-2xl p-4 space-y-2 border-2 border-[#DEE3EB] z-50 min-w-[60px]">
                    {platforms.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => handleShare(p.id)}
                            className={`w-10 h-10 flex items-center justify-center ${p.color} text-white rounded-lg hover:scale-110 transition-all cursor-pointer block mx-auto`}
                        >
                            <i className={`${p.icon} text-lg`}></i>
                        </button>
                    ))}
                    <button
                        onClick={copyLink}
                        className="w-10 h-10 flex items-center justify-center bg-[#4B4F54] text-white rounded-lg hover:scale-110 transition-all cursor-pointer block mx-auto"
                    >
                        <i className={`ri-link text-lg`}></i>
                    </button>
                    {showCopyMsg && (
                        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                            Copied!
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SocialShare;
