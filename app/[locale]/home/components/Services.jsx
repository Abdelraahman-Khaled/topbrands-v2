"use client";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocalizedLink from "../../components/LocalizedLink";

gsap.registerPlugin(ScrollTrigger);

export default function Services({ data, cta }) {
  const { i18n } = useTranslation();
  const sectionRef = useRef(null);

  // استخراج بيانات الـ CTA
  const cta1 = cta?.["Text Element 1"]?.value;
  const cta2 = cta?.["Text Element 2"]?.value;
  const cta3 = cta?.["Text Element 3"]?.value;

  useEffect(() => {
    let ctx;
    const id = setTimeout(() => {
      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray(".service-card", sectionRef.current);
        const sliding = cards.slice(1);

        gsap.set(sliding, { x: "100%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });

        sliding.forEach((card) => {
          tl.to(card, { x: "0%", ease: "none", duration: 1 });
        });
      }, sectionRef);
    }, 250);

    return () => {
      clearTimeout(id);
      ctx?.revert();
    };
  }, []);

  if (!data) return null;

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
      leftBg: "#0f0f0f",
      iconColor: "black",
    },
    {
      title: data["Text Element 10"]?.value || "Merchandising",
      link: "Merchandising",
      desc: data["Text Element 11"]?.value || "Professional shelf management and visibility solutions to boost sales.",
      leftBg: "#f7f6f2",
      iconColor: "#F7E326",
    },
    {
      title: data["Text Element 13"]?.value || "Marketing",
      link: "Marketing",
      desc: data["Text Element 14"]?.value || "Dynamic marketing strategies to enhance brand awareness and market share.",
      leftBg: "#0f0f0f",
      iconColor: "black",
    },
  ];

  // حساب عدد العناصر الكلي (الخدمات + الـ CTA إذا وُجد) لضبط ارتفاع الـ scroll
  const totalSlides = cta1 ? servicesList.length + 1 : servicesList.length;
  const scrollHeight = `${totalSlides * 100 + 100}vh`;

  return (
    <div ref={sectionRef} id="services" style={{ height: scrollHeight }}>
      <section style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        
        {/* Render Services */}
        {servicesList.map((service, i) => {
          const isLight = service.leftBg !== "#0f0f0f";
          const textColor = isLight ? "#0f0f0f" : "#ffffff";

          return (
            <div
              key={i}
              className={`service-card${i > 0 ? " service-card-offscreen" : ""}`}
              style={{ position: "absolute", inset: 0, display: "flex", zIndex: i }}
            >
              <div
                style={{ background: service.leftBg, color: textColor }}
                className="w-full flex flex-col justify-center px-10 sm:px-14 lg:px-20 xl:px-28 relative overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  style={{ color: textColor, opacity: 0.04, fontSize: "clamp(160px, 22vw, 300px)", lineHeight: 1 }}
                  className="absolute right-0 bottom-0 font-black select-none pointer-events-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span style={{ color: textColor, opacity: 0.35 }} className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6">
                  {badgeText || "OUR SERVICES"} — {String(i + 1).padStart(2, "0")}
                </span>

                <div className="w-10 h-0.75 bg-brand-yellow rounded-full mb-7" />

                <h2 style={{ color: textColor, fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }} className="font-black leading-[0.88] tracking-tight mb-7">
                  {service.title}
                </h2>

                <p style={{ color: textColor, opacity: 0.6 }} className="text-base lg:text-lg leading-relaxed max-w-md mb-10">
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
            </div>
          );
        })}

        {/* CTA — same style as service cards, alternates to light */}
        {cta1 && (
          <div
            className="service-card service-card-offscreen"
            style={{ position: "absolute", inset: 0, display: "flex", zIndex: servicesList.length }}
          >
            <div
              style={{ background: "#f7f6f2", color: "#0f0f0f" }}
              className="w-full flex flex-col justify-center px-10 sm:px-14 lg:px-20 xl:px-28 relative overflow-hidden"
            >
              {/* Faint large number */}
              <span
                aria-hidden="true"
                style={{ color: "#0f0f0f", opacity: 0.04, fontSize: "clamp(160px, 22vw, 300px)", lineHeight: 1 }}
                className="absolute right-0 bottom-0 font-black select-none pointer-events-none"
              >
                {String(servicesList.length + 1).padStart(2, "0")}
              </span>

              {/* Step label */}
              <span style={{ color: "#0f0f0f", opacity: 0.35 }} className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6">
                {badgeText || "OUR SERVICES"} — {String(servicesList.length + 1).padStart(2, "0")}
              </span>

              {/* Yellow rule */}
              <div className="w-10 h-0.75 bg-brand-yellow rounded-full mb-7" />

              {/* Headline */}
              <h2 style={{ color: "#0f0f0f", fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }} className="font-black leading-[0.88] tracking-tight mb-7">
                {cta1}
              </h2>

              {/* Sub-text */}
              {cta2 && (
                <p style={{ color: "#0f0f0f", opacity: 0.6 }} className="text-base lg:text-lg leading-relaxed max-w-md mb-10">
                  {cta2}
                </p>
              )}

              {/* CTA button */}
              {cta3 && (
                <LocalizedLink href="/contact" className="inline-flex items-center gap-3 group w-fit">
                  <span style={{ color: "#0f0f0f" }} className="text-sm font-bold tracking-widest uppercase">
                    {cta3}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                    </svg>
                  </span>
                </LocalizedLink>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}