'use client'
import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import { useTranslation } from 'react-i18next';
import ScrollReveal from '../components/ScrollReveal';
import StaggerContainer from '../components/StaggerContainer';
import StaggerItem from '../components/StaggerItem';
import AnimatedCard from '../components/AnimatedCard';
import { getPageData } from '@/services/home.service';
import { useCompany } from '../components/CompanyProvider';

const BENEFIT_ICONS = ['ri-map-pin-line', 'ri-team-line', 'ri-line-chart-line', 'ri-shield-check-line'];

export default function BecomePartnerPage() {
  const { t, i18n } = useTranslation();
  const { companyData } = useCompany();
  const isAr = i18n.language === 'ar';

  const [pageData, setPageData] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    brandName: '',
    productCategory: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');

  useEffect(() => {
    async function fetchPage() {
      const res = await getPageData('became_partner', i18n.language);
      if (res) setPageData(res);
    }
    fetchPage();
  }, [i18n.language]);

  const findSection = (key) => pageData?.find(s => s[key])?.[key];

  const heroData = findSection('hero');
  const benefitsData = findSection('benefits');
  const partnershipData = findSection('partnership');
  const contactUsData = findSection('contact_us');

  // Benefits section
  const benefitsTitle = benefitsData?.['Element 1']?.value || t('benefits_title');
  const benefitsSubtitle = benefitsData?.['Element 2']?.value || t('benefits_subtitle');
  const benefits = [
    {
      icon: BENEFIT_ICONS[0],
      title: benefitsData?.['Element 3']?.value || t('benefit1_title'),
      desc: benefitsData?.['Element 4']?.value || t('benefit1_desc'),
    },
    {
      icon: BENEFIT_ICONS[1],
      title: benefitsData?.['Element 5']?.value || t('benefit2_title'),
      desc: benefitsData?.['Element 6']?.value || t('benefit2_desc'),
    },
    {
      icon: BENEFIT_ICONS[2],
      title: benefitsData?.['Element 7']?.value || t('benefit3_title'),
      desc: benefitsData?.['Element 8']?.value || t('benefit3_desc'),
    },
    {
      icon: BENEFIT_ICONS[3],
      title: benefitsData?.['Element 9']?.value || t('benefit4_title'),
      desc: benefitsData?.['Element 10']?.value || t('benefit4_desc'),
    },
  ];

  // Partnership form section
  const formTitle = partnershipData?.['Element 1']?.value || t('form_title');
  const formSubtitle = partnershipData?.['Element 2']?.value || t('form_subtitle');
  const submitBtnLabel = partnershipData?.['Element 3']?.value || t('btn_submit');

  // Contact us section
  const directContactTitle = contactUsData?.['Element 1']?.value || t('direct_contact_title');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ companyName: '', contactPerson: '', email: '', phone: '', brandName: '', productCategory: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {heroData ? (
        <HeroSection data={heroData} />
      ) : (
        <HeroSection
          img="/images/become a partner banner.webp"
          title={t('expand_brand')}
          yellowTitle={t('presence_syria')}
          subtitle={t('partnership_nav')}
          description1={t('growing_supports_partner')}
          description2={t('national_become_partner')}
          yellowText={t('strategic_market_entry_partner')}
        />
      )}

      {/* Partnership Benefits */}
      <ScrollReveal delay={0.1}>
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-8 lg:px-16">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold text-brand-jet mb-4">{benefitsTitle}</h2>
              <p className="text-xl text-brand-charcoal max-w-3xl mx-auto">{benefitsSubtitle}</p>
            </div>

            <StaggerContainer className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <StaggerItem key={index}>
                  <AnimatedCard className="bg-brand-paleblue border-gray-200 border-s-3 hover:border-brand-yellow rounded-3xl p-10 h-full transition duration-500 ease-in-out">
                    <div className={`w-16 h-16 flex items-center justify-center ${index % 2 === 0 ? 'bg-brand-yellow text-black' : 'bg-brand-charcoal text-white'} rounded-2xl mb-6 transition-transform duration-300`}>
                      <i className={`${benefit.icon} text-3xl`}></i>
                    </div>
                    <h3 className="text-3xl font-bold text-brand-jet mb-4">{benefit.title}</h3>
                    <p className="text-base text-brand-charcoal leading-relaxed">{benefit.desc}</p>
                  </AnimatedCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </ScrollReveal>

      {/* Partnership Form */}
      <section className="py-20 lg:py-28 bg-brand-paleblue">
        <div className="max-w-5xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold text-brand-jet mb-4">{formTitle}</h2>
            <p className="text-xl text-brand-charcoal max-w-3xl mx-auto">{formSubtitle}</p>
          </div>

          <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-2xl">
            <ScrollReveal delay={0.2}>
              <form onSubmit={handleSubmit} id="partnership-form">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_company')}</label>
                    <input
                      type="text" name="companyName" value={formData.companyName} onChange={handleChange} required
                      className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      placeholder={t('placeholder_company')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_contact')}</label>
                    <input
                      type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required
                      className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      placeholder={t('placeholder_contact')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_email')}</label>
                    <input
                      type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      placeholder={t('placeholder_email')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_phone')}</label>
                    <input
                      type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      placeholder={t('placeholder_phone')}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_brand')}</label>
                    <input
                      type="text" name="brandName" value={formData.brandName} onChange={handleChange} required
                      className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                      placeholder={t('placeholder_brand')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_category')}</label>
                    <select
                      name="productCategory" value={formData.productCategory} onChange={handleChange} required
                      className="w-full text-black px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none"
                    >
                      <option value="">{t('select_category')}</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="Snacks & Confectionery">Snacks & Confectionery</option>
                      <option value="Dairy Products">Dairy Products</option>
                      <option value="Non-Food FMCG">Non-Food FMCG</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-brand-charcoal mb-2">{t('label_message')}</label>
                  <textarea
                    name="message" value={formData.message} onChange={handleChange} rows={5} maxLength={500}
                    className="w-full px-4 py-3 text-sm bg-white text-black border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-200 focus:outline-none resize-none"
                    placeholder={t('placeholder_message')}
                  ></textarea>
                  <p className="text-xs text-brand-charcoal mt-2">{formData.message.length}/500</p>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm">
                    <i className="ri-check-line mr-2"></i>{t('msg_success')}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm">
                    <i className="ri-error-warning-line mr-2"></i>{t('msg_error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mask-btn mask-btn--yellow-black !rounded-xl w-full transition-opacity ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  <span className="mask-btn__label">
                    {isSubmitting ? t('btn_submitting') : submitBtnLabel}
                  </span>
                  <span className="mask-btn__fill">
                    {isSubmitting ? t('btn_submitting') : submitBtnLabel}
                  </span>
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-brand-jet mb-4">{directContactTitle}</h2>
          </div>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            <StaggerItem className="group text-center relative p-6 cursor-pointer">
              <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" fill="none" stroke="#f7e326" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
              <div className="w-16 h-16 flex items-center justify-center bg-brand-yellow rounded-2xl mb-4 mx-auto">
                <i className="ri-mail-line text-3xl text-black"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-jet mb-2">{t('contact_email')}</h3>
              <p className="text-base text-brand-charcoal">{companyData?.email || 'info@topbrands-sy.com'}</p>
            </StaggerItem>
            <StaggerItem className="group text-center relative p-6 cursor-pointer">
              <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" fill="none" stroke="#f7e326" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
              <div className="w-16 h-16 flex items-center justify-center bg-brand-charcoal rounded-2xl mb-4 mx-auto">
                <i className="ri-phone-line text-3xl text-white"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-jet mb-2">{t('contact_phone')}</h3>
              <p className="text-base text-brand-charcoal" dir="ltr">{companyData?.phone_number_1 || '+963 11 6022'}</p>
            </StaggerItem>
            <StaggerItem className="group text-center relative p-6 cursor-pointer">
              <svg className="trace-border-svg"><rect className="trace-border-rect" x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="16" fill="none" stroke="#f7e326" strokeWidth="2" strokeDasharray="2000" strokeDashoffset="2000" /></svg>
              <div className="w-16 h-16 flex items-center justify-center bg-brand-yellow rounded-2xl mb-4 mx-auto">
                <i className="ri-map-pin-line text-3xl text-black"></i>
              </div>
              <h3 className="text-xl font-bold text-brand-jet mb-2">{t('contact_location')}</h3>
              <p className="text-base text-brand-charcoal">
                {(isAr ? companyData?.address_ar : companyData?.address_en) || t('city_syria')}
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
