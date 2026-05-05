"use client";
import { useTranslation } from "react-i18next";
import AnimatedCard from "../../components/AnimatedCard";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
import LocalizedLink from "../../components/LocalizedLink";

export default function Services({ data, cta }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  if (!data) return null;

  const settings = data["settings"];
  const localizedTitle = settings?.[isAr ? "1" : "0"]?.value;
  const highlightTitle = localizedTitle || data["Text Element 2"]?.value;
  const headerTitle = data["Text Element 2"]?.value;
  const headerDesc = data["Text Element 3"]?.value;
  const badgeText = data["Text Element 1"]?.value;


  const servicesList = [
    {
      title: data["Text Element 4"]?.value || "Distribution",
      link: "Distribution",
      desc: data["Text Element 5"]?.value || "Efficient distribution network covering retail, wholesale, and key accounts across Syria.",
      icon: (
        <svg width="27" height="20" viewBox="0 0 27 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.55698 16.25C9.46093 16.95 9.2168 17.5875 8.82459 18.1625C8.43239 18.7375 7.93613 19.1875 7.33582 19.5125C6.73551 19.8375 6.09117 20 5.40281 20C4.71445 20 4.07012 19.8375 3.46981 19.5125C2.86949 19.1875 2.37324 18.7375 1.98103 18.1625C1.58883 17.5875 1.3447 16.95 1.24865 16.25H0V1.25C0 0.9 0.11606 0.604166 0.348181 0.362499C0.580302 0.120832 0.86445 0 1.20063 0H18.0094C18.3456 0 18.6297 0.120832 18.8618 0.362499C19.0939 0.604166 19.21 0.9 19.21 1.25V3.75H22.8119L26.4137 8.825V16.25H23.9645C23.8684 16.95 23.6243 17.5875 23.2321 18.1625C22.8399 18.7375 22.3436 19.1875 21.7433 19.5125C21.143 19.8375 20.4987 20 19.8103 20C19.122 20 18.4776 19.8375 17.8773 19.5125C17.277 19.1875 16.7807 18.7375 16.3885 18.1625C15.9963 17.5875 15.7522 16.95 15.6561 16.25H9.55698ZM16.8088 2.5H2.40125V12.575C2.78545 12.1583 3.23769 11.8333 3.75796 11.6C4.27823 11.3667 4.82651 11.25 5.40281 11.25C6.23525 11.25 6.99164 11.4792 7.67199 11.9375C8.35235 12.3958 8.86061 13 9.19679 13.75H16.0163C16.2084 13.3167 16.4726 12.925 16.8088 12.575V2.5ZM19.21 10H24.0125V9.65L21.6112 6.25H19.21V10ZM19.8103 17.5C20.1945 17.5 20.5427 17.3833 20.8549 17.15C21.167 16.9167 21.3871 16.6167 21.5152 16.25C21.5792 16.05 21.6112 15.8417 21.6112 15.625C21.6112 15.1083 21.4352 14.6667 21.083 14.3C20.7308 13.9333 20.3066 13.75 19.8103 13.75C19.3141 13.75 18.8898 13.9333 18.5377 14.3C18.1855 14.6667 18.0094 15.1083 18.0094 15.625C18.0094 15.8417 18.0414 16.05 18.1054 16.25C18.2335 16.6167 18.4536 16.9167 18.7658 17.15C19.0779 17.3833 19.4261 17.5 19.8103 17.5ZM7.20375 15.625C7.20375 15.1083 7.02766 14.6667 6.67548 14.3C6.32329 13.9333 5.89907 13.75 5.40281 13.75C4.90655 13.75 4.48233 13.9333 4.13015 14.3C3.77797 14.6667 3.60188 15.1083 3.60188 15.625C3.60188 15.8417 3.63389 16.05 3.69793 16.25C3.82599 16.6167 4.04611 16.9167 4.35827 17.15C4.67043 17.3833 5.01861 17.5 5.40281 17.5C5.78701 17.5 6.13519 17.3833 6.44736 17.15C6.75952 16.9167 6.97963 16.6167 7.1077 16.25C7.17173 16.05 7.20375 15.8417 7.20375 15.625Z" fill="white" />
        </svg>
      ),
      iconBg: "bg-[#4B4F54]",
    },
    {
      title: data["Text Element 7"]?.value || "Logistics",
      link: "Logistics",
      desc: data["Text Element 8"]?.value || "Reliable warehousing and inventory management with real-time tracking systems.",
      icon: (
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5002 0L23.0004 6.9318V20.7954L11.5002 27.7272L0 20.7954V6.9318L11.5002 0ZM3.63163 7.66279L11.5002 12.4016L19.3687 7.66279L11.5002 2.92396L3.63163 7.66279ZM2.42109 9.85576V19.3334L10.2896 24.0975V14.5946L2.42109 9.85576ZM12.7107 24.0723L20.5793 19.3334V9.85576L12.7107 14.5946V24.0723Z" fill="black" />
        </svg>
      ),
      iconBg: "bg-[#F7E326]",
    },
    {
      title: data["Text Element 10"]?.value || "Merchandising",
      link: "Merchandising",
      desc: data["Text Element 11"]?.value || "Professional shelf management and visibility solutions to boost sales results.",
      icon: (
        <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.0125 14.05V22.5H25.2131V25H1.20063V22.5H2.40125V14.05C1.66487 13.5333 1.08056 12.8667 0.648337 12.05C0.216113 11.2333 0 10.3417 0 9.375C0 8.325 0.256133 7.36667 0.7684 6.5L4.01009 0.625C4.12215 0.424999 4.27022 0.270832 4.45432 0.1625C4.63841 0.0541668 4.84252 0 5.06664 0H21.3471C21.5712 0 21.7753 0.0541668 21.9594 0.1625C22.1435 0.270832 22.2916 0.424999 22.4037 0.625L25.6453 6.475C26.1576 7.35833 26.4137 8.325 26.4137 9.375C26.4137 10.3417 26.1976 11.2333 25.7654 12.05C25.3332 12.8667 24.7489 13.5333 24.0125 14.05ZM21.6112 14.975C21.4192 14.9917 21.219 15 21.0109 15C20.2585 15 19.5462 14.85 18.8738 14.55C18.2015 14.25 17.6172 13.825 17.1209 13.275C16.6086 13.825 16.0163 14.25 15.344 14.55C14.6716 14.85 13.9593 15 13.2069 15C12.4545 15 11.7421 14.85 11.0698 14.55C10.3974 14.25 9.81311 13.825 9.31685 13.275C8.80458 13.825 8.21228 14.25 7.53993 14.55C6.86758 14.85 6.1552 15 5.40281 15C5.1947 15 4.9946 14.9917 4.8025 14.975V22.5H21.6112V14.975ZM5.73899 2.5L2.83348 7.775C2.54533 8.25833 2.40125 8.7875 2.40125 9.3625C2.40125 9.9375 2.53732 10.4625 2.80946 10.9375C3.0816 11.4125 3.44579 11.7917 3.90203 12.075C4.35827 12.3583 4.85853 12.5 5.40281 12.5C6.02714 12.5 6.59143 12.3208 7.09569 11.9625C7.59996 11.6042 7.96415 11.125 8.18826 10.525C8.31633 10.1917 8.53244 9.9625 8.8366 9.8375C9.14076 9.7125 9.44892 9.7125 9.76108 9.8375C10.0732 9.9625 10.2934 10.1917 10.4214 10.525C10.6455 11.125 11.0097 11.6042 11.514 11.9625C12.0183 12.3208 12.5826 12.5 13.2069 12.5C13.8312 12.5 14.3955 12.3208 14.8998 11.9625C15.404 11.6042 15.7682 11.125 15.9923 10.525C16.1204 10.1917 16.3365 9.9625 16.6407 9.8375C16.9448 9.7125 17.253 9.7125 17.5651 9.8375C17.8773 9.9625 18.0974 10.1917 18.2255 10.525C18.4496 11.125 18.8138 11.6042 19.3181 11.9625C19.8223 12.3208 20.3866 12.5 21.0109 12.5C21.5552 12.5 22.0555 12.3583 22.5117 12.075C22.968 11.7917 23.3321 11.4125 23.6043 10.9375C23.8764 10.4625 24.0125 9.9375 24.0125 9.3625C24.0125 8.7875 23.8684 8.25 23.5803 7.75L20.6748 2.5H5.73899Z" fill="white" />
        </svg>
      ),
      iconBg: "bg-[#4B4F54]",
    },
    {
      title: data["Text Element 13"]?.value || "Marketing Solutions",
      link: "Marketing",
      desc: data["Text Element 14"]?.value || "Dynamic marketing strategies to enhance brand awareness and market share.",
      icon: (
        <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.45461 0V20.4444H22.0915V23H0V0H2.45461ZM21.2324 4.21667L22.9752 6.00556L15.955 13.3144L12.2731 9.48111L7.02019 14.95L5.27741 13.1611L12.2731 5.85222L15.955 9.68555L21.2324 4.21667Z" fill="black" />
        </svg>
      ),
      iconBg: "bg-[#F7E326]",
    },
  ];


  const cta1 = cta["Text Element 1"]?.value
  const cta2 = cta["Text Element 2"]?.value
  const cta3 = cta["Text Element 3"]?.value

  return (
    <section
      id="services"
      className="py-16 sm:py-24 lg:py-[120px] relative overflow-hidden"
      style={{
        background: "rgba(247, 227, 38, 0.08) "
      }}
    >
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F7E326] opacity-[0.2] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7E326] opacity-[0.2] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:mb-16">
            {badgeText && (
              <span className="px-[20px] py-[8px] bg-[#4B4F54] text-sm text-white rounded-full font-bold tracking-wider inline-block">
                {badgeText}
              </span>
            )}
            <div className="mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-4 text-center">
                {headerTitle}
                <span className="text-[#4B4F54]">
                  {" "}{highlightTitle}
                </span>
              </h2>
              <p className="text-base sm:text-lg lg:text-[20px] text-[#4B4F54] font-medium max-w-[800px] mx-auto text-center">
                {headerDesc}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesList.map((service, index) => (
            <StaggerItem key={index}>
              <AnimatedCard
                className="group bg-white border-s-4  border-gray-200 hover:border-brand-yellow p-8 rounded-2xl h-full block hover:shadow-lg transition-all duration-500 ease-in-out"
              >
                <div className={`icon-hover w-14 h-14 flex items-center justify-center rounded-xl mb-6 ${service.iconBg}`}>
                  {service.icon}
                </div>
                <h3 className="text-[24px] font-bold text-black mb-4">
                  {service.title}
                </h3>
                <p className="text-base text-[#4B4F54] leading-relaxed mb-6">
                  {service.desc}
                </p>
                <LocalizedLink
                  href={`/services/${service.link.toLowerCase()}`}
                  className="inline-flex items-center gap-2 text-black font-bold group-hover:text-[#4B4F54]"
                >
                  {t("learn_more") || "Learn More"}
                  <svg
                    className={`${isAr ? "group-hover:-translate-x-1 rotate-180" : "group-hover:translate-x-1"} transition-transform`}
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z"
                      fill="currentColor"
                    />
                  </svg>
                </LocalizedLink>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2}>
          <div className="mt-12 sm:mt-16 flex-col bg-[#000000] rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-12 flex justify-between items-center gap-8 text-center">
            <div className="text-white">
              <h3 className="text-2xl sm:text-[30px] font-bold mb-2">
                {cta1}
              </h3>
              <p className="text-lg sm:text-[20px] w-full text-white/80 max-w-xl mx-auto md:mx-0">
                {cta2}
              </p>
            </div>
            {cta3 && (
              <LocalizedLink
                href="/contact"
                className="mask-btn mask-btn--yellow-white"
              >
                <span className="mask-btn__label">{cta3}</span>
                <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                  {cta3}
                </span>
              </LocalizedLink>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
