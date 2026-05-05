"use client";
import { useTranslation } from "react-i18next";
import {
  Clock,
  MapPin,
  Users,
  ShieldCheck,
  BarChart3,
  Headphones,
  ArrowRight,
  Phone,
} from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import LocalizedLink from "../../components/LocalizedLink";

export default function WhyPartener({ data, cta }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  if (!data) return null;

  // Extract settings title based on locale
  const settings = data.settings || {};
  const settingsTitle = settings[isAr ? "1" : "0"]?.value || "";

  // Main Headers
  const headerSubtitle = data["Text Element 1"]?.value;
  const headerTitle = data["Text Element 2"]?.value;
  const headerDesc = data["Text Element 3"]?.value;

  // Fallbacks for the CTA section since it's not in the JSON schema for 'your_trusted'
  const ctaTitle = cta?.["CTA Element 1"]?.value || t("ready_to_transform", "Ready to Transform Your Distribution?");
  const ctaDesc = cta?.["CTA Element 2"]?.value || t("partner_with_us_desc", "Partner with Top Brands to unlock unparalleled market access and accelerate your growth.");
  const ctaButton1Text = cta?.["CTA Element 3"]?.value || t("become_a_partner", "Become a Partner");
  const ctaButton2Text = cta?.["CTA Element 4"]?.value || t("contact_us", "Contact Us");

  const features = [
    {
      title: data["Text Element 4"]?.value,
      desc: data["Text Element 5"]?.value,
      icon: <Clock className="w-6 h-6 text-white" />,
      iconBg: "bg-[#4B4F54]",
    },
    {
      title: data["Text Element 6"]?.value,
      desc: data["Text Element 7"]?.value,
      icon: <MapPin className="w-6 h-6 text-black" />,
      iconBg: "bg-[#F7E326]",
    },
    {
      title: data["Text Element 8"]?.value,
      desc: data["Text Element 9"]?.value,
      icon: <Users className="w-6 h-6 text-white" />,
      iconBg: "bg-[#4B4F54]",
    },
    {
      title: data["Text Element 10"]?.value,
      desc: data["Text Element 11"]?.value,
      icon: <ShieldCheck className="w-6 h-6 text-black" />,
      iconBg: "bg-[#F7E326]",
    },
    {
      title: data["Text Element 12"]?.value,
      desc: data["Text Element 13"]?.value,
      icon: <BarChart3 className="w-6 h-6 text-white" />,
      iconBg: "bg-[#4B4F54]",
    },
    {
      title: data["Text Element 14"]?.value,
      desc: data["Text Element 15"]?.value,
      icon: <Headphones className="w-6 h-6 text-black" />,
      iconBg: "bg-[#F7E326]",
    },
  ].filter(f => f.title);

  return (
    <section className="py-12 sm:py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#4B4F54]/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F7E326]/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-5 py-2  bg-gradient-to-r from-[#F7E326] to-[#E5D324] text-black rounded-full text-sm font-bold tracking-wider">
                {headerSubtitle}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              {headerTitle}  <span className="text-[#F7E326]">{settingsTitle}</span>
            </h2>
            <p className="text-lg sm:text-xl text-[#D1D5DB] max-w-3xl mx-auto font-medium">
              {headerDesc}
            </p>
          </div>
        </ScrollReveal>

        <div className="relative py-20 bg-inherit overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-[#4B4F54] blur-[150px] rounded-full"></div>
          </div>

          <div className="container mx-auto px-0 sm:px-6 relative z-10">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((item, index) => (
                <StaggerItem
                  key={index}
                  className="group p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] transition-all duration-300 flex flex-col items-start
                         border border-white/5 hover:border-white/10
                         bg-white/[0.03] backdrop-blur-lg hover:bg-white/[0.05]"
                >
                  <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-white text-2xl font-bold mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[#D1D5DB] text-base leading-relaxed font-light">
                    {item.desc}
                  </p>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>

        <ScrollReveal delay={0.2}>
          <section className="py-8 sm:py-20 px-0 md:px-6">
            <div
              className="max-w-6xl mx-auto rounded-[24px] sm:rounded-3xl p-6 sm:p-12 md:p-20 text-center relative overflow-hidden border border-white/10"
              style={{
                background: "linear-gradient(135deg, #1C1C1C 0%, #000000 50%, #1C1C1C 100%)",
              }}
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F7E326]/10 blur-[100px] rounded-full"></div>

              <div className="relative z-10">
                <h2 className="text-2xl sm:text-4xl md:text-5xl max-w-2xl mx-auto font-bold text-white mb-6 leading-tight">
                  {ctaTitle}
                </h2>
                <p className="text-[#D1D5DB] text-base md:text-xl mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                  {ctaDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {ctaButton1Text && (
                    <LocalizedLink
                      href="/become-a-partner"
                      className="mask-btn mask-btn--yellow-white"
                    >
                      <span className="mask-btn__label">{ctaButton1Text}
                        <ArrowRight className="w-5 h-5 mx-2 transition-transform rtl:rotate-180" />
                      </span>
                      <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                        {ctaButton1Text}
                      </span>
                    </LocalizedLink>
                  )}

                  {ctaButton2Text && (
                    <LocalizedLink
                      href="/contact"
                      className="mask-btn mask-btn--none-white"
                    >
                      <span className="mask-btn__label">{ctaButton2Text}
                        <Phone className="w-5 h-5 mx-2 text-gray-300" />
                      </span>
                      <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                        {ctaButton2Text}
                        <Phone className="w-5 h-5 mx-2 text-gray-300" />
                      </span>
                    </LocalizedLink>
                  )}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </section>
  );
}
