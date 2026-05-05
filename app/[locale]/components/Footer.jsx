"use client";
import { useTranslation } from "react-i18next";
import ScrollReveal from "./ScrollReveal";
import StaggerContainer from "./StaggerContainer";
import StaggerItem from "./StaggerItem";
import LocalizedLink from "./LocalizedLink";
import { useCompany } from "./CompanyProvider";

export default function Footer() {
  const { t } = useTranslation();
  const { companyData } = useCompany();

  const socialLinks = [
    { icon: "ri-linkedin-fill", href: companyData?.linkedin_url || "#" },
    { icon: "ri-facebook-fill", href: companyData?.facebook_url || "#" },
    { icon: "ri-instagram-line", href: companyData?.instagram_url || "#" },
    { icon: "ri-twitter-x-fill", href: companyData?.twitter_url || "#" },
    { icon: "ri-whatsapp-line", href: `https://wa.me/${companyData?.whatsapp_number?.replace(/\s/g, "")}` }
  ];

  return (
    <footer className="bg-white text-[#4B4F54]  relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-16 pb-8">

        {/* Top Section: Logo & Tagline */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-8 border-b border-[#D1D5DB]">
            <LocalizedLink href="/" className="mb-4 md:mb-0 cursor-pointer">
              <img
                src="/images/footer.webp"
                alt="Top Brands Syria"
                className="h-10 w-auto"
              />
            </LocalizedLink>
            <p className="text-sm md:text-base font-medium text-gray-400">
              {t("leading_fmcg")}
            </p>
          </div>
        </ScrollReveal>

        {/* Main Grid: 4 Columns */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-8">

          {/* Company Column */}
          <StaggerItem>
            <h4 className="text-base font-bold text-brand-jet mb-6  tracking-wider">{t("company")}</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedLink href="/about" className="text-sm  hover:text-black transition-colors cursor-pointer">
                  {t("about")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("services")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/brands" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("brand_portfolio")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/contact" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("contact_us")}
                </LocalizedLink>
              </li>
            </ul>
          </StaggerItem>

          {/* Services Column */}
          <StaggerItem>
            <h4 className="text-base font-bold text-brand-jet mb-6  tracking-wider">{t("services")}</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedLink href="/services/logistics" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("Advanced_Logistics")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/professional-sales" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("professional_sales")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/distribution" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("distribution")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/services/marketing" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("marketing_service")}
                </LocalizedLink>
              </li>
            </ul>
          </StaggerItem>

          {/* Legal Column */}
          <StaggerItem>
            <h4 className="text-base font-bold text-brand-jet mb-6  tracking-wider">{t("legal")}</h4>
            <ul className="space-y-3">
              <li>
                <LocalizedLink href="/privacy-policy" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("privacy_policy")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/terms-conditions" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("terms_conditions")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/cookie-policy" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("cookie_policy")}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink href="/faq" className="text-sm hover:text-black transition-colors cursor-pointer">
                  {t("faq")}
                </LocalizedLink>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-1">
            <h4 className="text-base font-bold text-brand-jet mb-6 tracking-wide">{t("footer_stay_updated")}</h4>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {t("stay_updated_desc") || "Get the latest news from Top Brands Syria."}
            </p>
            <form className="flex flex-col sm:flex-row w-full max-w-md rounded-xl sm:rounded-xl border border-gray-200 overflow-hidden shadow-sm bg-white focus-within:ring-2 focus-within:ring-brand-yellow/30 transition-all">
              <input
                type="email"
                placeholder={t("enter_email")}
                className="flex-1 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-300 min-w-0"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#F7E326] text-black font-bold text-sm transition-all duration-300 cursor-pointer hover:bg-black hover:text-[#F7E326] whitespace-nowrap w-full sm:w-auto"
              >
                {t("subscribe")}
              </button>
            </form>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom Section: Copyright & Socials */}
        <StaggerItem>
          <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-[#D1D5DB] gap-6">
            <p className="text-xs text-brand-charcoal font-normal">
              © {new Date().getFullYear()} Top Brands Syria. {t("all_rights_reserved")}.
            </p>

            <div className="flex items-center gap-2 rtl:space-x-reverse">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#F7E326] hover:border-[#F7E326] hover:text-black transition-all duration-300"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>
        </StaggerItem>
      </div>
    </footer>
  );
}
