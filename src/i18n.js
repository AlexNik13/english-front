import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
.use(initReactI18next)
.init({
  resources: {
    en: { translation: require('./locales/en/translation.json') },
    ua: { translation: require('./locales/ua/translation.json') },
    ru: { translation: require('./locales/ru/translation.json') },
  },
  lng: 'ua',
  fallbackLng: 'ua',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
