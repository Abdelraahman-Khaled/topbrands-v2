"use client";
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { Check } from 'lucide-react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const ContactForm = () => {
    const { t } = useTranslation();
    const recaptchaRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("idle");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const recaptchaToken = recaptchaRef.current?.getValue();
        if (!recaptchaToken) {
            setSubmitStatus("recaptcha");
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, recaptchaToken }),
            });

            if (response.ok) {
                setSubmitStatus("success");
                recaptchaRef.current?.reset();
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSendAnother = () => {
        setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
        setSubmitStatus("idle");
    };

    return (
        <div className="max-w-4xl mx-auto bg-brand-paleblue p-8 lg:p-12 rounded-[40px] shadow-sm">
            <AnimatePresence mode="wait">
            {submitStatus === "success" ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center text-center py-10 lg:py-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                        className="w-24 h-24 rounded-full bg-brand-yellow flex items-center justify-center mb-6 shadow-md"
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.25 }}
                        >
                            <Check className="w-12 h-12 text-brand-charcoal" strokeWidth={3} />
                        </motion.div>
                    </motion.div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-brand-charcoal mb-3">
                        {t("contact_success_title")}
                    </h3>
                    <p className="text-base text-brand-charcoal/70 max-w-md mb-8">
                        {t("contact_success_desc")}
                    </p>
                    <button
                        type="button"
                        onClick={handleSendAnother}
                        className="mask-btn mask-btn--yellow-black !rounded-xl"
                    >
                        <span className="mask-btn__label bg-transparent">{t("contact_send_another")}</span>
                        <span className="mask-btn__fill bg-transparent">{t("contact_send_another")}</span>
                    </button>
                </motion.div>
            ) : (
            <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_full_name")}</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                            placeholder={t("your_full_name")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_email_address")}</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                            placeholder={t("your_email")}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_phone_number")}</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                            placeholder={t("your_phone_placeholder")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_company_name")}</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                            placeholder={t("your_company")}
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("subject")}</label>
                    <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black"
                    >
                        <option value="">{t("select_subject")}</option>
                        <option value="Partnership">{t("dist_partnership")}</option>
                        <option value="General">{t("general_inquiry")}</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t("contact_message")}</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white resize-none text-black"
                        placeholder={t("message_placeholder")}
                    ></textarea>
                    <div className="flex justify-between items-center mt-1">
                        {submitStatus === "error" && (
                            <p className="text-sm text-red-500 font-semibold">{t("error_msg") || "Something went wrong"}</p>
                        )}
                        {submitStatus === "recaptcha" && (
                            <p className="text-sm text-red-500 font-semibold">Please complete the reCAPTCHA verification.</p>
                        )}
                        <p className="text-xs text-brand-charcoal ml-auto">{formData.message.length}/500</p>
                    </div>
                </div>

                <div className="mb-6">
                    {RECAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`mask-btn mask-btn--yellow-black !rounded-xl w-full transition-opacity ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    <span className="mask-btn__label bg-transparent">
                        {isSubmitting ? t('btn_submitting') : t('btn_submit')}
                    </span>
                    <span className="mask-btn__fill bg-transparent">
                        {isSubmitting ? t('btn_submitting') : t('btn_submit')}
                    </span>
                </button>
            </motion.form>
            )}
            </AnimatePresence>
        </div>
    );
};

export default ContactForm;
