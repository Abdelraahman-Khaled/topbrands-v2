"use client";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import LocalizedLink from "./LocalizedLink";
import { useCompany } from "./CompanyProvider";

export default function Footer() {
  const { t } = useTranslation();
  const { companyData } = useCompany();

  const socialLinks = [
    { icon: "ri-linkedin-fill",  href: companyData?.linkedin_url  || "#" },
    { icon: "ri-facebook-fill",  href: companyData?.facebook_url  || "#" },
    { icon: "ri-instagram-line", href: companyData?.instagram_url || "#" },
    { icon: "ri-twitter-x-fill", href: companyData?.twitter_url   || "#" },
    {
      icon: "ri-whatsapp-line",
      href: `https://wa.me/${(companyData?.whatsapp_number || "").replace(/\s/g, "")}`,
    },
  ];

  const navCols = [
    {
      heading: t("company"),
      links: [
        { label: t("about"),          href: "/about" },
        { label: t("services"),       href: "/services" },
        { label: t("brand_portfolio"),href: "/brands" },
        { label: t("contact_us"),     href: "/contact" },
      ],
    },
    {
      heading: t("services"),
      links: [
        { label: t("Advanced_Logistics"),   href: "/services/logistics" },
        { label: t("professional_sales"),   href: "/services/professional-sales" },
        { label: t("distribution"),         href: "/services/distribution" },
        { label: t("marketing_service"),    href: "/services/marketing" },
      ],
    },
    {
      heading: t("legal"),
      links: [
        { label: t("privacy_policy"),   href: "/privacy-policy" },
        { label: t("terms_conditions"), href: "/terms-conditions" },
        { label: t("cookie_policy"),    href: "/cookie-policy" },
        { label: t("faq"),              href: "/faq" },
      ],
    },
  ];

  return (
    <footer style={{ background: "#0f0f0f" }} className="relative overflow-hidden">

      {/* ── Big wordmark background ── */}
      <span
        aria-hidden="true"
        style={{
          fontSize: "clamp(120px, 20vw, 280px)",
          color: "rgba(255,255,255,0.025)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
        className="absolute left-0 top-0 font-black uppercase select-none pointer-events-none leading-none"
      >
        TOP<br />BRANDS
      </span>

      <div className="relative z-10 px-10 sm:px-14 lg:px-20 xl:px-28 pt-24 pb-10">

        {/* ── Top row: logo + newsletter ── */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 pb-16 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>

          {/* Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <LocalizedLink href="/">
              <img src="/images/logo.webp" alt="Top Brands Syria" className="h-9 w-auto mb-4 brightness-0 invert" />
            </LocalizedLink>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("leading_fmcg")}
            </p>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:max-w-sm w-full"
          >
            <span
              className="text-xs font-bold tracking-[4px] uppercase font-mono mb-4 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {t("footer_stay_updated") || "STAY UPDATED"}
            </span>
            <div className="w-8 h-0.75 bg-brand-yellow rounded-full mb-5" />
            <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("stay_updated_desc") || "Get the latest news from Top Brands Syria."}
            </p>
            <form
              className="flex items-end gap-4 border-b pb-3"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
              onSubmit={e => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={t("enter_email") || "Your email"}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder-white/25"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110"
              >
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                  <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>

        {/* ── Nav columns ── */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 py-16 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          {navCols.map((col, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: ci * 0.07 }}
            >
              <h4
                className="text-xs font-bold tracking-[4px] uppercase font-mono mb-6"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, li) => (
                  <li key={li}>
                    <LocalizedLink
                      href={link.href}
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#ffffff"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                    >
                      {link.label}
                    </LocalizedLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom bar: copyright + socials ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8">
          <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Top Brands Syria. {t("all_rights_reserved")}.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)" }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#F7E326";
                  e.currentTarget.style.borderColor = "#F7E326";
                  e.currentTarget.style.color = "#000000";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                }}
              >
                <i className={`${social.icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
