"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import LocalizedLink from "../../components/LocalizedLink";


export default function Testimonials() {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: t("testimonial_1_name"),
      position: t("testimonial_1_pos"),
      company: t("testimonial_1_company"),
      image:
        "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20businessman%20in%20modern%20office%20smiling%20confident%20portrait%20business%20attire%20clean%20background&width=400&height=400&seq=test1&orientation=squarish",
      rating: 5,
      text: t("testimonial_1_text"),
      color: "from-[#14B8A6] to-[#0D9488]",
    },
    {
      id: 2,
      name: t("testimonial_2_name"),
      position: t("testimonial_2_pos"),
      company: t("testimonial_2_company"),
      image:
        "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20businesswoman%20in%20modern%20office%20smiling%20confident%20portrait%20business%20attire%20clean%20background&width=400&height=400&seq=test2&orientation=squarish",
      rating: 5,
      text: t("testimonial_2_text"),
      color: "from-[#FF6B6B] to-[#EE5A52]",
    },
    {
      id: 3,
      name: t("testimonial_3_name"),
      position: t("testimonial_3_pos"),
      company: t("testimonial_3_company"),
      image:
        "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20businessman%20smiling%20friendly%20portrait%20modern%20retail%20environment%20business%20casual%20attire%20clean%20background&width=400&height=400&seq=test3&orientation=squarish",
      rating: 5,
      text: t("testimonial_3_text"),
      color: "from-[#F7E326] to-[#E5D324]",
    },
    {
      id: 4,
      name: t("testimonial_4_name"),
      position: t("testimonial_4_pos"),
      company: t("testimonial_4_company"),
      image:
        "https://readdy.ai/api/search-image?query=professional%20middle%20eastern%20businesswoman%20confident%20smiling%20portrait%20modern%20store%20environment%20business%20attire%20clean%20background&width=400&height=400&seq=test4&orientation=squarish",
      rating: 5,
      text: t("testimonial_4_text"),
      color: "from-[#14B8A6] to-[#0D9488]",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#DEE3EB] via-white to-[#DEE3EB] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F7E326]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-6 py-2 bg-[#F7E326] text-[#000000] rounded-full text-sm font-bold uppercase tracking-wider">
              {t("client_stories")}
            </span>
          </div>
          <h2 className="text-5xl font-bold text-[#000000] mb-4">
            {t("what_partners_say")}
          </h2>
          <p className="text-xl text-[#4B4F54] font-medium max-w-2xl mx-auto">
            {t("trusted_by_thousands")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group card-hover bg-white rounded-2xl p-8 shadow-md cursor-pointer border-2 border-transparent"
              onClick={() => setActiveIndex(index)}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-full blur-md opacity-50`}
                  ></div>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover object-top border-4 border-white relative z-10"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#000000] mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[#4B4F54] font-semibold mb-2">
                    {testimonial.position}
                  </p>
                  <p className="text-sm text-[#14B8A6] font-bold">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i
                    key={i}
                    className="ri-star-fill text-[#F7E326] text-xl"
                  ></i>
                ))}
              </div>

              <p className="text-[#4B4F54] text-lg leading-relaxed font-medium">
                "{testimonial.text}"
              </p>

              <div className="mt-6 pt-6 border-t border-[#DEE3EB]">
                <div className="flex items-center gap-2 text-[#14B8A6]">
                  <i className="ri-checkbox-circle-fill text-xl"></i>
                  <span className="text-sm font-bold">
                    {t("verified_partner")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#000000] to-[#1a1a1a] rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F7E326] rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#14B8A6] rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold text-white mb-4">
              {t("ready_to_join")}
            </h3>
            <p className="text-xl text-gray-300 mb-8 font-medium">
              {t("partner_leading_fmcg")}
            </p>
            <LocalizedLink
              href="/become-a-partner"
              className="mask-btn mask-btn--yellow-white"
            >
              <span className="mask-btn__label">{t("become_partner")}</span>
              <span className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                {t("become_partner")}
              </span>
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
