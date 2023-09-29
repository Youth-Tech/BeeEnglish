import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { locales } from './locales'
import RNLanguageDetector from './languageDetector'

export const resources = {
  en: {
    translation: locales.en.resource,
  },
  vi: {
    translation: locales.vi.resource,
  },
}

i18next.use(RNLanguageDetector).use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3',
})

export default i18next
