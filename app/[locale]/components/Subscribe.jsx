"use client";
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LocalizedLink from './LocalizedLink';

function NewsletterForm({ t }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            setStatus(res.ok ? 'success' : 'error');
            if (res.ok) setEmail('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter_placeholder")}
                className="w-full flex-1 bg-white/5 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#F7E326]/50 transition-colors"
            />
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="mask-btn mask-btn--yellow-white rounded-lg! w-full sm:w-auto"
            >
                <span className="mask-btn__label">{status === 'submitting' ? '...' : t("newsletter_btn")}</span>
                <span className="mask-btn__fill">{status === 'submitting' ? '...' : t("newsletter_btn")}</span>
            </button>
            {status === 'success' && <p className="text-green-400 text-sm w-full">{t("thank_you_msg")}</p>}
            {status === 'error' && <p className="text-red-400 text-sm w-full">{t("error_msg")}</p>}
        </form>
    );
}

const Subscribe = ({ title, becomePartner = false, mail = false }) => {
    const { t } = useTranslation();
    return (
        <section className="relative w-full bg-[#0B1411] py-16 md:py-24 px-6 overflow-hidden">

            {/* Background Glows */}
            <div
                className="absolute top-1/2 -left-20 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
                style={{ background: 'radial-gradient(circle, #F7E326 0%, transparent 70%)' }}
            />
            <div
                className="absolute top-1/2 -right-20 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20"
                style={{ background: 'radial-gradient(circle, #F7E326 0%, transparent 70%)' }}
            />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">

                {/* Mail Icon */}
                {
                    mail && (
                        <div className="mb-8 text-white">
                            <Mail size={48} strokeWidth={1.5} />
                        </div>
                    )
                }

                {/* Text Content */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                    {title}
                </h2>
                <p className="text-white/90 text-base sm:text-lg mb-8 md:mb-10 max-w-2xl px-4 md:px-0">
                    {t("newsletter_desc")}
                </p>

                {/* Form */}
                {
                    becomePartner ?
                        <div className='flex flex-col sm:flex-row gap-4 w-full justify-center px-4 md:px-0'>
                            <LocalizedLink
                                href={'/become-a-partner'}
                                className="mask-btn mask-btn--yellow-white !rounded-full sm:w-auto w-full shadow-xl hover:shadow-2xl"
                            >
                                <span className="mask-btn__label gap-3">
                                    {t("become_a_partner")}
                                    <i className="ri-arrow-right-line text-xl rtl:rotate-180"></i>
                                </span>
                                <span className="mask-btn__fill gap-3">
                                    {t("become_a_partner")}
                                    <i className="ri-arrow-right-line text-xl rtl:rotate-180"></i>
                                </span>
                            </LocalizedLink>

                            <LocalizedLink
                                href={"/services"}
                                className="mask-btn mask-btn--none-white !rounded-full sm:w-auto w-full shadow-xl hover:shadow-2xl"
                            >
                                <span className="mask-btn__label gap-3">
                                    {t("btn_services")}
                                    <i className="ri-arrow-right-line text-xl rtl:rotate-180"></i>
                                </span>
                                <span className="mask-btn__fill gap-3">
                                    {t("btn_services")}
                                    <i className="ri-arrow-right-line text-xl rtl:rotate-180"></i>
                                </span>
                            </LocalizedLink>
                        </div>
                        :
                        <NewsletterForm t={t} />
                }


            </div>
        </section>
    );
};

export default Subscribe;