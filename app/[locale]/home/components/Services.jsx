"use client";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";

export default function Services({ data, cta }) {
  const { i18n } = useTranslation();

  if (!data) return null;

  // استخراج بيانات الـ CTA
  const cta1 = cta?.["Text Element 1"]?.value;
  const cta2 = cta?.["Text Element 2"]?.value;
  const cta3 = cta?.["Text Element 3"]?.value;

  const badgeText = data["Text Element 1"]?.value;

  // قائمة الخدمات الأساسية
  const servicesList = [
    {
      title: data["Text Element 4"]?.value || "Distribution",
      link: "Distribution",
      desc: data["Text Element 5"]?.value || "Efficient distribution network covering retail, wholesale, and key accounts.",
      leftBg: "#f7f6f2",
      iconColor: "#F7E326",
    },
    {
      title: data["Text Element 7"]?.value || "Logistics",
      link: "Logistics",
      desc: data["Text Element 8"]?.value || "Reliable warehousing and inventory management with real-time tracking.",
      leftBg: "#4B4F54",
      iconColor: "black",
    },
    {
      title: data["Text Element 10"]?.value || "Merchandising",
      link: "professional-sales",
      desc: data["Text Element 11"]?.value || "Professional shelf management and visibility solutions to boost sales.",
      leftBg: "#4B4F54",
      iconColor: "#F7E326",
    },
    {
      title: data["Text Element 13"]?.value || "Marketing",
      link: "Marketing",
      desc: data["Text Element 14"]?.value || "Dynamic marketing strategies to enhance brand awareness and market share.",
      leftBg: "#f7f6f2",
      iconColor: "black",
    },
  ];

  return (
    <div id="services" className="w-full overflow-hidden bg-[#4B4F54]">
      {/* 1. Main Section Header describing the services for the user */}
      <div className="w-full px-6 sm:px-12 lg:px-20 xl:px-28 pt-20 pb-12 bg-black text-white">
        <div className="max-w-5xl">

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            {badgeText}
          </h2>
          <div className="w-12 h-1 bg-brand-yellow rounded-full mb-6" />
        </div>
      </div>

      {/* 2. 4 Services in a 2x2 grid (Direct, no scrolling/wiping animation, NO repeated title) */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {servicesList.map((service, i) => {
          const isLight = service.leftBg !== "#4B4F54";
          const textColor = isLight ? "#4B4F54" : "#ffffff";

          return (
            <div
              key={i}
              style={{ background: service.leftBg, color: textColor }}
              className="w-full flex flex-col justify-center px-6 sm:px-12 lg:px-20 xl:px-28 py-16 sm:py-24 relative overflow-hidden min-h-[45vh]"
            >

              <h3 style={{ color: textColor, fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }} className="font-black leading-none tracking-tight mb-5 sm:mb-7">
                {service.title}
              </h3>

              <p style={{ color: textColor }} className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-md mb-8 sm:mb-10">
                {service.desc}
              </p>

              <LocalizedLink href={`/services/${service.link.toLowerCase()}`} className="inline-flex items-center gap-3 group w-fit">
                <span style={{ color: textColor }} className="text-sm font-bold tracking-widest uppercase">
                  {i18n.t?.("learn_more") || "Learn More"}
                </span>
                <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                  </svg>
                </span>
              </LocalizedLink>
            </div>
          );
        })}
      </div>

      {/* 3. 5th Item (CTA Section directly under the 2x2 grid, NO repeated title) */}
      {cta1 && (
        <div
          style={{ background: "#f7f6f2", color: "#4B4F54" }}
          className="w-full flex flex-col items-center justify-center text-center px-6 sm:px-12 lg:px-20 xl:px-28 py-20 sm:py-28 relative overflow-hidden border-t border-black/10"
        >

          <h2 style={{ color: "#4B4F54", fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }} className="font-black leading-none tracking-tight mb-5 sm:mb-7 max-w-5xl mx-auto">
            {cta1}
          </h2>
          <div className="w-10 h-0.75 bg-brand-yellow rounded-full mb-5 sm:mb-7 mx-auto" />

          {cta2 && (
            <p className="text-brand-charcoal text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8 sm:mb-10 mx-auto">
              {cta2}
            </p>
          )}

          {cta3 && (
            <LocalizedLink href="/contact" className="circle-btn mx-auto mt-4">
              <span className="circle-btn__wave" />
              <div className="circle-btn__content">
                <span className="circle-btn__label">
                  {cta3}
                </span>
                <span className="circle-btn__icon">
                  <svg width="14" height="14" viewBox="0 0 11 11" fill="none">
                    <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="currentColor" />
                  </svg>
                </span>
              </div>
            </LocalizedLink>
          )}
        </div>
      )}
    </div>
  );
}