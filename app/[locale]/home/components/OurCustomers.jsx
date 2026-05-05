"use client"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Store, MapPin, Truck, Heart } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import StaggerContainer from "../../components/StaggerContainer";
import StaggerItem from "../../components/StaggerItem";
export default function OurCustomers() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const customers = [
    {
      name: "Union Coop",
      logo: "https://readdy.ai/api/search-image?query=Union%20Coop%20retail%20supermarket%20logo%20modern%20clean%20design%20professional%20brand%20identity&width=300&height=200&seq=customer-union-001&orientation=landscape",
      description: t("retail_coop"),
    },
    {
      name: "Spinneys",
      logo: "https://readdy.ai/api/search-image?query=Spinneys%20supermarket%20logo%20premium%20retail%20brand%20modern%20professional%20design&width=300&height=200&seq=customer-spinneys-001&orientation=landscape",
      description: t("premium_supermarket"),
    },
    {
      name: "Safari Mall",
      logo: "https://readdy.ai/api/search-image?query=Safari%20Mall%20shopping%20center%20logo%20modern%20retail%20brand%20professional%20design&width=300&height=200&seq=customer-safari-001&orientation=landscape",
      description: t("modern_shopping"),
    },
    {
      name: "Dubai Duty Free",
      logo: "https://readdy.ai/api/search-image?query=Dubai%20Duty%20Free%20logo%20airport%20retail%20brand%20professional%20modern%20design&width=300&height=200&seq=customer-ddf-001&orientation=landscape",
      description: t("world_class_duty_free"),
    },
    {
      name: "Carrefour",
      logo: "https://readdy.ai/api/search-image?query=Carrefour%20supermarket%20logo%20international%20retail%20brand%20modern%20professional%20design&width=300&height=200&seq=customer-carrefour-001&orientation=landscape",
      description: t("global_retail_leader"),
    },
    {
      name: "Lulu Hypermarket",
      logo: "https://readdy.ai/api/search-image?query=Lulu%20Hypermarket%20logo%20retail%20supermarket%20brand%20modern%20professional%20design&width=300&height=200&seq=customer-lulu-001&orientation=landscape",
      description: t("leading_hypermarket"),
    },
    {
      name: "Al Maya",
      logo: "https://readdy.ai/api/search-image?query=Al%20Maya%20supermarket%20logo%20retail%20brand%20modern%20professional%20design&width=300&height=200&seq=customer-almaya-001&orientation=landscape",
      description: t("trusted_retail_partner"),
    },
    {
      name: "Choithrams",
      logo: "https://readdy.ai/api/search-image?query=Choithrams%20supermarket%20logo%20retail%20brand%20modern%20professional%20design&width=300&height=200&seq=customer-choithrams-001&orientation=landscape",
      description: t("premium_grocery_store"),
    },
  ];

  const stats = [
    {
      id: 1,
      icon: <Store className="w-6 h-6 text-white" />,
      number: "15000+",
      label: "Retail Partners",
      iconBg: "bg-[#4B4F54]", // لون رمادي غامق
    },
    {
      id: 2,
      icon: <MapPin className="w-6 h-6 text-black" />,
      number: "14",
      label: "Governorates",
      iconBg: "bg-[#F7E326]", // لون أصفر
    },
    {
      id: 3,
      icon: <Truck className="w-6 h-6 text-black" />,
      number: "98%",
      label: "Delivery Rate",
      iconBg: "bg-[#F7E326]", // لون أصفر
    },
    {
      id: 4,
      icon: <Heart className="w-6 h-6 text-white" />,
      number: "99%",
      label: "Satisfaction",
      iconBg: "bg-[#4B4F54]", // لون رمادي غامق
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % customers.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [customers.length]);

  return (
    <section
      className="py-12 sm:py-24 relative overflow-hidden"
      style={{
        background: "rgba(247, 227, 38, 0.08) ",
      }}
    >
      {/* Decorative vectors from DIV-230/DIV-231 */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#F7E326] opacity-[0.2] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F7E326] opacity-[0.2] rounded-full blur-[120px] pointer-events-none"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#14B8A6]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#F7E326]/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex justify-center items-center  mb-4">
              <span className="flex gap-3 items-center justify-center px-5 py-3 text-[#4B4F54] bg-linear-to-r from-[#14B8A61A] to-[#0D94881A]  rounded-full text-sm font-bold uppercase tracking-wider">
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4125 8.43V13.5H15.1331V15H0.720625V13.5H1.44125V8.43C0.999267 8.12 0.648562 7.72 0.389138 7.23C0.129712 6.74 0 6.205 0 5.625C0 4.995 0.153733 4.42 0.4612 3.9L2.40689 0.375C2.47415 0.255 2.56302 0.1625 2.67352 0.0975008C2.78401 0.0325003 2.90652 0 3.04104 0H12.8127C12.9472 0 13.0697 0.0325003 13.1802 0.0975008C13.2907 0.1625 13.3796 0.255 13.4469 0.375L15.3925 3.885C15.7 4.415 15.8538 4.995 15.8538 5.625C15.8538 6.205 15.724 6.74 15.4646 7.23C15.2052 7.72 14.8545 8.12 14.4125 8.43ZM12.9712 8.985C12.856 8.995 12.7358 9 12.6109 9C12.1593 9 11.7318 8.91 11.3282 8.73C10.9247 8.55 10.574 8.295 10.2761 7.965C9.96865 8.295 9.61314 8.55 9.20959 8.73C8.80604 8.91 8.37847 9 7.92688 9C7.47528 9 7.04771 8.91 6.64416 8.73C6.24061 8.55 5.88991 8.295 5.59205 7.965C5.28458 8.295 4.92907 8.55 4.52553 8.73C4.12197 8.91 3.6944 9 3.24281 9C3.1179 9 2.9978 8.995 2.8825 8.985V13.5H12.9712V8.985ZM3.44459 1.5L1.70068 4.665C1.52772 4.955 1.44125 5.2725 1.44125 5.6175C1.44125 5.9625 1.52292 6.2775 1.68626 6.5625C1.8496 6.8475 2.06819 7.075 2.34203 7.245C2.61587 7.415 2.91613 7.5 3.24281 7.5C3.61754 7.5 3.95623 7.3925 4.25889 7.1775C4.56156 6.9625 4.78015 6.675 4.91466 6.315C4.99153 6.115 5.12124 5.9775 5.3038 5.9025C5.48636 5.8275 5.67132 5.8275 5.85868 5.9025C6.04604 5.9775 6.17816 6.115 6.25502 6.315C6.38954 6.675 6.60813 6.9625 6.91079 7.1775C7.21346 7.3925 7.55215 7.5 7.92688 7.5C8.3016 7.5 8.64029 7.3925 8.94296 7.1775C9.24562 6.9625 9.46421 6.675 9.59873 6.315C9.67559 6.115 9.8053 5.9775 9.98786 5.9025C10.1704 5.8275 10.3554 5.8275 10.5427 5.9025C10.7301 5.9775 10.8622 6.115 10.9391 6.315C11.0736 6.675 11.2922 6.9625 11.5949 7.1775C11.8975 7.3925 12.2362 7.5 12.6109 7.5C12.9376 7.5 13.2379 7.415 13.5117 7.245C13.7856 7.075 14.0041 6.8475 14.1675 6.5625C14.3308 6.2775 14.4125 5.9625 14.4125 5.6175C14.4125 5.2725 14.326 4.95 14.1531 4.65L12.4092 1.5H3.44459Z"
                    fill="#4B4F54"
                  />
                </svg>{" "}
                {t("Trusted_Partners")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#000000] mb-6">
              {t("our_customers")}
            </h2>
            <p className="text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto font-medium">
              {t("Trusted_Partners_desc")}
            </p>
          </div>
        </ScrollReveal>

        {/* Customers Carousel */}
        <div className="relative mb-12 sm:mb-16">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {customers
              .slice(currentIndex, currentIndex + 8)
              .map((customer, index) => (
                <StaggerItem
                  key={index}
                  className="group card-hover bg-white rounded-2xl p-8 shadow-md border border-transparent"
                >
                  <div className="w-full h-32 flex items-center justify-center mb-4  rounded-xl overflow-hidden">
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#000000] text-center mb-2">
                    {customer.name}
                  </h3>
                  <p className="text-sm text-[#9CA3AF] text-center font-medium">
                    {customer.description}
                  </p>
                </StaggerItem>
              ))}
          </StaggerContainer>

          {/* Indicators */}
          <ScrollReveal delay={0.2}>
            <div className="flex justify-center gap-2 mt-8">
              {customers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all cursor-pointer ${index === currentIndex ? "bg-[#4B4F54] w-8" : "bg-[#DEE3EB]"
                    }`}
                ></button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StaggerItem
              key={stat.id}
              className="card-hover bg-white rounded-[16px] p-6 sm:p-10 flex flex-col items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-50"
            >
              {/* Icon Container */}
              <div
                className={`w-14 h-14 md:w-16 md:h-16 ${stat.iconBg} rounded-[12px] flex items-center justify-center mb-4 md:mb-6`}
              >
                {stat.icon}
              </div>

              {/* Stats Number */}
              <h3 className="text-2xl md:text-[30px] font-bold text-black mb-2">
                {stat.number}
              </h3>

              {/* Label */}
              <p className="text-[#6B7280] text-xs md:text-sm font-medium">{stat.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
