import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'pl' ? 'en' : 'pl';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-md bg-teal-100 text-teal-800 hover:bg-teal-200 transition"
    >
      {i18n.language === 'pl' ? t('languageSwitch.en') : t('languageSwitch.pl')}
    </button>
  );
};