"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getCompanyData } from "@/services/home.service";
import { useTranslation } from "react-i18next";

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { i18n } = useTranslation();

  useEffect(() => {
    async function fetchCompany() {
      try {
        const res = await getCompanyData(i18n.language);
        const baseData = res ? (res.data || res) : {};
        setCompanyData({
          ...baseData,
          phone_number_1: "+963 11 6022",
          email: "info@topbrands-sy.com",
          google_maps_url: "https://maps.google.com/?q=33.6193071287417,36.489023297392414",
        });
      } catch (error) {
        console.error("Error in CompanyProvider:", error);
        setCompanyData({
          phone_number_1: "+963 11 6022",
          email: "info@topbrands-sy.com",
          google_maps_url: "https://maps.google.com/?q=33.6193071287417,36.489023297392414",
        });
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [i18n.language]);

  return (
    <CompanyContext.Provider value={{ companyData, loading }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
