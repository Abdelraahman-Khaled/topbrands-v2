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
        if (res) {
          setCompanyData(res.data || res);
        }
      } catch (error) {
        console.error("Error in CompanyProvider:", error);
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
