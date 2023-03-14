import AsyncStorage from '@react-native-async-storage/async-storage';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';

const LOCALE_PERSISTENCE_KEY = 'language';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async language => {
    const persistedLocale = await AsyncStorage.getItem(LOCALE_PERSISTENCE_KEY);
    if (!persistedLocale) {
      return language('en');
    }
    language(persistedLocale);
  },
  init: () => {},
  cacheUserLanguage: locale => {
    AsyncStorage.setItem(LOCALE_PERSISTENCE_KEY, locale);
  },
};

i18next
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      //More files can be added here if the app is multilingual
      en: {
        translation: en,
      },
    },
  });
export default i18next;
