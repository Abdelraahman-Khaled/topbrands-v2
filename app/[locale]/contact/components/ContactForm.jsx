"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
    const { t } = useTranslation();
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
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-brand-paleblue p-8 lg:p-12 rounded-[40px] shadow-sm">
            <motion.form
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
                        {submitStatus === "success" && (
                            <p className="text-sm text-green-600 font-semibold">{t("thank_you_msg")}</p>
                        )}
                        {submitStatus === "error" && (
                            <p className="text-sm text-red-500 font-semibold">{t("error_msg") || "Something went wrong"}</p>
                        )}
                        <p className="text-xs text-brand-charcoal ml-auto">{formData.message.length}/500</p>
                    </div>
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
        </div>
    );
};

export default ContactForm;
