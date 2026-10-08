import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations } from "./translations";
import { planTranslations } from "./translations-plan";

const allTranslations: Record<string, { en: string; id: string }> = {
  ...translations,
  ...planTranslations,
};

export type Language = "en" | "id";

function translate(text: string, language: Language): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  const entry = allTranslations[normalized];
  if (entry) {
    const leading = text.match(/^\s*/)?.[0] ?? "";
    const trailing = text.match(/\s*$/)?.[0] ?? "";
    return leading + entry[language] + trailing;
  }
  // Preserve student names, versions, and identifiers in dynamic messages.
  if (language === "id") {
    return text
      .replace(/^(\+\d+) pts recorded for (.+)$/, "$1 poin dicatat untuk $2")
      .replace(/^EmailJS responded with status (\d+)$/, "EmailJS merespons dengan status $1");
  }
  return text
    .replace(/^Unduh Karsa Mobile (.+) untuk Android$/, "Download Karsa Mobile $1 for Android")
    .replace(/^Unduh Karsa Mobile (.+)$/, "Download Karsa Mobile $1");
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (text: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.lang = language;
    const title = pathname === "/download"
      ? { en: "Karsa Mobile — Coming Soon", id: "Karsa Mobile — Segera Hadir" }
      : pathname === "/privacy"
        ? { en: "Privacy & Security — Karsa", id: "Privasi & Keamanan — Karsa" }
        : pathname === "/paket"
          ? { en: "Plans & Pricing — Karsa", id: "Paket & Harga — Karsa" }
          : { en: "Karsa — Student Activity Tracking System | Universitas Tidar", id: "Karsa — Sistem Pencatatan Keaktifan Mahasiswa | Universitas Tidar" };
    document.title = title[language];
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", language === "en"
      ? "Every act of learning deserves a record. Karsa is an independent classroom participation pilot for the Universitas Tidar environment."
      : "Setiap tindakan belajar layak dicatat. Karsa adalah pilot partisipasi kelas independen untuk lingkungan Universitas Tidar.");
  }, [language, pathname]);

  const value = useMemo(() => ({ language, setLanguage, t: (text: string) => translate(text, language) }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}

function translateChildren(children: ReactNode, language: Language): ReactNode {
  if (typeof children === "string") return translate(children, language);
  if (Array.isArray(children)) return children.map((child) => translateChildren(child, language));
  return children;
}

// Translate copy at the render boundary while keeping state and data values stable.
export function LocalizedText({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  return <>{translateChildren(children, language)}</>;
}
