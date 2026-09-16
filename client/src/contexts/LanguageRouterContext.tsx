import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DEFAULT_LANGUAGE, resolveBrowserLanguage, type SupportedLanguage } from "../lib/languageRouter";

type LanguageRouterValue = {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
};

const LanguageRouterContext = createContext<LanguageRouterValue | null>(null);

export function LanguageRouterProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem("a11-language");
    const resolved = resolveBrowserLanguage(stored);
    setLanguageState(resolved);
    document.documentElement.lang = resolved;
    document.documentElement.dataset.language = resolved;
  }, []);

  const value = useMemo<LanguageRouterValue>(() => ({
    language,
    setLanguage(next) {
      setLanguageState(next);
      window.localStorage.setItem("a11-language", next);
      document.documentElement.lang = next;
      document.documentElement.dataset.language = next;
    },
  }), [language]);

  return <LanguageRouterContext.Provider value={value}>{children}</LanguageRouterContext.Provider>;
}

export function useLanguageRouter() {
  const value = useContext(LanguageRouterContext);
  if (!value) throw new Error("useLanguageRouter must be used inside LanguageRouterProvider");
  return value;
}
