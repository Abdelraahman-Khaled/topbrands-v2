"use client"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter, useParams } from "next/navigation";
import { locales, defaultLocale } from "../i18n/config";
import LocalizedLink from "./LocalizedLink";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params?.locale || defaultLocale;

  const toggleLanguage = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    // Replace the locale prefix in the current pathname
    const pathWithoutLocale = pathname.replace(new RegExp(`^/${currentLocale}`), "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navContainerVariants = {
    hidden: { opacity: 0, y: -40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.4, // Increased from 0.8
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15, // Increased from 0.08
        delayChildren: 0.4 // Increased from 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -15, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 200, damping: 30 } // Softened spring
    }
  };

  const links = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    {
      key: "services",
      href: "/services",
      sublinks: [
        { key: "professional_sales", href: "/services/professional-sales" },
        { key: "distribution_service", href: "/services/distribution" },
        { key: "marketing_service", href: "/services/marketing" },
        { key: "logistics_service", href: "/services/logistics" }
      ]
    },
    { key: "brands", href: "/brands" },
    // { key: "products", href: "/products" },
    { key: "coverage", href: "/market-coverage" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" }
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const mobileItemVariants = {
    closed: { opacity: 0, x: 20, filter: "blur(5px)" },
    open: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navContainerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,padding,shadow] duration-500 ease-out  
        ${isScrolled
          ? "bg-black/85  backdrop-blur-xl shadow-lg py-4"
          : "bg-transparent border-transparent py-5"
        } ${isOpen ? "bg-white/95 !backdrop-blur-3xl" : ""}`}
    >
      <div className=" px-4 sm:px-6 md:px-8 w-full">
        <div className="flex items-center justify-between h-12 relative">
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.97 }}
            className="shrink-0 pe-2"
          >
            <LocalizedLink
              href="/"
              className="flex items-center cursor-pointer shrink-0"
            >
              <img
                src="/images/logo.webp"
                alt="Top Brands Syria"
                className="h-9 xl:h-11 w-auto object-contain shrink-0 transition-all duration-300"
              />
            </LocalizedLink>
          </motion.div>

          {/* Staggered Navigation Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-10">
            {links.map((link) => (
              <motion.div
                key={link.key}
                variants={itemVariants}
                className="relative"
                onMouseEnter={() => link.sublinks && setActiveDropdown(link.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.sublinks ? (
                  <div className="flex items-center gap-1 cursor-pointer py-2">
                    <LocalizedLink
                      href={link.href}
                      className={`relative text-base font-semibold text-white hover:text-brand-yellow tracking-wide transition-colors whitespace-nowrap group ag-hover-effect inline-block`}
                    >
                      {t(link.key)}
                      <motion.span
                        className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-brand-yellow rounded-full transition-all duration-300 group-hover:w-full"
                      />
                    </LocalizedLink>
                    <i className={`ri-arrow-down-s-line text-white transition-transform duration-300 ${activeDropdown === link.key ? "rotate-180" : ""}`}></i>

                    <AnimatePresence>
                      {activeDropdown === link.key && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-3 mt-2 border border-white/20 overflow-hidden"
                        >
                          {link.sublinks.map((sublink) => (
                            <LocalizedLink
                              key={sublink.key}
                              href={sublink.href}
                              className="block px-6 py-3 text-sm font-bold text-gray-800 hover:bg-brand-yellow  transition-transform hover:translate-x-1 transition-all duration-300"
                            >
                              {t(sublink.key)}
                            </LocalizedLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <LocalizedLink
                    href={link.href}
                    className={`relative text-base font-semibold text-white hover:text-brand-yellow tracking-wide transition-colors whitespace-nowrap cursor-pointer group ag-hover-effect inline-block`}
                  >
                    {t(link.key)}
                    <motion.span
                      className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-brand-yellow rounded-full  transition-all duration-300 group-hover:w-full"
                    />
                  </LocalizedLink>
                )}
              </motion.div>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <motion.div
            className="hidden xl:flex items-center gap-2 xl:gap-3 shrink-0"
            variants={itemVariants}
          >
            <motion.button
              onClick={toggleLanguage}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1.5 cursor-pointer duration-300 rounded-lg font-bold transition-all flex items-center gap-2 shadow-sm  text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20`}
            >
              <i className="ri-global-line"></i>
              {currentLocale === "en" ? "AR" : "EN"}
            </motion.button>
            <div className="hidden xl:flex items-center gap-2 xl:gap-3">
              <LocalizedLink
                href="/become-a-partner"
                className="mask-btn mask-btn--none-white h-full! p-3"
              >
                <span className="mask-btn__label p-0!" >{t("become_a_partner")}</span>
                <span type="button" className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                  {t("become_a_partner")}
                </span>
              </LocalizedLink>
              <LocalizedLink
                href="/contact"
                className="mask-btn mask-btn--yellow-black h-full! p-3"
              >
                <span className="mask-btn__label p-0!">{t("get_in_touch")}</span>
                <button type="button" className="mask-btn__fill" tabIndex={-1} aria-hidden="true">
                  {t("get_in_touch")}
                </button>
              </LocalizedLink>
            </div>
          </motion.div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2 sm:gap-4">
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg cursor-pointer font-bold flex items-center gap-1 text-white}`}
            >
              {currentLocale === "en" ? "AR" : "EN"}
            </button>
            <button
              onClick={toggleMenu}
              className={`text-3xl focus:outline-none transition-colors text-white}`}
            >
              <i className={isOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 h-screen w-screen z-[100] xl:hidden flex flex-col"
            style={{ background: "#0f0f0f" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <LocalizedLink href="/" onClick={toggleMenu}>
                <img
                  src="/images/logo.webp"
                  alt="Top Brands"
                  className="h-9 w-auto object-contain brightness-0 invert"
                />
              </LocalizedLink>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1.5 cursor-pointer rounded-lg text-xs font-bold tracking-widest uppercase font-mono border"
                  style={{ color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.15)" }}
                >
                  {currentLocale === "en" ? "AR" : "EN"}
                </button>
                <button onClick={toggleMenu} className="text-3xl focus:outline-none text-white">
                  <i className="ri-close-line"></i>
                </button>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col justify-between px-8 py-8 overflow-y-auto">
              <div className="flex flex-col">
                {links.map((link) => (
                  <motion.div key={link.key} variants={mobileItemVariants}>
                    {link.sublinks ? (
                      <div className="border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                        <div className="flex items-center justify-between">
                          <LocalizedLink
                            href={link.href}
                            onClick={toggleMenu}
                            className="text-2xl font-black text-white py-5 flex-1 tracking-tight"
                          >
                            {t(link.key)}
                          </LocalizedLink>
                          <button
                            onClick={() => setMobileSubMenuOpen(!mobileSubMenuOpen)}
                            className="p-3 focus:outline-none"
                          >
                            <i className={`ri-add-line text-brand-yellow text-2xl transition-transform duration-300 ${mobileSubMenuOpen ? "rotate-45" : ""}`}></i>
                          </button>
                        </div>
                        <AnimatePresence>
                          {mobileSubMenuOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              {link.sublinks.map((sublink) => (
                                <LocalizedLink
                                  key={sublink.key}
                                  href={sublink.href}
                                  onClick={toggleMenu}
                                  className="text-base font-bold py-3 px-4 flex items-center justify-between border-t"
                                  style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.06)" }}
                                >
                                  <span>{t(sublink.key)}</span>
                                  <i className="ri-arrow-right-s-line text-brand-yellow rtl:rotate-180"></i>
                                </LocalizedLink>
                              ))}
                              <div className="pb-4" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <LocalizedLink
                        href={link.href}
                        onClick={toggleMenu}
                        className="text-2xl font-black text-white py-5 border-b flex items-center justify-between tracking-tight group"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        <span>{t(link.key)}</span>
                        <i className="ri-arrow-right-s-line text-brand-yellow text-2xl rtl:rotate-180 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1"></i>
                      </LocalizedLink>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTAs */}
              <div className="pt-10 flex flex-col gap-3">
                <LocalizedLink
                  href="/become-a-partner"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-between gap-3 group border-t pt-6"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-sm font-bold tracking-widest uppercase text-white">
                    {t("become_a_partner")}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180">
                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="black" />
                    </svg>
                  </span>
                </LocalizedLink>

                <LocalizedLink
                  href="/contact"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-between gap-3 group border-t pt-6"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {t("get_in_touch")}
                  </span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                    <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                      <path d="M8.26615 4.79303L4.61493 1.00382L5.57863 -4.44968e-05L10.8587 5.49998L5.57863 11L4.61493 9.99614L8.26615 6.20692H0V4.79303H8.26615Z" fill="rgba(255,255,255,0.4)" />
                    </svg>
                  </span>
                </LocalizedLink>

                <p className="pt-8 text-xs font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                  © {new Date().getFullYear()} Top Brands Syria
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav >
  )
}