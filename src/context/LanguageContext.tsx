import React, { createContext, useContext, useState } from 'react';

export type Lang = 'en' | 'es';

interface LanguageCtx {
  lang: Lang;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageCtx>({ lang: 'en', toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');
  const toggle = () => setLang(l => (l === 'en' ? 'es' : 'en'));
  return <LanguageContext.Provider value={{ lang, toggle }}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
