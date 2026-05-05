import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import messages from "./local/index";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: messages,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

// Update document direction on language change
i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  }
});

// Initial direction setting
if (typeof i18n !== "undefined" && typeof document !== "undefined") {
  const currentLang = i18n.language || "en";
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = currentLang;
}

export default i18n;
